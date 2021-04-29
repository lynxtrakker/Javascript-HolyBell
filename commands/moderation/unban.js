module.exports = {
  name: 'unban',
  description: 'This is used for unbanning people',
  guildOnly: true,
  cooldown: 30,
  permission: 'KICK_MEMBERS',
  execute(message, args) {
    const id = args[0];
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xff0000).setTitl  ('Console').setDescription('That user has been unbanned')
    guild.members.unban(id);
  }
}