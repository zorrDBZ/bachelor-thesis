import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const getMessages = async (req, res) => {
	try {
		const conversationId = req.params.id;
		const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
		res.status(200).json(messages);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const receiverId = req.params.id;
		const senderId = req.user._id;
		const { message } = req.body;

		const conversation = await Conversation.findOne({
			participants: { $all: [receiverId, senderId] },
		});

		if (!conversation) {
			const newConversation = new Conversation({
				participants: [receiverId, senderId],
			});
			await newConversation.save();
			conversation = newConversation;
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			conversationId: conversation._id,
			message,
		});
		await newMessage.save();

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			const io = req.app.get("io");
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({ error: "Internal Server Error" });
	}
};