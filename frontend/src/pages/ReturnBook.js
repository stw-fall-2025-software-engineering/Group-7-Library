import React, { useState, useEffect } from "react";

const ReturnBook = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then(res => res.json())
      .then(data => setBooks(data.titles))
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  const returnBook = async () => {
    if (!selectedBook) return alert("Select a book to return.");
    const res = await fetch("http://localhost:5000/books/return", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: selectedBook })
    });
    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>📕 Return a Book</h2>
      <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)}>
        <option value="">Select a book</option>
        {books.map(b => <option key={b}>{b}</option>)}
      </select>
      <br /><br />
      <button onClick={returnBook}>Return Book</button>
    </div>
  );
};

export default ReturnBook;
