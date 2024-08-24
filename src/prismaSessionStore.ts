import { PrismaClient } from "@prisma/client";
import { Store } from "express-session";
const prisma = new PrismaClient();

export class PrismaSessionStore extends Store {
  constructor() {
    super();
  }

  async get(sid, callback) {
    try {
      const session = await prisma.session.findUnique({ where: { sid } });
      if (session && session.expiresAt > new Date()) {
        return callback(null, JSON.parse(session.data));
      } else {
        return callback(null, null);
      }
    } catch (err) {
      return callback(err);
    }
  }

  async set(sid, sessionData, callback) {
    try {
      const expiresAt = new Date(
        sessionData.cookie.expires || Date.now() + 86400000
      ); // Default to 1 day
      const data = JSON.stringify(sessionData);

      await prisma.session.upsert({
        where: { sid },
        create: { sid, data, expiresAt },
        update: { data, expiresAt },
      });

      callback(null);
    } catch (err) {
      callback(err);
    }
  }

  async destroy(sid, callback) {
    try {
      await prisma.session.delete({ where: { sid } });
      callback(null);
    } catch (err) {
      callback(null);
      // callback(err);
    }
  }
}
