import React from "react";

export default function Note(props) {
  return (
    <div>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.note}</p>
          {props.tag && <p className="card-text">{props.tag}</p>}
        </div>
      </div>
    </div>
  );
}
