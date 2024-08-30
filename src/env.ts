//TODO trocar todos os procces.env para esse env.ts

import z from "zod";

const envScheme = z.object({
  PORT: z.number().optional(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URL: z.string().url(),
  JWT_SECRET: z.string(),
  SECRET: z.string(),
  DOMAIN: z.string(),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  URL_FRONTEND: z.string().url(),
});

export const env = envScheme.parse(process.env);
