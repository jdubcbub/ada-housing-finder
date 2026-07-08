import type { Request, Response } from "express";

export const getSearches = (req: Request, res: Response) => {
  res.send("this will return saved searches");
  // res.sendStatus(200);
};
