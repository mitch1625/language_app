import './App.css'
import { Outlet } from "react-router-dom"
import NavBar from './components/NavBar'
import { useState, useEffect } from 'react'
import { api } from './utilities'
import UserCheck from './components/UserCheck'

function App() {
  const [user, setUser] = useState(null)

  const getInfo = async() => {
    let token = localStorage.getItem("token")
    console.log(token)
    if (token){
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/info/")
      // console.log(response.data)
      setUser(response.data.display_name)
    }
  }

  useEffect(()=>{
    getInfo()
  },[user])
  
  return (
    <>
    {user ?
      <>
        <NavBar user={user} setUser={setUser}/>
        <h1> Welcome {user ? user : null}</h1>
      </>
      :
      null
    }

    <Outlet context={{user,setUser}} />
    </>
  )
}

export default App