import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import {getRepository} from "typeorm";
import bcrypt from 'bcryptjs';
import {User} from "../../entity/User";


module.exports =
  (passport: any) => {
    passport.use('local',new LocalStrategy({
        usernameField:'email',
        passwordField:'password'
    },
        (username, password, done) => {
            getRepository(User).findOne({ email: username })
            .then( ( user: any) => {
              if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
              }
              if (!bcrypt.compareSync(password, user.password)) {
                  return done(null, false, { message: 'Incorrect password.' });
              }
              return done(null, user);
          })
          .catch( err => {
            if (err) {
              return done(err);
            }
          });
        }
    ));

    passport.serializeUser( function (user: any, done: any) {
      done(null, user.email);
    });
    
    passport.deserializeUser( (email: any, done: any) => {
      getRepository(User).findOne({email:email})
      .then( ( user: any) => {
        done(null, user);
      })
      .catch(error => {
        done(error,false);
      });
    });
  }
