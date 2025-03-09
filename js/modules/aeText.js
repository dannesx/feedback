export default function defaultText({
  aluno,
  professor,
  nivel,
  projeto,
  code,
  desenvolvimento,
  adicionais,
  condicoes
}) {
  return `⭐ 𝙍𝙚𝙨𝙪𝙢𝙤 𝙙𝙖 𝘼𝙪𝙡𝙖 𝙀𝙭𝙥𝙚𝙧𝙞𝙢𝙚𝙣𝙩𝙖𝙡 ⭐
𝗔𝗹𝘂𝗻𝗼: ${aluno}
𝗣𝗿𝗼𝗳𝗲𝘀𝘀𝗼𝗿: ${professor}
𝗡𝗶́𝘃𝗲𝗹 𝗿𝗲𝗰𝗼𝗺𝗲𝗻𝗱𝗮𝗱𝗼: ${nivel}
𝗖𝗼𝗱𝗲.𝗼𝗿𝗴: ${code}

📝 𝗣𝗿𝗼𝗷𝗲𝘁𝗼 𝗱𝗲𝘀𝗲𝗻𝘃𝗼𝗹𝘃𝗶𝗱𝗼 𝗲𝗺 𝗮𝘂𝗹𝗮
${projeto}

📚 𝗗𝗲𝘀𝗲𝗻𝘃𝗼𝗹𝘃𝗶𝗺𝗲𝗻𝘁𝗼 𝗱𝗼 𝗮𝗹𝘂𝗻𝗼
${desenvolvimento}

📌 𝗜𝗻𝗳𝗼𝗿𝗺𝗮𝗰̧𝗼̃𝗲𝘀 𝗮𝗱𝗶𝗰𝗶𝗼𝗻𝗮𝗶𝘀
${adicionais ? adicionais : 'Nenhuma informação adicional'}

🔍 𝗣𝗼𝘀𝘀𝘂𝗶 𝗰𝗼𝗻𝗱𝗶𝗰̧𝗼̃𝗲𝘀 𝗱𝗲 𝗳𝗿𝗲𝗾𝘂𝗲𝗻𝘁𝗮𝗿 𝗼 𝗰𝘂𝗿𝘀𝗼? ${condicoes}`
}
