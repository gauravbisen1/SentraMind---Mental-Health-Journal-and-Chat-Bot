import React from 'react'
import "./Article.css"
import { Link } from "react-router-dom";

const Article = ({_id , date, title , owner , currentUser , onReadMore }) => {
  const canEdit = currentUser && (currentUser._id === owner || currentUser.role === "admin");
    return (
      
      <div className="blog-container_article">

        <div className="blog-container_article-content">
          
          <p>{date}</p>
          <h3>{title}</h3>

          
          {/* <Link to={`/details/${_id}`} className="read-link">
          Read Full Article
          </Link> */}
          <button className="btn-read read-link" onClick={() => onReadMore(_id)}>
          Read Full Post <i className="fa-solid fa-caret-down"></i>
        </button>
         
          
        </div>
      </div>
    )
  }

export default Article