/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getBotConfig, updateBotConfig } from "../../../config.js";
import { getLocalizedCommandWordVars, resolveLocalizedToken } from "../../../helpers/localizedTokens.js";
import { Command } from "../../../types/Command.js";

const autoupdateCommand: Command = {
  name: "autoupdate",
  aliases: ["setautoupdate", "atualizacaoauto"],
  description: "Enables or disables bot auto update",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, args, t, locale }) {
    const config = await getBotConfig();
    const words = getLocalizedCommandWordVars(locale);

    if (args.length === 0) {
      await thanay.sendMessage(
        from,
        { text: t("commands.autoupdate.current", { ...words, value: config.autoUpdate ? t("common.enabled") : t("common.disabled") }) },
        { quoted: message as WAMessage },
      );
      return;
    }

    const value = resolveLocalizedToken(locale, args[0], ["on", "off"]);
    if (value !== "on" && value !== "off") {
      await thanay.sendMessage(from, { text: t("commands.autoupdate.invalid", words) }, { quoted: message as WAMessage });
      return;
    }

    const autoUpdate = value === "on";
    await updateBotConfig((current) => ({ ...current, autoUpdate }));

    await thanay.sendMessage(
      from,
      { text: t("commands.autoupdate.updated", { value: autoUpdate ? t("common.enabled") : t("common.disabled") }) },
      { quoted: message as WAMessage },
    );
  },
};

export default autoupdateCommand;
