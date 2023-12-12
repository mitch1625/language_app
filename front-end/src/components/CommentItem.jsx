import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';

import { useState, useEffect } from 'react';


const CommentItem = () => {
  const [comment, setComment] = useState("")  
  

return (
    <Form
    onSubmit={(e)=>e.preventDefault()}>
      <Row>
        <Col>
          <Form.Control placeholder="Enter a comment" />
          <Button>Submit</Button>
        </Col>
      </Row>
    </Form>
)

}

export default CommentItem