// src/pages/WaitlistStatus.js
import React, { useState } from "react";
import { API_BASE_URL } from "../api";

function WaitlistStatus() {
  const [title, setTitle] = useState("");
  const [waitlist, setWaitlist] = useState([]);
  const [error, setError] = useState("");

  const fetchWaitlist = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books/waitlist/${encodeURIComponent(title)}`);
      if (!response.ok) throw new Error("Book not found");
      const data = await response.json();
      setWaitlist(data.waitlist);
      setError("");
    } catch (err) {
      setWaitlist([]);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Waitlist Status</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={fetchWaitlist}>Check Waitlist</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {waitlist.length > 0 ? (
        <ul>
          {waitlist.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      ) : (
        <p>No one is currently on the waitlist.</p>
      )}
    </div>
  );
}

export default WaitlistStatus;
