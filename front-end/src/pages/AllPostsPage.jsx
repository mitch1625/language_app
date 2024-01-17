import {useState, useEffect} from "react"
import axios from 'axios'
import { useOutletContext } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import CommentItem from "../components/CommentItem"


const AllPostsPage = () => {
    const [posts, setPosts] = useState([])
    const {user} = useOutletContext()
    const [text, setText] = useState("")
    const [posterLang, setPosterLang] = useState("")
    const [translation, setTranslation] = useState([{}])
    const [postId, setPostId] = useState(null)
    
    let token = localStorage.getItem("token")
    
        const getAllPosts = async() => {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            let response = await axios
                .get("http://127.0.0.1:8000/api/v1/posts/allposts/")
                .catch((err)=> {
                    console.log(err.response)
                })
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
            console.log(data)
            setPosterLang(response.data)
        }
        


        const getTranslation = async() => {
            if (translation.filter((obj) => obj.postId === postId).length !== 1) {
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
        }

        
        useEffect(()=>{
            getAllPosts();
        },[user])
        

        const onClickHandler = () => {
            if (translation.filter((obj) => obj.postId === postId).length !== 1) {
            detectLanguage(text)
            getTranslation()
            }
        }

        return(
            <>
            <div className='post-component'>
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
                        <img src={"../src/assets/translate.png"} style={{height:'30px', width:'30px'}}/>
                    </Button>
                    </div>
                    <Card.Subtitle className="mb-2 text-muted">{`${post.poster[1].toUpperCase()} ➜ ${post.poster[2].toUpperCase()}`}</Card.Subtitle>
                    <Card.Text style={{color:'black', fontSize:'24px'}}>
                    {post.post_content}
                    </Card.Text>
                    <Card.Text style={{color:'black', fontSize:'24px', marginTop:'-16px'}}>
                    {translation.map((item) => (
                        item['postId'] === post.id ? item['text']: null
                        ))}
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

export default AllPostsPage