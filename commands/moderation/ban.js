//return message.reply('you need to tag a user in order to ban them!');
module.exports = {
  name: 'ban',
  description: 'Bans a member',
  guildOnly: true,
  permission: 'KICK_MEMBERS',
  execute(message, args) {
    const { Client, Intents, MessageEmbed } = require('discord.js');
    if (!message.mentions.users.size) {
      const embed = new MessageEmbed().setColor(0xff0000).setDescription('You need to tag a user in order to ban them!');
      return message.reply(embed);
      
    }
    const user = message.mentions.users.first();
    

    if (user) {
      const member = message.guild.members.resolve(user);

      if (member) {
        member
          .ban({
            reason: 'They were bad!'
          })
          .then(() => {
            const embed = new MessageEmbed().setColor(0xffd700).setDescription(`You have successfully banned ${user.tag}`);
            message.channel.send(embed);
          })
          .catch(err => {
            const embed = new MessageEmbed().setColor(0xff0000).setDescription('I was not able to ban the member');
            message.channel.send(embed);
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.channel.send("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.channel.send("You didn't mention the user to ban!");
    }
  }

};