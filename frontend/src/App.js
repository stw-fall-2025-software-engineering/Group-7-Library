// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Import all pages
import BookAvailability from "./pages/BookAvailability";
import ReserveBook from "./pages/ReserveBook";
import WaitlistStatus from "./pages/WaitlistStatus";
import Notifications from "./pages/Notifications";
import Feedback from "./pages/Feedback";
import Help from "./pages/Help";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/availability" element={<BookAvailability />} />
            <Route path="/reserve" element={<ReserveBook />} />
            <Route path="/waitlist" element={<WaitlistStatus />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
