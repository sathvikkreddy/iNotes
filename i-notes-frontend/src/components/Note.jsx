import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";

export default function Note(props) {
  const NotesProvider = useContext(NotesContext);
  const { deleteNote } = NotesProvider;

  const { note } = props;
  const handleDelete = (id) => {
    deleteNote(id);
  };

  const handleNoteClick = (note) => {
    console.log("clicked on the note " + note._id);
  };

  return (
    <div>
      <div className="card my-3 border " onClick={() => handleNoteClick(note)}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.note}</p>
          <div className="d-flex justify-content-between">
            {note.tag && <p className="card-text">{note.tag}</p>}
            <i
              role="button"
              className="fa-solid fa-trash cursor-pointer"
              onClick={() => handleDelete(note._id)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
