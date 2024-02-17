const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewares/fetchUserId");

// Add new note at POST-> http://localhost:5000/api/notes/addNote , private route

router.post(
  "/addNote",

  //fetchUser to append userId to the req header
  fetchUser,

  // express-validator middleware
  body("title")
    .isLength({ min: 2 })
    .withMessage("title must be atleast 2 chars long"),
  body("note")
    .isLength({ min: 5 })
    .withMessage("note must be atleast 5 chars long"),

  async (req, res) => {
    try {
      const result = validationResult(req);
      // validating the values entered by user
      if (result.array().length !== 0) {
        return res
          .status(400)
          .json({ message: "Invalid note values", errors: result.array() });
      }
      const userId = req.userId;
      const { title, note, tag } = req.body;

      // creating and saving new note into i-notess/notes collection
      const newNoteBody = { userId, title, note, tag };
      const newNote = await new Note(newNoteBody);
      await newNote.save();

      const noteId = newNote.id;

      // updating the notes array of the user by pushing new note id and saving the user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { notes: noteId } },
        { new: true }
      );
      await updatedUser.save();

      res.status(200).json({
        message: "Note added successfully",
        noteId: newNote.id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Unexpected error occured while adding new note",
        errors: [{ msg: error.message }],
      });
    }
  }
);

// Get existing note at GET-> http://localhost:5000/api/notes/getNote , private route

router.get(
  "/getNote",

  //fetchUser to append userId to the req header
  fetchUser,

  async (req, res) => {
    try {
      const userId = req.userId;
      const noteId = req.query.noteId;

      // checkiing if noteId is empty in request
      if (!noteId) {
        res.status(400).send("noteId cant be empty string");
      }

      // checking if the note requested belongs to the logged in user by validating userId from jwt token and userId in the note
      const note = await Note.findById(noteId);

      //convert ObjectId returned by the mongoDb to string for comparision
      const noteUserId = note.userId.toString();
      if (noteUserId !== userId) {
        res.status(401).send("Not authorized to get this note");
      }

      return res
        .status(200)
        .json({ message: "Note fetched successfully", note });

      //unexpected error occured
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error occured while getting existing note",
        errors: [{ msg: error.message }],
      });
    }
  }
);

// Get all existing notes at GET-> http://localhost:5000/api/notes/getAllNotes , private route

router.get(
  "/getAllNotes",

  //fetchUser to append userId to the req header
  fetchUser,

  async (req, res) => {
    try {
      const userId = req.userId;

      //fetching all notes from i-notess/notes collection
      const notes = await Note.find({ userId: userId });

      return res
        .status(200)
        .json({ message: "Notes fetched successfully", notes });

      //unexpected error occured
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error occured while getting existing note",
        errors: [{ msg: error.message }],
      });
    }
  }
);

// Update an existing notes at PUT-> http://localhost:5000/api/notes/updateNote , private route

router.put(
  "/updateNote",

  //fetchUser to append userId to the req header
  fetchUser,

  async (req, res) => {
    try {
      const userId = req.userId;
      const noteId = req.query.noteId;

      // checking if noteId is empty in request
      if (!noteId) {
        res.status(400).send("noteId cant be empty string");
      }

      // checking if the note requested belongs to the logged in user by validating userId from jwt token and userId in the note
      const fetchedNote = await Note.findById(noteId);

      //convert ObjectId returned by the mongoDb to string for comparision
      const noteUserId = fetchedNote.userId.toString();
      if (noteUserId !== userId) {
        res.status(401).send("Not authorized to update this note");
      }

      const { title, note, tag } = req.body;

      let updatedNote = {};
      if (title) {
        updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { title },
          { new: true }
        );
      }
      if (note) {
        updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { note },
          { new: true }
        );
      }
      if (tag) {
        updatedNote = await Note.findByIdAndUpdate(
          noteId,
          { tag },
          { new: true }
        );
      }

      await updatedNote.save();

      return res
        .status(200)
        .json({ message: "Note updated successfully", updatedNote });

      //unexpected error occured
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error occured while getting existing note",
        errors: [{ msg: error.message }],
      });
    }
  }
);

// Delete an existing notes at DELETE-> http://localhost:5000/api/notes/deleteNote , private route

router.delete(
  "/deleteNote",

  //fetchUser to append userId to the req header
  fetchUser,

  async (req, res) => {
    try {
      const userId = req.userId;
      const noteId = req.query.noteId;

      // checking if noteId is empty in request
      if (!noteId) {
        res.status(400).send("noteId cant be empty string");
      }

      // checking if the note requested belongs to the logged in user by validating userId from jwt token and userId in the note
      const fetchedNote = await Note.findById(noteId);

      //convert ObjectId returned by the mongoDb to string for comparision
      const noteUserId = fetchedNote.userId.toString();
      if (noteUserId !== userId) {
        res.status(401).send("Not authorized to delete this note");
      }

      let deletedNote = {};
      deletedNote = await Note.findByIdAndDelete(noteId);

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { notes: noteId } },
        { new: true }
      );
      await updatedUser.save();

      return res
        .status(200)
        .json({ message: "Note deleted successfully", deletedNote });

      //unexpected error occured
    } catch (error) {
      res.status(500).json({
        message: "Unexpected error occured while getting existing note",
        errors: [{ msg: error.message }],
      });
    }
  }
);

module.exports = router;
