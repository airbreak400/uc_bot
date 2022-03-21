import Direct from "../database/models/Direct.js";
import { Markup } from "telegraf";


const startCommand = (ctx) => {
    if(ctx.chat.type === 'private') {
        let message = `
Привет! я UC — бот для <b>чатов (групп)</b>

Смысл бота: бот работает только в чатах.
Раз в 24 часа игрок может прописать команду /uc, где в ответ получит от бота рандомное число.
Рандом работает от -5 UC до +10 UC.

Если у тебя есть вопросы — пиши команду: /help
        `
        Direct.findOne({ userId: ctx.message.from.id }, (err, user) => {
            if(err) return console.log(err);
    
            if(user === null) {
                const newUser = new Direct({userId: ctx.message.from.id});
                newUser.save().then(async () => {
                    await ctx.replyWithHTML(message, Markup.inlineKeyboard([
                        Markup.button.url("Добавить бота в группу", "http://t.me/babjiucbot?startgroup=d")
                        ])).then().catch(function(error) {
                            if (error.response && error.response.statusCode === 403) {
                              console.log(error)
                            }
                          });
                })
            } else {
                ctx.replyWithHTML(message, Markup.inlineKeyboard([
                    Markup.button.url("Добавить бота в группу", "http://t.me/babjiucbot?startgroup=d")
                    ])).then().catch(function(error) {
                        if (error.response && error.response.statusCode === 403) {
                          console.log(error)
                        }
                      });
            }
        })
    }   
}

export default startCommand;