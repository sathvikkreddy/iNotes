import React, { useContext } from "react";
import NotesContext from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

export default function Note(props) {
  const navigate = useNavigate();

  const NotesProvider = useContext(NotesContext);
  const { deleteNote, setCurrentNote } = NotesProvider;

  const { note } = props;
  const handleDelete = (e, id) => {
    deleteNote(id);
    e.stopPropagation();
  };

  const handleNoteClick = (note) => {
    console.log("clicked on the note " + note._id);
    setCurrentNote(note);
    console.log(note);
    navigate("/editNote");
  };

  return (
    <div>
      <div className="card my-3 border " onClick={() => handleNoteClick(note)}>
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.note.trim().length < 20
              ? note.note
              : note.note.slice(0, 20) + ". . ."}
          </p>
          <div className="d-flex justify-content-between">
            {note.tag && (
              <p className="card-text fst-italic">{`#${note.tag}`}</p>
            )}
            <i
              role="button"
              className="fa-solid fa-trash cursor-pointer"
              onClick={(e) => handleDelete(e, note._id)}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}
