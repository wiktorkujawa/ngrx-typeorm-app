import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Post} from "../entity/Post";
import { MulterService } from '../modules/multer';
import mongo from 'mongodb';
import Grid from 'gridfs-stream';



let gfs: any;

mongo.MongoClient.connect(process.env.mongoURI as string, {
  useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, client) => {
  if(err) { new Error("An error has occurred while this file is retrieving: "+ err); }

  //Look this, I must to explicit database name, otherwise that error is thrown
  let db = client.db('typeorm');

  gfs = Grid(db, mongo);
  gfs.collection('posts');

});



export class PostController {
  

    private postRepository = getRepository(Post);
    

    // private multerService = new MulterService();
    // private storage = this.multerService.initStorage(process.env.mongoURI as string, 'posts');
    // private upload = this.multerService.initUpload(this.storage).single('post');



    async all(_request: Request, _response: Response, _next: NextFunction) {
        return this.postRepository.find();
    }

    async one(request: Request, _response: Response, _next: NextFunction) {
        return this.postRepository.findOne({ id: request.params.id});
    }

    async displayImage(request: Request, response: Response, _next: NextFunction) {
      console.log(request.params.filename);
      gfs.files.findOne({ filename: request.params.filename }, (_err: any, file: any) => {
        // Check if file
        if (!file || file.length === 0) {
          return response.status(404).json({
            err: 'No file exists'
          });
        }
        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(response);
        } else {
          response.status(404).json({
            err: 'Not an image'
          });
        }
      });
    }

    async save(request: any, response: any, _next: NextFunction) {
        let multerService = new MulterService();
        let storage = multerService.initStorage(process.env.mongoURI as string, 'posts');
        let upload = multerService.initUpload(storage).single('post');

      upload(request, response, async (error: any) => {
        if(error){
         return console.log(error);
        }
      let fileImage = (request.body.fileImage == 'true');

      if(request.file !== undefined){
        const { file } = request;
        const { id, filename } = file;
        return this.postRepository.save({
          files_id: id,
          email: request.body.email,
          fileImage: fileImage,
          path: 'posts/image/'+filename,
          content: request.body.content,
          created_at: Date.now(),
          modified_at: Date.now()
        }).then((user) => response.json(user));

      }     
        return this.postRepository.save({
          files_id:'',
          email: request.body.email,
          path: request.body.path,
          fileImage: request.body.fileImage,
          content: request.body.content,
          created_at: Date.now(),
          modified_at: Date.now()
        }).then((user) => response.json(user));
      })
    }

    async remove(request: Request, response: Response, _next: NextFunction) {
        let postToRemove = await this.postRepository.findOne(request.params.id);
        await this.postRepository.remove(postToRemove!)
        .then((post) => response.send(`Post ${post.content} removed`))
        .catch(() => response.send('There is no post to remove'));
    }

}