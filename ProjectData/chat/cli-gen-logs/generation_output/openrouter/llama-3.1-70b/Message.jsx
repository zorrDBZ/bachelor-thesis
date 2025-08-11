import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
	const { selectedConversation } = useConversation();
	const [isSender, setIsSender] = useState(false);

	useEffect(() => {
		if (message.senderId === selectedConversation._id) setIsSender(true);
	}, [message.senderId, selectedConversation]);

	return (
		<div
			className={`flex gap-3 items-center ${
				isSender ? "justify-end" : "justify-start"
			}`}
		>
			<div className='flex flex-col gap-1'>
				<p
					className={`text-sm ${
						isSender ? "text-right text-gray-200" : "text-left text-gray-100"
					}`}
				>
					{isSender ? "You" : selectedConversation.fullName}
				</p>
				<p
					className={`text-base ${
						isSender ? "text-right text-gray-200" : "text-left text-gray-100"
					}`}
				>
					{message.message}
				</p>
			</div>
			<div className='flex flex-col gap-1'>
				<p
					className={`text-sm ${
						isSender ? "text-right text-gray-200" : "text-left text-gray-100"
					}`}
				>
					{extractTime(message.createdAt)}
				</p>
			</div>
		</div>
	);
};
export default Message;
