/**
 * @author Hiudy · github.com/hiudyy
 * @project Thanay Bot
 */
import { WASocket } from "baileys";

export interface EventContext<T = unknown> {
  thanay: WASocket;
  misa: WASocket;
  data: T;
}

export interface Event<T = unknown> {
  event: string;
  name: string;
  execute: (context: EventContext<T>) => Promise<void>;
}
