import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'








const Restaurants = () => {

  const { id } = useParams()

  const [restaurants, setRestaurants] = useState([])
  const [resorts, setResorts] = useState([])



  useEffect(() => {
    const getRestaurants = async () => {
      const { data } = await axios.get(`/api/resorts/${id}`)
      setRestaurants(data.resort_restaurants)
      console.log(data.resort_restaurants)
      // setResorts(data)
    }
    getRestaurants()
  }, [])

  useEffect(() => {
    const getResorts = async () => {
      const { data } = await axios.get(`/api/resorts/${id}`)
      setResorts(data)
      console.log(data)
      // setResorts(data)
    }
    getResorts()
  }, [])

  return (
    <section className='restaurant-page'>
      <section className="restaurant-top">
        <img src={resorts.resort_image} alt={resorts.resort} />
      </section>

      <main className='main-section'>
        {restaurants.map(r => {
          return (
            <div className='restaurant-card' key={(r.id)}>
              <div className='restaurant-image'>
                <img src={r.outdoor_image} alt={r.name} />
              </div>
              <div className='restaurant-detail'>
                <div className='restaurant-title'>
                  <h1>{r.name}</h1>
                  <h3>{r.area}</h3>
                </div>
                <hr />
                <div className='restaurant-info'>
                  <h1>About</h1>
                  <div className='detail-row'>
                    <div className='icon-box'>
                      <img src="" alt="icon" />
                    </div>
                    <div className='detail'>
                      <h4>{r.opening_times}</h4>
                    </div>
                  </div>
                  <div className='detail-row'>
                    <div className='icon-box'>
                      <img src="" alt="icon" />
                    </div>
                    <div className='detail'>
                      <h4>{r.food_drink}</h4>
                    </div>
                  </div>
                  <div className='detail-row'>
                    <div className='icon-box'>
                      <img src="" alt="icon" />
                    </div>
                    <div className='detail'>
                      <h4>{r.cuisine}</h4>
                    </div>
                  </div>
                  <div className='detail-row'>
                    <div className='icon-box'>
                      <img src="" alt="icon" />
                    </div>
                    <div className='detail'>
                      <h4>{r.type}</h4>
                    </div>
                  </div>
                  <div className='detail-row'>
                    <div className='icon-box'>
                      <img src="" alt="icon" />
                    </div>
                    <div className='detail'>
                      <h4>{r.location}</h4>
                    </div>
                  </div>
                </div>
                <div className='restaurant-review'>
                </div>
              </div>

            </div>
          )
        })}






      </main>



    </section >




  )


}

export default Restaurants