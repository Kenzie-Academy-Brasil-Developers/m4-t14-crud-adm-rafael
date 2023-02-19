import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        idUser: number;
        typeUser: boolean;
      };
      userIdParams: boolean;
    }
  }
}
