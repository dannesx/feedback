# Feedback

Site estático publicado no GitHub Pages. O botão **✨ Gerar resumo** recebe apenas o tema e o nome da ferramenta, gera uma sugestão editável e aceita respostas de 200–300 caracteres (incluindo espaços). O texto manual continua livre. Editar os campos ou limpar o formulário cancela a geração pendente.

## Ativar a IA

O GitHub Pages não executa código de servidor. A API em `worker/` usa Cloudflare Workers para manter a chave fora do navegador. Não há dependências de runtime ou build no site.

1. Crie uma chave em https://aistudio.google.com/apikey. O modelo padrão é `gemini-3.1-flash-lite`, com faixa gratuita sujeita aos limites da conta. Confira https://ai.google.dev/gemini-api/docs/pricing. Na faixa gratuita, o Google pode usar o conteúdo para melhorar seus produtos; envie somente tema e ferramenta, sem dados pessoais.
2. Com Node.js 22+ e uma conta Cloudflare, execute na raiz:

   ```sh
   npx wrangler@4 login
   npx wrangler@4 deploy --config worker/wrangler.toml
   npx wrangler@4 secret put GEMINI_API_KEY --config worker/wrangler.toml
   ```

   O último comando solicita a chave de forma interativa. Não coloque a chave no código.
3. Copie a URL retornada no deploy, acrescente `/resumo` e preencha `SUMMARY_API_URL` em `js/config.js`. Essa URL é pública, não é um segredo.
4. Publique os arquivos estáticos no GitHub Pages normalmente. Se o domínio mudar, ajuste `ALLOWED_ORIGINS` no `worker/wrangler.toml` e publique o Worker novamente.
5. Teste com tema “Laços de repetição” e ferramenta “Python”. Revise a sugestão, edite se necessário e use **Gerar texto** para copiar o feedback completo.

O Worker valida os dados, limita a 5 pedidos nos últimos 60 minutos por IP, com contador persistente em Durable Objects, usa timeout e tenta no máximo duas gerações para cumprir o tamanho. Erros preservam o resumo existente. CORS restringe navegadores ao domínio configurado; não é autenticação e não impede chamadas diretas. Use cotas do provedor para controlar o consumo; o rate limit não é um teto global de gastos.

### Chave como secret do GitHub

Sim: `GEMINI_API_KEY` pode ser um secret do repositório para um GitHub Actions que publique o Worker. O Actions deve transferir esse secret para o armazenamento de secrets do Worker, usando `wrangler secret put` via entrada padrão (sem imprimir a chave). Para automatizar o deploy, também são necessárias credenciais Cloudflare (`CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`).

Secrets do GitHub não podem ser lidos pelo JavaScript no GitHub Pages. Substituir a chave em um arquivo durante o build a expõe publicamente. A chave deve ficar no Worker; somente sua URL vai para o site.

### Desenvolvimento e testes

```sh
npm test
npm run dev
```

Abra http://localhost:8000. Não é necessário instalar dependências. O servidor de desenvolvimento encaminha `/api/resumo` ao Worker publicado, usando a origem autorizada, e substitui a configuração apenas na resposta local. A chave permanece no Worker e as gerações consomem a cota real da IA. A configuração de produção não é alterada.

Para desenvolver o próprio Worker localmente, crie `worker/.dev.vars` com `GEMINI_API_KEY` (arquivo ignorado pelo Git), execute `npx wrangler@4 dev --config worker/wrangler.toml --var ALLOWED_ORIGINS:http://localhost:8000` e use temporariamente `http://localhost:8787/resumo` em `js/config.js`. Restaure a URL de produção antes de publicar. Os testes automatizados simulam o provedor e não consomem a API.

### Limite por IP

Cada pedido válido de geração consome uma das 5 vagas, mesmo se a IA falhar. A segunda tentativa interna para ajustar o tamanho não consome outra vaga. Pedidos bloqueados retornam HTTP 429 com `Retry-After` em segundos e não estendem a espera. O IP vem de `CF-Connecting-IP`; o contador usa um hash dele. Pedidos simultâneos são serializados e o estado expira após uma hora sem pedidos aceitos. Pessoas na mesma conexão pública compartilham a cota. No desenvolvimento, o proxy usa o IP público da máquina que executa `npm run dev`.
