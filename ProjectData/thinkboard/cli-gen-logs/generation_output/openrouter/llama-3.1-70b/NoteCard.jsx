import { Link } from "react-router";
import { TrashIcon, EditIcon } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${note._id}`);
      toast.success("Note deleted");
      setNotes((prevNotes) => prevNotes.filter((n) => n._id!== note._id));
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="bg-base-100 shadow-md rounded-lg p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">{note.title}</h2>
        <div className="flex items-center gap-2">
          <Link to={`/note/${note._id}`} className="btn btn-ghost btn-sm">
            <EditIcon className="size-5" />
          </Link>
          <button onClick={handleDelete} className="btn btn-error btn-sm">
            <TrashIcon className="size-5" />
          </button>
        </div>
      </div>
      <p className="text-base-content">{note.content}</p>
      <p className="text-base-content/70 text-sm mt-2">
        Created at: {formatDate(note.createdAt)}
      </p>
    </div>
  );
};
export default NoteCard;