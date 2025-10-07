import React, { useState } from "react";
import "./NewSentiment.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewSentiment = ({onClose,onSaved}) => {
  const [form, setForm] = useState({ user: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/sentra", form,{ withCredentials: true });
      // navigate("/"); // go back to home after creating
      onSaved();   // refresh posts
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="popup-overlay">
    <div className="popup-box">
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>Create New Sentiment</h2>
      <input
        type="text"
        name="user"
        placeholder="User"
        value={form.user}
        onChange={handleChange}
      />
      <input
        type="text"
        name="text"
        placeholder="Your thought..."
        value={form.text}
        onChange={handleChange}
      />
      <button className="btn btn-primary" type="submit">Save</button>
      <button className="btn btn-primary" onClick={onClose}>
          Close
      </button>
    </form>
    </div>
    </div>
    
    </>
  );
};

export default NewSentiment;
