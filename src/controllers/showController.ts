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
  const type = req.query.type as string;
  const response = await showService.getPaginatedShows(page, limit, userAge, type);
  res.status(response.status).json(response);
};

export const searchShows = async (req: AuthRequest, res: Response) => {
  const query = req.query.query as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 15;
  const userAge = req.user?.age || 18;
  const response = await showService.searchShows(query, page, limit, userAge);
  res.status(response.status).json(response);
};

export const getShowDetails = async (req: AuthRequest, res: Response) => {
  const showId = req.params.id;
  const userAge = req.user?.age || 18;
  const response = await showService.getShowById(showId, userAge);
  res.status(response.status).json(response);
};
