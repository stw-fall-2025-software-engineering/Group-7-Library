// src/pages/BookAvailability.js
import React, { useState } from "react";
import { API_BASE_URL } from "../api";

function BookAvailability() {
  const [title, setTitle] = useState("");
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  const checkAvailability = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/availability/${encodeURIComponent(title)}`);
      if (!response.ok) throw new Error("Book not found");
      const data = await response.json();
      setBook(data);
      setError("");
    } catch (err) {
      setBook(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Check Book Availability</h2>
      <input
        type="text"
        placeholder="Enter book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={checkAvailability}>Check</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {book && (
        <div>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Total Copies: {book.total_copies}</p>
          <p>Available: {book.available}</p>
          <p>Waitlist Length: {book.waitlist_length}</p>
          <p>Status: {book.status}</p>
        </div>
      )}
    </div>
  );
}

export default BookAvailability;
