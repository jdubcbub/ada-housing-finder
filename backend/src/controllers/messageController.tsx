import type { Request, Response } from "express";

export const sendMessage = (req: Request, res: Response) => {
  res.send("for sending messages");
  // res.sendStatus(200);
};
