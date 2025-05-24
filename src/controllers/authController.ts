import { Request, Response } from "express";
import * as authService from "../services/authService";

interface AuthRequest extends Request {
  body: {
    name:string;
    email: string;
    password: string;
    age?: number;
  };
}

export const register = async (req: AuthRequest, res: Response) => {
  const { name, email, password, age } = req.body;
  if (!age) {
    return res
      .status(400)
      .json({ status: 400, message: "Age is required", data: null });
  }
  const response = await authService.registerUser({ name, email, password, age });
  res.status(response.status).json(response);
};

export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  const response = await authService.loginUser(email, password);
  res.status(response.status).json(response);
};
