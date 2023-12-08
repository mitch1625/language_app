import PostItem from "../components/PostItem"
import SignIn from "../components/SignIn"
import { useState, useEffect } from "react"
import Login from "../components/Login"


export const Home = () => {
    const [user, setUser] = useState(null)
    return (
        <>
        {user ? console.log('yes') : <Login />}
        

        <PostItem/>
        </>
    )
}

