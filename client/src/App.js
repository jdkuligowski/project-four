import { useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import axios from 'axios'

// Import pages for use on the site
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ResortOverview from './components/resortPlanning/ResortOverview'
import SkiSelector from './components/resortPlanning/SkiSelector'
import ResortDetails from './components/resortPlanning/ResortDetails'
import Restaurants from './components/resortPlanning/Restaurants'
import Lunches from './components/resortPlanning/Lunches'
import MountainDetails from './components/resortPlanning/MountainDetails'
import Resorts from './components/findResort/Resorts'



const App = () => {
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/resorts/') // * <-- replace with your endpoint
      console.log(data)
    }
    getData()
  })

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resorts' element={<Resorts />} />
        <Route path='/resorts/:id' element={<ResortOverview />} />
        <Route path='/resorts/:id/selector' element={<SkiSelector />} />
        <Route path='/resorts/:id/overview' element={<ResortDetails />} />
        <Route path='/resorts/:id/:mountainID' element={<MountainDetails />} />
        <Route path='/resorts/:id/restaurants' element={<Restaurants />} />
        <Route path='/resorts/:id/lunches' element={<Lunches />} />

      </Routes>
    </BrowserRouter>

  )

}

export default App
