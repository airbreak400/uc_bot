import Chat from "../database/models/Chat.js";
import QuickChart from "quickchart-js";


const handleFoundGroup = (chat, ctx) => {

    let copyUsersArray = JSON.parse(JSON.stringify(chat.users));
    // console.log(copyUsersArray);
    copyUsersArray.sort((a, b) => b.dickSize - a.dickSize);
    if(copyUsersArray.length > 10) {
        copyUsersArray = copyUsersArray.slice(0, 10);
    }
    
    let finalData = {};
    finalData.fullNames = copyUsersArray.map(x => {
        if(x.userFullName.length > 15) {
            return x.userFullName.slice(0, 12) + '...';
        } else {
            return x.userFullName;
        }
    })
    finalData.dickSizes = copyUsersArray.map(x => x.dickSize)
    
//////////////////////////////////////////////
    const statsImg = new QuickChart();
    statsImg.setConfig({
    type: 'doughnut',
    data: { 
        labels: finalData.fullNames, 
        datasets: [{ 
            label: 'Топ пользователей', 
            data: finalData.dickSizes 
            }] 
        },
        options: {
            title: {
                display: true,
                text: '@BabjiUCbot',
            },
            legend: {
                position: 'right',
                align: 'start'
            },
            layout: {
                padding: 30
            },
            plugins: {
                datalabels: {
                  color: '#FFFFFF'
                }
            }
        }
    });


    statsImg.setWidth(700);
    statsImg.setHeight(500);

    ctx.replyWithPhoto({ url: statsImg.getUrl() }, { reply_to_message_id: ctx.message.message_id });

}

const handleStatsCommand = (ctx) => {
    Chat.findOne({ chatId: ctx.message.chat.id }, (err, result) => {
        if(err) return console.log('error happened when searching a group');
        if(result === null) {
            ctx.reply(`Начните играть чтобы появилась статистика`, { reply_to_message_id: ctx.message.message_id });
        } else if(result !== null) {
            handleFoundGroup(result, ctx);
        }
    })
}

export default handleStatsCommand;