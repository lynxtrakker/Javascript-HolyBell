const Discord = require('discord.js');
const config = require('./config.json');
//This is how you get exact things from config file
//const { prefix, token } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  var args = message.content.slice(config.prefix.length).trim().split(' ');
  var command = args.shift().toLowerCase();
  console.log(command);

  if (command == 'args-info') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    message.channel.send(`Command name: ${command}\nArguments: ${args}`);
  } 
  
  if (command == 'ping') {

    message.channel.send('pong!');

  }

  if (command == 'avatar') {
    message.channel.send(message.author.displayAvatarURL());
  }
});

client.login(config.token);