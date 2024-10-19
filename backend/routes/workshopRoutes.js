const express = require('express');
const Workshop = require('../models/Workshop');
const User = require('../models/User');

const router = express.Router();

// Middleware to validate user registration
const validateRegistration = (req, res, next) => {
  const { userId, workshopId } = req.body;
  if (!userId || !workshopId) {
    return res.status(400).json({ message: 'userId and workshopId are required.' });
  }
  next();
};

// Endpoint to register a user for a workshop
router.post('/register', validateRegistration, async (req, res) => {
  const { userId, workshopId, enrollmentNo } = req.body;

  try {
    // Check if the user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Find the workshop
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: 'Workshop not found.' });
    }

    // Check if registration deadline has passed
    if (new Date() > workshop.registrationDeadline) {
      return res.status(400).json({ message: 'Registration deadline has passed.' });
    }

    // Check if capacity is reached
    if (workshop.registeredUsers.length >= workshop.capacity) {
      return res.status(400).json({ message: 'Workshop capacity has been reached.' });
    }

    // Check if user is already registered by comparing enrollment number
    const userRegistered = workshop.registeredUsers.find((user) => user.enrollmentNo === enrollmentNo);
    if (userRegistered) {
      return res.status(400).json({ message: 'User is already registered for this workshop.' });
    }

    // Register the user
    workshop.registeredUsers.push({
      enrollmentNo: enrollmentNo,  // Store enrollment number
      registrationDateTime: new Date() // Current date and time
    });
    await workshop.save();

    res.status(200).json({ message: 'Registration successful!' });
  } catch (error) {
    console.error('Error registering for workshop:', error);
    res.status(500).json({ message: 'Error registering for workshop.', error: error.message });
  }
});
  // Endpoint to upload a workshop (for admin)
router.post("/upload", async (req, res) => {
  const { title, conductor,date, registrationDeadline, capacity, description } = req.body;

  try {
    const workshop = new Workshop({
      title,
      conductor,
      date,
      registrationDeadline,
      capacity,
      description,
    });

    await workshop.save();
    res.status(201).json({ message: "Workshop created successfully" });
  } catch (error) {
    console.error("Error creating workshop:", error);
    res.status(500).json({ message: "Failed to create workshop" });
  }
});
// Endpoint to fetch all workshops
router.get('/', async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.status(200).json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching workshops', error: error.message });
  }
});
// GET /api/workshops/with-participants - Fetch workshops with participants
router.get('/with-participants', async (req, res) => {
  try {
    const workshops = await Workshop.aggregate([
      {
        $lookup: {
          from: 'users', // Name of the users collection
          localField: 'registeredUsers.enrollmentNo', // Field in workshops to match
          foreignField: 'enrollmentNo', // Field in users to match
          as: 'participants' // Output array field
        }
      },
      {
        $unwind: { // Deconstructs the participants array for easier access
          path: '$participants',
          preserveNullAndEmptyArrays: true // Keeps workshops without participants in the result
        }
      },
      {
        $project: {
          _id: 1, // Workshop ID
          title: 1, // Workshop title
          conductor: 1, // Workshop conductor
          date: 1, // Workshop date
          registrationDeadline: 1, // Registration deadline
          participants: {
            enrollmentNo: '$participants.enrollmentNo', // Participant enrollment number
            name: '$participants.name', // Participant name
            email: '$participants.email' // Participant email
          }
        }
      }
    ]);

    // Send the workshops data as the response
    res.status(200).json(workshops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Export the router


module.exports = router;
