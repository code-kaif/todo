import { errorHandler } from "../middleware/error.js";
import { User } from "../model/user.js";
import { setCookie } from "../utils/feature.js";
import bcrypt from "bcrypt";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new errorHandler("Invalid Email", 404));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new errorHandler("Invalid Password", 404));

    setCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return next(new errorHandler("User Already Exist", 400));

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashPassword });

    setCookie(user, res, "Register Successfully", 200);
  } catch (err) {
    next(err);
  }
};

export const myProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
};
