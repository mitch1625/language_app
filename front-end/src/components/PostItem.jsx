import {useState, useEffect} from "react"
import axios from 'axios'
import { useOutletContext } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'

const PostItem = () => {
    const [posts, setPosts] = useState([])
    const {user} = useOutletContext()
    const [text, setText] = useState("")
    const [posterLang, setPosterLang] = useState("")

    let token = localStorage.getItem("token")

    const getAllPosts = async() => {
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
            setPosterLang(response.data)
            console.log(`DETECTED LANG:${response.data}`)
    }
 

    const getTranslation = async() => {
        // console.log(posterLang)
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/translate/", {
                params: {
                    'from': posterLang,
                    'body': text
                }
            })
            console.log(response.data)
    }


    useEffect(()=>{
        getAllPosts();
    },[])

    return(
        <>
        {posts.length != 0 ? 
        <ul>
        {posts.map((post) => (
            <Card style={{ width: '18rem', marginBottom:'15px'}} key={post.id}
            onMouseEnter={()=>{setText(post.post_content)
                console.log(text)}}>
            <Card.Body>
                <Card.Title>{post.poster[0]}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{`${post.poster[1].toUpperCase()} ➜ ${post.poster[2].toUpperCase()}`}</Card.Subtitle>
                <Card.Text>
                {post.post_content}
                </Card.Text>
            </Card.Body>
            <Button style={{width:'100px'}}
            onClick={()=>{
                // setText(post.post_content);
                // detectLanguage(text);
                // getTranslation()
                console.log('button disabled')
            }}
            >Translate</Button>
            </Card>
        ))}
        </ul>
        :
        "No posts to show for your learning goals"}
        {/* <button onClick={()=>{
            getTranslation()}}>TEST BUTTON</button> */}
        </>
    )
}

export default PostItem