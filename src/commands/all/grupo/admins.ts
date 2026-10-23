/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";

const adminsCommand: Command = {
  name: "admins",
  aliases: ["adms", "chamaradm", "administradores"],
  description: "Mentions all group admins",
  category: "grupo",
  groupOnly: true,
  async execute({ thanay, message, from, args, rawArgs, groupCache, t }) {
    const groupMeta = await groupCache.ensure(from, thanay);

    if (!groupMeta) {
      await thanay.sendMessage(from, { text: t("commands.admins.fetchError") }, { quoted: message as WAMessage });
      return;
    }

    const admins = groupMeta.participants.filter((p) => p.admin === "admin" || p.admin === "superadmin");

    if (admins.length === 0) {
      await thanay.sendMessage(from, { text: t("commands.admins.noneFound") }, { quoted: message as WAMessage });
      return;
    }

    const mencoes = admins.map((a) => `@${a.id.split("@")[0]}`).join(" ");
    const texto = args.length > 0 ? rawArgs : t("commands.admins.called");

    await thanay.sendMessage(
      from,
      {
        text: `${mencoes}\n\n${texto}`,
        mentions: admins.map((a) => a.id),
      },
      { quoted: message as WAMessage },
    );
  },
};

export default adminsCommand;
