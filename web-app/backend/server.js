// --------------------------------------------- 
// SERVER.JS — FINAL WAITLIST VERSION WITH RETURN FEATURE
// ---------------------------------------------
import 'dotenv/config';
import express from "express";
import cors from "cors";
import waitlistRoutes from "./routes/waitlistRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

// ---------------------------------------------
// MOCK DATABASE (in-memory)
let books = {
    "Clean Code": { author: "Robert C. Martin", copies: 3, reserved: 1, waitlist: [] },
    "Data Structures and Algorithms": { author: "Mark Weiss", copies: 5, reserved: 5, waitlist: ["user1@example.com"] },
    "Artificial Intelligence Basics": { author: "Tom Taulli", copies: 2, reserved: 0, waitlist: [] }
};

app.locals.books = books;

// ---------------------------------------------
// MOCK USER DUE DATES
let userDueDates = {
    "user@example.com": [{ title: "Clean Code", due: "2025-12-10" }]
};

// ---------------------------------------------
// CORE BOOK + WAITLIST FEATURES
app.get("/books", (req, res) => {
  const titles = Object.keys(books);
  res.json({ titles });
});

app.get("/books/availability/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  if (!books[title]) return res.status(404).json({ status: "error", message: "Book not found." });
  const book = books[title];
  const available = book.copies - book.reserved;
  res.json({ title, author: book.author, total_copies: book.copies, available, waitlist_length: book.waitlist.length, status: available > 0 ? "available" : "unavailable" });
});

app.post("/books/reserve", (req, res) => {
  const { title, email } = req.body;
  if (!title || !email) return res.status(400).json({ status: "error", message: "Missing title or email." });
  if (!books[title]) return res.status(404).json({ status: "error", message: "Book not found." });
  const book = books[title];
  const available = book.copies - book.reserved;
  if (available > 0) {
    book.reserved++;
    return res.json({ status: "success", message: `Book '${title}' reserved for ${email}.` });
  } else {
    book.waitlist.push(email);
    return res.json({ status: "waitlisted", message: `No copies available. ${email} added to waitlist.` });
  }
});

// ---------------------------------------------
// RETURN BOOK + NOTIFY WAITLIST (UPDATED)
// ---------------------------------------------
import { sendEmail } from "./utils/mailer.js";

app.post("/books/return", async (req, res) => {
  const { title } = req.body;
  if (!title || !books[title]) return res.status(400).json({ status: "error", message: "Book not found." });

  const book = books[title];

  if (book.reserved > 0) {
    book.reserved--;

    let message = `Book '${title}' returned successfully.`;

    // Notify first person in waitlist if any
    if (book.waitlist.length > 0) {
      const nextUser = book.waitlist.shift(); // remove from waitlist
      book.reserved++; // reserve it for the next user
      message += ` Email notification sent to ${nextUser}.`;

      try {
        await sendEmail(
          nextUser,
          `Book Available: "${title}"`,
          `Good news! The book "${title}" you were waiting for is now available. Please reserve it soon.`
        );
        console.log(`Email sent to ${nextUser}`);
      } catch (err) {
        console.error("Error sending email:", err);
      }
    }

    return res.json({ status: "success", message, waitlist: book.waitlist });
  } else {
    return res.status(400).json({ status: "error", message: "No copies are currently reserved." });
  }
});


// ---------------------------------------------
// EXTRA ROUTES — FEEDBACK & HELP
app.get("/users/due-dates/:email", (req, res) => {
  const { email } = req.params;
  res.json({ email, dueDates: userDueDates[email] || [] });
});

app.post("/feedback", (req, res) => {
  const { email, message } = req.body;
  console.log("Feedback received:", email, message);
  res.json({ status: "success", message: "Thank you for your feedback!" });
});

app.get("/help", (req, res) => {
  res.json({ faqs: ["How to check availability?", "How to join the waitlist?", "How to view due dates?"] });
});

// ---------------------------------------------
// CONNECT WAITLIST ROUTES (/api/...)
app.use("/api", waitlistRoutes);

// ---------------------------------------------
// START SERVER
const PORT = 5000;
app.listen(PORT, () => console.log(`Library API running on http://localhost:${PORT}`));
