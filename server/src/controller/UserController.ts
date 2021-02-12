import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import passport from 'passport';
import bcrypt from 'bcryptjs';
require('../passport/local')(passport);

export class UserController {

    private userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
      passport.authenticate('local', (err, user, info) => {
  
        if (err) { 
          return response.status(501).json(err); 
        }
        if (!user) { 
          return response.status(501).json(info); 
        }

        request.logIn(user, function(err) {
        if (err) { 
          return response.status(501).json(err); 
        }

        return Promise.all([user])
        .then( data => response.status(200).json(data))
        .catch( error => response.status(403).json(error));
      });
      
      })(request, response, next);
    }

    async register(request: Request, response: Response, _next: NextFunction) {
      const { displayName, email, password, password2} = request.body;
      let errors: any = [];
      if (!displayName || !email || !password || !password2) {
        errors.push({ message: 'Please enter all fields' });
      }
    
      if (password != password2) {
        errors.push({ message: 'Passwords do not match' });
      }
    
      if (undefined !== password && password.length < 8) {
        errors.push({ message: 'Password must be at least 8 characters' });
      }
    
      if (errors.length > 0) {
        response.status(400).json(errors);
      } else {
        this.userRepository.findOne({ email: email }).then(user => {
          if (user) {
            errors.push({ message: 'Email already exists' });
    
            return response.status(409).json(errors);
          } else {
            this.userRepository.save({
                email: email,
                displayName: displayName,
                password: bcrypt.hashSync(password,10)
              });
              return response.status(201).json({message: 'Registration success'});
            }
          })
        }
    }

    async getUser(request: Request, _response: Response, _next: NextFunction) {
        return Promise.all([request.user])
    }

    async logout(request: Request, response: Response, _next: NextFunction) {
        request.logout();
        return response.status(200).json({message:'Logout success'});
    }

}