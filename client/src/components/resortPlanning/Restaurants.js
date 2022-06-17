import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'







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
    }
    getResorts()
  }, [])


  const [languages, setLanguagesData] = useState()

  const [languageState, setLanguageState] = useState([])

  const getData = () => {
    window.addEventListener('storage', () => {
      console.log('change to local storage')
      const data = JSON.parse(localStorage.getItem('language-state'))
      console.log('data->', data)
      if (data) setLanguageState(data)
      console.log('current language ->', languageState)
    })
  }

  useEffect(() => {
    getData()
  })




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
      <section className='restaurant-page'>
        <section className="restaurant-top">
          <div className='resort-image-top' style={{ backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.6), rgba(245, 246, 252, 0.8)), url('${resorts.resort_image}')` }}>
            <h1>{languages ? languageState === 'english' ? languages[73].english : languageState === 'french' ? languages[73].french : languageState === 'german' ? languages[73].german : languages[73].english : ''} {resorts.resort}</h1>
            <p>{languages ? languageState === 'english' ? languages[74].english : languageState === 'french' ? languages[74].french : languageState === 'german' ? languages[74].german : languages[74].english : ''} </p>
          </div>
        </section>
        <div className='restaurant-overview'>
          <h1>{restaurants.length} restaurants</h1>
          <hr />
        </div>

        <main className='main-section'>
          {restaurants.map(r => {
            return (
              <div className='restaurant-card' key={(r.id)}>
                <div className='restaurant-image'>
                  <img src={r.outdoor_image} alt={r.name} onMouseEnter={e => (e.currentTarget.src = r.indoor_image)} onMouseLeave={e => (e.currentTarget.src = r.outdoor_image)} />
                </div>
                <div className='restaurant-detail'>
                  <div className='restaurant-title'>
                    <h1>{r.name}</h1>
                    <h3>{languages ? languageState === 'english' ? r.area : languageState === 'french' ? r.area_fr : languageState === 'german' ? r.area_de : r.area : ''}</h3>
                    <div className='google-review'>
                      <h3>{r.google_review}</h3>
                      <div className='rating-icon'>
                        <img src="/project-images/star-blue.png" alt="star" />
                      </div>
                      <h3>Google</h3>
                    </div>
                  </div>
                  <hr />
                  <div className='restaurant-info'>
                    <h1>{languages ? languageState === 'english' ? languages[76].english : languageState === 'french' ? languages[76].french : languageState === 'german' ? languages[76].german : languages[76].english : ''}</h1>
                    <div className='detail-row'>
                      <div className='icon-box'>
                        <img src="/project-images/back-in-time.png" alt="icon" />
                      </div>
                      <div className='detail'>
                        <h4>{r.opening_times}</h4>
                      </div>
                    </div>
                    <div className='detail-row'>
                      <div className='icon-box'>
                        <img src="/project-images/fork.png" alt="icon" />
                      </div>
                      <div className='detail'>
                        <h4>{languages ? languageState === 'english' ? r.food_drink : languageState === 'french' ? r.food_drink_fr : languageState === 'german' ? r.food_drink_de : r.food_drink : ''}</h4>
                      </div>
                    </div>
                    <div className='detail-row'>
                      <div className='icon-box'>
                        <img src="/project-images/worldwide.png" alt="icon" />
                      </div>
                      <div className='detail'>
                        <h4>{languages ? languageState === 'english' ? r.cuisine : languageState === 'french' ? r.cuisine_fr : languageState === 'german' ? r.cuisine_de : r.cuisine : ''}</h4>
                      </div>
                    </div>
                    <div className='detail-row'>
                      <div className='icon-box'>
                        <img src="/project-images/dish.png" alt="icon" />
                      </div>
                      <div className='detail'>
                        <h4>{languages ? languageState === 'english' ? r.type : languageState === 'french' ? r.type_fr : languageState === 'german' ? r.type_de : r.type : ''}</h4>
                      </div>
                    </div>
                    <div className='detail-row'>
                      <div className='icon-box'>
                        <img src="/project-images/location.png" alt="icon" />
                      </div>
                      <div className='detail'>
                        <h4>{r.location}</h4>
                      </div>
                    </div>
                  </div>
                  <div className='restaurant-link'>
                    <a target='_blank'  href={r.website} rel="noreferrer"><button className='website-link'>{languages ? languageState === 'english' ? languages[92].english : languageState === 'french' ? languages[92].french : languageState === 'german' ? languages[92].german : languages[92].english : ''}</button></a>
                  </div>
                </div>

              </div>
            )
          })}






        </main>



      </section >
    </>



  )


}

export default Restaurants