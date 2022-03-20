import Chat from "../database/models/Chat.js";

const handleFoundGroup = async (chat, ctx) => {

    let copyUsersArray = JSON.parse(JSON.stringify(chat.users));
    copyUsersArray.sort((a, b) => b.dickSize - a.dickSize);
    if(copyUsersArray.length > 10) {
        copyUsersArray = copyUsersArray.slice(0, 10);
    }
    

    let topUsersString = `Топ 10 игроков
    \n`;

    for(let i = 0; i < copyUsersArray.length; i++) {

        let shortUserName = copyUsersArray[i].userFullName;

        if(copyUsersArray[i].userFullName.length > 15) {
            shortUserName = copyUsersArray[i].userFullName.slice(0, 12) + '...';
        }

        let userString = `${i+1}<b>|${(shortUserName)} — ${copyUsersArray[i].dickSize}</b> UC.\n`;

        topUsersString += userString;
    }

    ctx.replyWithHTML(topUsersString, { reply_to_message_id: ctx.message.message_id });

}

const handleTopDicksCommand = (ctx) => {
    Chat.findOne({ chatId: ctx.message.chat.id }, (err, result) => {
        if(err) return console.log('error happened when searching a group');
        if(result === null) {
            ctx.reply(`Начните играть чтобы появилась статистика`, { reply_to_message_id: ctx.message.message_id });
        } else if(result !== null) {
            handleFoundGroup(result, ctx);
        }
    })
}

export default handleTopDicksCommand;