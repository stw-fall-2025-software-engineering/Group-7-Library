// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Make sure CSS is imported

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
        <li>
          <Link to="/availability">Book Availability</Link>
        </li>
        <li>
          <Link to="/reserve">Reserve Book</Link>
        </li>
        <li>
          <Link to="/waitlist">Waitlist</Link>
        </li>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/help">Help</Link>
        </li>
      </ul>
    </nav>
  );
}
