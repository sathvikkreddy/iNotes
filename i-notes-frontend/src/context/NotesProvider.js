import React, { useState } from "react";
import NotesContext from "./NotesContext";

const NotesProvider = ({ children }) => {
  const notesInitial = [
    {
      _id: "65c60254998641c3039c5abf",
      userId: "65c5ce5860c5c22a0b101117",
      title: "mcurie's 1st note",
      note: "This is my 1st note, happy to write note on i-notess app",
      tag: "tag1",
      timestamp: "2024-02-09T10:45:40.922Z",
      __v: 0,
    },
    {
      _id: "65c60254998641c3039c5abg",
      userId: "65c5ce5860c5c22a0b101117",
      title: "mcurie's 2nd note",
      note: "This is my 2nd note, happy to write note on i-notess app",
      tag: "tag2",
      timestamp: "2024-02-09T10:45:40.922Z",
      __v: 0,
    },
    {
      _id: "65c60254998641c3039c5abh",
      userId: "65c5ce5860c5c22a0b101117",
      title: "mcurie's 3rd note",
      note: "This is my 3rd note, happy to write note on i-notess app",
      tag: "tag3",
      timestamp: "2024-02-09T10:45:40.922Z",
      __v: 0,
    },
    {
      _id: "65c60254998641c3039c5abi  ",
      userId: "65c5ce5860c5c22a0b101117",
      title: "mcurie's 4th note",
      note: "This is my 4th note, happy to write note on i-notess app",
      tag: "tag4",
      timestamp: "2024-02-09T10:45:40.922Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  const addNote = (newNote) => {
    setNotes(notes.concat(newNote));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
