import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateUserService {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateUserService) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await usersRepositories.findOne({
      email,
    });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // verificar se senha está correta
    // 11234 / 72173y127hzh29312793yxh
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    //gerar tokem
    const tokem = sign(
        {
            email: user.email,
        },
        "bf6e3f28fb955e45a896c2e2e2aadb34",
        {
            subject: user.id,
            expiresIn:"1d"
        }
    );
    return tokem
  }
}

export { AuthenticateUserService };
         