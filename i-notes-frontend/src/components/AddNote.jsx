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

  const onSubmit = (e) => {
    e.preventDefault();
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
      <h2>Write New Note....</h2>
      <form className="conatiner my-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            value={newNote.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="note" className="form-label">
            Note
          </label>
          <textarea
            className="form-control"
            id="note"
            name="note"
            rows="5"
            onChange={onChange}
            value={newNote.note}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={newNote.tag}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
