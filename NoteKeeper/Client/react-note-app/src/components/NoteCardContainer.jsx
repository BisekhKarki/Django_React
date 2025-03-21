import Loader from "./Loader";
import NoteCard from "./NoteCard";
import PropTypes from "prop-types";
import "../index.css";

const NoteCardContainer = ({ notes, loading }) => {
  return (
    <div className="container">
      <div className="note-has-grid row notes">
        {loading && <Loader loading={loading} />}
        {notes.map((d, index) => (
          <div key={index}>
            <NoteCard note={d} />
          </div>
        ))}
      </div>
    </div>
  );
};

NoteCardContainer.propTypes = {
  notes: PropTypes.any.isRequired, // Change to a more specific type if needed
  loading: PropTypes.any.isRequired, // Change to a more specific type if needed
};

export default NoteCardContainer;
