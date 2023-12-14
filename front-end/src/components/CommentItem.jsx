import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';


const CommentItem = ({id}) => {

  const [commentText, setCommentText] = useState("")  
  const [postId, setPostId] = useState(null)
  const {user} = useOutletContext
  const [renderComment, setRenderComment] = useState([])
  const [open, setOpen] = useState(false)



  const getComments = async() => {
    let response = await axios 
      .get(`http://127.0.0.1:8000/api/v1/comments/post/${id}`)
      .catch((err)=>{
        console.log(err)
      })
      setRenderComment(response.data)
      // console.log(response.data)
  }


  const createPost = async (e) => {
    e.preventDefault()
    let data = {
      'post': postId,
      'content':  commentText,
      'comment_user': user
    }
    let response = await axios
      .post("http://127.0.0.1:8000/api/v1/comments/createcomment/", data)
      .catch((err)=>{
        console.log(err)
      })
    if (response.status === 201){
      window.location.reload()
    }
  }
  
  useEffect(()=>{
    getComments()
  },[])
return (
    <Form
    onSubmit={(e)=>(createPost(e))}>
      <Row>
        <Col>
          <Form.Control placeholder="Enter a comment"
            onMouseEnter={()=> setPostId(id)}
            onChange={(e)=>setCommentText(e.target.value)}>
          </Form.Control>
          <Button type='submit'>Submit</Button>
          {renderComment.length  === 0 ? 
            null
            :
            <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            >
              View Comments
            </Button> 
          }
          {/* Collapse Component */}
          <Collapse in={open}>
            <div className="comment-collapse">
              {renderComment.map((comment)=> (
                
              <ListGroup key={comment.id}>
                <ListGroup.Item>
                  <div>
                    {comment['comment_user']}
                  </div>
                  {comment['content']}
                
              </ListGroup.Item>
            </ListGroup>
              ))}
              </div>
          </Collapse>
        </Col>
      </Row>
      {}
    </Form>
)

}

export default CommentItem