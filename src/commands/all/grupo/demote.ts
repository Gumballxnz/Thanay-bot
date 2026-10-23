/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";
import { toLID } from "../../../helpers/toLID.js";
import { extractTargetUserJid } from "../../../helpers/targetUser.js";

const demoteCommand: Command = {
  name: "demote",
  aliases: ["rebaixar", "demover", "degradar"],
  description: "Remove administrator role from a member",
  category: "all",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, t }) {
    const targetJid = extractTargetUserJid(message);
    
    if (!targetJid) {
      await thanay.sendMessage(
        from,
        { text: t("commands.demote.noMention") },
        { quoted: message as WAMessage },
      );
      return;
    }

    const userToDemote = await toLID(targetJid, thanay);
    if (!userToDemote) {
      await thanay.sendMessage(
        from,
        { text: t("commands.demote.lidFailed") },
        { quoted: message as WAMessage },
      );
      return;
    }

    try {
      await thanay.groupParticipantsUpdate(from, [userToDemote], "demote");
      
      await thanay.sendMessage(
        from,
        {
          text: t("commands.demote.success"),
        },
        { quoted: message as WAMessage },
      );
    } catch (error) {
      await thanay.sendMessage(
        from,
        { text: t("commands.demote.error", { error: String(error) }) },
        { quoted: message as WAMessage },
      );
    }
  },
};

export default demoteCommand;
