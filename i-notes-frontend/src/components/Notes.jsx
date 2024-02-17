import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";
import Note from "./Note";
import { Link } from "react-router-dom";

const Notes = () => {
  const { notes } = useContext(NotesContext);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between">
        <h1>Your Notes</h1>
        <Link className="nav-link" to="/addnote">
          Add new note
        </Link>
      </div>
      <div className="my-4">
        <div className="row">
          {notes.map((note) => {
            return (
              <div className="col-md-3" key={note.tag}>
                <Note title={note.title} note={note.note} tag={note.tag} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
