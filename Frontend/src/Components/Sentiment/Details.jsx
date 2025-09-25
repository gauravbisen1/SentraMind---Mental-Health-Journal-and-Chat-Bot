import React, { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>{article.text}</h2>
      <p><strong>User:</strong> {article.user}</p>
      <p><strong>Sentiment:</strong> {article.sentiment || "Not analyzed"}</p>
      <p><strong>Date:</strong> {article.date}</p>
      <button onClick={() => navigate(`/details/${id}/edit`)}>edit</button><br /><br />
      <button onClick={handleDelete} style={{ color: "white", background: "red", padding: "5px 10px" }}>delete</button>
    </div>
  );
};

export default Details;
