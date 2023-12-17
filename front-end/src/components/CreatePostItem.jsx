import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const CreatePostItem = () => {
    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState("")
    const {user} = useOutletContext()

    const addPost = async(e) => {
      e.preventDefault()
      let data = {
        "poster": user,
        "post_content": postContent
      }

      let response = await axios
        .post("http://127.0.0.1:8000/api/v1/posts/createpost/", data)
        .catch((err)=>{
          console.log(err)
        })
      if(response.status === 201){
        window.location.reload()
      }
    }

    return (
        <>
        <div className='comment-component'>
            <Button variant="primary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            >
                Write A Post
            </Button>{' '}
            <Collapse in={open}>
            <Form
             onSubmit={(e)=>addPost(e)}
             >
            <Form.Group className='comment-component'  controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control style={{resize:'none', width:'50vw'}} as="textarea" rows={7} 
              onChange={(e)=>setPostContent(e.target.value)}
              placeholder='Write a post'
              />
            <Button type='submit' value="create"
            style={{marginTop:'10px', alignSelf:'flex-end'}}
            >Submit</Button>
            </Form.Group>
            </Form>
            </Collapse>
          </div>
        </>
    )
}


export default CreatePostItem