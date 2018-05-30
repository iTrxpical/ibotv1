var roblox = require('noblox.js');
const db = require('quick.db')
exports.run = async (Discord, client, message, args) => {

if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("No can do pal!, MANAGE_ROLES is needed.");
let pw = await db.fetch(`RobloxProfile_${message.guild.id}`, { target: '.password' });
let un = await db.fetch(`RobloxProfile_${message.guild.id}`, { target: '.username' });
let gid = await db.fetch(`RobloxProfile_${message.guild.id}`, { target: '.groupid' });
let mr = await db.fetch(`RobloxProfile_${message.guild.id}`, { target: '.maxrank' });
let staffc = message.guild.channels.find("name", "logs")	
var groupId = gid; //replace with stored stuff from earlier
var maximumRank = mr; //replace with stored stuff from earlier
let rankchange = args[1];


roblox.login({username: un, password: pw}).then((success) => {

}).catch(() => {console.log("Failed to login.");});

    	var username = args[0]
    	if (username){
    		message.channel.send(`Checking ROBLOX for ${username}`)
    		roblox.getIdFromUsername(username)
			.then(function(id){
				roblox.getRankInGroup(groupId, id)
			        
				.then(function(rank){
					if(maximumRank = 0){
						console.log("ok")
					} else {
						message.channel.send(`${id} is rank ${rank} and demotable.`)
						roblox.changeRank(groupId, id, rankchange)
						.then(function(roles){
							message.channel.send(`Ranked from ${roles.oldRole.Name} to ${roles.newRole.Name}`)
							const embed = new Discord.RichEmbed()
							    .setColor(0x8cff00)
							    .setTimestamp()
							    .setDescription(`**Action:** Rank\n**Target:** ${username}\n**User:** ${message.author.tag}`);
							staffc.send({embed});
						}).catch(function(err){
							message.channel.send("Failed to rank.")
						});
					}
				}).catch(function(err){
					message.channel.send("Couldn't get them in the group.")
				});
			}).catch(function(err){ 
				message.channel.send(`Sorry, but ${username} doesn't exist on ROBLOX.`)
			});
    	} else {
    		message.channel.send("Please enter a username.")
    	}
    	return;
}