import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

// const setStateToLocalStorage = (token) => {
//   window.localStorage.setItem('ski-selector-state', JSON.stringify(resorts))
// }

const SkiSelectorList = () => {

  // Set states
  const [resorts, setResorts] = useState([])
  const [topResort, setTopResort] = useState([])
  const [choices, setChoices] = useState([])
  const [locationValue, setLocation] = useState([])
  const [pisteValue, setPiste] = useState([])
  const [offPisteValue, setOffPiste] = useState([])
  const [lunchValue, setLunch] = useState([])
  const [ranking, setRanking] = useState([])


  // Get ranked array from storage 
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ski-selector-data'))
    if (data) setResorts(data)
    console.log(data)
  }, [])


  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ski-selector-data'))
    if (data) setTopResort(data[0])
    console.log('top-resort ->', data[0])
  }, [])

  // Location value for bars
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ski-selector-location'))
    if (data) setLocation(data)
    console.log('location value ->', locationValue)
  })

  // Lunch value for bars
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ski-selector-lunch'))
    if (data) setLunch(data)
    console.log('lunch value ->', lunchValue)
  })

  // Piste value for bars
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ski-selector-piste'))
    if (data) setPiste(data)
    console.log('piste value ->', pisteValue)
  })

  // Off Piste value for bars
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('ski-selector-off-piste'))
    if (data) setOffPiste(data)
    console.log('off piste value ->', offPisteValue)
  })



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
    <section className="resort-details">
      <section className='selector-results-top'>
        <h1>Ski Selector Results</h1>
        <div className='results-overview'>
          <div className='results-description'>
            <h2>{languages ? languageState === 'english' ? languages[67].english : languageState === 'french' ? languages[67].french : languages[67].german : ''}</h2>
            <h3>{languages ? languageState === 'english' ? languages[68].english : languageState === 'french' ? languages[68].french : languages[68].german : ''} 
              <span> {topResort.sub_resort}</span> {languages ? languageState === 'english' ? languages[69].english : languageState === 'french' ? languages[69].french : languages[69].german : ''}</h3>
          </div>
          <div className='results-detail'>
            <h2>{languages ? languageState === 'english' ? languages[70].english : languageState === 'french' ? languages[70].french : languages[70].german : ''}</h2>
            <div className='bar-chart-array'>
              <div className='rating-title'>{languages ? languageState === 'english' ? languages[43].english : languageState === 'french' ? languages[43].french : languages[43].german : ''}</div>
              {[...Array(locationValue)].map((choice, index) => {
                return (
                  <div className='bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              {[...Array(10 - locationValue)].map((choice, index) => {
                return (
                  <div className='blank-bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              <h4>{locationValue}</h4>
            </div>
            <div className='bar-chart-array'>
              <div className='rating-title'>{languages ? languageState === 'english' ? languages[45].english : languageState === 'french' ? languages[45].french : languages[45].german : ''}</div>
              {[...Array(lunchValue)].map((choice, index) => {
                return (
                  <div className='bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              {[...Array(10 - lunchValue)].map((choice, index) => {
                return (
                  <div className='blank-bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              <h4>{lunchValue}</h4>
            </div>
            <div className='bar-chart-array'>
              <div className='rating-title'>Piste</div>
              {[...Array(pisteValue)].map((choice, index) => {
                return (
                  <div className='bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              {[...Array(10 - pisteValue)].map((choice, index) => {
                return (
                  <div className='blank-bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              <h4>{pisteValue}</h4>
            </div>
            <div className='bar-chart-array'>
              <div className='rating-title'>{languages ? languageState === 'english' ? languages[44].english : languageState === 'french' ? languages[44].french : languages[44].german : ''}</div>
              {[...Array(offPisteValue)].map((choice, index) => {
                return (
                  <div className='bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              {[...Array(10 - offPisteValue)].map((choice, index) => {
                return (
                  <div className='blank-bars' key={index} >
                    <div>.</div>
                  </div>
                )
              })}
              <h4>{offPisteValue}</h4>
            </div>

          </div>
        </div>
      </section>

      <h2>{languages ? languageState === 'english' ? languages[71].english : languageState === 'french' ? languages[71].french : languages[71].german : ''}</h2>
      <hr />
      <div className="resort-grid-list">
        {resorts.map(m => {
          return (
            <>
              <div className="grid-card-list" key={m._id}>
                <div className='grid-title'>
                  {/* <div className='grid-ranked'>
                    {/* {ranking.map(rank => {
                      return (
                        <>
                          <h1 key={rank._id}>{rank}</h1>
                        </>
                      )
                    })} 
                  </div> */}
                  <h1>{m.sub_resort}</h1>
                  <h2>{m.percentages}% match</h2>
                </div>
                <div className='grid-body'>
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
                        <h4>{m.blue_runs} {languages ? languageState === 'english' ? languages[19].english : languageState === 'french' ? languages[19].french : languages[19].german : ''}</h4>
                      </div>
                      <div className='mountain-summary'>
                        <div className='colour-icon'>
                          <div className='int-colour'>
                            .
                          </div>
                        </div>
                        <h4>{m.red_runs} {languages ? languageState === 'english' ? languages[18].english : languageState === 'french' ? languages[18].french : languages[18].german : ''}</h4>
                      </div>
                      <div className='mountain-summary'>
                        <div className='colour-icon'>
                          <div className='exp-colour'>
                            .
                          </div>
                        </div>
                        <h4>{m.black_runs} {languages ? languageState === 'english' ? languages[17].english : languageState === 'french' ? languages[17].french : languages[17].german : ''}</h4>
                      </div>
                    </div>
                  </div>
                  <div className="grid-right">
                    <div className='resort-buttons'>
                      <button>{languages ? languageState === 'english' ? languages[41].english : languageState === 'french' ? languages[41].french : languages[41].german : ''}</button>
                      <button>{languages ? languageState === 'english' ? languages[42].english : languageState === 'french' ? languages[42].french : languages[42].german : ''}</button>
                    </div>
                    <hr />
                    <div className='resort-ratings'>
                      <div className="rating-row">
                        <div className="rating-icon">
                          <img src="/project-images/location.png" alt="location icon" />
                        </div>
                        <div className="rating-name">
                          <h5>{languages ? languageState === 'english' ? languages[43].english : languageState === 'french' ? languages[43].french : languages[43].german : ''}</h5>
                          <p>Importance: {m.locationInput}/10</p>
                        </div>
                        <div className="rating-detail">
                          <div className='star-array'>
                            {[...Array(m.locationInput)].map((star, index) => {
                              return (
                                <div className='stars' key={index} >
                                  <img src="/project-images/star-blue.png" alt="star" />
                                </div>
                              )
                            })}
                          </div>
                          <p>{languages ? languageState === 'english' ? m.location_car : languageState === 'french' ? m.location_car_fr : m.location_car_de : '' }</p>
                        </div>
                      </div>
                      <div className="rating-row">
                        <div className="rating-icon">
                          <img src="/project-images/ski.png" alt="" />
                        </div>
                        <div className="rating-name">
                          <h5>Piste</h5>
                          <p>Importance: {m.pisteInput}/10</p>
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
                          <p>{languages ? languageState === 'english' ? m.piste : languageState === 'french' ? m.piste_fr : m.piste_de : ''}</p>
                        </div>
                      </div>
                      <div className="rating-row">
                        <div className="rating-icon">
                          <img src="/project-images/goggles.png" alt="" />
                        </div>
                        <div className="rating-name">
                          <h5>{languages ? languageState === 'english' ? languages[44].english : languageState === 'french' ? languages[44].french : languages[44].german : ''}</h5>
                          <p>Importance: {m.offPisteInput}/10</p>
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
                          <p>{languages ? languageState === 'english' ? m.off_piste : languageState === 'french' ? m.off_piste_fr : m.off_piste_de : ''}</p>
                        </div>
                      </div>
                      <div className="rating-row">
                        <div className="rating-icon">
                          <img src="/project-images/restaurant.png" alt="" />
                        </div>
                        <div className="rating-name">
                          <h5>{languages ? languageState === 'english' ? languages[45].english : languageState === 'french' ? languages[45].french : languages[45].german : ''}</h5>
                          <p>Importance: {m.lunchInput}/10</p>
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
                          <p>{languages ? languageState === 'english' ? m.lunch : languageState === 'french' ? m.lunch_fr : m.lunch_de : ''}</p>
                        </div>
                      </div>
                      <div className="rating-row">
                        <div className="rating-icon">
                          <img src="/project-images/morning-snow.png" alt="" />
                        </div>
                        <div className="rating-name">
                          <h5>{languages ? languageState === 'english' ? languages[39].english : languageState === 'french' ? languages[39].french : languages[39].german : ''}</h5>
                          <p>{choices.conditions}</p>
                        </div>
                        <div className="rating-detail">

                          <p>{languages ? languageState === 'english' ? m.weather_comment : languageState === 'french' ? m.weather_comment_fr : m.weather_comment_de : ''}</p>
                        </div>
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
  )

}


export default SkiSelectorList