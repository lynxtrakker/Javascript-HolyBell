module.export = {
  name: 'shutdown',
  description: 'Don\'t even dare use this! This is for Lynx to use!',
  permission: 'MANAGE_SERVER',
  execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor('blurple').setDescription('Shutting Down...');
    message.channel.send(embed);
  }
  
}