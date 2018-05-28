const db = require('quick.db')
exports.run = (Discord, client, message, args) => {
let stored = db.fetch(`RobloxProfile_${message.guild.id}`)
let guildid = message.guild.id;
let username = stored.username;
let groupid = stored.groupid;
let maxrank = stored.maxrank;
message.channel.send("Roblox infomation: Account set to " + username + " with password " + password + " on group " + groupid + " with maxrank " + maxrank + ".")
}
