import { Request, Response } from "express"
import { AuthenticateUserService } from "../services/AthenticateUserService"



class AuthenticateUserController {
    async handle(request: Request,response: Response){
        const {email, password} = request.body;

        const authenticateUserService = new AuthenticateUserService();

        const tokem = await authenticateUserService.execute({
            email,
            password,
        });

        return response.json(tokem); 
    }
}

export {AuthenticateUserController};