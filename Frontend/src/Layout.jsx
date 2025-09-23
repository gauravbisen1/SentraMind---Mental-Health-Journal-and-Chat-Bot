import React from 'react'
import { Outlet } from "react-router";
import Footer from "./Components/Footer"
import Navbar from './Components/Navbar'
import Disclaimer from './Components/Disclaimer';
import Header from "./Components/header"
import Blog from './Components/Blog'
import Cards from "./Components/Cards"
import Sentiment from './Components/Sentiment';



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