import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req: any, res: any, next: any) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({
            status: 401,
            message: "Not authorized, user not found",
            data: null,
          });
      }
      req.user = user;
      next();
    } catch (error) {
      return res
        .status(401)
        .json({
          status: 401,
          message: "Not authorized, token failed",
          data: null,
        });
    }
  } else {
    return res
      .status(401)
      .json({ status: 401, message: "Not authorized, no token", data: null });
  }
};
