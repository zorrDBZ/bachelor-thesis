import Note from "../models/Note";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.json(notes);
  } catch (error) {
    console.error("Error fetching all notes:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "No note found with given ID" });
    }
    return res.json(note);
  } catch (error) {
    console.error("Error fetching a specific note:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Both Title and Content fields are required." });
  }

  try {
    const new_note = new Note({
      title,
      content,
    });

    const saved_note = await new_note.save();
    
    return res
      .status(201)
      .json(saved_note);
      
  } catch (error) {
    console.error("Error creating a new note:", error);
    
    return res
      .status(500)
      .json({ message: "Internal Server Error" });
      
  }
}

export async function updateNote(req, res) {
  const { id } = req.params;
  
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Both Title and Content fields are required." });
      
  }

  try {

    const updated_note = await Note.findOneAndUpdate(
      { _id: id },
      { $set: { title, content }},
      { new: true }
    );

    if (!updated_note) {
      return res.status(404).json({
        message: "No note found with given ID",
      });
      
    }

    return res.json(updated_note);

    
  } catch (error) {

    
    console.error("Error updating the note:", error);

    
    return res
      .status(500)
      .json({ message: "Internal Server Error" });

    
  }

}

export async function deleteNote(req, res) {

  
const { id } = req.params;

  
try {

  
const deleted_note = await Note.findByIdAndDelete(id);

  
if (!deleted_note) {

  
return res
.status(404)
.json({
message : 'No note found with given ID',
});
  

  
}
return res.json({
message : 'Successfully deleted the note.',
});
  
} catch (error) {

  
console.error("Error deleting the note:", error);

  
return res
.status(500)
.json({
message : 'Internal Server Error',
});
  

  
}
}