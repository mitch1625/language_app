import { useState } from "react"
import axios from "axios"
import { useOutletContext } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from "react-bootstrap/esm/Button";


const UpdateEmailItem = () => {
    const [newEmail, setNewEmail] = useState("")
    const [compareEmail, setCompareEmail] = useState("")
    const {user} = useOutletContext()

    const updateEmail = async() => {
        let data = {
            email: newEmail,
            username: newEmail
        }
        if (newEmail === compareEmail){
            let response = await axios
            .put("http://127.0.0.1:8000/api/v1/users/update_email/", data)
            .catch((err)=>{
                console.log(err)
            })
            if (response.status===200) {
                window.location.reload()
            }
        }
    }
    
    return (
        <>
      <FloatingLabel
        controlId="floatingInput"
        label="Enter New Email Address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" 
        onChange={(e)=>setNewEmail(e.target.value.toLowerCase())}/>
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Verify New Email Address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" 
        onChange={(e)=>setCompareEmail(e.target.value.toLowerCase())}/>
      </FloatingLabel>
      <Button type="submit" onClick={()=>updateEmail()}>Submit</Button>
      </>
    )
}

export default UpdateEmailItem