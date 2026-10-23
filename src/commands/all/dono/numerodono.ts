/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { getBotConfig, updateBotConfig } from "../../../config.js";
import { toLID } from "../../../helpers/toLID.js";
import { Command } from "../../../types/Command.js";

const numerodonoCommand: Command = {
  name: "numerodono",
  aliases: ["ownernumber", "setownernumber"],
  description: "Updates the owner number in the bot config",
  category: "geral",
  ownerOnly: true,
  async execute({ thanay, message, from, args, rawArgs, t }) {
    const config = await getBotConfig();

    if (args.length === 0) {
      await thanay.sendMessage(
        from,
        { text: t("commands.numerodono.current", { value: config.ownerNumber || t("common.none") }) },
        { quoted: message as WAMessage },
      );
      return;
    }

    const ownerNumber = rawArgs.replace(/\D/g, "");
    if (ownerNumber.length < 7) {
      await thanay.sendMessage(from, { text: t("commands.numerodono.invalid") }, { quoted: message as WAMessage });
      return;
    }

    const ownerLID = await toLID(ownerNumber, thanay);
    await updateBotConfig((current) => ({
      ...current,
      ownerNumber,
      ...(ownerLID ? { ownerLID } : {}),
    }));

    await thanay.sendMessage(
      from,
      {
        text: ownerLID
          ? t("commands.numerodono.updated", { value: ownerNumber, lid: ownerLID })
          : t("commands.numerodono.updatedNoLid", { value: ownerNumber }),
      },
      { quoted: message as WAMessage },
    );
  },
};

export default numerodonoCommand;
