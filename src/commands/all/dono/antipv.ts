/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { updateOwnerConfig } from "../../../ownerConfig.js";
import { Command } from "../../../types/Command.js";

const antipvCommand: Command = {
  name: "antipv",
  aliases: ["antiprivado", "privateoff"],
  i18nAliases: {
    en: ["antiprivate", "privateoff"],
    es: ["antiprivado"],
    id: ["antipribadi"],
  },
  description: "Enables or disables the bot in private chats for non-owners",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, t }) {
    let next = false;
    await updateOwnerConfig((config) => {
      next = !config.antiPrivate;
      return { ...config, antiPrivate: next };
    });
    await thanay.sendMessage(from, { text: next ? t("commands.antipv.enabled") : t("commands.antipv.disabled") }, { quoted: message as WAMessage });
  },
};

export default antipvCommand;
