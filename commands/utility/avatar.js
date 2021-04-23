//This is for when you wanna flex your avatar 
module.exports = {
	name: 'avatar',
  aliases: ['icon', 'pfp'],
	description: 'Get the avatar URL of the tagged user(s), or your own avatar.',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`${message.author.displayAvatarURL({ dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(avatarList);
	},
};
