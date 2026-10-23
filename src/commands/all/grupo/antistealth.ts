/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getGroup, saveGroup } from "../../../database/groupDB.js";
import { Command } from "../../../types/Command.js";

const antistealthCommand: Command = {
  name: "antistealth",
  aliases: ["antifurtivo", "antisombra"],
  description: "Removes users who spam undecryptable messages in bursts",
  category: "grupo",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, t }) {
    const config = await getGroup(from);
    const next = !config.antistealth;
    await saveGroup(from, { antistealth: next });
    await thanay.sendMessage(from, { text: next ? t("commands.antistealth.enabled") : t("commands.antistealth.disabled") }, { quoted: message as WAMessage });
  },
};

export default antistealthCommand;
