const { Client } = require("discord.js");
const i18n = require("../i18n");
const { loadSlashCommands } = require("../loadSlashCommands");
const { log } = require("../logger");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  async execute(client) {
    log(
      i18n.get("client.ready", i18n.defaultLocale, { user: client.user.tag })
    );

    setTimeout(async () => {
      let count = 0;
      for (const guild of client.guilds.cache.values()) {
        await loadSlashCommands(client, guild);
        count++;
      }
      log(i18n.get("client.slashCommands", i18n.defaultLocale, { count }));
    }, 10000);
  },
};
