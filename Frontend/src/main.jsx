import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './App.jsx'
import Chatbot from './Chatbot/Chatbot.jsx'
import Details from './Components/Sentiment/Details.jsx'
import Layout from './Layout.jsx'
import NewSentiment from './Components/Sentiment/NewSentiment.jsx'
import EditSentiment from './Components/Sentiment/EditSentiment.jsx'
import Login from './Authentication/Login.jsx'
import SignUp from './Authentication//SignUp.jsx'


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
  },
  { 
    path: "/details/:id/edit", 
    element: <EditSentiment /> 
  },
  {
    path: "/new",
    element: <NewSentiment />
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  }
  
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </StrictMode>,
)
