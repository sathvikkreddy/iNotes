import React from "react";
import { Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

export default function Home() {
  // const AuthProvider = useContext(AuthContext);
  // const { loginState } = AuthProvider;

  return (
    <div className="container my-5">
      <h1>Welcome to iNotes!</h1>
      <p>
        Your ultimate destination for effortless note-taking and secure storage
        in the cloud. Say goodbye to scattered sticky notes and hello to
        organized brilliance. Whether you're jotting down ideas, drafting to-do
        lists, or capturing moments of inspiration, iNotes has you covered.
      </p>
      <p>
        With our state-of-the-art encryption technology, your notes are
        safeguarded with the utmost security. Rest assured that your thoughts
        and musings remain private and accessible only to you.
      </p>
      <p>
        Get ready to streamline your life and boost productivity like never
        before. Start crafting your digital notebook today with iNotes. Welcome
        aboard!
      </p>
      <div className=" container-sm d-flex justify-content-between">
        <Link to="/addNotes">New Note</Link>
        <Link to="/notes">View Notes</Link>
      </div>
    </div>
  );
}
