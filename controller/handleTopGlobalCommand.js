import Chat from "../database/models/Chat.js";

const globalTopCommandHandler = (ctx) => {
    if(ctx.chat.type === 'private') {
        Chat.find({}, (err, result) => {
            if(err) return console.log('error happened when searching a group');
            if(result === null) {
                ctx.reply(`Начните играть чтобы появилась статистика`, { reply_to_message_id: ctx.message.message_id });
            } else if(result !== null) {
                const copyChatsArray = JSON.parse(JSON.stringify(result));
    
                let allUsers = [];
    
                copyChatsArray.forEach(chat => {
                    allUsers.push(...chat.users);
                })
               
                for(let i = 0; i < allUsers.length; i++) {
                    for(let j = i+1; j < allUsers.length; j++) {
                        if(allUsers[j].userId === allUsers[i].userId) {
                            if(allUsers[j].dickSize < allUsers[i].dickSize) {
                                allUsers.splice(j, 1);
                            } else if (allUsers[j].dickSize == allUsers[i].dickSize) {
                                allUsers.splice(j, 1);
                            } else {
                                allUsers.splice(i, 1, allUsers[j]);
                                allUsers.splice(j, 1);
                            }
                        }
                    }
                }
    
                allUsers.sort((a, b) => b.dickSize - a.dickSize);

                if(allUsers.length > 10) {
                    allUsers = allUsers.slice(0, 10);
                }
    
                let topUsersString = `Топ пользователей сервера 
                \n`;
    
                for(let i = 0; i < allUsers.length; i++) {
    
                    let shortUserName = allUsers[i].userFullName;
    
                    if(allUsers[i].userFullName.length > 15) {
                        shortUserName = allUsers[i].userFullName.slice(0, 12) + '...';
                    }
    
                    let userString = `<b>${i+1}|${shortUserName} — </b>${allUsers[i].dickSize} UC.\n`;
    
                    topUsersString += userString;
                }
    
                ctx.replyWithHTML(topUsersString, { reply_to_message_id: ctx.message.message_id }).then().catch(function(error) {
                    if (error.response && error.response.statusCode === 403) {
                      console.log(error)
                    }
                  });
    
                
            }
        })
    } else {
        ctx.reply('Данная команда доступна только в личке с ботом❗️', { reply_to_message_id: ctx.message.message_id }).then().catch(function(error) {
            if (error.response && error.response.statusCode === 403) {
              console.log(error)
            }
          });
    }
}

export default globalTopCommandHandler;