import React, { useState, useContext } from "react";
import NotesContext from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

export default function EditNote() {
  const NotesProvider = useContext(NotesContext);
  const { editNote, currentNote } = NotesProvider;
  const navigate = useNavigate();

  const [newNote, setNewNote] = useState({
    title: currentNote.title,
    note: currentNote.title,
    tag: currentNote.tag,
  });

  const [isChanged, setIsChanged] = useState(false);

  const onSubmit = (e, newNote) => {
    e.preventDefault();
    editNote(currentNote._id, newNote);
    navigate("/");
  };

  const onChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setNewNote({ ...newNote, [field]: value });
    setIsChanged(true);
  };

  return (
    <div className="container my-3">
      <form className="conatiner my-3" onSubmit={(e) => onSubmit(e, newNote)}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control border-0 border-bottom"
            id="title"
            name="title"
            onChange={onChange}
            value={newNote.title}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control border-0 "
            id="note"
            name="note"
            rows="5"
            onChange={onChange}
            value={newNote.note}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control border-0 border-top"
            id="tag"
            name="tag"
            onChange={onChange}
            value={newNote.tag}
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${isChanged ? "" : "d-none"}`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
