/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getGroup, saveGroup } from "../../../database/groupDB.js";
import { Command } from "../../../types/Command.js";

const antilocCommand: Command = {
  name: "antiloc",
  aliases: ["antilocalizacao", "antilocation"],
  i18nAliases: {
    en: ["antilocation"],
    es: ["antiubicacion"],
    id: ["antilokasi"],
  },
  description: "Enables or disables location blocking",
  category: "grupo",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, t }) {
    const config = await getGroup(from);
    const next = !config.antimidia.loc;
    await saveGroup(from, { antimidia: { ...config.antimidia, loc: next } });
    await thanay.sendMessage(from, { text: next ? t("commands.antiloc.enabled") : t("commands.antiloc.disabled") }, { quoted: message as WAMessage });
  },
};

export default antilocCommand;