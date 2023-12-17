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
      <Container fluid>
        <Link to="/" style={{textDecoration:'none', color:'black'}}>Tiki Taka</Link>
        <NavDropdown title="Settings" id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link style={{textDecoration:'none', color:'black'}} to="settings/update-email/">Update Email</Link>
                </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Update Password
              </NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                SOME OTHER FUNCTION
              </NavDropdown.Item>
        </NavDropdown>
        <Link onClick={logout} style={{color:'black', textDecoration:"none"}}>Logout</Link>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Logged in as: {user}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;