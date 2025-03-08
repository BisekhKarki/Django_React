import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/Navbar";
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

  useEffect(() => {
    axios
      .get("http://localhost:8000/notes/")
      .then((res) => {
        setNotes(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<HomePage data={notes} />} />
        <Route path="/add-notes" element={<AddNotes />} />
        <Route path="/edit-note" element={<EditNotePage />} />
        <Route path="/note-detail" element={<NotePage />} />
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
