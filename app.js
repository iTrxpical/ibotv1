// TGS-Bot
// Version: 0.9 PRE-ALPHA / PRE-REALEASE
// Discord Code: 

const Discord = require('discord.js');
const client = new Discord.Client();
const db = require('quick.db');
const { get } = require("snekfetch"); 
const superagent = require("superagent");
const weather = require('weather-js');
const DBL = require("dblapi.js");
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4MzY1ODUwNjA2MDAzODE0NCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTI2MTEwODAxfQ.VJFyu_SJjU6rJQZFJrsTP7azerUJjNPLs3UHvAPPKyw', client);

var randomColor = Math.floor(Math.random() * 16777215).toString(16);
   
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! There are no apparent major bugs.`);
    client.user.setStatus("online");
});

client.on('ready', () => {
    setInterval(() => {
        dbl.postStats(client.guilds.size);
        client.user.setActivity('with ' + client.users.size.toLocaleString() + ' users! | ibot.space', { type: 'WATCHING' });
    }, 500);
});





client.on('message', message => {

    let sender = message.author;

    if (sender.bot) return;
    if (message.channel.type === 'dm') {
        message.channel.send("**Unfortunately we can only read things in guilds (servers). The comamnd prefix is '!' **")
        return;
}
    

   
   


   if (message.mentions.members.firstKey() === '383658506060038144') {
    message.channel.send(':zzz: :zzz: :sleeping: You woke me. How rude! :angry: My basic prefix is ! but it may have changed!')
   }
   
   var guildid = message.guild.id
    db.fetch(`guildPrefix_${guildid}`).then(i => {

        let prefix = i || '!'

        let msg = message.content.toLowerCase();
        let args = message.content.slice(prefix.length).trim().split(" ");
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;

        try {

            let commandFile = require(`./commands/${cmd}.js`);
            commandFile.run(Discord, client, message, args);

        } catch (e) {

            console.log(e);

        } finally {

            console.log(`${message.author.username} ran the command: ${cmd} sucessfully!`);

        }

    })
})

client.login(process.env.BOT_TOKEN);
