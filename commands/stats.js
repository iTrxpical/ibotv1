exports.run = (Discord, client, message, args) => {
message.channel.send(" Users: " + client.users.size.toLocaleString() + " Guilds: " + client.guilds.size)
}
