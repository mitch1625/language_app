import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const UserCheck = () => {
    const navigate = useNavigate()
    return(
        <>
        <div style={{display:'flex', justifyContent:'center'}}>
        <img id='welcome-banner' src="../src/assets/welcome-banner1.png"/>
        </div>
        <div id='login-container'>
        <div className='login-box'>
        <h1>Welcome to Tiki Taka</h1>
        <div id='login-text'>
            <h2>Start connecting with people from all over the world</h2>
        </div>
            </div>
            <div id='welcome-button-box'>
            <Button className='welcome-buttons' style={{backgroundColor:'#D5386B'}} variant="dimgrey" size="lg" active onClick={()=>navigate("/login/")}>
                  Login
             </Button>{' '}
             <Button  style={{backgroundColor:'dimgrey'}} className='welcome-buttons' variant="dimgrey" size="lg" active onClick={()=>navigate("/join/")}>
                Create Account
            </Button>{' '}
            </div>
        </div>
        </>
    )
}

export default UserCheck