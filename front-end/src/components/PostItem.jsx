import {useState, useEffect} from "react"
import axios from 'axios'
import { useOutletContext } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CommentItem from "./CommentItem"
import CardComponent from "./CardComponent";

export const PostItem = () => {
    const [posts, setPosts] = useState([])
    const {user} = useOutletContext()
    const [text, setText] = useState("")
    const [posterLang, setPosterLang] = useState("")
    const [translation, setTranslation] = useState([])
    const [postId, setPostId] = useState(null)

    let token = localStorage.getItem("token")

    const getFilteredPosts = async() => {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/posts/filtered/")
            .catch((err)=> {
                console.log(err.response)
            })
        console.log(response.data)
        setPosts(response.data)
    }

    const detectLanguage = async() => {
        let data = {
            "Text": text
        }
        let response = await axios
            .post("http://127.0.0.1:8000/api/v1/translate/detect/", data)
            .catch((err) =>{
                if (err.response.status === 429){
                    alert('Basic users only get 3 translations a day')
                }
            })
            setPosterLang(response.data)
    }
 


    const getTranslation = async() => {
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/translate/", {
                params: {
                    'from': posterLang,
                    'body': text
                }
            })
            .catch((err) =>{
                if (err.response.status === 429){
                    return
                }   
            }) 
            setTranslation([
                ...translation,
               { postId: postId,
                text: response.data}]
            )
    }

    useEffect(()=> {
        if (translation.some(obj => obj.id === postId)) {
            getTranslation()
        }
    },[translation, postId])

    useEffect(()=>{
            getFilteredPosts();
    },[user])

    const onClickHandler = (info, postId) => {
        setText(info['post_content'])
        detectLanguage()
        setPostId(postId)
        getTranslation()
    }

    const renderTranslations = (postId) => {
        const postTranslation = translation.find((post) =>post.id === postId)
        return postTranslation ? postTranslation.text : null
    }

    return(
        <>
        <div id='post-component'>
        <button onClick={()=>console.log(translation)}>CLICK ME</button>
        {posts.map((post) => (
            <CardComponent key={post.id} id={post.id} className="post-card"
            post = {post}
            poster = {post.poster[0]}
            postContent = {post.post_content}
            languages = {`${post.poster[1].toUpperCase()} ➜ ${post.poster[2].toUpperCase()}`}
            translation = {translation.map((item) => (
                item.postId === post.id ? item['text']: null
                ))}
            onClickHandler = {onClickHandler}
            postId = {post.id}
            >
            </CardComponent>
        ))}
        </div>
        </>
    )
}
