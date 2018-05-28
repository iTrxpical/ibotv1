const db = require('quick.db')
exports.run = (Discord, client, message, args) => {
let stored = db.fetch(`RobloxProfile_${message.guild.id}`)
message.channel.send(stored.username)
}
