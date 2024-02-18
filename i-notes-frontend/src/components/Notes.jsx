import React, { useContext, useEffect } from "react";
import Note from "./Note";
import NotesContext from "../context/NotesContext";
import AuthContext from "../context/AuthContext";

const Notes = () => {
  const NotesProvider = useContext(NotesContext);
  const AuthProvider = useContext(AuthContext);

  const { notes, updateNotes } = NotesProvider;
  const { loginState } = AuthProvider;

  useEffect(() => {
    updateNotes();
  }, [loginState, updateNotes]);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <h1>Your Notes</h1>
        <button className="btn btn-primary">
          <i className="fa-solid fa-plus"></i> New Note
        </button>
      </div>
      <div className="my-4">
        <div className="row">
          {notes.map((note) => {
            return (
              <div className="col-md-3" key={note._id}>
                <Note note={note} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
