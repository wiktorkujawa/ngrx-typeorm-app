import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";

export class UserController {

    private userRepository = getRepository(User);

    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, _response: Response, _next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, _next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove!)
        .then((user) => response.send(`User ${user.firstName} ${user.lastName} removed`))
        .catch(() => response.send('There is no user to remove'));
    }

}