import "reflect-metadata";
import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname,'../.env' )});
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes/routes";
import cors from 'cors';
// import {User} from "./entity/User";

createConnection({
  type: "mongodb",
  url: process.env.mongoURI,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: true,
  logging: false,
  entities: [
     __dirname+"/entity/**/*.js"
  ],
  migrations: [
    __dirname+"/migration/**/*.js"
  ],
  subscribers: [
    __dirname+"/subscriber/**/*.js"
  ],
  cli: {
     entitiesDir: __dirname+"/entity",
     migrationsDir: __dirname+"/migration",
     subscribersDir: __dirname+"/subscriber"
  }
}).then(async () => {

    // create express app
    const app = express();

    app.use(
      cors({
        origin: "http://localhost:4200",
        credentials: true
      })
    );
    
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...
    app.use(express.static(path.join(__dirname, '../dist')));

    app.get('*', (_, res) => { 
        res.sendFile(path.join(__dirname, '../dist/index.html')) 
    }); 

    

    // start express server
    const PORT = process.env.PORT || 3000; 
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

}).catch(error => console.log(error));
