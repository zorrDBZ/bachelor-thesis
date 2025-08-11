import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const getMessages = async (req, res) => {
	try {
		const conversationId = req.params.id;
		const conversation = await Conversation.findById(conversationId);
		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		const messages = await Message.find({ _id: { $in: conversation.messages } }).sort({ createdAt: 1 });
		res.json(messages);
	} catch (error) {
		console.log("Error in getMessages controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const sendMessage = async (req, res) => {
	try {
		const conversationId = req.params.id;
		const { message } = req.body;
		if (!message) {
			return res.status(400).json({ error: "Message content is required" });
		}

		const conversation = await Conversation.findById(conversationId);
		if (!conversation) {
			return res.status(404).json({ error: "Conversation not found" });
		}

		// Determine the receiver based on the current user and the other participant
		const participants = conversation.participants;
		const currentUserIndex = participants.findIndex(
			(id) => id.toString() === req.user._id.toString()
		);
		let receiver;
		if (currentUserIndex !== -1 && participants.length > currentUserIndex + 1) {
			receiver =
				currentUserIndex === 0 ? participants[1] : participants[0];
		} else {
			return res.status(400).json({ error: "Invalid conversation participants" });
		}

		const newMessage = new Message({
			senderId: req.user._id,
			receiverId: receiver,
			message,
		});
		await newMessage.save();

		// Add the new message ID to the conversation's messages array
		conversation.messages.push(newMessage._id);
		await conversation.save();

		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};