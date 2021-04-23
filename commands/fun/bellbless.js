//this is the bellbless command for when you have bells that you want to bless
module.exports = {
  name: 'bellbless',
  cooldown: 10,
  description: 'Use this when you wanna get a bell blessed!',
  execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xffd700).setDescription('🔔 This bell has been blessed! 🔔');
    message.channel.send(embed);

  }
}