import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import "./todo.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Todo";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/todos" element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
