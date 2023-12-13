import {PostItem} from "../components/PostItem"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import UserCheck from "../components/UserCheck"
import CreatePostItem from "../components/CreatePostItem"
export const Home = () => {
    const {user} = useOutletContext()
    return (
        <>
        {user ? 
        <>
        <CreatePostItem/>
        <PostItem />
        </>
        :
        <UserCheck/>
        }
        </>
    )
}