import { Request, Response, NextFunction } from 'express'

export function cors (req: Request, res: Response, next: NextFunction): void {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')

  return next()
}
