import { parse } from "csv-parse";
import Show from "../models/show";
import { ApiResponse, ShowData } from "../utils/types";

export const importCsvData = async (
  fileBuffer: Buffer
): Promise<ApiResponse> => {
  try {
    const shows: ShowData[] = [];
    const parser = parse({ columns: true, trim: true });

    parser
      .on("data", (row) => {
        shows.push({
          show_id: row.show_id,
          type: row.type,
          title: row.title,
          director: row.director || null,
          cast: row.cast
            ? row.cast.split(",").map((c: string) => c.trim())
            : [],
          country: row.country || null,
          date_added: row.date_added ? new Date(row.date_added) : undefined,
          release_year: row.release_year ? parseInt(row.release_year) : undefined,
          rating: row.rating || null,
          duration: row.duration || null,
          listed_in: row.listed_in
            ? row.listed_in.split(",").map((g: string) => g.trim())
            : [],
          description: row.description || null,
        });
      })
      .on("end", async () => {
        try {
          await Show.deleteMany({});
          await Show.insertMany(shows, { ordered: false });
        } catch (error) {
          throw error;
        }
      })
      .on("error", (error) => {
        throw error;
      });

    await new Promise((resolve, reject) => {
      parser.on("end", resolve);
      parser.on("error", reject);
      parser.write(fileBuffer);
      parser.end();
    });

    return {
      status: 201,
      message: "CSV data imported successfully",
      data: null,
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message || "Failed to import CSV data",
      data: null,
    };
  }
};
