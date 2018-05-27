// TGS-Bot
// Version: 0.9 PRE-ALPHA / PRE-REALEASE ibot.sapce
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

client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  let invitechannel = client.channels.find("name", "server-invites")
  invitechannel.send(`Joined a new guild named: ${guild.name} with invite: https://discord.gg/${invite.code}`)
});

client.on('guildMemberAdd', (member, guild) => {
	const totalsize = member.guild.memberCount;
	const botsize = member.guild.members.filter(m => m.user.bot).size;
	const humansize = totalsize - botsize;
	if(member.guild.id === '334833519840985089') {
		
		member.guild.channels.get("447811003695235082").setName("Member Count  : " + member.guild.memberCount);
		member.guild.channels.get("447811053590544415").setName("Messages Sent : 1,294,786");
	}
	else if(member.guild.id === '444159749458755594') {
		member.guild.channels.get("447813755263385602").setName("Total Users : " + member.guild.memberCount);
		member.guild.channels.get("447813778080530463").setName("Guilds : " + client.guilds.size);
		let users = client.users.size.toLocaleString()
		member.guild.channels.get("447813794614345731").setName("Users : " + users);
	}
  else return;
});
   
client.on('message', async message => {
  if (message.author.client) return;
  let status = new db.table('AFKs');


// Check if author is AFK
let authorStatus = await status.fetch(message.author.id);
let mentioned = message.mentions.members.first();
if (mentioned) { 
let mstatus = await status.fetch(mentioned.id)
if (!mstatus) { return; }
if(status) {
 const embed = new Discord.RichEmbed()
   .setTitle(mentioned.user.username + ' is AFK!')
   .setDescription(mstatus)
   message.channel.send(embed).then(i => i.delete(5000))

  } else if(!status) {
  return;
  }

}

});


client.on('message', message => {

    let sender = message.author;
    const ayy = client.emojis.find("name", "tickNo");
    if (sender.bot) return;
    if (message.channel.type === 'dm') {
        message.channel.send(ayy + " You can't run commands here, but if you need some commands to run in your server, check out https://ibot.space/.")
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
