/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { WAMessage, WASocket } from "baileys";
import { paths } from "../config/paths.js";

const MENU_IMAGE_PATH = path.join(paths.assets, "menu.jpeg");

export async function sendMenu(thanay: WASocket, from: string, caption: string, quoted: WAMessage): Promise<void> {
  const image = await fs.readFile(MENU_IMAGE_PATH);

  await thanay.sendMessage(
    from,
    {
      image,
      caption,
    },
    { quoted },
  );
}
