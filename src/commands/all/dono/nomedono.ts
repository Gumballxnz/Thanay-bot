/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getBotConfig, updateBotConfig } from "../../../config.js";
import { Command } from "../../../types/Command.js";

const nomedonoCommand: Command = {
  name: "nomedono",
  aliases: ["ownername", "setownername"],
  description: "Updates the owner name in the bot config",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, args, rawArgs, t }) {
    const config = await getBotConfig();

    if (args.length === 0) {
      await thanay.sendMessage(
        from,
        { text: t("commands.nomedono.current", { value: config.ownerName }) },
        { quoted: message as WAMessage },
      );
      return;
    }

    const ownerName = rawArgs.trim();
    if (!ownerName) {
      await thanay.sendMessage(from, { text: t("commands.nomedono.invalid") }, { quoted: message as WAMessage });
      return;
    }

    await updateBotConfig((current) => ({ ...current, ownerName }));

    await thanay.sendMessage(
      from,
      { text: t("commands.nomedono.updated", { value: ownerName }) },
      { quoted: message as WAMessage },
    );
  },
};

export default nomedonoCommand;
