import PostItem from "../components/PostItem"
import SignIn from "../components/SignIn"
import { useState, useEffect } from "react"

export const Home = () => {
    const [user, setUser] = useState(null)
    return (
        <>
        Home Page
        <PostItem/>
        </>
    )
}

