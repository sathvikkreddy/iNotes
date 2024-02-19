import React, { useState, useContext } from "react";
import NotesContext from "../context/NotesContext";
import { useNavigate } from "react-router-dom";

export default function EditNote() {
  const NotesProvider = useContext(NotesContext);
  const { editNote, currentNote } = NotesProvider;
  const navigate = useNavigate();

  const [newNote, setNewNote] = useState({
    title: currentNote.title,
    note: currentNote.note,
    tag: currentNote.tag,
  });

  const [isChanged, setIsChanged] = useState(false);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isNoteValid, setIsNoteValid] = useState(true);

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
    editNote(currentNote._id, newNote);
    navigate("/");
  };

  const onChange = (e) => {
    let field = e.target.name;
    let value = e.target.value;
    setNewNote({ ...newNote, [field]: value });
    setIsChanged(true);
    validate(field, value);
  };

  return (
    <div className="container my-3">
      <form className="conatiner my-3" onSubmit={(e) => onSubmit(e, newNote)}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control border-0 border-bottom fw-bold"
            id="title"
            name="title"
            placeholder="Untitled"
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
            placeholder="write note here"
            onChange={onChange}
            value={newNote.note}
          ></textarea>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control border-0 border-top fst-italic"
            id="tag"
            name="tag"
            onChange={onChange}
            placeholder="#tag"
            value={newNote.tag}
          />
        </div>

        <div className="fs-6 text-danger">
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
            isChanged && isNoteValid && isTitleValid ? "" : "d-none"
          }`}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
