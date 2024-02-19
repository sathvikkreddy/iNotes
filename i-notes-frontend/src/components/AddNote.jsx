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

  const [isLoading, setIsLoading] = useState(false);
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isNoteValid, setIsNoteValid] = useState(false);

  const validate = (field, value) => {
    if (field === "title") {
      if (value.trim().length > 2) {
        setIsTitleValid(true);
      } else {
        setIsTitleValid(false);
      }
    }
    if (field === "note") {
      if (value.trim().length > 5) {
        setIsNoteValid(true);
      } else {
        setIsNoteValid(false);
      }
    }
  };

  const onSubmit = (e, newNote) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(newNote);
    addNote(newNote);
    navigate("/");
    setIsLoading(false);
  };

  const onChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setNewNote({ ...newNote, [field]: value });
    validate(field, value);
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

        <div className="text-danger mt-5" style={{ fontSize: "15px" }}>
          <p className={`container ${!isTitleValid ? "" : "d-none"}`}>
            * title atlest be of 3 chars long
          </p>
          <p className={`container ${!isNoteValid ? "" : "d-none"}`}>
            * note atlest be of 6 chars long
          </p>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${
            isTitleValid && isNoteValid ? "" : "d-none"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}
