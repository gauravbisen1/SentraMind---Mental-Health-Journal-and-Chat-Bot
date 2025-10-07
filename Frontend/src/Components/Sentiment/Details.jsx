import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditSentiment from "./EditSentiment"

const Details = ({ id, onClose }) => {
  const [showPopup, setShowPopup] = useState(false);

  // const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  // Get logged-in user (from localStorage after login)
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:8080/sentra/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched single article:", data);
        setArticle(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  //delete
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this sentiment?")) return;

    try {
      const res = await fetch(`http://localhost:8080/sentra/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        alert("Deleted successfully!");
        navigate("/");   // ✅ go back to homepage (Sentiment list)
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting.");
    }
  };

  if (!article) return <p>Loading...</p>;

  // ✅ check authorization
  const canEdit =
    currentUser &&
    (currentUser._id === article.owner || currentUser.role === "admin");

  return (
    <div style={{ padding: "20px" }}>
      <h2>{article.text}</h2>
      <p><strong>User:</strong> {article.user}</p>
      <p><strong>Sentiment:</strong> {article.sentiment || "Not analyzed"}</p>
      <p><strong>Date:</strong> {article.date}</p>

      {canEdit && (
        <>
          <button onClick={() => setShowPopup(true)}>Edit</button>

          {showPopup && (
            <EditSentiment onClose={() => setShowPopup(false)} id={article._id}  onSaved={(updatedArticle) => {
              setArticle(updatedArticle); // update state so UI refreshes immediately
              setShowPopup(false);        // close popup
            }} />
          )}
          <br />
          <br />
          <button
            onClick={handleDelete}
            style={{ color: "white", background: "red", padding: "5px 10px" }}
          >
            Delete
          </button>
        </>
      )}
      <button type="button" onClick={onClose}>Close</button>
    </div>
  );
};

export default Details;
