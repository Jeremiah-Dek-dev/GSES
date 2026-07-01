/* import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.WEB_CLIENT_ID,
      clientSecret: process.env.WEB_SECRET_ID,
      callbackURL: '/api/auth/google/callback',
      scope: ["profile", "email"], // Ensure 'profile' and 'email' are included
    },
    async (accessToken:string, refreshToken:string, profile:string, done:false) => {
      return done(null, profile); 
    }
  )
);
// Serialize the user into the session
passport.serializeUser((user, done) => {
  done(null, user);  // Store user ID in the session
});

// Deserialize the user from the session
passport.deserializeUser((user, done) => {
    done(null, user);  // Attach user object to session

});

export default passport;
*/