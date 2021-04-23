module.exports = {
	name: 'user-info',
	description: 'Display info about yourself.',
	execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xffd700).setDescription(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
		message.channel.send(embed);
	},
};