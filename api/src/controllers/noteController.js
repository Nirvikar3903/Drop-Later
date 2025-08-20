import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // simple manual validation
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const note = new Note({
      title,
      content,
      user: req.user.id, // logged-in user se linked
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
