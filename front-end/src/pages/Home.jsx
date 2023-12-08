import PostItem from "../components/PostItem"
import { useState, useEffect } from "react"
import WelcomeComponent from "../components/WelcomeComponent"

export const Home = () => {
    return (
        <>
        
        <WelcomeComponent/>
        <PostItem/>
        </>
    )
}

