import React from 'react';
import { useConversation } from '../../zustand/useConversation';

const Conversation = ({ conversation, emoji, lastIdx }) => {
	const { setSelectedConversation, selectedConversation } = useConversation();
	const isActive = selectedConversation && selectedConversation._id === conversation._id;

	const handleClick = () => {
		setSelectedConversation(conversation);
	};

	return (
		<div
			className={`flex items-center px-2 py-2 hover:bg-gray-600 cursor-pointer ${isActive ? 'bg-gray-800' : ''} ${!lastIdx ? 'border-b border-slate-500' : ''}`}
			onClick={handleClick}
		>
			<div className="flex items-center gap-2">
				<img
					src={conversation.profilePic}
					alt={`${conversation.fullName}'s avatar`}
					className="w-10 h-10 rounded-full"
				/>
				<div>
					<div className="text-lg font-semibold">{conversation.fullName}</div>
					<div className="text-xs">{emoji}</div>
				</div>
			</div>
		</div>
	);
};

export default Conversation;