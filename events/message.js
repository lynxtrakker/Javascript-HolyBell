module.exports = {
  name: 'message',
  execute(message) {
    console.log(`${message.author.id} in #${message.channel.id} in ${message.guild.id} sent: ${message.content}`);
  },
};
