import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Chatbot from './Chatbot/Chatbot.jsx'
import Details from './Components/Sentiment/Details.jsx'
import Layout from './Layout.jsx'
import Disclaimer from './Components/Disclaimer'
import Sentiment from './Components/Sentiment.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />
  },
  {
    path: "/details/:id",
    element: <Details/>
  }
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
