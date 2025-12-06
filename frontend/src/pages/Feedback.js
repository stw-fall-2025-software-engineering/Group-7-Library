// src/pages/Feedback.js
import React, { useState } from "react";
import { API_BASE_URL } from "../api";

function Feedback() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const submitFeedback = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await response.json();
      setStatus(data.message);
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("Failed to send feedback.");
    }
  };

  return (
    <div>
      <h2>Feedback</h2>
      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        placeholder="Your Feedback"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={submitFeedback}>Submit</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Feedback;
