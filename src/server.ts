import http from "http";
import https from "https";

import { app } from "./app";
import path from "path";
import fs from "fs";
import { env } from "./env";

async function initModules() {
  console.log(" ~. Starting modules...");

  if (env.MODE == "DEVELOPMENT") {
    const options = {
      key: fs.readFileSync(path.join(__dirname, "..", "keys", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "..", "keys", "cert.pem")),
    };

    https.createServer(options, app).listen(env.PORT, () => {
      console.log(" >. Server running in: https://localhost:" + env.PORT);
    });
  } else {
    http.createServer(app).listen(env.PORT, () => {
      console.log(" >. Server running in: http://localhost:" + env.PORT);
    });
  }
}

initModules();
