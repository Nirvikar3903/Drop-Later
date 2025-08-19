// api/src/routes/notes.js
import express from "express";
import Note from "../models/Note.js";
import { validateNote } from "../utils/validate.js";
import auth from "../middleware/auth.js";
import rateLimit from "../middleware/rateLimit.js";

const router = express.Router();

// ✅ Create a new note
router.post("/", auth, rateLimit, async (req, res) => {
  try {
    const { title, content } = req.body;

    const { error } = validateNote({ title, content });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const note = new Note({
      title,
      content,
      user: req.user?.id || null, // auth middleware se aaega
    });

    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get all notes
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user?.id || null });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get a single note by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update a note
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const { error } = validateNote({ title, content });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Delete a note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
