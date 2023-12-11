import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react';
import { api } from '../utilities';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {user, setUser} = useOutletContext()

    const login = async(e) => {
      e.preventDefault()
      let response = await api.post("users/login/", {
        email: email,
        password : password
      })
      if (response.status === 200){
        console.log(response.data)
        setUser(response.data.email);
        localStorage.setItem("token", response.data.token)
        api.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.token}`;
        navigate("/")
      } else {
        alert("something went wrong")
      }
    };


    return (
    <>
    <Form onSubmit={(e) => login(e)}>
        <div id='loginbox'>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control 
        type="email" 
        placeholder="name@example.com" 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
      </FloatingLabel>
      </div>
    <Button variant="secondary" type="submit">Login</Button>
    <button onClick={()=>{console.log(password)}}>CONSOLE LOG BUTTON</button>
    </Form>
    </>
    )
}

export default LoginPage