import axios from "axios"
import Row from "react-bootstrap/esm/Row"
import { useState, useEffect } from "react"

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';



const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [natLang, setNatLang] = useState("")
    const [targLang, setTargLang] = useState("")


    const createUser = async(e) => {
        e.preventDefault()
        let data = {
            "email": email,
            "password": password,
            "display_name": displayName,
            "native_language": natLang,
            "target_language" : targLang,
            'username': email
        }
        
        let response = await axios
            .post("http://127.0.0.1:8000/api/v1/users/signup/", data)
            .catch((err)=>{
                console.log(err)
            })
            if (response.status === 201){
                alert('user created')
            }
     }

    // const getLanguages = async() => {
    //     let response = await axios
            
    // }

    return (
        <>
        This is the sign up page.
        <form onSubmit={(e) =>createUser(e)}>
            <h2>Sign Up</h2>
            <div>
                Email:
                <input 
                    type='text'
                    placeholder=""
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>
            <div>
                Display Name:
                <input
                    type='text'
                    placeholder=""
                    onChange={(e)=>setDisplayName(e.target.value)}
                />
            </div>
            <div>
                Target Language:
                <select>
                    
                </select>
            </div>
        </form>
        </>
    )
}


export default SignUpPage;