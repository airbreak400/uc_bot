const handleHelpCommand = (ctx) => {
        let message = `
Команды бота:
/uc — Получить/Потерять UC
/top_players — Топ 10 богачей чата
/stats — Статистика в виде картинки
/global_top - Глобальный топ 10 игроков
        
Контакты:
Наш канал — @airbreak_pubgm
Админ — @souljawitch
        `
        ctx.reply(message, { reply_to_message_id: ctx.message.message_id })
}

export default handleHelpCommand;