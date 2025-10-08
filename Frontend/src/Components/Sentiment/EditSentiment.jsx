import React, { useEffect, useState } from "react";
import "./EditSentiment.css"

const EditSentiment = ({id , onClose , onSaved}) => {

  const [formData, setFormData] = useState({
    user: "",
    text: "",
    sentiment: ""
  });

  useEffect(() => {
    // Load existing data
    fetch(`http://localhost:8080/sentra/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          user: data.user || "",
          text: data.text || "",
          sentiment: data.sentiment || ""
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/sentra/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const updatedData = await res.json();
      alert("Updated successfully!");
      if (onSaved) onSaved(updatedData); // notify parent of update
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while updating.");
    }
  };

  return (
    <div className="popup-overlay">
    <div className="popup-box">
    <div style={{ padding: "20px" }}>
      <h2>Edit Sentiment</h2>
      <form onSubmit={handleSubmit}>
        <label>User:</label>
        <input
          type="text"
          name="user"
          value={formData.user}
          onChange={handleChange}
        />
        <br />

        <label>Text:</label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
        />
        <br />

        <label>Sentiment:</label>
        <input
          type="text"
          name="sentiment"
          value={formData.sentiment}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Save</button>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Close
      </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default EditSentiment;
