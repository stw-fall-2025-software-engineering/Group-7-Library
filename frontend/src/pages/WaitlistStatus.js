// src/pages/WaitlistStatus.js
import React, { useState, useEffect } from "react";

function WaitlistStatus() {
  const [email, setEmail] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);

  // Fetch book titles from backend dynamically
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/books");
        const data = await res.json();
        setBooks(data.titles);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      }
    };
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !bookTitle) {
      setMessage("Please select a book and enter your email.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/books/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: bookTitle, email })
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Join the Waitlist</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Book: </label>
          <select value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required>
            <option value="">-- Select a Book --</option>
            {books.map((title, idx) => (
              <option key={idx} value={title}>{title}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <button type="submit">Join Waitlist</button>
      </form>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default WaitlistStatus;
