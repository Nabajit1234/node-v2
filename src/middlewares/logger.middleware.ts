import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now()

    res.on("finish", () => {
      const end = Date.now()
      const duration = end - start
      const statusCode = res.statusCode

      console.log(`${req.method} ${req.url} ${statusCode} ${duration} ms`)
    })
    next()
  }
}