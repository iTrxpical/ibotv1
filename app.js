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
        let users = client.users.size.toLocaleString()
        client.user.setPresence({ game: { name: `ibot.space | ${users} users!`, url: 'https://twitch.tv/discordapp', type: 1 } });
    }, 500);
});


client.on('guildMemberAdd', (member, guild) => {
	const totalsize = member.guild.memberCount;
	const botsize = member.guild.members.filter(m => m.user.bot).size;
	const humansize = totalsize - botsize;
	if(member.guild.id === '334833519840985089') {
		member.guild.channels.get("447810912464797715").setName("Total Users : " + member.guild.memberCount);
		member.guild.channels.get("447811003695235082").setName("Member Count  : " + humansize);
		member.guild.channels.get("447811053590544415").setName("Bot Count : " + member.guild.members.filter(m => m.user.bot).size);
	}
  else return;
});
   


client.on('message', message => {

    let sender = message.author;

    if (sender.bot) return;
    if (message.channel.type === 'dm') {
        message.channel.send("**Unfortunately we can only read things in guilds (servers). The comamnd prefix is '!' **")
        return;
}


   



   
   var guildid = message.guild.id
    db.fetch(`guildPrefix_${guildid}`).then(i => {
           const prefixes = ['!', 'KC', 'i', '^<@!?@383658506060038144>'];
           let prefix = false;
           for(const thisPrefix of prefixes) {
             if(message.content.startsWith(thisPrefix)) prefix = thisPrefix;
        
}
        

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
