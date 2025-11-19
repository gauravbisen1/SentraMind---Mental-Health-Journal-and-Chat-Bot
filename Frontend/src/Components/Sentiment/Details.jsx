import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditSentiment from "./EditSentiment"
import "./Details.css"

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://sentra-mind-mental-health-journal-a.vercel.app/";

const Details = ({ id, onClose, onDeleted }) => {
  
  
  const [showPopup, setShowPopup] = useState(false);

  const [article, setArticle] = useState(null);
  const navigate = useNavigate();
  // Get logged-in user (from localStorage after login)
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`${BASE_URL}/sentra/${id}`)
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
      const res = await fetch(`${BASE_URL}/sentra/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (res.ok) {
        alert("Deleted successfully!");
        if (onDeleted) onDeleted();
        onClose(); 
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
    <div className="div">
      <p className="text-muted">{article.date}</p>
      <button 
        type="button" 
        style={{  position:"relative" , bottom:"30px" , left:"" }} className="close" onClick={onClose}><i className="fa-solid fa-xmark fa-lg"></i>
      </button>
      <br />

      <h3 className=""><i className="fa-solid fa-user"></i>  {article.user}</h3>

      <div className="box">
      <h2 >{article.text}</h2>
      <p ><strong>You are feeling : </strong>  &nbsp;{ article.sentiment || "Not analyzed"}</p>
      </div>

      {canEdit && (
        <>
          <button className="editbtn close" onClick={() => setShowPopup(true)}><i className="fa-solid fa-pen-to-square fa-lg"></i></button>

          {showPopup && (
            <EditSentiment onClose={() => setShowPopup(false)} id={article._id} onSaved={(updatedArticle) => {
              setArticle(updatedArticle); // update state so UI refreshes immediately
              setShowPopup(false);        // close popup
            }} />
          )}
          

          <button
          className="close dltBtn"
            onClick={handleDelete}
          >
           <i class="fa-solid fa-trash-can fa-lg"></i>
          </button>
        </>
      )}
    </div>
  );
};

export default Details;
