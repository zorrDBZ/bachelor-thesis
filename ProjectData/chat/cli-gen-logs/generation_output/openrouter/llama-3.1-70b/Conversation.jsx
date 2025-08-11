import { useConversation } from "../../zustand/useConversation";
import { getRandomEmoji } from "../../utils/emojis";

const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { setSelectedConversation } = useConversation();

  const handleConversationClick = () => {
    setSelectedConversation(conversation);
  };

  return (
    <div
      className={`flex items-center gap-2 py-2 cursor-pointer ${
        lastIdx? "border-b border-slate-500" : ""
      }`}
      onClick={handleConversationClick}
    >
      <img
        src={conversation.profilePic}
        alt={conversation.fullName}
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col">
        <span className="text-base font-bold">{conversation.fullName}</span>
        <span className="text-sm opacity-50">{conversation.username}</span>
      </div>
      <span className="text-lg">{emoji}</span>
    </div>
  );
};

export default Conversation;
