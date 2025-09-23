import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/sentra/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched single article:", data);
        setArticle(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!article) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>{article.text}</h2>
      <p><strong>User:</strong> {article.user}</p>
      <p><strong>Sentiment:</strong> {article.sentiment || "Not analyzed"}</p>
      <p><strong>Date:</strong> {article.date}</p>
    </div>
  );
};

export default Details;
