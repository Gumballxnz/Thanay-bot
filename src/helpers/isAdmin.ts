/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { GroupParticipant, WASocket } from "baileys";
import { groupCache } from "../cache/groupCache.js";
import { toLID } from "./toLID.js";

function isGroupAdmin(admin?: string | null): boolean {
  return admin === "admin" || admin === "superadmin";
}

async function findParticipant(
  participants: GroupParticipant[],
  userId: string,
  thanay: WASocket,
): Promise<GroupParticipant | null> {
  const userLID = await toLID(userId, thanay);
  if (!userLID) return null;
  return participants.find((participant) => participant.id === userLID) ?? null;
}

export async function isAdmin(groupId: string, userId: string, thanay: WASocket): Promise<boolean> {
  if (!groupId.endsWith("@g.us")) {
    return false;
  }

  const groupMetadata = await groupCache.ensure(groupId, thanay);
  if (!groupMetadata) {
    return false;
  }

  const participant = await findParticipant(groupMetadata.participants, userId, thanay);
  if (!participant) {
    return false;
  }

  return isGroupAdmin(participant.admin);
}

export async function isBotAdmin(groupId: string, thanay: WASocket): Promise<boolean> {
  if (!groupId.endsWith("@g.us")) {
    return false;
  }

  const groupMetadata = await groupCache.ensure(groupId, thanay);
  if (!groupMetadata) {
    return false;
  }

  const botId = thanay.user?.id;
  if (!botId) {
    return false;
  }

  const participant = await findParticipant(groupMetadata.participants, botId, thanay);
  if (!participant) {
    return false;
  }

  return isGroupAdmin(participant.admin);
}
