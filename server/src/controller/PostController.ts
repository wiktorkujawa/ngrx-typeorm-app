import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Post} from "../entity/Post";

export class PostController {

    private postRepository = getRepository(Post);

    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.postRepository.find();
    }

    async one(request: Request, _response: Response, _next: NextFunction) {
        return this.postRepository.findOne(request.params.id);
    }

    async save(request: Request, _response: Response, _next: NextFunction) {
        return this.postRepository.save(request.body);
    }

    async remove(request: Request, response: Response, _next: NextFunction) {
        let postToRemove = await this.postRepository.findOne(request.params.id);
        await this.postRepository.remove(postToRemove!)
        .then((post) => response.send(`Post ${post.subject} removed`))
        .catch(() => response.send('There is no post to remove'));
    }

}