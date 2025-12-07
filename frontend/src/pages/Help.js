// src/pages/Help.js
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";

function Help() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchHelp = async () => {
      const response = await fetch(`${API_BASE_URL}/help`);
      const data = await response.json();
      setFaqs(data.faqs || []);
    };
    fetchHelp();
  }, []);

  return (
    <div>
      <h2>Help / FAQs</h2>
      <ul>
        {faqs.map((faq, index) => (
          <li key={index}>{faq}</li>
        ))}
      </ul>
    </div>
  );
}

export default Help;
