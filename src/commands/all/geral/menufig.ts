/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";
import { getBotConfig } from "../../../config.js";
import { sendMenu } from "../../../helpers/sendMenu.js";

const menuFigCommand: Command = {
  name: "menufig",
  aliases: ["mfig", "menusticker", "figmenu"],
  description: "Shows sticker commands",
  category: "geral",
  async execute({ thanay, message, from, prefix, t }) {
    const config = await getBotConfig();

    await sendMenu(
      thanay,
      from,
      [
        t("commands.menu.mainTitle", { botName: config.botName }),
        "│",
        `├ 〔 ${t("commands.menu.categories.fig")} 〕`,
        `│  ♡ ${prefix}${t("commands.menu.cmds.sticker")}`,
        `│  ♡ ${prefix}${t("commands.menu.cmds.sticker2")}`,
        "│",
        "‧₊˚ ────────────────˚₊‧",
      ].join("\n"),
      message as WAMessage,
    );
  },
};

export default menuFigCommand;
