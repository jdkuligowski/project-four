import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { getUserToken, isUserAuth } from '../helpers/Auth'

import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const NavBar = () => {
  // Hiding on homepage
  const location = useLocation()

  const [isHomePage, setIsHomePage] = useState(false)

  useEffect(() => {
    location.pathname === '/' ? setIsHomePage(true) : setIsHomePage(false)
  }, [location])

  const navigate = useNavigate()




  // const handleLogout = () => {
  //   window.localStorage.removeItem('seeded-username')
  //   window.localStorage.removeItem('Seeded-user-token')
  //   navigate('/login')
  // }

  return (
    <>
      {isHomePage ?
        <>
        </>
        :
        <Navbar bg="light" expand="lg">
          <Container>
            <div className='nav-left'>
              <Navbar.Brand as={Link} to='/'><img className='navLogo' src='/project-images/cable-car-cabin.png' alt='ski logo' /></Navbar.Brand>
            </div>
            {/* <h2 className='navbar-h2'>SkiAgent</h2> */}
            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" className='mr-auto ml-auto' /> */}
            <Navbar.Collapse id="basic-navbar-nav" className='nav-right mr-auto ml-auto' >
              <Nav className="mr-auto ms-auto ml-auto">
                <div className='nav-right'>
                  <Nav.Link as={Link} to='/resorts'>Resorts</Nav.Link>
                  <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                  <Nav.Link as={Link} to='/login'>Log in</Nav.Link>
                  {/* {!isUserAuth() ?
                    <>
                      <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                      <Nav.Link as={Link} to='/login'>Log in</Nav.Link>
                    </>
                    :
                    <NavDropdown title="☰" id="basic-nav-dropdown">
                      <NavDropdown.Item as={Link} to={`/profile/${getUserToken()}`} href="#action/3.1">Profile</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/comparison' href="#action/3.2">Buy Plants</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to='/glossary' href="#action/3.3">Glossary</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4" onClick={handleLogout}><p className='nav-logout'>Logout</p></NavDropdown.Item>
                    </NavDropdown>
                  } */}
                </div>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      }
    </>

  )
}

export default NavBar