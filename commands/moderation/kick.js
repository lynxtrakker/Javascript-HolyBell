//This is the kick command for whenever I feel like using it XD
module.exports = {
  name: 'kick',
  description: 'Kicks a member',
  guildOnly: true,
  permissions: 'KICK_MEMBERS',
  execute(message, args) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }

    const user = message.mentions.users.first();

    if (user) {
      const member = message.guild.members.resolve(user);

      if (member) {
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            message.channel.send(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            message.channel.send('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.channel.send("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.channel.send("You didn't mention the user to kick!");
    }
  }

};