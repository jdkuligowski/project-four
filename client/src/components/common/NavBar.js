import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getAccessToken, isUserAuth } from '../auth/Auth.js'
import axios from 'axios'

import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'



const NavBar = () => {

  // Hiding on homepage
  // const location = useLocation()

  const [isHomePage, setIsHomePage] = useState(false)
  const navigate = useNavigate()

  // useEffect(() => {
  //   location.pathname === '/' ? setIsHomePage(true) : setIsHomePage(false)
  // }, [location])

  const handleLogout = () => {
    window.localStorage.removeItem('ski-selector-data')
    window.localStorage.removeItem('skiAgent-user-token')
    navigate('/login')
  }

  const [languages, setLanguagesData] = useState()

  const [languageState, setLanguageState] = useState('english')

  const handleChange = e => {
    removeLanguageFromLocalStorage()
    setLanguageState(e.target.value)
    console.log(e.target.value)
    console.log(languageState)
    setLanguageToLocalStorage()
  }

  const handleChange2 = e => {
    // setLanguageToLocalStorage()
  }

  const setLanguageToLocalStorage = (token) => {
    window.localStorage.setItem('language-state', JSON.stringify(languageState))
    window.dispatchEvent(new Event('storage'))
  }

  const removeLanguageFromLocalStorage = () => {
    window.localStorage.removeItem('language-state')
  }

  useEffect(() => {
    const getLanguages = async () => {
      const { data } = await axios.get('/api/language/')
      setLanguagesData(data)
      console.log('language dataset ->', data)
    }
    getLanguages()
  }, [])

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
            <Navbar.Collapse id="basic-navbar-nav" className='nav-right mr-auto ml-auto' >
              <Nav className="mr-auto ms-auto ml-auto">
                <div className='nav-right'>
                  <Nav.Link as={Link} to='/resorts'>{languages ? languageState === 'english' ? languages[10].english : languageState === 'french' ? languages[10].french : languages[10].german : ''}</Nav.Link>
                  {!isUserAuth() ?
                    <>
                      <Nav.Link as={Link} to='/register'>{languages ? languageState === 'english' ? languages[33].english : languageState === 'french' ? languages[33].french : languages[33].german : ''}</Nav.Link>
                      <Nav.Link as={Link} to='/login'>{languages ? languageState === 'english' ? languages[90].english : languageState === 'french' ? languages[90].french : languages[90].german : ''}</Nav.Link>
                    </>
                    :
                    <>
                      <Nav.Link as={Link} to='/login' onClick={handleLogout}>{languages ? languageState === 'english' ? languages[91].english : languageState === 'french' ? languages[91].french : languages[91].german : ''}</Nav.Link>
                    </>
                  }
                  <select onChange={handleChange} onPointerMove={handleChange2}>
                    <option value='english'><p>🇬🇧</p></option>
                    <option value='french'>🇫🇷</option>
                    <option value='german'>🇩🇪</option>
                  </select>
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