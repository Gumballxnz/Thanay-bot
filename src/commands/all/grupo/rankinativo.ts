/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getInactiveRank } from "../../../helpers/groupActivity.js";
import { toLID } from "../../../helpers/toLID.js";
import { Command } from "../../../types/Command.js";

const rankInativoCommand: Command = {
  name: "rankinativo",
  aliases: ["inativos", "rankinativos"],
  description: "Shows the ranking of the least active group members",
  category: "grupo",
  groupOnly: true,
  async execute({ thanay, message, from, groupCache, t }) {
    const groupMeta = await groupCache.ensure(from, thanay);

    if (!groupMeta) {
      await thanay.sendMessage(from, { text: t("commands.rankinativo.groupInfoFailed") }, { quoted: message as WAMessage });
      return;
    }

    const botLID = thanay.user?.id ? await toLID(thanay.user.id, thanay) : null;
    const participants = groupMeta.participants.map((participant) => participant.id).filter((id) => id !== botLID);
    const ranked = (await getInactiveRank(from, participants)).slice(0, 10);

    if (ranked.length === 0) {
      await thanay.sendMessage(from, { text: t("commands.rankinativo.empty") }, { quoted: message as WAMessage });
      return;
    }

    const items = ranked.map((entry, index) => t("commands.rankinativo.item", {
      pos: String(index + 1),
      user: `@${entry.userId.split("@")[0]}`,
      total: String(entry.total),
      messages: String(entry.messages),
      commands: String(entry.commands),
      stickers: String(entry.stickers),
    }));

    await thanay.sendMessage(
      from,
      {
        text: t("commands.rankinativo.text", { items: items.join("\n") }),
        mentions: ranked.map((entry) => entry.userId),
      },
      { quoted: message as WAMessage },
    );
  },
};

export default rankInativoCommand;
