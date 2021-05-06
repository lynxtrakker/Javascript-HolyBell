const fs = require('fs');

module.exports = {
  name: 'logging',
  execute(message) {
    const fs = require('fs');
    var logFolder = fs.readdirSync('./logs');
    var logFiles = fs.readdirSync('./logs').filter(file => file.endsWith('.log'));
    if (message.channel.type === 'dm') return;
    var y = message.guild.id
    var x = Date()
    var z = new Date().toLocaleString();
    //var txt = new ActiveXObject("Scripting.FileSystemObject");
    //var s = txt.CreateTextFile(`${y}.log`, true);
    
    if (!message.channel.id === `./logs/${y}.log`) {
      CreateTextFile(`${y}.log`, true); 
    }

    fs.appendFile(`${y}.log`, `${z}, ${message.channel.name} ${message.author.tag}(${message.author.id}): ${message.content}\n`, (err) => {
      if (err) throw err;
    });
  },
};
