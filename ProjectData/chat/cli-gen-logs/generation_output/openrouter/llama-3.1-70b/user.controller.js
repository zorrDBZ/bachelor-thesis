import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const users = await User.find({ _id: { $ne: req.user._id } }).select("fullName username profilePic _id");
		res.status(200).json(users);
	} catch (error) {
		console.log("Error in getUsersForSidebar controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

