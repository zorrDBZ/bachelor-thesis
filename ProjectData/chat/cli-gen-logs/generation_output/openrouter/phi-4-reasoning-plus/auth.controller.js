import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		// Validate required fields
		if (!fullName || !username || !password || !confirmPassword || !gender) {
			return res.status(400).json({ error: "Please fill in all required fields" });
		}

		// Check if passwords match
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords do not match" });
		}

		// Check if password length is at least 6 characters
		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		// Check if a user with the same username already exists
		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Hash the password before saving
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create a new user instance
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
		});

		await newUser.save();

		// Generate JWT token and set it as a cookie
		generateTokenAndSetCookie(newUser._id, res);

		// Return the new user without exposing the password
		const { _id, fullName: name } = newUser;
		res.status(201).json({ _id, fullName: name, username, gender });
	} catch (error) {
		console.log("Error in signup controller:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ error: "Please provide both username and password" });
		}

		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid credentials" });
		}

		generateTokenAndSetCookie(user._id, res);

		const { _id, fullName: name } = user;
		res.status(200).json({ _id, fullName: name, username, gender: user.gender });
	} catch (error) {
		console.log("Error in login controller:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("jwt");
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};