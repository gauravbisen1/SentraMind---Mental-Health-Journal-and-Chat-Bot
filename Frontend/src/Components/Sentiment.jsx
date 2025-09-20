import React,{ useState, useEffect } from 'react'
import axios from "axios"

const Sentiment = () => {
  const [allData , setAllData] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8080/sentra").then((res)=>{
      setAllData(res.data);
    })
  },[]);
  return (
    <>
      <h2>ALL Data ({allData.length})</h2>

      <ul>
        {allData.map(user =>(
          <li >{user.user}  {user.date} {user.text}, {user.sentiment}, {user.__v}</li>
          
        ))}
      </ul>
    </>

  )
}

export default Sentiment