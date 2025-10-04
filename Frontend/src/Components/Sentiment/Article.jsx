import React from 'react'
import "./Article.css"
import { Link } from "react-router-dom";

const Article = ({_id , date, title , owner , currentUser }) => {
  const canEdit = currentUser && (currentUser._id === owner || currentUser.role === "admin");
    return (
      
      <div className="blog-container_article">

        <div className="blog-container_article-content">
          <p>{date}</p>
          <h3>{title}</h3>
          <Link to={`/details/${_id}`} className="read-link">
          Read Full Article
          </Link>
          {/* {canEdit && (
        <>
          <button onClick={() => console.log("Edit", _id)}>Edit</button>
          <button onClick={() => console.log("Delete", _id)}>Delete</button>
        </>
      )} */}
          
        </div>
      </div>
    )
  }

export default Article