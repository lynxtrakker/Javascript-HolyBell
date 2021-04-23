//This command is for when you want to pray to the Holy Bell!!
//PRAY NOW!!
module.exports = {
	name: 'pray',
   cooldown: 10,
	description: 'Allows you to pray to the Holy Bell!',
  guildOnly: true,
	execute(message) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    const embed = new MessageEmbed().setColor(0xffd700).setDescription('🔔 The Holy Bell has blessed you! 🔔');
    message.reply(embed);

  },
};
