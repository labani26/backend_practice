const express = require("express");
const { createNote, updateNote, deleteNote, getNotes } = require("../controllers/noteController");
const auth = require("../middleware/auth");
const noteRouter = express.Router();

noteRouter.post("/create", auth, createNote);
noteRouter.get("/notes", auth, getNotes);
noteRouter.delete("/:id", auth, deleteNote);
noteRouter.put("/:id", auth, updateNote);

module.exports = noteRouter;
