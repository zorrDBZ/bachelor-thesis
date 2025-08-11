import User from "../models/User.js";

/* GET USER */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    delete user.password;
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* GET USER FRIENDS */
export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    // Retrieve full friend objects using $in query
    const friends = await User.find({
      _id: { $in: user.friends },
    });

    res.json(friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ADD OR REMOVE FRIEND */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;

    // Find the current user by ID
    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    // Check if the friend is already added
    const index = user.friends.indexOf(friendId);

    if (index > -1) {
      // Remove friend if already exists
      user.friends.splice(index, 1);
    } else {
      // Add friend if not present
      user.friends.push(friendId);
    }

    await user.save();

    // Return updated list of friends as full objects
    const updatedFriends = await User.find({
      _id: { $in: user.friends },
    });

    res.json(updatedFriends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};