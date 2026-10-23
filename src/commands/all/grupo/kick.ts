/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";
import { toLID } from "../../../helpers/toLID.js";
import { extractTargetUserJid } from "../../../helpers/targetUser.js";

const kickCommand: Command = {
  name: "kick",
  aliases: ["ban", "remover", "expulsar"],
  description: "Removes a member from the group",
  category: "all",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, t }) {
    const targetJid = extractTargetUserJid(message);
    
    if (!targetJid) {
      await thanay.sendMessage(
        from,
        { text: t("commands.kick.noMention") },
        { quoted: message as WAMessage },
      );
      return;
    }

    const userToKick = await toLID(targetJid, thanay);
    if (!userToKick) {
      await thanay.sendMessage(
        from,
        { text: t("commands.kick.lidFailed") },
        { quoted: message as WAMessage },
      );
      return;
    }

    try {
      await thanay.groupParticipantsUpdate(from, [userToKick], "remove");
      
      await thanay.sendMessage(
        from,
        {
          text: t("commands.kick.success"),
        },
        { quoted: message as WAMessage },
      );
    } catch (error) {
      await thanay.sendMessage(
        from,
        { text: t("commands.kick.error", { error: String(error) }) },
        { quoted: message as WAMessage },
      );
    }
  },
};

export default kickCommand;
