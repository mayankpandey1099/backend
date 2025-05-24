import Show from "../models/show";
import { ApiResponse, ShowQuery } from "../utils/types";

export const getPaginatedShows = async (
  page: number,
  limit: number,
  userAge: number,
  type?: string
): Promise<ApiResponse> => {
  try {
    const skip = (page - 1) * limit;
    const query: ShowQuery = userAge < 18 ? { rating: { $ne: "R" } } : {};

    if (type) {
      query.type = new RegExp(`^${type}$`, "i");
    }
    console.log({query});

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

export const searchShows = async (
  queryString: string,
  page: number,
  limit: number,
  userAge: number
): Promise<ApiResponse> => {
  try {
    if (!queryString) {
      return { status: 400, message: "Search query is required", data: null };
    }
    const skip = (page - 1) * limit;
    const query: ShowQuery = userAge < 18 ? { rating: { $ne: "R" } } : {};

    query.$or = [
      { title: { $regex: queryString, $options: "i" } },
      { cast: { $regex: queryString, $options: "i" } },
    ];

    const total = await Show.countDocuments(query);
    const shows = await Show.find(query).skip(skip).limit(limit);

    return {
      status: 200,
      message: "Shows searched successfully",
      data: { shows, page, pages: Math.ceil(total / limit) },
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Failed to search shows",
      data: null,
    };
  }
};
