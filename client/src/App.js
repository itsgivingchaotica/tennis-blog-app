import React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./styles.scss"
//https://reactrouter.com/en/main/start/tutorial

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/posts/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

function App() {
  return (
    <div className = "app">
    <div className = "container">
      <RouterProvider router = {router}/>
    </div>
    </div>
  );
}

export default App;
