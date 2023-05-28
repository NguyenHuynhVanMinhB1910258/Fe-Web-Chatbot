import React,{useEffect,useStatee} from "react";
import "./Modal.scss";
export default function Modal({ modalIsOpen, stopListening }) {
 
  return (
    <>
      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div
              className={`microphone-icon `}
            >
              <i
                className="fa-solid fa-microphone"
              ></i>
            </div>
            <button onClick={stopListening}>Close Modal</button>
          </div>
        </div>
      )}
    </>
  );
}
