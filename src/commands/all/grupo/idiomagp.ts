/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getLocalizedCommandWordVars, matchesLocalizedToken } from "../../../helpers/localizedTokens.js";
import { Command } from "../../../types/Command.js";
import { getBotConfig } from "../../../config.js";
import { getGroup, saveGroup } from "../../../database/groupDB.js";
import {
  createTranslator,
  getGroupLanguageAliases,
  getLocaleCommandOptions,
  getLocaleDisplayList,
  getLocaleLabel,
  isValidLocale,
} from "../../../i18n/index.js";

const idiomagpCommand: Command = {
  name: "idiomagp",
  aliases: ["idiomagrupo"],
  i18nAliases: getGroupLanguageAliases(),
  description: "Changes the group language",
  category: "grupo",
  groupOnly: true,
  adminOnly: true,
  async execute({ thanay, message, from, args, t, locale }) {
    const words = getLocalizedCommandWordVars(locale);
    const groupConfig = await getGroup(from);
    const globalConfig = await getBotConfig();

    if (args.length === 0) {
      await thanay.sendMessage(
        from,
        { text: t("commands.idiomagp.current", {
            ...words,
            language: getLocaleLabel(groupConfig.language || globalConfig.language),
            global: getLocaleLabel(globalConfig.language),
            options: getLocaleCommandOptions(),
          })
        },
        { quoted: message as WAMessage },
      );
      return;
    }

    const newLang = args[0].toLowerCase();
    
    if (matchesLocalizedToken(locale, newLang, "reset")) {
      await saveGroup(from, { language: undefined });
      await thanay.sendMessage(
        from,
        { text: t("commands.idiomagp.reset", { ...words, language: getLocaleLabel(globalConfig.language) }) },
        { quoted: message as WAMessage },
      );
      return;
    }

    if (!isValidLocale(newLang)) {
      await thanay.sendMessage(
        from,
        { text: t("commands.idiomagp.invalid", { ...words, optionsList: getLocaleDisplayList(), options: getLocaleCommandOptions() }) },
        { quoted: message as WAMessage },
      );
      return;
    }

    await saveGroup(from, { language: newLang });

    await thanay.sendMessage(
      from,
      { text: createTranslator(newLang)("commands.idiomagp.updated", { language: getLocaleLabel(newLang) }) },
      { quoted: message as WAMessage },
    );
  },
};

export default idiomagpCommand;
