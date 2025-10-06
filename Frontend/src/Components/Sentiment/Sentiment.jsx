import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Article from './Article'
import "./Sentiment.css"
import { AuthContext } from "../../Authentication/AuthProvider";

const Sentiment = () => {
  const { user } = useContext(AuthContext); // access logged-in user
  

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
      <h2 className='text-center'>A Safe Space for Your Thoughts</h2>

      <div className="articles-grid">
        {allData.map((user) => (
          <Article
            key={user._id}
            _id={user._id}
            date={user.date}
            title={user.text}
            owner={user.owner}
            currentUser={currentUser} />
        ))}


      </div>

      {user &&
        <div className="btn">
          <button type="button" class="btn btn-success btn-lg " onClick={() => navigate("/new")}>New Sentiment</button>
        </div>
      }

    </>

  )
}

export default Sentiment