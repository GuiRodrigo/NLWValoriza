import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // /é o tokem entre asspas
  const authToken = request.headers.authorization;

  //validar se o tokem está preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(
      token,
      "bf6e3f28fb955e45a896c2e2e2aadb34"
    ) as IPayLoad;

    //Recuperar as informaçoes do user
    request.user_id = sub;



    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
