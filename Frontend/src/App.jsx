import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router"
import Footer from "./Components/Footer"
import Navbar from './Components/Navbar'
import Header from "./Components/header"
import Cards from "./Components/Cards"
import Disclaimer from './Components/Disclaimer'
import Blog from './Components/Blog'
import Sentiment from './Components/Sentiment'

const App = () => {

  return (

    <>
      <Navbar></Navbar>
      <Header></Header>

      <div className="data">
        <Sentiment />
      </div>

      <Cards></Cards>
      <Blog></Blog>
      <Disclaimer></Disclaimer>
      <Footer></Footer>
    </>

  )
}

export default App