import React, { useState, useEffect } from "react";

const WaitlistStatus = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [email, setEmail] = useState("");
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data.titles));
  }, []);

  // Fetch waitlist automatically whenever book changes
  useEffect(() => {
    if (!selectedBook) return;
    fetchWaitlist();
  }, [selectedBook]);

  const fetchWaitlist = async () => {
    const res = await fetch(`http://localhost:5000/api/waitlist/${selectedBook}`);
    const data = await res.json();
    setWaitlist(data.waitlist || []);
  };

  const joinWaitlist = async () => {
    if (!selectedBook || !email) return alert("Select a book and enter email.");

    const res = await fetch("http://localhost:5000/books/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: selectedBook, email })
    });

    const data = await res.json();
    alert(data.message);

    // Refresh list after adding new person
    fetchWaitlist();
  };

  return (
    <div>
      <h2>📘 Join or View Waitlist</h2>

      <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)}>
        <option value="">Select a book</option>
        {books.map(b => <option key={b}>{b}</option>)}
      </select>

      <br /><br />

      <input 
        type="email" 
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <br /><br />

      <button onClick={joinWaitlist}>Join Waitlist</button>

      <br /><br />
      
      {/* Visible Waitlist Section */}
      {selectedBook && (
        <div>
          <h3>📋 Current Waitlist for "{selectedBook}"</h3>
          {waitlist.length > 0 ? (
            <ul>
              {waitlist.map((person, index) => (
                <li key={index}>{person}</li>
              ))}
            </ul>
          ) : (
            <p>✔ No one is waiting right now.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default WaitlistStatus;
