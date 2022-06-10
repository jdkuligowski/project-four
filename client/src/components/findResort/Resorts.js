import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


const Resorts = () => {

  const [resorts, setResorts] = useState([])




  useEffect(() => {
    const getResorts = async () => {
      const { data } = await axios.get('/api/resorts/')
      setResorts(data)
      console.log(data)
    }
    getResorts()
  }, [])



  return (
    <section className='resort-page'>
      <div className='title'>
        <h1>Resorts</h1>
      </div>
      <div className='resort-list'>
        {resorts.map(resort => {
          return (
            <div className='resorts' key={resort.id}>
              <Link to={`/resorts/${resort.id}`}>
                <div className='resort-image'>
                  <img src={resort.country} alt='landscape' />
                </div>
                <div className='resort-content'>
                  <h1>{resort.resort} ({resort.country})</h1>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </section >
  )


}

export default Resorts