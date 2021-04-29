//    __      __    ___________   ____       ____      ____
//   |  |    |  |  |   _____   |  |  |       \   \    /   /
//   |  |    |  |  |  |     |  |  |  |        \   \  /   /
//   |  |____|  |  |  |     |  |  |  |         \   \/   /
//   |          |  |  |     |  |  |  |          \      /
//   |   ____   |  |  |     |  |  |  |           |    |
//   |  |    |  |  |  |     |  |  |  |           |    |
//   |  |    |  |  |  |_____|  |  |  |_______    |    |
//   |__|    |__|  |___________|  |__________|   |____| 
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const ytdl = require('ytdl-core');
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Discord.Client();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}
client.on('message', message => {
  id = message.id
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('I can\'t execute that command inside DMs!');
  }

  if (command.permissions) {
    const authorPerms = message.channel.permissionsFor(message.author);
    if (!authorPerms || !authorPerms.has(command.permissions)) {
      return message.reply('You can not do this!');
    }
  }

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  const { cooldowns } = client;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const embed = new MessageEmbed().setColor(0xffd700).setDescription(`🔔 ${message.author}, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command. 🔔`);
      message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }));
      message.fetch(id).then(msg => msg.delete());
      return;
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, command, client, Discord);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(token);
