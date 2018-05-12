const founders = ["255048840615428107", "281060171730649089"];
exports.run = (Discord, client, message, args) => {

if(message.author.id !== founders) return;

let guildList = client.guilds;
try {
    guildList.forEach((g) => {
        let firstChannel = g.channels.filter(c => c.type === "text").first();
        firstChannel.send(args.join(" "));
    });
} catch(err) {
    console.log("Unable to broadcast message.");
}

}
