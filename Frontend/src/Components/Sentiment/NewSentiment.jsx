import React, { useState } from "react";
import "./NewSentiment.css";
import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://sentra-mind-mental-health-journal-a.vercel.app/";

const NewSentiment = ({ onClose, onSaved }) => {
  const [form, setForm] = useState({
    user: "",
    text: "",
    sentiment: "",
    date: "",
  });

  const [customSentiment, setCustomSentiment] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSentimentChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setShowCustom(true);
      setForm({ ...form, sentiment: "" });
    } else {
      setShowCustom(false);
      setForm({ ...form, sentiment: value });
    }
  };

  const handleCustomSentimentChange = (e) => {
    setCustomSentiment(e.target.value);
    setForm({ ...form, sentiment: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/sentra`, form, {
        withCredentials: true,
      });
      if (onSaved) onSaved(); // refresh posts
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save sentiment");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <form onSubmit={handleSubmit} className="sentiment-form">
          <h2>Mental Health Journal</h2>
          <p className="subtitle">Share your current thoughts and feelings</p>

          <input
            type="text"
            name="user"
            placeholder="Your Name"
            value={form.user}
            onChange={handleChange}
            required
          />

          <textarea
            name="text"
            placeholder="Write your thoughts..."
            value={form.text}
            onChange={handleChange}
            required
          />

          <label className="sentiment-label">How are you feeling?</label>
          <div className="sentiment-options">
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Happy"
                checked={form.sentiment === "Happy"}
                onChange={handleSentimentChange}
              />
              Happy
            </label>
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Sad"
                checked={form.sentiment === "Sad"}
                onChange={handleSentimentChange}
              />
              Sad
            </label>
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Neutral"
                checked={form.sentiment === "Neutral"}
                onChange={handleSentimentChange}
              />
              Neutral
            </label>
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Other"
                checked={showCustom}
                onChange={handleSentimentChange}
              />
              Other
            </label>
          </div>

          {showCustom && (
            <input
              type="text"
              placeholder="Enter your own sentiment"
              value={customSentiment}
              onChange={handleCustomSentimentChange}
              required
            />
          )}

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <div className="buttons">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSentiment;
