const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, username, password, role } = req.body;

    // Check if the email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({ firstName, lastName, email, phoneNumber, username, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    
    // Find user by email or username
    const user = await User.findOne({ $or: [{ email: emailOrUsername }, { username: emailOrUsername }] });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
