import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const WelcomeComponent = () => {
    const navigate = useNavigate()
    return(
        <>
            <h1>Welcome to Tiki Taka</h1>
            <div>
            <Button variant="primary" size="lg" active onClick={()=>navigate("/login/")}>
                  Login
             </Button>{' '}
             <Button variant="primary" size="lg" active onClick={()=>navigate("/join/")}>
                Join
            </Button>{' '}
            </div>
        </>
    )
}

export default WelcomeComponent