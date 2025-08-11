import React from "react";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
	return (
		<div
			className={`flex flex-col mb-2 p-2 bg-gray-800 rounded shadow-sm ${
				message.shouldShake ? "shake" : ""
			}`}
		>
			<p className="whitespace-pre-line text-white">{message.message}</p>
			<span className="text-xs mt-1">{extractTime(message.createdAt)}</span>
		</div>
	);
};

export default Message;