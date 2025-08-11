import Post from "../models/Post.js";
import User from "../models/User.js";

export const getFeedPosts = async (req, res) => {
  try {
    // Retrieve all posts sorted by creation date (newest first)
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    // Retrieve posts for a specific user based on userId parameter
    const userId = req.params.userId;
    const userPosts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    // Toggle like status for a given post by a specific user
    const postId = req.params.id;
    const { userId } = req.body;
    
    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Post not found" });

    if (post.likes.get(userId)) {
      // Remove like if already liked
      post.likes.delete(userId);
    } else {
      // Add like if not already liked
      post.likes.set(userId, true);
    }

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    // Create a new post using data from the request body and optional uploaded file
    const { userId, description } = req.body;

    // Retrieve the posting user's details
    const userDoc = await User.findById(userId);
    if (!userDoc)
      return res.status(404).json({ message: "User not found" });

    let picturePath;
    if (req.file) {
      // Use the filename from multer if a file was uploaded
      picturePath = req.file.filename;
    } else if (req.body.picturePath) {
      // Fallback to provided picture path in the request body
      picturePath = req.body.picturePath;
    }

    // Construct the new post document
    const newPost = new Post({
      userId,
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
      location: userDoc.location || "",
      description,
      picturePath,
      userPicturePath: userDoc.picturePath || "",
      likes: new Map(),
      comments: []
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};