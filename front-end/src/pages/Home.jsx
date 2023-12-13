import PostItem from "../components/PostItem"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import UserCheck from "../components/UserCheck"
import NavBar from "../components/NavBar"
<<<<<<< HEAD
=======
import CreatePostItem from "../components/CreatePostItem"
>>>>>>> fa9053a7b360e13d41acced60c3f15ca79a8aac2
export const Home = () => {
    const {user} = useOutletContext()
    return (
        <>
        {user ? 
<<<<<<< HEAD
        <PostItem />
=======
        <>
        <CreatePostItem/>
        <PostItem />
        </>
>>>>>>> fa9053a7b360e13d41acced60c3f15ca79a8aac2
        :
        <UserCheck/>
        }
        </>
    )
}