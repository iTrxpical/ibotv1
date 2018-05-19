const Discord = require("discord.js");
const apikey = ("948ac340-6e14-4d31-9a8c-49b01fa64178");
const Fortnite = require("fortnite");
const ft = new Fortnite(apikey.fortnite);

module.exports.run = async (client, message, args) => {
        //
        let username = args[0];
        let platform = args[1] || "pc";
        
        let data = ft.getInfo(username, platform).then(data => {
                
                let stats = data.lifetimeStatus;
                let kills = stats.find(s => s.stat == 'kills');
                let wins = stats.find(s => s.stat == 'wins');
                let kd = stats.find(s => s.stat == 'kd');
                let mPlayed = stats.find(s => s.stat == 'matchesPlayed');
                let tPlayed = stats.find(s => s.stat == 'timePlayed');
                let asTime = stats.find(s => s.stat == 'avgSurvivalTime');
                
                let embed = new Discord.RichEmbed()
                .setTitle("Fortnite Stats")
                .setAuthor(data.username)
                .addField("Kills", kills.value, true)
                
                message.channel.send(embed);
        }).catch(e => {
                console.log(e);
                message.channel.send("Couldn't find that username in the database");
        });
}
        
        
                
