import { Request, Response, NextFunction } from 'express';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (res.headersSent) return next(err);
  const status = err?.status || 500;
  const message = err?.message || 'Erro interno';
  return res.status(status).json({ error: message });
};
