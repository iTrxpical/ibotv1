
exports.run = (Discord, client, message, args) => {
var list = client.channels.array().sort();
message.channel.send("```" + list + "```")
}
