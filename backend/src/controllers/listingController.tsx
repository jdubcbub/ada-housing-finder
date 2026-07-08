import type { Request, Response } from "express";

export const getList = (req: Request, res: Response) => {
  res.send("returns all listings");
  // res.sendStatus(200);
};

export const getDetail = (req: Request, res: Response) => {
  res.send("retrieves details of listing");
  // res.sendStatus(200);
};

export const postListing = (req: Request, res: Response) => {
  // res.send("creates a listing");
  res.sendStatus(201);
};

export const updateListing = (req: Request, res: Response) => {
  res.send("updates a listing");
  // res.sendStatus(200);
};
