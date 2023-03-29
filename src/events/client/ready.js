module.exports = {
  name: 'ready',
  once: true,
  async once(client) {
    console.log(`${client.user.tag} online ngabs.`);
  }
};
