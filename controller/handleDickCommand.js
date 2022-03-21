import Chat from "../database/models/Chat.js";

function random(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function oneDayPassed(lastDate, today) {
    if(today.getDate() - lastDate.getDate() >= 1) {
        return true;
    } else if(today.getMonth() - lastDate.getMonth() >= 1) {
        return true;
    } else {
        return false;
    }

}

const getUserName = async (ctx) => {
    const user = await ctx.telegram.getChat(ctx.message.from.id);
    let userNameString = '';
    if(user.first_name !== undefined) userNameString += user.first_name + ' ';
    if(user.last_name !== undefined) userNameString += user.last_name;
    return userNameString;
}

async function createNewUser(ctx) {
    const userNameString = await getUserName(ctx);
    return {
        userFullName: userNameString,
        userId: ctx.message.from.id,
        dickSize: random(1,10),
        lastCheck: new Date()
    }
}

const handleCreateGroup = async (ctx) => {
    const newChat = new Chat({chatId: ctx.message.chat.id});

    const newUser = await createNewUser(ctx);
    if(newUser.dickSize < 0) newUser.dickSize = 0;
    newChat.users.push(newUser)
    newChat.save().then(async () => {
        await ctx.replyWithHTML(`<a href="tg://user?id=${newUser.userId}">${newUser.userFullName}</a>, ты получил ${newUser.dickSize} UC. \nТеперь твой баланс равен ${newUser.dickSize} UC. \nСледующая попытка завтра!`, { reply_to_message_id: ctx.message.message_id });
        // ctx.reply(`Acc & GRP saved, your dick is ${newUser.dickSize}`, { reply_to_message_id: ctx.message.message_id });
    })
    .catch(err => {
        if(err) console.log(err);
    })
}

const handleFoundGroup = async (chat, ctx) => {
    // find if user is in the array
    // or create a new user in the array
    let newUser = await createNewUser(ctx);
    for(let i = 0; i < chat.users.length; i++) {
        if(chat.users[i].userId == ctx.message.from.id.toString()) {
            newUser = null;
            let userRef = chat.users[i];
            if(oneDayPassed(userRef.lastCheck, new Date())) {

                let randomSizeVal = random(-5, 10)
                if(userRef.dickSize + randomSizeVal < 0) {
                    randomSizeVal = 0;
                }
                userRef.dickSize += randomSizeVal;
                userRef.lastCheck = new Date();
                userRef.userFullName = await getUserName(ctx);
                chat.save().then(async () => {
                    await ctx.replyWithHTML(`<a href="tg://user?id=${userRef.userId}">${userRef.userFullName}</a>, Ты ${randomSizeVal > 0 ? `получил ${randomSizeVal} UC` : randomSizeVal === 0 ? 'ничего не получил' : `потерял ${randomSizeVal} UC` }. \nТеперь твой баланс равен ${userRef.dickSize} UC. \nСледующая попытка завтра!`, { reply_to_message_id: ctx.message.message_id });
                    // ctx.reply(`Your dick: ${userRef.dickSize}, added: ${randomSizeVal}`, { reply_to_message_id: ctx.message.message_id });
                })
                .catch(err => {
                    if(err) console.log(err);
                })

            } else {
                userRef.userFullName = await getUserName(ctx);
                chat.save().then(async () => {
                    await ctx.replyWithHTML(`<a href="tg://user?id=${userRef.userId}">${userRef.userFullName}</a>, ты уже играл. \nТвой баланс равен ${userRef.dickSize} UC. \nСледующая попытка завтра!`, { reply_to_message_id: ctx.message.message_id });
                    // ctx.reply(`Your dick: ${userRef.dickSize}, added: ${randomSizeVal}`, { reply_to_message_id: ctx.message.message_id });
                })
                .catch(err => {
                    if(err) console.log(err);
                })
                
            }

        } 
    }

    if(newUser !== null) {
        if(newUser.dickSize < 0) newUser.dickSize = 0;
        chat.users.push(newUser);
        chat.save().then(async () => {
            await ctx.replyWithHTML(`<a href="tg://user?id=${newUser.userId}">${newUser.userFullName}</a>, Ты получил ${newUser.dickSize} UC. \nТеперь твой баланс равен ${newUser.dickSize} UC. \nСледующая попытка завтра!`, { reply_to_message_id: ctx.message.message_id });
        })
        .catch(err => {
            if(err) console.log(err);
        })
    }
}




const handleDickCommand = (ctx) => {

    Chat.findOne({ chatId: ctx.message.chat.id }, (err, result) => {
        if(err) return console.log(err);
        if(result === null) {
            handleCreateGroup(ctx);
        } else if(result !== null) {
            handleFoundGroup(result, ctx);
        }
    })

    //SearchGroup if not found create one, or else go to next step
    //if Group found search user from the group, if not found create one, or go to next step
    //Check the time used the command
    //Longen the size
}

export default handleDickCommand;