import { Markup } from "telegraf";

export default (ctx, next) => {
    if(ctx.chat.type === 'group' || ctx.chat.type === 'supergroup') {
            next();
    } else {
        ctx.replyWithHTML('Я работаю только в <b>чатах (группах)</b>', Markup.inlineKeyboard([
            Markup.button.url("Добавить бота в группу", "http://t.me/babjiucbot?startgroup=d")
            ])).then().catch(function(error) {
                if (error.response && error.response.statusCode === 403) {
                  console.log(error)
                }
              });
    }
}