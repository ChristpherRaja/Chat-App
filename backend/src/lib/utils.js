import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {

  //for interview project I just hardcoded the jwt secret instead of keeping it in .env file
  const token = jwt.sign({ userId }, "newSecret", {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    secure: false,
  });

  return token;
};
