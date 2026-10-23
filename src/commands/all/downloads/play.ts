/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WAMessage } from "baileys";
import { Command } from "../../../types/Command.js";
import {
  downloadYouTube,
  formatYtDuration,
  formatYtViews,
  resolveYouTubeTarget,
  sanitizeYtFileName,
} from "../../../helpers/youtubeDownload.js";
import { ErrorCode, isErrorCode, localizeError } from "../../../helpers/localizeError.js";
import { runMediaJob } from "../../../media/runMediaJob.js";
import { downloadToTemp } from "../../../media/downloadToTemp.js";

const playCommand: Command = {
  name: "play",
  aliases: ["p"],
  description: "Searches for a song on YouTube and sends the audio",
  category: "all",
  async execute({ thanay, message, from, sender, args, rawArgs, t, locale }) {
    if (args.length === 0) {
      await thanay.sendMessage(
        from,
        { text: t("commands.play.usage") },
        { quoted: message as WAMessage },
      );
      return;
    }

    const query = rawArgs.trim();
    await runMediaJob({ thanay, from, sender, kind: "youtube-audio", t }, async (signal) => {
      await thanay.sendMessage(from, { text: t("commands.play.searching") }, { quoted: message as WAMessage });
      let media: Awaited<ReturnType<typeof downloadYouTube>>["media"];
      try {
        const { videoURL, search } = await resolveYouTubeTarget(query, signal);

        if (search?.thumbnail) {
          let thumbnail: Awaited<ReturnType<typeof downloadToTemp>> | undefined;
          try {
            thumbnail = await downloadToTemp({ url: search.thumbnail, kind: "image", signal });
            await thanay.sendMessage(from, {
              image: { url: thumbnail.path },
              caption: [
               `🎵 *${search.title}*`,
              "",
              `👤 ${t("commands.play.channel")}: ${search.author}`,
              `⏱️ ${t("commands.play.duration")}: ${search.durationStr || formatYtDuration(search.duration)}`,
              `👀 ${t("commands.play.views")}: ${search.viewsStr || formatYtViews(search.views, locale)}`,
              "",
              t("commands.play.downloading"),
              ].join("\n"),
            }, { quoted: message as WAMessage });
          } catch {
            await thanay.sendMessage(from, { text: t("commands.play.downloading") }, { quoted: message as WAMessage });
          } finally {
            await thumbnail?.cleanup();
          }
        } else {
          await thanay.sendMessage(from, { text: t("commands.play.downloading") }, { quoted: message as WAMessage });
        }

        const audio = await downloadYouTube(videoURL, "mp3", { signal });
        if (!audio.success || !audio.media) throw new Error(audio.error || t("commands.play.unknown"));
        media = audio.media;

        const title = audio.title || search?.title || t("common.file");

        await thanay.sendMessage(from, {
          audio: { url: media.path },
          mimetype: "audio/mpeg",
          fileName: `${sanitizeYtFileName(title, "audio")}.mp3`,
        }, { quoted: message as WAMessage });
      } catch (error) {
        const msg = isErrorCode(error, ErrorCode.INVALID_URL)
          ? t("commands.ytmp3.invalidUrl")
          : t("commands.play.error", { message: localizeError(error, t, "commands.play.unknown") });
        await thanay.sendMessage(from, { text: msg }, { quoted: message as WAMessage });
      } finally {
        await media?.cleanup();
      }
    });
  },
};

export default playCommand;
