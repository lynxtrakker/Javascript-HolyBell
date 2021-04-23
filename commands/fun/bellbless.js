module.exports = {
  name: 'bellbless',
  description: 'Use this when you wanna get a bell blessed!',
  execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xffd700).setDescription('🔔 This bell has been blessed! 🔔');
    message.channel.send(embed);

  }
}