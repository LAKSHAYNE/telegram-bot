const TelegramBot = require('node-telegram-bot-api');
 
// replace the value below with the Telegram token you receive from @BotFather
const token = '1480794225:AAF1aNUEiBJ2TEfjkMJ_BHJwR4aoxC7eSG4';
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
 
bot.on("message",(msg)=>{
    const chatId=msg.chat.id;
    console.log(msg.from.username);
    bot.sendMessage(chatId,"kjsdkladlkajdljla");
});