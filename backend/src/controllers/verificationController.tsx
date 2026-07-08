import type { Request, Response } from "express";

export const verifyListing = (req: Request, res: Response) => {
  res.send("for submitting verifications");
  // res.sendStatus(200);
};