import React from 'react'
import  ArticleCards  from './ArticleCard'

import "./Cards.css"

const Blog = () => {
  return (
    <div className="gpt3__blog section__padding">
      <div className="gpt3__blog-heading">
        <h1 className="gradient__text">
        A lot is on your mind, we’re here to listen.
        </h1>
      </div>
      <div className="gpt3__blog-container">
        <div className="gpt3__blog-container_groupA">
          <ArticleCards imgUrl="https://t3.ftcdn.net/jpg/04/84/87/34/360_F_484873483_hg1ofIdXbMha5lKEDG3hJBrwKh1oikTq.jpg" date="Jul 05,2022" title="Where technology meets mental wellness." />
        </div>
        <div className="gpt3__blog-container_groupB">
          <ArticleCards imgUrl="" date="Jul 05,2022" title="Where technology meets mental wellness." />
          <ArticleCards imgUrl="" date="Jul 05,2022" title="Where technology meets mental wellness." />
          <ArticleCards imgUrl="" date="Jul 05,2022" title="Where technology meets mental wellness." />
          <ArticleCards imgUrl="" date="Jul 05,2022" title="Where technology meets mental wellness." />
        </div>
      </div>
    </div>
  )
}

export default Blog
