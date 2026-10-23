/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { toLID } from "../../../helpers/toLID.js";
import { extractMentionedUser, cleanupExpiredBlockedUsers } from "../../../helpers/ownerRestrictions.js";
import { updateOwnerConfig } from "../../../ownerConfig.js";
import { Command } from "../../../types/Command.js";

const unblockuserCommand: Command = {
  name: "unblockuser",
  aliases: ["desbloquearuser", "unbanuserbot"],
  description: "Removes the global block from a user",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, t }) {
    const mentioned = extractMentionedUser(message);
    if (!mentioned) {
      await thanay.sendMessage(from, { text: t("commands.unblockuser.noMention") }, { quoted: message as WAMessage });
      return;
    }

    const userLID = await toLID(mentioned, thanay);
    if (!userLID) {
      await thanay.sendMessage(from, { text: t("commands.unblockuser.lidFailed") }, { quoted: message as WAMessage });
      return;
    }

    const activeUsers = await cleanupExpiredBlockedUsers();
    const nextUsers = activeUsers.filter((entry) => entry.lid !== userLID);

    if (nextUsers.length === activeUsers.length) {
      await thanay.sendMessage(from, { text: t("commands.unblockuser.notBlocked") }, { quoted: message as WAMessage });
      return;
    }

    await updateOwnerConfig((current) => ({
      ...current,
      blockedUsers: current.blockedUsers.filter((entry) => entry.lid !== userLID),
    }));

    await thanay.sendMessage(
      from,
      { text: t("commands.unblockuser.success", { user: `@${mentioned.split("@")[0]}` }), mentions: [userLID] },
      { quoted: message as WAMessage },
    );
  },
};

export default unblockuserCommand;
