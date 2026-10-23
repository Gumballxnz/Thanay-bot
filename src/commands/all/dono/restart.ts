/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { requestShutdown } from "../../../lifecycle.js";
import { Command } from "../../../types/Command.js";

const restartCommand: Command = {
  name: "restart",
  aliases: ["reiniciar", "rebootbot"],
  i18nAliases: {
    en: ["restart", "rebootbot"],
    es: ["reiniciar", "reiniciabot"],
    id: ["mulaiulang", "restartbot"],
  },
  description: "Restarts the bot process",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, t }) {
    await thanay.sendMessage(from, { text: t("commands.restart.restarting") }, { quoted: message as WAMessage });
    setTimeout(() => requestShutdown("restart"), 300);
  },
};

export default restartCommand;
