/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { resolveLocalizedToken } from "../../../helpers/localizedTokens.js";
import { setMessageDebugEnabled, toggleMessageDebug } from "../../../helpers/messageDebug.js";
import { Command } from "../../../types/Command.js";

const debugCommand: Command = {
  name: "debug",
  aliases: ["debugmsg", "debugmessages"],
  description: "Turns full message event logs on or off",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, args, t, locale }) {
    const option = resolveLocalizedToken(locale, args[0], ["on", "off"]);
    const enabled = option === "on"
      ? setMessageDebugEnabled(true)
      : option === "off"
        ? setMessageDebugEnabled(false)
        : toggleMessageDebug();

    await thanay.sendMessage(
      from,
      { text: enabled ? t("commands.debug.enabled") : t("commands.debug.disabled") },
      { quoted: message as WAMessage },
    );
  },
};

export default debugCommand;
