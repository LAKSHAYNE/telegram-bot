require('dotenv').config()
const Telegraf=require('telegraf');
const token = '1480794225:AAF1aNUEiBJ2TEfjkMJ_BHJwR4aoxC7eSG4';
const bot =new Telegraf(token);
const http =require('https');
// bot.use((ctx)=>{
//   ctx.reply("P1 clear than your church shoes AH!");
// });



bot.start((ctx)=>{
  ctx.reply("I am a MF Starbot !..!");
});

bot.help((ctx)=>{
  ctx.reply("i can perform \n /start \n /help ");
});

bot.on("photo",(ctx)=>{
  ctx.reply("nice photo");
});

bot.on("sticker",(ctx)=>{
  ctx.reply("nice sticker");
});

bot.hears("idiot",(ctx)=>{
  ctx.reply("Hey who are you calling idiot wanna get kicked out 😠");
});

bot.command("hey",(ctx)=>{
  ctx.reply("hey you called me?");
});

bot.command("image",(ctx)=>{
  const options = {
    "method": "GET",
    "hostname": "genius.p.rapidapi.com",
    "port": null,
    "path": "/artists/16775",
    "headers": {
      "x-rapidapi-key": process.env.KEY,
      "x-rapidapi-host": "genius.p.rapidapi.com",
      "useQueryString": true
    }
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end",function () {
      const body =Buffer.concat(chunks);
      const data=JSON.parse(body);
      //console.log(data.response.artist.image_url);
      const artist_image=data.response.artist.image_url;
      ctx.replyWithPhoto(artist_image);
    });
  });

  req.end();
});

bot.command('artist',(ctx)=>{
  const input=ctx.update.message.text;
  const arr=input.split(" ");
  arr.shift();
  const name=arr.join(" ");


  var unirest = require("unirest");

  var req = unirest("GET", "https://genius.p.rapidapi.com/search");

  req.query({
    "q": name
  });

  req.headers({
    "x-rapidapi-key": process.env.KEY,
    "x-rapidapi-host": "genius.p.rapidapi.com",
    "useQueryString": true
  });


  req.end(function (res) {
    if (res.error) throw new Error(res.error);

    res.body.response.hits.forEach((item)=>{
      ctx.reply(item.result.full_title);
    });
  });



});

bot.launch();