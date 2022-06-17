import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
import axios from 'axios'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { getAccessToken, isUserAuth } from '../src/components/auth/Auth.js'

// Import pages for use on the site
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ResortOverview from './components/resortPlanning/ResortOverview'
import SkiSelectorTool from './components/resortPlanning/SkiSelectorTool'
import SkiSelectorList from './components/resortPlanning/SkiSelectorList'
import ResortDetails from './components/resortPlanning/ResortDetails'
import Restaurants from './components/resortPlanning/Restaurants'
import Lunches from './components/resortPlanning/Lunches'
import MountainDetails from './components/resortPlanning/MountainDetails'
import Resorts from './components/findResort/Resorts'
import NavBar from './components/common/NavBar.js'



const App = () => {

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/language/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })



  // Hiding on homepage
  // const location = useLocation()

  const [isHomePage, setIsHomePage] = useState(false)

  // useEffect(() => {
  //   location.pathname === '/' ? setIsHomePage(true) : setIsHomePage(false)
  // }, [location])

  // useEffect(() => {
  //   if (languageState) {
  //     setLanguageToLocalStorage()
  //   }
  // }, [languageState])

  // const navigate = useNavigate()




  return (
    <main className="site-wrapper">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/resorts' element={<Resorts />} />
          <Route path='/resorts/:id' element={<ResortDetails />} />
          <Route path='/resorts/:id/selector' element={<SkiSelectorTool />} />
          <Route path='/resorts/:id/personal' element={<SkiSelectorList />} />
          {/* <Route path='/resorts/:id/overview' element={<ResortDetails />} /> */}
          <Route path='/resorts/:id/:mountainID' element={<MountainDetails />} />
          <Route path='/resorts/:id/restaurants' element={<Restaurants />} />
          <Route path='/resorts/:id/lunches' element={<Lunches />} />

        </Routes>
      </BrowserRouter>
    </main>
  )

}

export default App
