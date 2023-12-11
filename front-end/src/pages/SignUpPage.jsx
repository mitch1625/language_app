import { api } from "../utilities";
import Row from "react-bootstrap/esm/Row"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";


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
        console.log(response.data)
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
                Password:
                <input
                type="password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <div>
                Display Name:
                <input
                    type='text'
                    placeholder=""
                    value={displayName}
                    onChange={(e)=>setDisplayName(e.target.value)}
                />
            </div>
            <div>
                Native Language:
                <select
                onChange={(e)=>getNatLanguage(e.target.value)}
                value={natLang}
                >
                    {languageList.map((lang)=> (
                        <option key={lang.value}>{lang[1]}</option>
                    ))}
                </select>
            </div>
            <div>
                Target Language:
                <select
                onChange={(e)=>getTargLanguage(e.target.value)}
                >
                    {languageList.map((lang)=> (
                        <option key={lang.value}>{lang[1]}</option>
                    ))}
                </select>
            </div>
            <input type="submit" value="Create Account" />
        </form>
        <button onClick={()=>console.log(natLang)}>CONSOLE LOG BUTTON</button>
        </>
    )
}


export default SignUpPage;