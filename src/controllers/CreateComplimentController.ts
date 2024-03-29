import { Request, Response } from "express";
import { CreateComplimentsService } from "../services/ComplimentsService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;

    const createComplimentService = new CreateComplimentsService();

    const {user_id} = request

    const compliment = await createComplimentService.execute({
      tag_id,
      user_receiver,
      user_sender:user_id,
      message,
    });

    return response.json(compliment)
  }
}

export { CreateComplimentController };
