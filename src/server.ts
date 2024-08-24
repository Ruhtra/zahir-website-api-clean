import "dotenv/config";
import http from "http";
import https from "https";

import { app } from "./app";
import path from "path";
import fs from "fs";

async function initModules() {
  console.log(" ~. Starting modules...");

  // const options = {
  //   key: fs.readFileSync(path.join(__dirname, "..", "keys", "key.pem")), // Caminho para a chave privada
  //   cert: fs.readFileSync(path.join(__dirname, "..", "keys", "cert.pem")), // Caminho para o certificado SSL
  // };

  // https.createServer(options, app).listen(process.env.PORT, () => {
  //   console.log(" >. Server running in: https://localhost:" + process.env.PORT);
  // });
  http.createServer(app).listen(process.env.PORT, () => {
    console.log(" >. Server running in: https://localhost:" + process.env.PORT);
  });
}

initModules();
