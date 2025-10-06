import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewSentiment = () => {
  const [form, setForm] = useState({ user: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/sentra", form,{ withCredentials: true });
      navigate("/"); // go back to home after creating
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="">
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
      <button type="submit">Save</button>
    </form>
    </div>
    </>
  );
};

export default NewSentiment;
