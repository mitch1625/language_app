import { api } from "../utilities";
import Row from "react-bootstrap/esm/Row"
import { useState, useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button'

const SignUpPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [natLang, setNatLang] = useState("")
    const [targLang, setTargLang] = useState("")
    const [languageList, setLanguageList] = useState([])
    const navigate = useNavigate()
    const {user, setUser} = useOutletContext()


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
        
        let response = await api.post("users/signup/", data)
            .catch((err)=>{
                console.log(err)
            })
            console.log(response)
            if (response.status === 201){
                setUser(response.data.email);
                localStorage.setItem("token", response.data.token);
                api.defaults.headers.common[
                "Authorization"
                ] = `Token ${response.data.token}`;
                navigate("/");
            } else {
                alert("Something Went wrong");
            }
            };

    const getLanguages = async() => {
        let response = await api
        .get("users/languages/")
        .catch((err) => {
            console.log(err)
        })
        // console.log(response.data)
        setLanguageList(response.data)
    }

    
    const getTargLanguage = (e) => {
        for (let x in languageList) {
            if (languageList[x][1] === e){
            setTargLang(languageList[x][0])
            }
        }
    }

    const getNatLanguage = (e) => {
        for (let x in languageList) {
            if (languageList[x][1] === e){
            setNatLang(languageList[x][0])
            }
        }
    }

    useEffect(()=>{
        getLanguages()
    },[])

    return (
    <>
    <div style={{height:'100vh'}}>
    <div style={{display:'flex', justifyContent:'center'}}>
        <img id='welcome-banner' src="../src/assets/welcome-banner1.png"/>
    </div>
    <h1 style={{textAlign: 'center', marginTop:'20px'}}>Tiki Taka</h1>
    <Form className='form-field' onSubmit={(e) =>createUser(e)}>
        <FloatingLabel
            controlId="floatingInput"
            label="Email Address"
            className="mb-3"
        >
            <Form.Control type="email" placeholder="name@example.com" 
            onChange={(e)=>setEmail(e.target.value)}/>
        </FloatingLabel>
        
        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control type="password" placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)}/>
        </FloatingLabel>

        <FloatingLabel
            controlId="floatingInput"
            label="Display Name"
            className="mb-3"
        >
            <Form.Control type="dispalyname" placeholder="Enter a display name" 
              onChange={(e)=>setDisplayName(e.target.value)}/>
        </FloatingLabel>

        <Form.Select aria-label="Default select example" className="mb-3"
        onChange={(e)=>getNatLanguage(e.target.value)}
        as="select">
            <option>Select Your Native Language</option>
            {languageList.map((lang,idx)=> (
            <option key={idx}>{lang[1]}</option>
            ))}
        </Form.Select>

        <Form.Select aria-label="Default select example" className="mb-3"
        onChange={(e)=>getTargLanguage(e.target.value)}
        as="select">
            <option>Select Your Target Language</option>
            {languageList.map((lang,idx)=> (
            <option key={idx}>{lang[1]}</option>
            ))}
        </Form.Select>
        <Button id='signup-button' style={{backgroundColor:'dimgrey'}} variant="dimgrey" size="lg" type="submit" active value="Create Account">
            Create Account
        </Button>
    </Form>
    </div>
    </>
    )
}


export default SignUpPage;