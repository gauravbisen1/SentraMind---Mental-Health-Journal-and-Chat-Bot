import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Article from './Article'
import "./Sentiment.css"

const Sentiment = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/sentra").then((res) => {
      setAllData(res.data);
    })
  }, []);
  return (
    <>
      <h2 className='text-center'>ALL Data ({allData.length})</h2>

      <div className="articles-grid">
        {allData.map((user) => (
          <Article
           key={user._id}
           _id = {user._id}
           date={user.date} 
           title={user.text}
           owner={user.owner}
            currentUser={currentUser} />
        ))}


      </div>

      <button onClick={() => navigate("/new")}>New Sentiment</button>

    </>

  )
}

export default Sentiment