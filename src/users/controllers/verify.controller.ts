import { Request, Response } from 'express';

export const user = (req: Request, res: Response) => {
  return res.status(200).json({
    user: req.user
  });
};
