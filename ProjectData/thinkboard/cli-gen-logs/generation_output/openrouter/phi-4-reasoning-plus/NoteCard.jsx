import React from "react";
import { Link } from "react-router";
import api from "../lib/axios";
import { formatDate } from "../lib/utils";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (!confirmed) return;
    try {
      await api.delete(`/notes/${note._id}`);
      // Update parent state by filtering out deleted note
      setNotes((prevNotes) =>
        prevNotes.filter((n) => n._id !== note._id)
      );
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're deleting notes too fast.");
      } else {
        toast.error("Failed to delete note");
      }
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <Link to={`/note/${note._id}`}>{note.title}</Link>
        </h2>
        <p>{note.content.length > 100 ? `${note.content.substring(0, 100)}...` : note.content}</p>
        <small className="text-xs text-gray-600">Created on {formatDate(new Date(note.createdAt))}</small>
      </div>
      <div className="card-actions justify-end">
        <button onClick={handleDelete} className="btn btn-error btn-sm">Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;