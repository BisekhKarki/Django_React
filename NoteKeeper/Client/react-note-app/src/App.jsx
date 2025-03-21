import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// import NavBar from "./components/Navbar";
import "./index.css";
import HomePage from "./pages/HomePage";
import MainLayouts from "./layouts/MainLayouts";
import AddNotes from "./pages/AddNotePage";
import NotePage from "./pages/NotePage";
import EditNotePage from "./pages/EditNotePage";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/notes/")
      .then((res) => {
        setNotes(res.data.data);
        toast.success("A new note has been added");
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const addNote = (data) => {
    axios
      .post(`http://localhost:8000/notes/`, data)
      .then((res) => {
        setNotes([...notes, res.data]);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log(notes);

  const updateNotes = (data, slug) => {
    axios
      .put(`http://localhost:8000/notes/${slug}/`, data)
      .then((res) => {
        console.log(res.data);
        toast.success("Notes updated Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const deletNotes = (slug) => {
    axios.delete(`http://localhost:8000/notes/${slug}/`).catch((error) => {
      toast.error(error.message);
    });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<HomePage data={notes} loading={isLoading} />} />
        <Route path="/add-notes" element={<AddNotes addNote={addNote} />} />
        <Route
          path="/edit-note/:slug"
          element={<EditNotePage updateNotes={updateNotes} />}
        />
        <Route
          path="/notes/:slug"
          element={<NotePage deletNotes={deletNotes} />}
        />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
    // <>
    //   <NavBar />
    // </>
  );
}

export default App;
