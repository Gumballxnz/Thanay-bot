/**
 * @author Gumball · github.com/Gumballxnz
 * @project Thanay Bot
 */
import { WASocket } from "baileys";

export interface EventContext<T = unknown> {
  thanay: WASocket;
  data: T;
}

export interface Event<T = unknown> {
  event: string;
  name: string;
  execute: (context: EventContext<T>) => Promise<void>;
}
