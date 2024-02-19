import React, { useState, useContext } from "react";
import NotesContext from "./NotesContext";
import AuthContext from "../context/AuthContext";

const NotesProvider = ({ children }) => {
  // AuthContext
  const AuthProvider = useContext(AuthContext);
  const { loginState } = AuthProvider;

  const [notes, setNotes] = useState([]);
  const [noOfNotes, setNoOfNotes] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);

  //update all notes of user
  const updateNotes = async () => {
    if (!loginState) {
      setNotes([]);
      setNoOfNotes(0);
      return false;
    }
    const getAllNotesUrl = "http://localhost:5000/api/notes/getAllNotes";
    const headers = {
      "JWT-Token": sessionStorage.getItem("jwtToken"),
      "Content-Type": "application/json",
    };
    try {
      const response = await fetch(getAllNotesUrl, {
        method: "GET", // or 'GET', 'PUT', etc.
        headers: headers,
      });

      const responseBody = await response.json();

      console.log(responseBody.notes.length);
      setNotes(responseBody.notes);
      setNoOfNotes(notes.length);
      return true;
    } catch (error) {
      console.log(error.message);
    }
  };

  // add a note

  const addNote = async (note) => {
    console.log("entered the addNote in notes context");
    const addNoteUrl = "http://localhost:5000/api/notes/addNote";
    const headers = {
      "JWT-Token": sessionStorage.getItem("jwtToken"),
      "Content-Type": "application/json",
    };
    const requestBody = {
      title: note.title,
      note: note.note,
      tag: note.tag === "" ? "general" : note.tag,
    };
    try {
      const response = await fetch(addNoteUrl, {
        method: "POST", // or 'GET', 'PUT', etc.
        headers: headers,
        body: JSON.stringify(requestBody),
      });
      const responseBody = await response.json();
      const noteId = responseBody.noteId;
      console.log("added the note " + noteId);
      await updateNotes();
      console.log("updated notes");
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  // edit a note
  const editNote = async (noteId, newNote) => {
    console.log("entered the editNote in notes context");
    const editNoteUrl = `http://localhost:5000/api/notes/updateNote?noteId=${noteId}`;
    const headers = {
      "JWT-Token": sessionStorage.getItem("jwtToken"),
      "Content-Type": "application/json",
    };
    const requestBody = {
      title: newNote.title,
      note: newNote.note,
      tag: newNote.tag === "" ? "general" : newNote.tag,
    };
    try {
      await fetch(editNoteUrl, {
        method: "PUT", // or 'GET', 'PUT', etc.
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      console.log("edited the note " + noteId);
      await updateNotes();
      console.log("updated notes");
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  // delete a note
  const deleteNote = async (id) => {
    console.log("entered the deleteNote in notes context");
    const deleteNoteUrl = `http://localhost:5000/api/notes/deleteNote?noteId=${id}`;
    const headers = {
      "JWT-Token": sessionStorage.getItem("jwtToken"),
      "Content-Type": "application/json",
    };
    try {
      await fetch(deleteNoteUrl, {
        method: "DELETE", // or 'GET', 'PUT', etc.
        headers: headers,
      });
      console.log("deleted the note " + id);
      await updateNotes();
      console.log("updated notes");
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        noOfNotes,
        updateNotes,
        deleteNote,
        addNote,
        editNote,
        currentNote,
        setCurrentNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
