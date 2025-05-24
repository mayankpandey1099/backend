import Show from "../models/show";
import { ApiResponse } from "../utils/types";

interface ShowQuery {
  rating?: { $ne: string };
  type?: string;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}

export const getPaginatedShows = async (
  page: number,
  limit: number,
  userAge: number
): Promise<ApiResponse> => {
  try {
    const skip = (page - 1) * limit;
    const query: ShowQuery = userAge < 18 ? { rating: { $ne: "R" } } : {};

    const total = await Show.countDocuments(query);
    const shows = await Show.find(query).skip(skip).limit(limit);

    return {
      status: 200,
      message: "Shows retrieved successfully",
      data: { shows, page, pages: Math.ceil(total / limit), total },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Failed to retrieve shows",
      data: null,
    };
  }
};
