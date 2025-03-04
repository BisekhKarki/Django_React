import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [getId, setGetId] = useState(0);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const [toLogin, setToLogin] = useState(false);

  console.log(todo);

  if (toLogin) {
    navigate("/");
  }

  async function getTodo() {
    try {
      const response = await fetch("http://localhost:8000/api/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const values = await response.json();
      if (response.status === 200) {
        setTodo(values);
      } else {
        toast.error("Intenet Problem");
      }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  async function todoList() {
    const data = {
      name: value,
      date: date,
    };
    try {
      const response = await fetch("http://localhost:8000/api/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const values = await response.json();

      if (response.status === 201) {
        setTodo((prev) => [...prev, values]);
        toast.success("Todo Added to the list");
      } else {
        toast.error("Intenet Problem");
      }
    } catch (error) {
      toast.error(error);
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:8000/api/delete/${id}/`, {
        method: "DELETE",
      });

      setTodo((prev) => prev.filter((val) => val.id !== id));
      toast.success("Todo Deleted from the list");
    } catch (error) {
      toast.error(error);
    }
  }

  async function editTodo() {
    try {
      const data = {
        name: value,
        date: date,
      };
      const response = await fetch(`http://localhost:8000/api/edit/${getId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setEditing(false);
        setTodo((prev) => prev.map((val) => (val.id === getId ? data : val)));
        toast.success("Successfully edited");
      } else {
        toast.error("Unable to edit the todo");
      }
    } catch (error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);
    if (!token) {
      setToLogin(true);
      navigate("/");
    }
  }, [toLogin]);

  return (
    <div>
      <h1>Todo List</h1>
      <button
        className="todoButton"
        onClick={() => {
          localStorage.removeItem("Token");
          setToLogin(true);
        }}
      >
        Logout
      </button>
      <div>
        <input
          placeholder="Enter you todo"
          className="todo"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="date"
          className="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {editing ? (
          <button className="todoButton" onClick={() => editTodo()}>
            Edit Todo
          </button>
        ) : (
          <button className="todoButton" onClick={() => todoList()}>
            Add Todo
          </button>
        )}
      </div>
      <div>
        {todo.map((item, index) => (
          <div key={index}>
            <hr />
            <div className="todos">
              <p>Id: {item.id}</p>
              <div key={index}>
                <p>Todo: {item.name}</p>
                <p>Date: {item.date}</p>
              </div>
              <div className="buttons">
                <button
                  className="edit"
                  onClick={() => {
                    setEditing(true);
                    setGetId(item.id);
                    setValue(item.name);
                    setDate(item.date);
                  }}
                >
                  <FaEdit />
                </button>
                <button className="delete" onClick={() => deleteTodo(item.id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Todo;
