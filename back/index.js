import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./data/database.js";
import userRouter from "./router/user.js";
import taskRouter from "./router/task.js";
import { errorMiddleware } from "./middleware/error.js";
dotenv.config();

dbConnection();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.get("/", (req, res) => {
  res.send("Home");
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => console.log("Server is running"));
