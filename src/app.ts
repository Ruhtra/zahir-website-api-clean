import express from "express";
import cors from "cors";

import { configAuth } from "./auth";
import { router } from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use();

configAuth(app);

app.use("/api", router);

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

export { app };
