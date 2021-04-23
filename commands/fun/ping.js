module.exports = {
	name: 'ping',
  cooldown: 5,
	description: 'Ping!',
	execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xffd700).setDescription('🔔 Pong! 🔔');
		message.channel.send(embed);
	},
};