// src/pages/Help.js
import React from "react";

function Help() {
  return (
    <div className="page-container help-page">
      <h1 className="help-title">Help / FAQs</h1>
      <p className="help-intro">
        Here are some quick answers to common questions about the Smart Library system.
      </p>

      <section className="faq-section">
        <div className="faq-item">
          <h3>How do I check availability?</h3>
          <p>
            Go to <strong>Book Availability</strong> in the top menu, type the book title,
            and click <strong>Check</strong>. You’ll see how many copies are available,
            total copies, and whether there’s a waitlist.
          </p>
        </div>

        <div className="faq-item">
          <h3>How do I join the waitlist?</h3>
          <p>
            If a book is fully checked out, the system will show a{" "}
            <strong>Join Waitlist</strong> option (or a waitlist length). Use that option
            to add your name so you’re next in line when a copy is returned.
          </p>
        </div>

        <div className="faq-item">
          <h3>How can I view due dates?</h3>
          <p>
            Due dates for your checked-out books will appear under{" "}
            <strong>Notifications</strong> (and in your library account). You’ll see when
            each book is due and whether anything is overdue.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Help;
