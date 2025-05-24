import { Request, Response } from "express";
import * as showService from "../services/showService";

interface AuthRequest extends Request {
  user?: {
    age: number;
  };
}

export const getShows = async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 15;
  const userAge = req.user?.age || 18;
  const response = await showService.getPaginatedShows(page, limit, userAge);
  res.status(response.status).json(response);
};
