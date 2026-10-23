/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";

const nomeGpCommand: Command = {
  name: "nomegp",
  aliases: ["nomegrup", "renamegp", "groupname", "nombregrupo"],
  description: "Changes the group name",
  category: "grupo",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, args, rawArgs, t }) {
    if (args.length === 0) {
      await thanay.sendMessage(
        from,
        { text: t("commands.nomegp.noArgs") },
        { quoted: message as WAMessage },
      );
      return;
    }

    const novoNome = rawArgs;
    await thanay.groupUpdateSubject(from, novoNome);
    await thanay.sendMessage(
      from,
      { text: t("commands.nomegp.success", { name: novoNome }) },
      { quoted: message as WAMessage },
    );
  },
};

export default nomeGpCommand;
