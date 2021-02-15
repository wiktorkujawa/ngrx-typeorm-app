import "reflect-metadata";
import dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname,'../.env' )});
import {createConnection} from "typeorm";
import express, { NextFunction } from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes/routes";
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

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
    
    app.use(function(req: Request, res: Response, next: NextFunction) {
      if (!req.user)
          res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      next();
    });
    
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
      extended: false
    }));
    app.use(bodyParser.json());

    app.use(
      cors({
        origin: "http://localhost:4200",
        credentials: true
      })
    );

    // Express session
    app.use(
      session({
        secret: process.env.sessionSecret as string,
        resave: true,
        saveUninitialized: true
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    
    

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
