import 'dotenv/config';
import http from "http";

import { app } from "./app";

async function initModules() {
    console.log(" ~. Starting modules...");

    http.createServer(app).listen(process.env.PORT, () => {
        console.log(" >. Server running in: http://localhost:" + process.env.PORT)
    });
}

initModules();