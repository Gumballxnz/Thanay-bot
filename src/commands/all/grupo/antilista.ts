/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getGroup, saveGroup } from "../../../database/groupDB.js";
import { Command } from "../../../types/Command.js";

const antilistaCommand: Command = {
  name: "antilista",
  aliases: ["antilist", "antilistas"],
  i18nAliases: {
    en: ["antilist"],
    es: ["antilista"],
    id: ["antilista"],
  },
  description: "Enables or disables list/interactive message blocking",
  category: "grupo",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, t }) {
    const config = await getGroup(from);
    const next = !config.antimidia.lista;
    await saveGroup(from, { antimidia: { ...config.antimidia, lista: next } });
    await thanay.sendMessage(from, { text: next ? t("commands.antilista.enabled") : t("commands.antilista.disabled") }, { quoted: message as WAMessage });
  },
};

export default antilistaCommand;