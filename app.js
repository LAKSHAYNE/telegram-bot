const TelegramBot = require('node-telegram-bot-api');
 
// replace the value below with the Telegram token you receive from @BotFather
const token = '1480794225:AAF1aNUEiBJ2TEfjkMJ_BHJwR4aoxC7eSG4';
 
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
 
// // Matches "/echo [whatever]"
// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message
 
//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"
 
//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });

// bot.on("message",(msg)=>{
//     const chatId=msg.chat.id;
//     if(msg.text.toString()==="who are u"){
//         bot.sendMessage(chatId,"I am a mufukin starbot");
//     }
//     else{
//         bot.once("location",(msg)=>{
//             var latit=msg.location.latitude;
//             console.log(latit);
//             bot.sendMessage(chatId,latit);
//         });    
//     }
// });



