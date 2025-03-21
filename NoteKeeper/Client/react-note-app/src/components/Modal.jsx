import PropTypes from "prop-types";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Modal = ({ handleIsOpen, deletNotes }) => {
  const navigate = useNavigate();

  const handleDeleteNotes = () => {
    deletNotes();
    navigate("/");
    toast.success("Notes deleted Successfully");
  };

  return (
    <div className="c-modal-overlay">
      <div className="c-modal">
        <button className="close-button">x</button>
        <div className="c-modal-content">
          <h2>Delete Note</h2>
          <p>Are you you want to Delete this note?</p>
          <span className="d-flex justify-content-center">
            <button
              className="btn btn-danger me-3"
              onClick={() => handleDeleteNotes()}
            >
              Delete
            </button>
            <button className="btn btn-primary" onClick={() => handleIsOpen()}>
              Cancel
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  handleIsOpen: PropTypes.any.isRequired, // Change to a more specific type if needed
  deletNotes: PropTypes.any.isRequired,
};
export default Modal;
