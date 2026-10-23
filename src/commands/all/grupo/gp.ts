/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getLocalizedCommandWordVars, resolveLocalizedToken } from "../../../helpers/localizedTokens.js";
import { Command } from "../../../types/Command.js";

const gpCommand: Command = {
  name: "gp",
  aliases: ["grupo"],
  description: "Opens or closes the group. Use: gp a (open) or gp f (close)",
  category: "grupo",
  groupOnly: true,
  adminOnly: true,
  botAdminRequired: true,
  async execute({ thanay, message, from, args, t, locale }) {
    const words = getLocalizedCommandWordVars(locale);
    const opcao = resolveLocalizedToken(locale, args[0], ["open", "close"]);

    if (opcao !== "open" && opcao !== "close") {
      await thanay.sendMessage(
        from,
        {
          text: t("commands.gp.usage", words),
        },
        { quoted: message as WAMessage },
      );
      return;
    }

    const fechar = opcao === "close";

    await thanay.groupSettingUpdate(from, fechar ? "announcement" : "not_announcement");
    await thanay.sendMessage(
      from,
      { text: fechar ? t("commands.gp.closed") : t("commands.gp.opened") },
      { quoted: message as WAMessage },
    );
  },
};

export default gpCommand;
