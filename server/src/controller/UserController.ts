import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import passport from 'passport';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
require('../modules/passport/local')(passport);
require('../modules/passport/google')(passport);
// import GMailService from '../modules/nodemailer/mailer'; 
import { GMailService } from '../modules/nodemailer/mailer';

export class UserController {

    private userRepository = getRepository(User);

    async login(request: Request, response: Response, next: NextFunction) {
      passport.authenticate('local', (err, user, info) => {
  
        if (err) { 
          return response.status(501).json(err); 
        }
        if (!user) { 
          return response.status(501).json([info]); 
        }
        if(!user.active){
          return response.status(501).json([{message:'Account not activated. Check your email'}]);
        }
        request.logIn(user, function(err) {
        if (err) { 
          return response.status(501).json(err); 
        }
        return Promise.all([user])
        .then( data => response.status(200).json(data))
        .catch( error => response.status(403).json([error]));
      });
      })(request, response, next);
    }

    async activateAccount(request:Request, response: Response, _next: NextFunction) {
      let user: any = await this.userRepository.findOne({activeToken: request.params.activeToken});

      if(user.activeExpires < Date.now()){
        return response.status(501).json({message:'Activation link expired'});
      }
      // console.log('get problem');

      this.userRepository.save({
        ...user,
        active:true
      })
      .then(() => {
        return response.status(200).redirect('http://localhost:4200');
        // json({message:'User account activated'})
      })
      .catch((error) => {
        return response.status(200).json(error);
       });
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
            
                crypto.randomBytes(20,  (err, buf) => {
            
                  if(err){
                    console.log(err);
                  }
                  const activeToken = Date.now()+buf.toString('hex');
                  this.userRepository.save({
                    email: email,
                    displayName: displayName,
                    password: bcrypt.hashSync(password,10),
                    active: false,
                    activeToken: activeToken,
                    activeExpires: Date.now() + 24 * 3600 * 1000
                  });

                  let gmailService = new GMailService();;
                  gmailService.sendMail(
                    email,
                    `Account Activation - ${process.env.PAGE_NAME}`,
                    `<p>Hello ${displayName},</p>
                    <p>Click the activation link, if you registered on ${process.env.PAGE_NAME} </p>
                    <a href='${process.env.PAGE_NAME}/account/active/${activeToken}'>${process.env.PAGE_NAME}/account/active/${activeToken}</a>
                    <p>Otherwise ignore it, link will expire after 24 hours.</p>`
                  );
    
              return response.status(201).json({message: 'Registration success. Check your email to activate account.'});
            })
          }
        })
    }}

    async getUser(request: Request, _response: Response, _next: NextFunction) {
        return Promise.all([request.user])
    }

    async logout(request: Request, _response: Response, _next: NextFunction) {
      request.logout();
      return Promise.all([{message:'Logout success'}]);
    }

    // Google authentication
    async googleAuth(request: Request, response: Response, next: NextFunction){
      return passport.authenticate('google', { scope: ['profile','email'] })(request, response, next)
    }

    async googleCallback(request: Request, response: Response, next: NextFunction){
      return passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google',
      })(request, response, next)
    }


}