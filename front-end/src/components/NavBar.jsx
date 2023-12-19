import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { api } from '../utilities';
import Button from "react-bootstrap/esm/Button";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';


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
      <Container style={{display:'flex', justifyContent:'space-around'}}>
        <Link to="/" style={{textDecoration:'none', color:'black'}}>Home</Link>
        <Link to="allposts/" style={{textDecoration:'none', color:'black'}}>All Posts</Link>
        <NavDropdown title="Settings" style={{color:'black'}} id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link style={{textDecoration:'none', color:'black'}} to="settings/update-email/">Update Email</Link>
                </NavDropdown.Item>
              {/* <NavDropdown.Item>
                <Link style={{textDecoration:'none', color:'black'}} to='settings/update-password'>Update Password</Link>
              </NavDropdown.Item> */}
              <NavDropdown.Item>
                <Link style={{textDecoration:'none', color:'black'}} to='settings/get-premium/'>
                Get Premium
                </Link>
              </NavDropdown.Item>
        </NavDropdown>
        <Link onClick={logout} style={{color:'black', textDecoration:"none"}}>Logout</Link>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
}

export default NavBar;