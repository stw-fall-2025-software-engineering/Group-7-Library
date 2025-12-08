// src/pages/Feedback.js
import React, { useState } from "react";
import { API_BASE_URL } from "../api"; // if you're using it

function Feedback() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      // whatever you already have – example:
      const res = await fetch(`${API_BASE_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      if (!res.ok) throw new Error("Failed to send feedback");

      setStatus("Thanks for your feedback!");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("Failed to send feedback.");
    }
  };

  return (
    <div className="page-container">
      <h1>Feedback</h1>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <label>
         Email
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
         Feedback
          <textarea
            placeholder="Enter Feedback"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}

export default Feedback;
