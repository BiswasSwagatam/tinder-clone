import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {createServer} from "http";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { initializeSocket } from "./socket/socket.server.js";

dotenv.config();



const app = express();
const httpServer = createServer(app)
const PORT = process.env.PORT || 3000;

initializeSocket(httpServer)

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/messages", messageRoutes)

httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB()
});

export default app;