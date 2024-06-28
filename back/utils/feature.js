import jwt from "jsonwebtoken";

export const setCookie = (user, res, message, status) => {
  const token = jwt.sign({ _id: user._id }, "kaif");
  res.status(status).cookie("token", token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
  }).json({
    success:true,
    message:message
  })
};
