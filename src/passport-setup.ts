const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const passportMiddleWare =() => { passport.use(
  new GoogleStrategy({
    clientID: '177168581023-tsoeekln3q0fipv3044u3ettq5av771s.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    // This callback will be invoked after user authentication
    // You can perform database operations here to save user details
    return done(null, profile);
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
  console.log(user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

}
 
export default passportMiddleWare