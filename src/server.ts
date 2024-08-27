import dotenv from "dotenv";
const envFile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });

import http from "http";
import https from "https";

import { app } from "./app";
import path from "path";
import fs from "fs";
import { options } from "axios";

async function initModules() {
  console.log(" ~. Starting modules...");

  if (process.env.NODE_ENV != "production") {
    const options = {
      key: fs.readFileSync(path.join(__dirname, "..", "keys", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "..", "keys", "cert.pem")),
    };

    https.createServer(options, app).listen(process.env.PORT, () => {
      console.log(
        " >. Server running in: https://localhost:" + process.env.PORT
      );
    });
  } else {
    http.createServer(app).listen(process.env.PORT, () => {
      console.log(
        " >. Server running in: http://localhost:" + process.env.PORT
      );
    });
  }
}

initModules();
