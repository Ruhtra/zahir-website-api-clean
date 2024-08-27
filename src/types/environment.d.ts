declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      GOOGLE_REDIRECT_URL: string;
      JWT_SECRET: string;
      SECRET: string;
      DOMAIN: string;
      DATABASE_URL: string;
      DIRECT_URL: string;
      URL_FRONTEND: string;
    }
  }
}
export {};
