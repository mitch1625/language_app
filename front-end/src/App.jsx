import './App.css'
import { Outlet } from "react-router-dom"
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'
import SignUpPage from './pages/SignUpPage'
import { api } from './utilities'

function App() {
  const [user, setUser] = useState(null)

  const getInfo = async() => {
    let token = localStorage.getItem("token")
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`;
      let response = await api.get("users/");
      setUser(response.data.email)
    }
  }

  useEffect(()=>{
    getInfo()
  },[])
  
  return (
    <>
      <NavBar />
      <Outlet setUser={setUser} />
    </>
  )
}

export default App
