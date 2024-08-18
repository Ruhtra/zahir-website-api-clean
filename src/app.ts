import express from "express";
import { router } from "./router";
import cors from "cors";
const app = express()

app.use(express.json())

// Configure CORS para permitir de qualquer origem
app.use(cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    origin: true
}));

app.use('/api', router)

export { app }