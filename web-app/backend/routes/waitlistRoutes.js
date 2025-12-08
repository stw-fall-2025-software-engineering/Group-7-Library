import express from "express";
const router = express.Router();

// GET WAITLIST FOR ONE BOOK
router.get("/waitlist/:title", (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const books = req.app.locals.books;

  if (!books[title]) {
    return res.status(404).json({ status: "error", message: "Book not found." });
  }

  res.json({
    title,
    waitlist: books[title].waitlist
  });
});

// GET WAITLISTS FOR ALL BOOKS
router.get("/waitlist", (req, res) => {
  const books = req.app.locals.books;
  const result = {};

  for (const title in books) {
    result[title] = books[title].waitlist;
  }

  res.json(result);
});

export default router;
