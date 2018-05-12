
exports.run = (Discord, client, message, args) => {
let reason = args.slice(0).join(" ");
let firstChannel = reason.channels.filter(c => c.type === "text").first();
client.channels.get(reason).createInvite().then(invite =>
    message.channel.send(invite.url));
}
