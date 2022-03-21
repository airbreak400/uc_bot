import { Telegraf } from "telegraf";
import rateLimit from "telegraf-ratelimit";
import './database/config.js';

import handleDickCommand from "./controller/handleDickCommand.js";
import handleStatsCommand from "./controller/handleStatsCommand.js";
import handleTopDicksCommand from "./controller/handleTopDicksCommand.js";


import groupCheck from "./middlewares/groupCheck.js";
import handleTopGlobalCommand from "./controller/handleTopGlobalCommand.js";
import startCommandHandler from "./controller/handleStartCommand.js";
import handleHelpCommand from './controller/handleHelpCommand.js';

const limitConfig = {
    window: 3000,
    limit: 1
}


const bot = new Telegraf(process.env.TOKEN);

bot.use((ctx, next) => {
    if(ctx.message !== undefined && ctx.message.text !== undefined) {
        if(ctx.message.text.startsWith('/')) {
            next();
        }
    }
})


bot.use(rateLimit(limitConfig));




bot.command('start', startCommandHandler);
bot.command('global_top', handleTopGlobalCommand);
bot.command('help', handleHelpCommand);

//Only for groups

bot.use(groupCheck);

bot.command('uc', handleDickCommand)

bot.command('stats', handleStatsCommand)

bot.command('top_players', handleTopDicksCommand)




// bot.hears('Добавить в группу', ctx => {
//     console.log('fff')
//     ctx.reply('Fuck you dovavit', Markup
//     .keyboard(['Добавить в группу', 'Глобальная статистика', 'Помощь'])
//     .oneTime()
//     .resize())
// })





bot.launch();