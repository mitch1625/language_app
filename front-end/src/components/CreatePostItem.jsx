import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const [postContent, setPostContent] = useState("")
    const {user} = useOutletContext()

    const addPost = async(e) => {
      e.preventDefault()
      let data = {
        "poster": user.display_name,
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
            <Button variant="primary"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}>
                Create Post
            </Button>{' '}
            <Collapse in={open}>
            {/* <Form
             onSubmit={(e)=>addPost(e)}
             > */}
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Enter Post Content</Form.Label>
              <Form.Control as="textarea" rows={3} onChange={(e)=>setPostContent(e.target.value)}/>
              <Button type='submit' value="create"
              onClick={()=>console.log(user)}
              >Submit</Button>
            </Form.Group>
            {/* </Form> */}
            </Collapse>
        </>
    )
}


export default CreatePost