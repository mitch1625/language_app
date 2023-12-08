import PostItem from "../components/PostItem"
import SignIn from "../components/SignIn"
import { useState, useEffect } from "react"
import Login from "../components/Login"


export const Home = () => {
    return (
        <>
        {user ? console.log('LOGGED IN') : <Login />}
        

        <PostItem/>
        </>
    )
}

