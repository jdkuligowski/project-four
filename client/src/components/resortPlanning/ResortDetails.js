import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { scroller } from 'react-scroll'
import Modal from 'react-bootstrap/Modal'
import ModalImage from 'react-modal-image'




const ResortDetails = () => {


  const [resorts, setResorts] = useState([])
  const [mountains, setMountains] = useState([])
  const [errors, setErrors] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getResorts = async () => {
      try {
        const { data } = await axios.get(`/api/resorts/${id}`)
        setResorts(data)
        console.log(data)
        window.scrollTo(0, 0)
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


  const skiSelector = () => {
    navigate(`/resorts/${id}/selector`)
  }

  const restaurantsNav = () => {
    navigate(`/resorts/${id}/restaurants`)
  }

  // Modal pop up
  const [show, setShow] = useState(false)
  const modalClose = () => {
    setShow(false)
  }
  const modalShow = () => setShow(true)



  const [languages, setLanguagesData] = useState()

  const [languageState, setLanguageState] = useState([])

  const getData = () => {
    window.addEventListener('storage', () => {
      // console.log('change to local storage')
      const data = JSON.parse(localStorage.getItem('language-state'))
      console.log('data->', data)
      if (data) setLanguageState(data)
      console.log('current language ->', languageState)
    })
  }

  useEffect(() => {
    getData()
    // setLanguageState(languageState)
  })


  useEffect(() => {
    const getLanguages = async () => {
      const { data } = await axios.get('/api/language/')
      setLanguagesData(data)
      console.log('language dataset ->', data)
    }
    getLanguages()
  }, [])

  const buttonRef = useRef()

  function handleBackClick() {
    buttonRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className='ski-areas-page'>
      {/* Top section of the page with the image and name of the resort */}
      <section className="resort-overview" id={resorts.resort} style={{ backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.6), rgba(245, 246, 252, 0.8)), url('${resorts.resort_image}')` }}>
        <h1>{resorts.resort}</h1>
        <div className='feature-section'>
          <button onClick={handleBackClick}>
            <div className='feature'>
              <div className='icon-image'>
                <img src="/project-images/cable-car-cabin.png" alt="icon" />
              </div>
              <h4>{languages ? languageState === 'english' ? languages[35].english : languageState === 'french' ? languages[35].french : languageState === 'german' ? languages[35].german : languages[35].english : ''}</h4>
            </div>
          </button>
          <button onClick={skiSelector}>
            <div className='feature'>
              <div className='icon-image'>
                <img src="/project-images/ski.png" alt="icon" />
              </div>
              <h4>Ski Selector</h4>
            </div>
          </button>
          <button onClick={restaurantsNav}>
            <div className='feature'>
              <div className='icon-image'>
                <img src="/project-images/fork.png" alt="icon" />
              </div>
              <h4>{languages ? languageState === 'english' ? languages[37].english : languageState === 'french' ? languages[37].french : languageState === 'german' ? languages[37].german : languages[37].english : ''}</h4>
            </div>
          </button>
          <div className='feature'>
            <div className='icon-image'>
              <img src="/project-images/ski_2.png" alt="icon" />
            </div>
            <h4>{languages ? languageState === 'english' ? languages[38].english : languageState === 'french' ? languages[38].french : languageState === 'german' ? languages[38].german : languages[38].english : ''}</h4>
          </div>
          <div className='feature'>
            <div className='icon-image'>
              <img src="/project-images/morning-snow.png" alt="icon" />
            </div>
            <h4>{languages ? languageState === 'english' ? languages[39].english : languageState === 'french' ? languages[39].french : languageState === 'german' ? languages[39].german : languages[39].english : ''}</h4>
          </div>
        </div>
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
            <h4>{resorts.beginner} {languages ? languageState === 'english' ? languages[19].english : languageState === 'french' ? languages[19].french : languageState === 'german' ? languages[19].german : languages[19].english : ''}</h4>
          </div>
          <div className='resort-summary'>
            <div className='colour-icon'>
              <div className='int-colour'>
                .
              </div>
            </div>
            <h4>{resorts.intermediate} {languages ? languageState === 'english' ? languages[18].english : languageState === 'french' ? languages[18].french : languageState === 'german' ? languages[18].german : languages[18].english : ''}</h4>
          </div>
          <div className='resort-summary'>
            <div className='colour-icon'>
              <div className='exp-colour'>
                .
              </div>
            </div>
            <h4>{resorts.expert} {languages ? languageState === 'english' ? languages[17].english : languageState === 'french' ? languages[17].french : languageState === 'german' ? languages[17].german : languages[17].english : ''}</h4>
          </div>
        </div>
      </section>
      {errors ? 'Sorry can\'t load' :
        <section className="mountain-details">

          <h2 className='grid-title' ref={buttonRef}>{mountains.length} {languages ? languageState === 'english' ? languages[40].english : languageState === 'french' ? languages[40].french : languageState === 'german' ? languages[40].german : languages[40].english : ''} {resorts.resort}</h2>
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
                          <h4>{m.blue_runs} {languages ? languageState === 'english' ? languages[19].english : languageState === 'french' ? languages[19].french : languageState === 'german' ? languages[19].german : languages[19].english : '' }</h4>
                        </div>
                        <div className='mountain-summary'>
                          <div className='colour-icon'>
                            <div className='int-colour'>
                              .
                            </div>
                          </div>
                          <h4>{m.red_runs} {languages ? languageState === 'english' ? languages[18].english : languageState === 'french' ? languages[18].french : languageState === 'german' ? languages[18].german : languages[18].english : ''}</h4>
                        </div>
                        <div className='mountain-summary'>
                          <div className='colour-icon'>
                            <div className='exp-colour'>
                              .
                            </div>
                          </div>
                          <h4>{m.black_runs} {languages ? languageState === 'english' ? languages[17].english : languageState === 'french' ? languages[17].french : languageState === 'german' ? languages[17].german : languages[17].english : ''}</h4>
                        </div>
                      </div>
                    </div>
                    <div className="grid-right">
                      <h1>{m.sub_resort}</h1>
                      <h4>{m.other}</h4>
                      <hr />
                      <div className='resort-buttons'>
                        <button className='piste-map-btn' onClick={modalShow}>{languages ? languageState === 'english' ? languages[41].english : languageState === 'french' ? languages[41].french : languageState === 'german' ? languages[41].german : languages[41].english : '' }</button>
                        {/* <Modal show={show} onHide={modalClose} backdrop='static' className='piste-map-modal'>
                          <Modal.Body className='piste-map-body'>
                            <div className='modal-image-container'>
                              <img src={m.ski_map} alt='ski map' />
                            </div>
                          </Modal.Body>
                        </Modal> */}
                        <button>{languages ? languageState === 'english' ? languages[42].english : languageState === 'french' ? languages[42].french : languageState === 'german' ? languages[42].german : languages[42].english : ''}</button>
                      </div>
                      <hr />
                      <div className='resort-ratings'>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/location.png" alt="location icon" />
                          </div>
                          <div className="rating-name">
                            <h5>{languages ? languageState === 'english' ? languages[43].english : languageState === 'french' ? languages[43].french : languageState === 'german' ? languages[43].german : languages[43].english : '' }</h5>
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
                            <p>{languages ? languageState === 'english' ? m.location_car : languageState === 'french' ? m.location_car_fr : languageState === 'german' ? m.location_car_de : m.location_car : ''}</p>
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
                            <p>{languages ? languageState === 'english' ? m.piste : languageState === 'french' ? m.piste_fr : languageState === 'german' ? m.piste_de : m.piste : ''}</p>
                          </div>
                        </div>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/goggles.png" alt="" />
                          </div>
                          <div className="rating-name">
                            <h5>{languages ? languageState === 'english' ? languages[44].english : languageState === 'french' ? languages[44].french : languageState === 'german' ? languages[44].german : languages[44].english : ''}</h5>
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
                            <p>{languages ? languageState === 'english' ? m.off_piste : languageState === 'french' ? m.off_piste_fr : languageState === 'german' ? m.off_piste_de : m.off_piste : ''}</p>
                          </div>
                        </div>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/restaurant.png" alt="" />
                          </div>
                          <div className="rating-name">
                            <h5>{languages ? languageState === 'english' ? languages[45].english : languageState === 'french' ? languages[45].french : languageState === 'german' ? languages[45].german : languages[45].english : ''}</h5>
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
                            <p>{languages ? languageState === 'english' ? m.lunch : languageState === 'french' ? m.lunch_fr : languageState === 'german' ? m.lunch_de : m.lunch : ''}</p>
                          </div>
                        </div>
                        <div className="rating-row">
                          <div className="rating-icon">
                            <img src="/project-images/morning-snow.png" alt="" />
                          </div>
                          <div className="rating-name">
                            <h5>{languages ? languageState === 'english' ? languages[39].english : languageState === 'french' ? languages[39].french : languageState === 'german' ? languages[39].german : languages[39].english : ''}</h5>
                          </div>
                          <div className="rating-detail">

                            <p>{languages ? languageState === 'english' ? m.weather_comment : languageState === 'french' ? m.weather_comment_fr : languageState === 'german' ? m.weather_comment_de : m.weather_comment : ''}</p>
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