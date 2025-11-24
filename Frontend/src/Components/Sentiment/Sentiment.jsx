import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Article from './Article'
import "./Sentiment.css"
import { AuthContext } from "../../Authentication/AuthProvider";
import NewSentiment from "./NewSentiment"
import Details from './Details';

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://sentramind-backend.onrender.com";

const Sentiment = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null); // track selected article
  const { user } = useContext(AuthContext); // access logged-in user

  const fetchData = () => {
    axios.get(`${BASE_URL}/sentra`).then((res) => {
      setAllData(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  // useEffect(() => {
  //   axios.get(`${BASE_URL}`,{withCredentials: true}).then((res) => {
  //     setAllData(res.data);
  //   })
  // }, []);
  return (
    <>
      <h2 className='text-center  gradient__text'>A Safe Space for Your Thoughts</h2>

      <div className={`split-layout ${selectedArticle ? "with-details" : ""}`}>
        {/* left - all artcle  */}
        <div className={`articles-grid ${selectedArticle ? "half-width" : "full-width"}`}>
          {Array.isArray(allData) && allData.map((user) => (
            <Article
              key={user._id}
              _id={user._id}
              user={user.user}
              date={user.date}
              title={user.text}
              owner={user.owner}
              currentUser={currentUser}
              // pass handler
              onReadMore={() => setSelectedArticle(user._id)} />
          ))}


        </div>

        {/* RIGHT → Selected article details */}
        {selectedArticle && (
          <div className="article-detail">
            <Details id={selectedArticle} onClose={() => setSelectedArticle(null)} onDeleted={fetchData} />
          </div>
        )}
      </div>
      {user &&
        <div className="btn">
          <button type="button" className="btn btn-success btn-lg " onClick={() => setShowPopup(true)}>New Sentiment</button>
        </div>
      }

      {showPopup && (
        <NewSentiment onClose={() => setShowPopup(false)} onSaved={fetchData} />
      )}

    </>

  )
}

export default Sentiment