import { Telegraf, Markup } from "telegraf";
import LocalSession from "telegraf-session-local";
import './database/config.js';

import handleDickCommand from "./controller/handleDickCommand.js";
import handleStatsCommand from "./controller/handleStatsCommand.js";
import handleTopDicksCommand from "./controller/handleTopDicksCommand.js";


import antiFlood from "./middlewares/antiFlood.js";
import groupCheck from "./middlewares/groupCheck.js";
import handleTopGlobalCommand from "./controller/handleTopGlobalCommand.js";
import startCommandHandler from "./controller/handleStartCommand.js";
import handleHelpCommand from './controller/handleHelpCommand.js';


const bot = new Telegraf(process.env.TOKEN);

bot.use((new LocalSession({ database: 'user_session.json' })).middleware())


bot.use(antiFlood);

bot.command('start', startCommandHandler);
bot.command('global_top', handleTopGlobalCommand);
bot.command('help', handleHelpCommand);

//Only for groups

bot.use(groupCheck);

bot.command('uc', (ctx) => {
    handleDickCommand(ctx);
})

bot.command('stats', (ctx) => {
    handleStatsCommand(ctx);
})

bot.command('top_players', (ctx) => {
    handleTopDicksCommand(ctx);
})




// bot.hears('Добавить в группу', ctx => {
//     console.log('fff')
//     ctx.reply('Fuck you dovavit', Markup
//     .keyboard(['Добавить в группу', 'Глобальная статистика', 'Помощь'])
//     .oneTime()
//     .resize())
// })





bot.launch();