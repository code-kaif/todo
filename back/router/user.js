import express from "express";
import { login, logout, myProfile, register } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter
  .post("/login", login)
  .post("/register", register)
  .get("/me", isAuthenticated, myProfile)
  .get("/logout", logout);

export default userRouter;
