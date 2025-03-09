import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loader = ({ loading }) => {
  return (
    <div>
      {" "}
      <ClipLoader
        loading={loading}
        cssOverride={override}
        size={350}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.any.isRequired, // Change to a more specific type if needed
};

export default Loader;
