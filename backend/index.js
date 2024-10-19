// server.js
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const webinarRoutes = require("./routes/WeninarRoutes");
dotenv.config();
const User = require('./models/User'); // MongoDB user model
const registerRoutes = require('./routes/register'); 
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for requests from the frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend origin
  credentials: true, // Allow cookies
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
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
      secure: false, // Set to true in production
      httpOnly: true,
      sameSite: 'lax', // Important for cross-site requests
    },
  })
);

// Passport setup
// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        // Extract email part before '@' to use as enrollment number
        const emailUsername = profile.emails[0].value.split('@')[0];
        // Check if the extracted part is all digits (i.e., valid enrollment number)
        const enrollmentNo = /^\d+$/.test(emailUsername) ? emailUsername : null;

        const role = enrollmentNo ? 'student' : 'staff'; // Assign role based on enrollment number

        // If the user doesn't exist, create a new one with enrollmentNo
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role, // Assign the determined role
            enrollmentNo, // Save email username as enrollmentNo (or null)
          });
        } else if (user.enrollmentNo === undefined) {
          // If the user exists but enrollmentNo is not set, update it
          user.enrollmentNo = enrollmentNo; // Save emailUsername only if it's digits, else null
          await user.save();
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
app.use('/api', registerRoutes);
app.use("/api/webinars", webinarRoutes);
// Routes
app.get(
  '/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/api/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  (req, res) => {
    // Check the user's role after successful login
    if (req.user.role === 'admin') {
      res.redirect('http://localhost:3000/admin/AdminDashBoard'); // Redirect admin to admin dashboard
    } else {
      res.redirect('http://localhost:3000'); // Redirect non-admin users to the regular dashboard or homepage
    }
  }
);


app.get('/api/auth/session', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

app.get('/api/auth/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('http://localhost:3000'); // Redirect to frontend on logout
  });
});

// Update user role (for admin use or specific role assignment logic)
app.post('/api/auth/update-role', async (req, res) => {
  const { userId, newRole } = req.body;
  
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  if (!['student', 'staff'].includes(newRole)) {
    return res.status(400).json({ message: 'Invalid role specified' });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      user.role = newRole; // Update the user's role
      await user.save();
      return res.status(200).json({ 
        message: 'User role updated successfully', 
        user 
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user role:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Route to save institute and department
app.post('/api/auth/user', async (req, res) => {
  const { institute, department } = req.body; // Destructure from the request body

  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const user = await User.findById(req.user.id); // Find the user by ID
    if (user) {
      user.institute = institute; // Update institute
      user.department = department; // Update department
      await user.save(); // Save the updated user
      return res.status(200).json({ 
        message: 'User updated successfully', 
        user // Return the updated user
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
}); 