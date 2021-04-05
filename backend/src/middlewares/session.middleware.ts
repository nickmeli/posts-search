import { Injectable, NestMiddleware } from "@nestjs/common";

export interface ISessionData {
  userId: number;
}

export interface ISessionWrapper<T> extends ISessionData {
  content: T;
}

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const userData: ISessionData = {
      userId: 1
    };
    
    req.body = { content: req.body, ...userData };
    req.query = { content: req.query, ...userData };
    next();
  }
  
}