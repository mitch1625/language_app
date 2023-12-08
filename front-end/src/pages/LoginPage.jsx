import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    


    return (
    <>
        <div id='loginbox'>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="name@example.com" 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
      </FloatingLabel>
      </div>
    <Button variant="secondary">Login</Button>{' '} 
    <button onClick={()=>{console.log(password)}}>CONSOLE LOG BUTTON</button>
    </>
    )
}

export default LoginPage