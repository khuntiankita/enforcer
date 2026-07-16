import jwt from "jsonwebtoken";

const generateToken = (res, id, role) => {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,       
    sameSite: isProduction ? "None" : "Lax",     
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
