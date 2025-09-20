import React from 'react'
import "./Cards.css"
import  Article  from './Article'


const Cards = () => {
  return (
    <div className="blog section__padding">
    <div className="blog-heading">
      <h1 className="gradient__text">
      A lot is on your mind, we’re here to listen.
      </h1>
    </div>
    <div className="blog-container">
      <div className="blog-container_groupA">
        <Article imgUrl={"https://t3.ftcdn.net/jpg/04/84/87/34/360_F_484873483_hg1ofIdXbMha5lKEDG3hJBrwKh1oikTq.jpg"} date="Jul 05,2022" title="Where technology meets mental wellness." />
      </div>
      <div className="blog-container_groupB">
        <Article imgUrl={"#"} date="Jul 05,2022" title="Where technology meets mental wellness." />
        <Article imgUrl={"#"} date="Jul 05,2022" title="Where technology meets mental wellness." />
        <Article imgUrl={"#"} date="Jul 05,2022" title="Where technology meets mental wellness." />
        <Article imgUrl={"#"} date="Jul 05,2022" title="Where technology meets mental wellness." />
      </div>
    </div>
  </div>
  )
}

export default Cards