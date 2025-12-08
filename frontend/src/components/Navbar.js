import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Navbar() {
  return (
    <nav>
      <ul>
        {/* Logo / Title */}
        <li>
          <Link to="/" className="logo">
            Library System
          </Link>
        </li>

        {/* Navigation Links */}
        <li><Link to="/availability">Book Availability</Link></li>
        <li><Link to="/reserve">Reserve Book</Link></li>
        <li><Link to="/waitlist">Waitlist</Link></li>
        <li><Link to="/return">Return Book</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/help">Help</Link></li>
      </ul>
    </nav>
  );
}
