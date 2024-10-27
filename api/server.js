import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import matchRoutes from "./routes/matchRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)
app.use("/api/matches", matchRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    connectDB()
});

export default app;