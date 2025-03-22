import Filter from "../components/Filter";
import NoteCardContainer from "../components/NoteCardContainer";
import PropTypes from "prop-types";

const HomePage = ({ data, loading, handleFilterText }) => {
  return (
    <div>
      <Filter handleFilterText={handleFilterText} />
      <NoteCardContainer notes={data} loading={loading} />
    </div>
  );
};

HomePage.propTypes = {
  data: PropTypes.any.isRequired, // Change to a more specific type if needed
  loading: PropTypes.any.isRequired, // Change to a more specific type if needed
  handleFilterText: PropTypes.any.isRequired, // Change to a more specific type if needed
};

export default HomePage;
