import NoteCard from "./NoteCard";

const NoteCardContainer = ({ notes }) => {
  return (
    <div className="container">
      <div className="note-has-grid row">
        {notes &&
          notes.map((d, index) => (
            <div key={index}>
              <NoteCard note={notes} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NoteCardContainer;
