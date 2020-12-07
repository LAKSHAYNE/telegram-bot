require('dotenv').config()
const Telegraf = require('telegraf');
const token = '1480794225:AAF1aNUEiBJ2TEfjkMJ_BHJwR4aoxC7eSG4';
const bot = new Telegraf(token);
const http = require('https');
const { url } = require('inspector');
const { text, query } = require('express');
const unirest = require("unirest");
// bot.use((ctx)=>{
//   ctx.reply("P1 clear than your church shoes AH!");
// });



bot.start((ctx) => {
  ctx.reply("I am a MF Starbot !..!");
});

bot.help((ctx) => {
  ctx.reply("i can perform \n /start \n /help ");
});

bot.on("photo", (ctx) => {
  ctx.reply("nice photo");
});

bot.on("sticker", (ctx) => {
  ctx.reply("nice sticker");
});

bot.hears("idiot", (ctx) => {
  ctx.reply("Hey who are you calling idiot wanna get kicked out 😠");
});

bot.command("hey", (ctx) => {
  ctx.reply("hey you called me?");
});

bot.command("image", (ctx) => {
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

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      const data = JSON.parse(body);
      //console.log(data.response.artist.image_url);
      const artist_image = data.response.artist.image_url;
      ctx.replyWithPhoto(artist_image);
    });
  });

  req.end();
});

bot.on('artist', (ctx) => {
  const input = ctx.update.message.text;
  const arr = input.split(" ");
  arr.shift();
  const name = arr.join(" ");


  let unirest = require("unirest");

  let req = unirest("GET", "https://genius.p.rapidapi.com/search");

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

    res.body.response.hits.forEach((item) => {
      ctx.reply(item.result.full_title);
    });
  });



});

bot.command('test', (ctx) => {
  //ctx.telegram.sendMessage(ctx.chat.id,"heyyy",{parse_mode:'HTML'});
  ctx.telegram.sendMessage(ctx.chat.id, "helloo",
    {
      reply_markup: {
        inline_keyboard: [[{ text: "button1", url: "www.google.com" }, { text: "button2", url: "https://www.youtube.com/watch?v=34Na4j8AVgA" }],
        [{ text: "button3", url: "https://shop.theweeknd.com/" }]
        ]
      }
    }
  );
});

bot.command('test2', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "heyyy", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "button 1", callback_data: "b1" }, { text: "button 2", callback_data: "b2" }],
        [{ text: "button 3", callback_data: "b3" }]
      ]
    }
  })
});

bot.action('b1', (ctx) => {
  ctx.deleteMessage();
  ctx.reply("b1 pressed");
});

bot.command("begin", (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, "What do you want to do?", {
    reply_markup: {
      inline_keyboard: [[{ text: "Artist Hits", callback_data: "name_artist" }],
      [{text :"Artist Image", callback_data:'artist image'}]
    ]
    }
  });
});

bot.action("name_artist", (ctxq) => {
  ctxq.deleteMessage();
  ctxq.reply("enter the artist name");
  bot.on("text", (ctx) => {
    const input = ctx.update.message.text;
    que(input,"hits").then((result)=>{
      result.forEach((onemusic)=>ctxq.reply(onemusic))
    })
  });
});


async function que(inp,ask){
  var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://genius.p.rapidapi.com/search',
  params: {q: inp},
  headers: {
    'x-rapidapi-key': '7caea818cbmshc65f5f1f51c988dp19ffc2jsn477d50653c5c',
    'x-rapidapi-host': 'genius.p.rapidapi.com'
  }
};
let li=[];
await axios.request(options).then(function (res) {
  if(ask==="hits"){
    res.data.response.hits.forEach((item) => {
    li.push(item.result.full_title);
      });
  }
  else if(ask==="artist_image"){
    li.push(res.data.response.hits[0].result.primary_artist.image_url)
  }
}).catch(function (error) {
	console.error(error);
});
return li;
}




bot.action("artist image",(ctxq)=>{
  ctxq.deleteMessage();
  ctxq.reply("Enter the artist name for img");
  bot.on('text',(ctx)=>{
    const input=ctx.update.message.text;
    que(input,'artist_image').then((img_url)=>{
      const a=img_url.pop(img_url)
      ctx.replyWithPhoto({url:a});
    });
  });
});

bot.launch();