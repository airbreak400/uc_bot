import Direct from "../database/models/Direct.js";
import { Markup } from "telegraf";


const startCommand = (ctx) => {
    if(ctx.chat.type === 'private') {
        let message = `
Привет! я UC — бот для <b>чатов (групп)</b>

Смысл бота: бот работает только в чатах.
Раз в 24 часа игрок может прописать команду /uc, где в ответ получит от бота рандомное число.
Рандом работает от -5 см до +10 см.

Если у тебя есть вопросы — пиши команду: /help
        `
        Direct.findOne({ userId: ctx.message.from.id }, (err, user) => {
            if(err) return console.log(err);
    
            if(user === null) {
                const newUser = new Direct({userId: ctx.message.from.id});
                newUser.save().then(() => {
                    ctx.replyWithHTML(message, Markup.inlineKeyboard([
                        Markup.button.url("Добавить бота в группу", "http://t.me/babjiucbot?startgroup=d")
                        ]))
                })
            } else {
                ctx.replyWithHTML(message, Markup.inlineKeyboard([
                    Markup.button.url("Добавить бота в группу", "http://t.me/babjiucbot?startgroup=d")
                    ]))
            }
        })
    }   
}

export default startCommand;