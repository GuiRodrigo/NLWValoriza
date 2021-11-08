import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentsService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const userRepositories = getCustomRepository(UsersRepositories);

    if(user_sender===user_receiver){
        throw new Error("Incorrect User Receiver")
    }

    const userReciverExists = await userRepositories.findOne(user_receiver);

    if (!userReciverExists) {
      throw new Error("User Receiver does not exits!");
    }

    const compliment = complimentsRepositories.create({
        tag_id,
        user_receiver,
        user_sender,
        message
    })
    
    await complimentsRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentsService };
