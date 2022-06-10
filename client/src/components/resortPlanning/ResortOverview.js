import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'


const ResortOverview = () => {

  const { id } = useParams()

  const [resorts, setResorts] = useState([])



  useEffect(() => {
    const getResorts = async () => {
      const { data } = await axios.get(`/api/resorts/${id}`)
      setResorts(data)
      console.log(data)
    }
    getResorts()
  }, [])



  return (
    <section className="resort-page">
      <div className='high-level'>
        <h1>{resorts.resort}</h1>
        <div className='current-weather'>

        </div>
      </div>
      <div className='feature-section'>
        <Link to={`/resorts/${id}/selector`}>
          <div className='feature'>
            <div className='icon-image'>
              <img src="/project-images/cable-car-cabin.png" alt="icon" />
            </div>
            <h4>Ski areas</h4>
          </div>
        </Link>
        <Link to={`/resorts/${id}/overview`}>
          <div className='feature'>
            <div className='icon-image'>
              <img src="/project-images/ski.png" alt="icon" />
            </div>
            <h4>Ski area selector</h4>
          </div>
        </Link>
        <div className='feature'>
          <div className='icon-image'>
            <img src="/project-images/fork.png" alt="icon" />
          </div>
          <h4>Restaurants in town</h4>
        </div>
        <div className='feature'>
          <div className='icon-image'>
            <img src="/project-images/ski_2.png" alt="icon" />
          </div>
          <h4>Restaurants on the mountain</h4>
        </div>
        <div className='feature'>
          <div className='icon-image'>
            <img src="/project-images/morning-snow.png" alt="icon" />
          </div>
          <h4>Weather</h4>
        </div>
      </div>

    </section>

  )


}

export default ResortOverview