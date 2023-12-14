import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const CommentItem = ({id}) => {

  const [commentText, setCommentText] = useState("")  
  const [postId, setPostId] = useState(null)

////// LEFT OFF ADDING FUNCTIONALITY TO COMMENT CARD
///// EACH COMMENT SECTION IS AFFILIATED WITH POST ID WITH THAT ID PARAM
//// write function to add comment next

  
return (
    <Form
    onSubmit={(e)=>e.preventDefault()}>
      <Row>
        <Col>
          <Form.Control placeholder="Enter a comment"
            onMouseEnter={()=> setPostId(id)}
            onChange={(e)=>setCommentText(e.target.value)}>
          </Form.Control>
          {id}
          <Button>Submit</Button>
        </Col>
      </Row>
    </Form>
)

}

export default CommentItem