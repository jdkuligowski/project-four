import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'



const ResortDetails = () => {

  const [resorts, setResorts] = useState([])
  const [mountains, setMountains] = useState([])
  const [errors, setErrors] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const getResorts = async () => {
      try {
        const { data } = await axios.get(`/api/resorts/${id}`)
        setResorts(data)
        console.log(data)
      } catch (error) {
        setErrors(true)
      }
    }
    getResorts()
  }, [])

  useEffect(() => {
    const getMountains = async () => {
      try {
        const { data } = await axios.get(`/api/resorts/${id}`)
        setMountains(data.mountain_detail)
        console.log(data.mountain_detail)
      } catch (error) {
        setErrors(true)
      }
    }
    getMountains()
  }, [])



  return (
    <section className='ski-areas-page'>
      {/* Top section of the page with the image and name of the resort */}
      <section className="resort-overview">
        <h1>{resorts.resort}</h1>
        {/* Banner at the bottom of the image showing the key stats from the resort */}
        <div className='resort-info'>
          <div className='resort-summary'>
            <div className='resort-icon'>
              <img src="/project-images/town.png" alt="length icon" />
            </div>
            <h4>{resorts.base}m</h4>
          </div>
          <div className='resort-summary'>
            <div className='resort-icon'>
              <img src="/project-images/mountain.png" alt="length icon" />
            </div>
            <h4>{resorts.peak}m</h4>
          </div>
          <div className='resort-summary'>
            <div className='resort-icon'>
              <img src="/project-images/arrows.png" alt="length icon" />
            </div>
            <h4>{resorts.total_length}km</h4>
          </div>
          <div className='resort-summary'>
            <div className='colour-icon'>
              <div className='beg-colour'>
                .
              </div>
            </div>
            <h4>{resorts.beginner} beginner</h4>
          </div>
          <div className='resort-summary'>
            <div className='colour-icon'>
              <div className='int-colour'>
                .
              </div>
            </div>
            <h4>{resorts.intermediate} intermediate</h4>
          </div>
          <div className='resort-summary'>
            <div className='colour-icon'>
              <div className='exp-colour'>
                .
              </div>
            </div>
            <h4>{resorts.expert} expert</h4>
          </div>
        </div>
      </section>
      {errors ? 'Sorry can\'t load' :
        <section className="resort-details">

          <h2>{mountains.length} ski areas in {resorts.resort}</h2>
          <hr />
          <div className="resort-grid">
            {mountains.map(m => {
              return (
                <>
                  <div className="grid-card" key={m._id}>
                    <div className="grid-left">
                      <div className='grid-image'>
                        <img src={m.image_1} alt="mountain image" onMouseEnter={e => (e.currentTarget.src = m.image_2)} onMouseLeave={e => (e.currentTarget.src = m.image_1)} />
                      </div>
                      <div className='mountain-info'>
                        <div className='mountain-summary'>
                          <div className='colour-icon'>
                            <div className='beg-colour'>
                              .
                            </div>
                          </div>
                          <h4>{m.blue_runs} beginner</h4>
                        </div>
                        <div className='mountain-summary'>
                          <div className='colour-icon'>
                            <div className='int-colour'>
                              .
                            </div>
                          </div>
                          <h4>{m.red_runs} intermediate</h4>
                        </div>
                        <div className='mountain-summary'>
                          <div className='colour-icon'>
                            <div className='exp-colour'>
                              .
                            </div>
                          </div>
                          <h4>{m.black_runs} expert</h4>
                        </div>
                      </div>
                    </div>
                    <div className="grid-right">
                      <h1>{m.sub_resort}</h1>
                      <h4>{m.other}</h4>
                      <hr />
                      <div className='resort-buttons'>
                        <button>Piste map</button>
                        <button>Where to eat</button>
                      </div>
                      <hr />
                      <div className='resort-ratings'>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/location.png" alt="location icon" />
                          </div>
                          <div className="rating-name">
                            <h5>Location</h5>
                          </div>
                          <div className="rating-detail">
                            <div className='star-array'>
                              {[...Array(m.car_score)].map((star, index) => {
                                return (
                                  <div className='stars' key={index} >
                                    <img src="/project-images/star-blue.png" alt="star" />
                                  </div>
                                )
                              })}
                            </div>
                            <p>{m.location_car}</p>
                          </div>
                        </div>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/ski.png" alt="" />
                          </div>
                          <div className="rating-name">
                            <h5>Piste</h5>
                          </div>
                          <div className="rating-detail">
                            <div className='star-array'>
                              {[...Array(m.piste_score)].map((star, index) => {
                                return (
                                  <div className='stars' key={index} >
                                    <img src="/project-images/star-blue.png" alt="star" />
                                  </div>
                                )
                              })}
                            </div>
                            <p>{m.piste}</p>
                          </div>
                        </div>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/goggles.png" alt="" />
                          </div>
                          <div className="rating-name">
                            <h5>Off-piste</h5>
                          </div>
                          <div className="rating-detail">
                            <div className='star-array'>
                              {[...Array(m.off_piste_score)].map((star, index) => {
                                return (
                                  <div className='stars' key={index} >
                                    <img src="/project-images/star-blue.png" alt="star" />
                                  </div>
                                )
                              })}
                            </div>
                            <p>{m.off_piste}</p>
                          </div>
                        </div>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/restaurant.png" alt="" />
                          </div>
                          <div className="rating-name">
                            <h5>Lunch</h5>
                          </div>
                          <div className="rating-detail">
                            <div className='star-array'>
                              {[...Array(m.lunch_score)].map((star, index) => {
                                return (
                                  <div className='stars' key={index} >
                                    <img src="/project-images/star-blue.png" alt="star" />
                                  </div>
                                )
                              })}
                            </div>
                            <p>{m.lunch}</p>
                          </div>
                        </div>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/morning-snow.png" alt="" />
                          </div>
                          <div className="rating-name">
                            <h5>Weather</h5>
                          </div>
                          <div className="rating-detail">

                            <p>{m.weather_comment}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <hr/> */}
                </>
              )
            })}
          </div>
        </section>
      }
    </section >
  )


}

export default ResortDetails