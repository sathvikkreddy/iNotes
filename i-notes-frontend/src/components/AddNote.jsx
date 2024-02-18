import React, { useState, useContext } from "react";
import NotesContext from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

export default function AddNote() {
  const NotesProvider = useContext(NotesContext);
  const { addNote } = NotesProvider;
  const navigate = useNavigate();

  const [newNote, setNewNote] = useState({
    title: "",
    note: "",
    tag: "",
  });

  const onSubmit = (e, newNote) => {
    e.preventDefault();
    console.log(newNote);
    addNote(newNote);
    navigate("/");
  };

  const onChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setNewNote({ ...newNote, [field]: value });
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
            placeholder="Untitled Note"
            onChange={onChange}
            value={newNote.title}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control border-0 "
            id="note"
            name="note"
            placeholder="write you note here"
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
            placeholder="add tag"
            onChange={onChange}
            value={newNote.tag}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
