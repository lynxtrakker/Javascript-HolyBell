module.exports = {
	name: 'ping',
  cooldown: 5,
	description: 'Ping!',
	execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xffd700).setDescription(`🔔 Pinging... 🔔`)
    
    message.channel.send(embed).then(sent => {
      var ping = sent.createdTimestamp - message.createdTimestamp
      const embed2 = new MessageEmbed().setColor(0xffd700).setDescription(`🔔 Ping: ${ping}ms 🔔`)
	    sent.edit(embed2);
    });
  }
};