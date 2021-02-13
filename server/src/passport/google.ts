import passportGoogle from 'passport-google-oauth20';
const GoogleStrategy = passportGoogle.Strategy;
import {getRepository} from "typeorm";
import {User} from "../entity/User";

const clientID: string = (process.env.GOOGLE_CLIENT_ID as string);
const clientSecret: string = (process.env.GOOGLE_CLIENT_SECRET as string);

module.exports = (passport: any) => {  
  passport.use(
      new GoogleStrategy(
        {
          clientID: clientID,
          clientSecret: clientSecret,
          callbackURL: '/auth/google/callback',
          proxy: true
        },
        async (_accessToken: any, _refreshToken: any, profile: any, done: any) => {
          const newUser = {
            email: profile.emails[0].value,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          }

          try {
            let user = await getRepository(User).findOne({ email: profile.emails[0].value })

            if (user) {
              done(null, user)
            } else {
              user = await getRepository(User).create(newUser)
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
        }
      )
    )
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