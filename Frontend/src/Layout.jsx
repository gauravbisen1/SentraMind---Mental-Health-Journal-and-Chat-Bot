import React from 'react'
import { Outlet } from "react-router";
import Footer from "./Components/Footer/Footer"
import Navbar from './Components/Navbar/Navbar'
import Disclaimer from './Components/Home/Disclaimer';
import Header from "./Components/Home/header"
import Blog from './Components/Home/Blog'
import Cards from "./Components/Home/Cards"
import Sentiment from './Components/Sentiment/Sentiment';



const Layout = () => {
  return (
    <>
        <Navbar/>
        <Header/>
        <Sentiment/>
        <Outlet/>
        <Cards/>
        <Blog/>
        <Disclaimer/>
        <Footer/>
    </>
  )
}

export default Layout