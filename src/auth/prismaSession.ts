import { SessionData, Store } from "express-session";
import { prismaClient } from "../prismaClient";

export class PrismaSessionStore extends Store {
  constructor() {
    super();
  }

  async get(
    sid: string,
    callback: (err: any, session?: SessionData | null) => void
  ) {
    try {
      const session = await prismaClient.session.findUnique({ where: { sid } });
      if (session && session.expiresAt > new Date()) {
        return callback(null, JSON.parse(session.data));
      } else {
        return callback(null, null);
      }
    } catch (err) {
      return callback(err);
    }
  }

  async set(sid: string, session: SessionData, callback?: (err?: any) => void) {
    try {
      const expiresAt = new Date(
        session.cookie.expires || Date.now() + 86400000
      ); // Default to 1 day
      const data = JSON.stringify(session);

      await prismaClient.session.upsert({
        where: { sid },
        create: { sid, data, expiresAt },
        update: { data, expiresAt },
      });

      callback(null);
    } catch (err) {
      callback(err); // Propaga qualquer outro erro
    }
  }

  async destroy(sid: string, callback?: (err?: any) => void) {
    try {
      const result = await prismaClient.session.deleteMany({ where: { sid } });

      if (result.count === 0) {
        console.warn(`Session with sid ${sid} does not exist.`);
      }

      callback(null);
    } catch (err) {
      callback(err);
    }
  }
}
