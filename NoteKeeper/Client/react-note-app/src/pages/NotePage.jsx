import { useEffect, useState } from "react";
import "./NotePage.css";
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import Modal from "../components/Modal";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FormatDate } from "../components/FormatDate";
import PropTypes from "prop-types";

const NotePage = ({ deletNotes }) => {
  const [note, setNote] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { slug } = useParams();

  const handleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/notes/${slug}`)
      .then((res) => {
        setNote(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="note-container">
        <h3 className="title">{note.title}</h3>
        <span className="d-flex justify-content-center">
          <p className="note-date font-12 text-muted me-5">
            {" "}
            created: {FormatDate(note.created)}
          </p>
          <p className="note-date font-12 text-muted me-5">
            last updated: {FormatDate(note.updated)}
          </p>
        </span>
        <span className="button-group">
          <Link to={`/edit-note/${slug}`}>
            <button className="btn btn-primary">
              <FiEdit />
              <span>Edit</span>
            </button>
          </Link>
          <button className="btn btn-danger" onClick={() => handleIsOpen()}>
            <BiSolidTrashAlt />
            <span>Delete</span>
          </button>
        </span>
        <p className="description">{note.body}</p>
      </div>
      {isOpen && (
        <Modal
          handleIsOpen={handleIsOpen}
          deletNotes={() => deletNotes(slug)}
        />
      )}
    </>
  );
};

NotePage.propTypes = {
  deletNotes: PropTypes.any.isRequired, // Change to a more specific type if needed
};

export default NotePage;
