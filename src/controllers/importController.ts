import { Request, Response } from "express";
import * as importService from "../services/importService";

interface ImportRequest extends Request {
  file?: Express.Multer.File;
}

export const importCsv = async (req: ImportRequest, res: Response) => {
  if (!req.file) {
    return res
      .status(400)
      .json({ status: 400, message: "No file uploaded", data: null });
  }
  const response = await importService.importCsvData(req.file.buffer);
  res.status(response.status).json(response);
};
