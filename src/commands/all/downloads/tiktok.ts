/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";
import {
  downloadTiktok,
  isValidTiktokURL,
  searchTiktok,
  type TiktokDownloadResult,
} from "../../../helpers/tiktokDownload.js";
import { ErrorCode, isErrorCode, localizeError } from "../../../helpers/localizeError.js";
import { downloadToTemp } from "../../../media/downloadToTemp.js";
import { runMediaJob } from "../../../media/runMediaJob.js";

async function sendTiktokResult(
  thanay: import("baileys").WASocket,
  from: string,
  message: WAMessage,
  data: TiktokDownloadResult,
  caption: string,
  signal: AbortSignal,
): Promise<void> {
  if (data.type === "image") {
    for (let i = 0; i < data.urls.length; i++) {
      const media = await downloadToTemp({ url: data.urls[i], kind: "image", signal });
      try {
        await thanay.sendMessage(from, {
          image: { url: media.path },
          caption: i === 0 ? caption : undefined,
        }, { quoted: message });
      } finally {
        await media.cleanup();
      }
    }
  } else if (data.urls[0]) {
    const media = await downloadToTemp({ url: data.urls[0], kind: "video", signal });
    try {
      await thanay.sendMessage(from, {
        video: { url: media.path },
        caption,
      }, { quoted: message });
    } finally {
      await media.cleanup();
    }
  }

  if (data.audio) {
    const media = await downloadToTemp({ url: data.audio, kind: "audio", signal });
    try {
      await thanay.sendMessage(from, {
        audio: { url: media.path },
        mimetype: "audio/mpeg",
      }, { quoted: message });
    } finally {
      await media.cleanup();
    }
  }
}

const tiktokCommand: Command = {
  name: "tiktok",
  aliases: ["ttk", "tt"],
  description: "Downloads TikTok videos or searches by term",
  category: "all",
  async execute({ thanay, message, from, sender, args, rawArgs, t }) {
    if (args.length === 0) {
      await thanay.sendMessage(from, {
        text: t("commands.tiktok.usage"),
      });
      return;
    }

    const input = rawArgs;
    await runMediaJob({ thanay, from, sender, kind: "tiktok", t }, async (signal) => {
      if (isValidTiktokURL(input)) {
        await thanay.sendMessage(from, { text: t("commands.tiktok.downloading") }, { quoted: message as WAMessage });
        try {
          const data = await downloadTiktok(input, { signal });
          const caption = `🎵 *${data.title}*\n\n${t("commands.tiktok.downloadDone")}`;
          await sendTiktokResult(thanay, from, message as WAMessage, data, caption, signal);
        } catch (error) {
          await thanay.sendMessage(from, {
            text: t("commands.tiktok.error", { message: localizeError(error, t, "commands.tiktok.unknown") }),
          }, { quoted: message as WAMessage });
        }
        return;
      }

      await thanay.sendMessage(from, { text: t("commands.tiktok.searching") }, { quoted: message as WAMessage });
      try {
        const data = await searchTiktok(input, { signal });
        await thanay.sendMessage(from, { text: t("commands.tiktok.found", { title: data.title }) }, { quoted: message as WAMessage });
        const caption = `🎵 *${data.title}*\n\n${t("commands.tiktok.searchCaption", { query: input })}`;
        await sendTiktokResult(thanay, from, message as WAMessage, data, caption, signal);
      } catch (error) {
        const messageText = isErrorCode(error, ErrorCode.DOWNLOAD_NOT_FOUND)
          ? t("commands.tiktok.notFound")
          : t("commands.tiktok.error", { message: localizeError(error, t, "commands.tiktok.unknown") });
        await thanay.sendMessage(from, { text: messageText }, { quoted: message as WAMessage });
      }
    });
  },
};

export default tiktokCommand;
