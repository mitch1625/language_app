import {useState, useEffect} from "react"
import axios from 'axios'
import { useOutletContext } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CommentItem from "./CommentItem"


export const PostItem = () => {
    const [posts, setPosts] = useState([])
    const {user} = useOutletContext()
    const [text, setText] = useState("")
    const [posterLang, setPosterLang] = useState("")
    const [translation, setTranslation] = useState([{}])
    const [postId, setPostId] = useState(null)

    let token = localStorage.getItem("token")

    const getFilteredPosts = async() => {
        axios.defaults.headers.common["Authorization"] = `Token ${token}`
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/posts/filtered/")
            .catch((err)=> {
                console.log(err.response)
            })
        // console.log(response.data)
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
        let response = await axios
            .get("http://127.0.0.1:8000/api/v1/translate/", {
                params: {
                    'from': posterLang,
                    'body': text
                }
            })
            setTranslation([
                ...translation,
               { postId: postId,
                text: response.data}]
            )
            console.log(translation)
    }


    useEffect(()=>{
        getFilteredPosts();
    },[user])


    const onClickHandler = () => {
        detectLanguage(text)
        getTranslation()
    }

    return(
        <>
        <div id='post-component'>
        {posts.length != 0 ? 
        <ul style={{marginTop:'0px', listStyle:'none'}}>
        {posts.map((post) => (
            <Card key={post.id} id={post.id} style={{ width: '50vw', marginBottom:'15px', 
            paddingLeft:'30px',paddingRight:'20px', paddingBottom:'10px', backgroundColor:'#EDF5E1',
            color:'#05386B', borderRadius:25, border:'1px solid dimgrey'
        }}
            onMouseEnter={()=>{setText(post.post_content) ,setPostId(post.id)}}>
            <Card.Body>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <Card.Title style={{fontSize:'30px'}}>{post.poster[0]}</Card.Title>
                <Button className='translate-button' style={{width:'50px', backgroundColor:'#EDF5E1', color:'black', border:'none'}} 
                    onClick={()=>{
                        onClickHandler(post)
                    }}>
                    <img src={"./src/assets/translate.png"} style={{height:'30px', width:'30px'}}/>
                </Button>
                </div>
                <Card.Subtitle className="mb-2 text-muted">{`${post.poster[1].toUpperCase()} ➜ ${post.poster[2].toUpperCase()}`}</Card.Subtitle>
                <Card.Text style={{color:'black', fontSize:'24px'}}>
                {post.post_content}
                <div>
                    {translation.map((item) => (
                        item['postId'] === post.id ? item['text']: null
                        ))}
                </div>
                </Card.Text>
            </Card.Body>
            <CommentItem id={post.id}/>
            </Card>
        ))}
        </ul>
        :
        "No posts to show for your learning goals"}
        </div>
        </>
    )
}
