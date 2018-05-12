exports.run = (Discord, client, message, args) => {
var list = client.guilds.array().sort();
console.log(" Users: " + client.users.size.toLocaleString() + " Guilds: " + client.guilds.size + "\n " + list)
}
