import {useState, useEffect} from "react"
import axios from 'axios'


const PostItem = () => {
    const [posts, setPosts] = useState([])

    const getAllPosts = async() => {
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/posts/")
            .catch((err)=> {
                console.log(err)
            })
        console.log(response.data)
        setPosts(response.data)
    }



    useEffect(()=>{
        getAllPosts();
    }, [])

    return(
        <ul>
            {posts.map((post) => (
                <li
                key = {post.id}
                >   
                    {

                    }
                    Poster : {post.poster} <br />
                    Content : {post.post_content}
                    </li>
            ))}
        </ul>
    )
}

export default PostItem