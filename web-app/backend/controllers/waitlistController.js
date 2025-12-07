export function joinWaitlist(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required" });
  }

  console.log(`User joined waitlist: ${name}, ${email}`);

  return res.json({
    success: true,
    message: "You have been added to the waitlist!"
  });
}
