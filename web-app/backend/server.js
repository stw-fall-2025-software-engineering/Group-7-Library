// --------------------------------------------- 
// SERVER.JS — UPDATED VERSION FOR GROUP PROJECT
// ---------------------------------------------

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------
// MOCK DATABASE (in-memory)
// ---------------------------------------------
let books = {
    "Clean Code": {
        author: "Robert C. Martin",
        copies: 3,
        reserved: 1,
        waitlist: []
    },
    "Data Structures and Algorithms": {
        author: "Mark Weiss",
        copies: 5,
        reserved: 5,
        waitlist: ["user1@example.com"]
    },
    "Artificial Intelligence Basics": {
        author: "Tom Taulli",
        copies: 2,
        reserved: 0,
        waitlist: []
    }
};

// ---------------------------------------------
// MOCK USER DUE DATES
// ---------------------------------------------
let userDueDates = {
    "user@example.com": [
        { title: "Clean Code", due: "2025-12-10" }
    ]
};

// ---------------------------------------------
// 1. CHECK BOOK AVAILABILITY
// ---------------------------------------------
app.get("/books/availability/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title);

    if (!books[title]) {
        return res.status(404).json({ status: "error", message: "Book not found." });
    }

    const book = books[title];
    const available = book.copies - book.reserved;

    res.json({
        title,
        author: book.author,
        total_copies: book.copies,
        available,
        waitlist_length: book.waitlist.length,
        status: available > 0 ? "available" : "unavailable"
    });
});

// ---------------------------------------------
// 2. RESERVE A BOOK (Adds to waitlist if full)
// ---------------------------------------------
app.post("/books/reserve", (req, res) => {
    const { title, email } = req.body;

    if (!title || !email) {
        return res.status(400).json({ status: "error", message: "Missing title or email." });
    }

    if (!books[title]) {
        return res.status(404).json({ status: "error", message: "Book not found." });
    }

    const book = books[title];
    const available = book.copies - book.reserved;

    if (available > 0) {
        book.reserved++;
        return res.json({
            status: "success",
            message: `Book '${title}' reserved for ${email}.`
        });
    } else {
        book.waitlist.push(email);
        return res.json({
            status: "waitlisted",
            message: `No copies available. ${email} added to waitlist.`
        });
    }
});

// ---------------------------------------------
// 3. GET WAITLIST
// ---------------------------------------------
app.get("/books/waitlist/:title", (req, res) => {
    const title = decodeURIComponent(req.params.title);

    if (!books[title]) {
        return res.status(404).json({ status: "error", message: "Book not found." });
    }

    res.json({
        title,
        waitlist: books[title].waitlist
    });
});

// ---------------------------------------------
// 4. GET DUE DATES
// ---------------------------------------------
app.get("/users/due-dates/:email", (req, res) => {
    const { email } = req.params;

    res.json({
        email,
        dueDates: userDueDates[email] || []
    });
});

// ---------------------------------------------
// 5. FEEDBACK SUBMISSION
// ---------------------------------------------
app.post("/feedback", (req, res) => {
    const { email, message } = req.body;

    console.log("Feedback received:", email, message);

    res.json({
        status: "success",
        message: "Thank you for your feedback!"
    });
});

// ---------------------------------------------
// 6. HELP CONTENT
// ---------------------------------------------
app.get("/help", (req, res) => {
    res.json({
        faqs: [
            "How to check availability?",
            "How to join the waitlist?",
            "How to view due dates?",
        ]
    });
});

// ---------------------------------------------
// START SERVER
// ---------------------------------------------
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Library API running on http://localhost:${PORT}`);
});
