import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body;

		if (!fullName ||!username ||!password ||!confirmPassword ||!gender) {
			return res.status(400).json({ error: "Please fill in all fields" });
		}

		if (password!== confirmPassword) {
			return res.status(400).json({ error: "Passwords do not match" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters" });
		}

		const existingUser = await User.findOne({ username });

		if (existingUser) {
			return res.status(400).json({ error: "Username already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			fullName,
			username,
			password: hashedPassword,
			gender,
		});

		generateTokenAndSetCookie(user._id, res);

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.log("Error in signup controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username ||!password) {
			return res.status(400).json({ error: "Please fill in all fields" });
		}

		const user = await User.findOne({ username });

		if (!user) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res.status(401).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({ message: "Logged in successfully" });
	} catch (error) {
		console.log("Error in login controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("jwt");

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
