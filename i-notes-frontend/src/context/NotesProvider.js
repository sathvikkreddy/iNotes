import React, { useState, useContext } from "react";
import NotesContext from "./NotesContext";
import AuthContext from "../context/AuthContext";

const NotesProvider = ({ children }) => {
  // AuthContext
  const AuthProvider = useContext(AuthContext);
  const { loginState } = AuthProvider;

  const [notes, setNotes] = useState([]);

  //update all notes of user
  const updateNotes = async () => {
    if (!loginState) {
      setNotes([]);
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

      setNotes(responseBody.notes);
      return true;
    } catch (error) {
      console.log(error.message);
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

      await updateNotes();
      console.log("deleted the note " + id);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  return (
    <NotesContext.Provider value={{ notes, updateNotes, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
