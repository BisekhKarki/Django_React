import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState(0);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/book/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setBooks(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/book/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          release_year: releaseYear,
        }),
      });

      const data = await response.json();
      setBooks((prev) => [...prev, data]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/book/${id}/`, {
        method: "DELETE",
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateBook = async (id, release_Year) => {
    try {
      const response = await fetch(`http://localhost:8000/api/book/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          release_year: release_Year,
        }),
      });

      const data = await response.json();
      setBooks((prev) =>
        prev.map((book) => {
          if (book.id === id) {
            return data;
          } else {
            return book;
          }
        })
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Book Website</h1>

      <div>
        <input
          type="text"
          placeholder="Book Title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Release Date.."
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <button onClick={() => createBooks()}>Add Book</button>
      </div>

      {books.map((book, index) => (
        <div key={index}>
          <p>Title: {book.title} </p>
          <p>Release Year: {book.release_year}</p>
          <input
            type="text"
            placeholder="New Title.."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={() => updateBook(book.id, book.release_year)}>
            Change Title
          </button>
          <button onClick={() => deleteBook(book.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}

export default App;
