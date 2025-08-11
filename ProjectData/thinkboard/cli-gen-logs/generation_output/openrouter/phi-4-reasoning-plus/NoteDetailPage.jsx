import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await api.get(`/notes/${id}`);
        setNote(data);
      } catch (error) {
        console.error("Error fetching note:", error);
        if (error.response && error.response.status === 404) {
          toast.error("Note not found!");
        } else {
          toast.error("Failed to load note.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
    }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <p className="p-4">Loading note...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">Note not found!</h2>
        <Link to="/" className="btn btn-primary">
          Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-header">
              <h2 className="card-title">{note.title}</h2>
            </div>
            <div className="card-body">
              <p>{note.content}</p>
            </div>
            <div className="card-actions justify-end">
              <Link to="/" className="btn btn-primary">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;