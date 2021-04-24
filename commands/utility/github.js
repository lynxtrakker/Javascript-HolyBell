
module.exports = {
  name: 'github',
  description: 'This is the link to my github',
  execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xffd700).setDescription('🔔 https://github.com/lynxtrakker/Javascript-bot 🔔');
    message.channel.send(embed);

  }
}