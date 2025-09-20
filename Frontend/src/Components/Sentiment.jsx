import React, { useState, useEffect } from 'react'
import axios from "axios"
import Article from './Article'
import "./Cards.css"

const Sentiment = () => {
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/sentra").then((res) => {
      setAllData(res.data);
    })
  }, []);
  return (
    <>
      <h2>ALL Data ({allData.length})</h2>

      <div className="container my-4">
        <div className="row g-4">
          {allData.map((user, index) => (
            <div key={index} className="col-md-3 d-flex align-items-stretch">
              <div className="card w-100 h-100">
                <Article date={user.date} title={user.text} />
              </div>
            </div>
          ))}
        </div>
      </div>



      {/* <ul>
        {allData.map(user => (
          // <li >{user.user}  {user.date} {user.text}, {user.sentiment}, {user.__v}</li>
          <li ><Article imgUrl={"#"} date={user.date} title={user.text} /></li>


        ))}
      </ul> */}

      {/* <Article imgUrl={"#"} date={user.date} title={user.text} /> */}
    </>

  )
}

export default Sentiment