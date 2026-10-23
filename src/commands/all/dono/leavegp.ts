/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";

const leavegpCommand: Command = {
  name: "leavegp",
  aliases: ["sairgp", "leavegroup"],
  i18nAliases: {
    en: ["leavegroup", "leavegp"],
    es: ["salirgrupo", "dejargrupo"],
    id: ["keluargrup", "tinggalkangrup"],
  },
  description: "Makes the bot leave the current group",
  category: "geral",
  ownerOnly: true,
  groupOnly: true,
  async execute({ thanay, message, from, t }) {
    await thanay.sendMessage(from, { text: t("commands.leavegp.confirm") }, { quoted: message as WAMessage });
    await thanay.groupLeave(from);
  },
};

export default leavegpCommand;