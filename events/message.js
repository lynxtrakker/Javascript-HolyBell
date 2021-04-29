const fs = require('fs');

module.exports = {
  name: 'message',
  execute(message) {
    const fs = require('fs');
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const logFolder = fs.readdirSync('./logs');
    const logFiles = fs.readdirSync('./logs').filter(file => file.endsWith('.log'));
    if (message.channel.type === 'dm') return;
    var y = message.guild.id
    var x = Date()
    var z = new Date().toLocaleString();
    //var txt = new ActiveXObject("Scripting.FileSystemObject");
    //var s = txt.CreateTextFile(`${y}.log`, true);
    
    if (!message.channel.id === `./logs/${y}.log`) {
      CreateTextFile(`${y}.log`, true); 
    }
    
    console.log(`${message.author.id} in #${message.channel.id} in ${message.guild.id} sent: ${message.content}`);
 
    fs.appendFile(`${y}.log`, `${z}, ${message.channel.name} ${message.author.tag}(${message.author.id}): ${message.content}\n`, (err) => {
      if (err) throw err;
    });
    
  },
};