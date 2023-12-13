import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { api } from '../utilities';
import Button from "react-bootstrap/esm/Button";

const NavBar = ( { user, setUser } ) => {
  const logout = async() =>{
    let response = await api.post("users/logout/")
    if (response.status === 204) {
      setUser(null)
      localStorage.removeItem("token")
      delete api.defaults.headers.common["Authorization"]
    }
  }
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Link to="/">Home</Link>
<<<<<<< HEAD
        <Link to="login/">Login</Link>
=======
>>>>>>> fa9053a7b360e13d41acced60c3f15ca79a8aac2
        <Link onClick={logout}>Logout</Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Logged in as: <a href="#login">{user}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;