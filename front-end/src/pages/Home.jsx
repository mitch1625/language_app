import PostItem from "../components/PostItem"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import UserCheck from "../components/UserCheck"
import NavBar from "../components/NavBar"
export const Home = () => {
    const {user} = useOutletContext()
    return (
        <>
        {user ? 
        <PostItem />
        :
        <UserCheck/>
        }
        </>
    )
}

