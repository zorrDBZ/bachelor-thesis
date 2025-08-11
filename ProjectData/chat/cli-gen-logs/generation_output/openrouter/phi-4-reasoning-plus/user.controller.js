import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const currentUserId = req.user._id;
		// Fetch all users except the currently logged-in user
		const users = await User.find({ _id: { $ne: currentUserId } });
		// Optionally sort by fullName alphabetically
		const sortedUsers = users.sort((a, b) => a.fullName.localeCompare(b.fullName));
		res.status(200).json(sortedUsers);
	} catch (error) {
		console.log("Error in getUsersForSidebar controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};