import { useNavigate, useParams } from "react-router-dom";
import "./AddNotes.css";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const EditNotePage = ({ updateNotes }) => {
  const { slug } = useParams();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/notes/${slug}/`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setBody(res.data.body);
        setCategory(res.data.category);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [slug]);

  const updateNoteObject = {
    title: title,
    body: body,
    category: category,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !body && !category) {
      return;
    }

    updateNotes(updateNoteObject, slug);
    navigate(`/notes/${slug}`);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h5>Update Notes</h5>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="Enter note's title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Content
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={4}
          placeholder="Enter note's content"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          Notes category
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          style={{ height: "40px" }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option selected>Pick a category</option>
          <option value="BUSINESS">Business</option>
          <option value="PERSONAL">Personal</option>
          <option value="IMPORTANT">Important</option>
        </select>
      </div>

      <button
        className="btn btn-primary d-flex justify-content-center"
        style={{ width: "100%" }}
      >
        Edit Note
      </button>
    </form>
  );
};

EditNotePage.propTypes = {
  updateNotes: PropTypes.any.isRequired, // Change to a more specific type if needed
};

export default EditNotePage;
