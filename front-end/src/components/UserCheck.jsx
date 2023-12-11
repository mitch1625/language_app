import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const UserCheck = () => {
    const navigate = useNavigate()
    return(
        <>
            <h1>Welcome to Tiki Taka</h1>
            <h2>Please log in or create an account</h2>
            <div>
            <Button variant="primary" size="lg" active onClick={()=>navigate("/login/")}>
                  Login
             </Button>{' '}
             <Button variant="primary" size="lg" active onClick={()=>navigate("/join/")}>
                Create Account
            </Button>{' '}
            </div>
        </>
    )
}

export default UserCheck