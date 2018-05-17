const Discord = require('discord.js'),
      math = require('math-expression-evaluator');

exports.run = (client, message, args, tools) => {
    
    // Form Embed
    const embed = new Discord.MessageEmbed()
        .setColor(0xffffff);
    
    // Verify Input
    if (!args[0]) {
        
        // Configure Embed
        embed.setFooter('Please input an expression.');
        
        // Return & Send Embed
        return message.channel.send(embed);
        
    }
    
    // Evaluate Expression
    let result;
    try {
        
        result = math.eval(args.join(' '));
        
    } catch (e) { // This will catch any errors in the expression
        
        result = 'Error: "Invalid Input"';
        
    }
        

         
    // Send Embed
    message.channel.send('Input:`\`\`\`js\n${args.join(' ')}\`\`\`\n  Output, `\`\`\`js\n${result}\`\`\`');
    
}
