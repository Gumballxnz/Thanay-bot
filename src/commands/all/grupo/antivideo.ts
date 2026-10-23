/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getGroup, saveGroup } from "../../../database/groupDB.js";
import { Command } from "../../../types/Command.js";

const antivideoCommand: Command = {
  name: "antivideo",
  aliases: ["antivid", "antivd"],
  i18nAliases: {
    en: ["antivideo"],
    es: ["antivideo"],
    id: ["antivideo"],
  },
  description: "Enables or disables video blocking",
  category: "grupo",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, t }) {
    const config = await getGroup(from);
    const next = !config.antimidia.video;
    await saveGroup(from, { antimidia: { ...config.antimidia, video: next } });
    await thanay.sendMessage(from, { text: next ? t("commands.antivideo.enabled") : t("commands.antivideo.disabled") }, { quoted: message as WAMessage });
  },
};

export default antivideoCommand;