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

function App() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/notes/")
      .then((res) => {
        setNotes(res.data.data);
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
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log(notes);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<HomePage data={notes} loading={isLoading} />} />
        <Route path="/add-notes" element={<AddNotes addNote={addNote} />} />
        <Route path="/edit-note" element={<EditNotePage />} />
        <Route path="/notes/:slug" element={<NotePage />} />
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
