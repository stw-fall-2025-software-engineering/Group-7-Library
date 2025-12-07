// src/pages/ReserveBook.js
import React, { useState } from "react";
import { API_BASE_URL } from "../api";

function ReserveBook() {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const reserveBook = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/reserve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, email }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error reserving book");
    }
  };

  return (
    <div>
      <h2>Reserve a Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={reserveBook}>Reserve</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ReserveBook;
