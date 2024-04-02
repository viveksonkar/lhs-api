import passport from 'passport';
import { Request, Response } from 'express';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { request } from 'http';

class GoogleAuthService {
     
    initializeGoogleStratergy() {
        passport.use(
          new GoogleStrategy({
            clientID: '',
            clientSecret: '',
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ["profile", "email"],
          }, (accessToken: any, refreshToken: any, profile: any, done:any) => {
            
            // This callback will be invoked after user authentication
            // You can perform database operations here to save user details
            console.log('Hie', profile)
             done(profile);
          })
        );
        
        passport.serializeUser((user, done) => {
         return done( user);
          /* console.log('Hie I user',user); */
        });
        
        passport.deserializeUser((user, done) => {
         return done( user)
        });
      }s

      public async authenticateWithGoogle(req: Request, res: Response): Promise<any> {
        this.initializeGoogleStratergy();
        passport.authenticate('google')(req, res)
    }
    
}


export default GoogleAuthService