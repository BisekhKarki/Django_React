import PropTypes from "prop-types";

const Filter = ({ handleFilterText }) => {
  return (
    <div className="container" style={{ width: "500px", margin: "20px auto" }}>
      <select
        className="form-select"
        aria-label="Default select example"
        style={{ height: "50px" }}
        onChange={(e) => handleFilterText(e.target.value)}
      >
        <option selected>Filter Notes</option>
        <option value="BUSINESS">Business</option>
        <option value="PERSONAL">Personal</option>
        <option value="IMPORTANT">Important</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  handleFilterText: PropTypes.any.isRequired, // Change to a more specific type if needed
};

export default Filter;
