/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getBotConfig, updateBotConfig } from "../../../config.js";
import { Command } from "../../../types/Command.js";

const nomebotCommand: Command = {
  name: "nomebot",
  aliases: ["botname", "setbotname"],
  description: "Updates the bot name",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, args, rawArgs, t }) {
    const config = await getBotConfig();

    if (args.length === 0) {
      await thanay.sendMessage(
        from,
        { text: t("commands.nomebot.current", { value: config.botName }) },
        { quoted: message as WAMessage },
      );
      return;
    }

    const botName = rawArgs.trim();
    if (!botName) {
      await thanay.sendMessage(from, { text: t("commands.nomebot.invalid") }, { quoted: message as WAMessage });
      return;
    }

    await updateBotConfig((current) => ({ ...current, botName }));

    await thanay.sendMessage(
      from,
      { text: t("commands.nomebot.updated", { value: botName }) },
      { quoted: message as WAMessage },
    );
  },
};

export default nomebotCommand;
