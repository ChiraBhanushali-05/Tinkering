// server.js
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

dotenv.config();
const User = require('./models/User'); // MongoDB user model

const app = express();

// Enable CORS for requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend origin
  credentials: true, // Allow cookies
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express session setup
app.use(
  session({
    secret: 'supersecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      secure: false, // Only set to true if using HTTPS in production
      httpOnly: true,
      sameSite: 'lax', // Important for cross-site requests
    },
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`, // Dynamic backend URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Routes
app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:3000', // Redirect to frontend on successful login
  })
);

// Session endpoint - returning user info if authenticated
app.get('/api/auth/session', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  });
  

app.get('/api/auth/logout', (req, res) => {
    req.logout(() => {
      req.session.destroy(() => {
        res.clearCookie('connect.sid', { path: '/' }); // Clear session cookie
        res.redirect('http://localhost:3000'); // Redirect to frontend home
      });
    });
  });
  

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
