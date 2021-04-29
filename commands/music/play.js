const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');
const { Client, Intents, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'play',
  description: 'plays music for you',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return message.channel.send('You need to be in a VC to use this!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return message.channel.send('You don\'t have the right permissions');
    if (!permissions.has('SPEAK')) return message.channel.send('You don\'t have the right permissions');
    if (!args.length) return message.channel.send('You need to send the second argument!');

    const connection = await voiceChannel.join();
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if(video) {
      const stream = ytdl(video.url, {filter: 'audioonly'});
      connection.play(stream, {seek: 0, volume: 1})
      .on('finish', () =>{
        voiceChannel.leave();
      });

      await message.reply(`:thumbsup: Now Playing ***${video.title}***`)
    } else {
      message.channel.send('No video results found');
    }

  }
}