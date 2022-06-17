import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { components } from 'react-select'


const Home = () => {

  const navigate = useNavigate()

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
      <section className='page-wrapper'>
        {/* {languages.map(l => {
          return ( */}
        <section className='top-section'>
          <div className='intro-content'>
            <h1>{languages ? languageState === 'english' ? languages[0].english : languageState === 'french' ? languages[0].french : languageState === 'german' ? languages[0].german : languages[0].english : '' }</h1>
            <h4>{languages ? languageState === 'english' ? languages[1].english : languageState === 'french' ? languages[1].french : languageState === 'german' ? languages[1].german : languages[1].english : '' }</h4>
            {/* <h4>{languageState === 'english' ? l.english : '' }</h4> */}
            <div className='features'>
              <div className='feature'>
                <div className='icon-container'>
                  <img src="/project-images/ski_2.png" alt="" />
                </div>
                <h2>{languages ? languageState === 'english' ? languages[2].english : languageState === 'french' ? languages[2].french : languageState === 'german' ? languages[2].german : languages[2].english : ''} </h2>
                <p>{languages ? languageState === 'english' ? languages[5].english : languageState === 'french' ? languages[5].french : languageState === 'german' ? languages[5].german : languages[5].english : '' }</p>
              </div>
              <div className='feature'>
                <div className='icon-container'>
                  <img src="/project-images/ski.png" alt="" />
                </div>
                <h2>{languages ? languageState === 'english' ? languages[3].english : languageState === 'french' ? languages[3].french : languageState === 'german' ? languages[3].german : languages[3].english : '' }</h2>
                <p>{languages ? languageState === 'english' ? languages[7].english : languageState === 'french' ? languages[7].french : languageState === 'german' ? languages[7].german : languages[7].english : '' }</p>
              </div>
              <div className='feature'>
                <div className='icon-container'>
                  <img src="/project-images/fork.png" alt="icon" />
                </div>
                <h2>{languages ? languageState === 'english' ? languages[4].english : languageState === 'french' ? languages[4].french : languageState === 'german' ? languages[4].german : languages[4].english : '' }</h2>
                <p>{languages ? languageState === 'english' ? languages[8].english : languageState === 'french' ? languages[8].french : languageState === 'german' ? languages[8].german : languages[8].english : '' }</p>
              </div>
            </div>
            <Link to='/resorts'><button>{languages ? languageState === 'english' ? languages[9].english : languageState === 'french' ? languages[9].french : languageState === 'german' ? languages[9].german : languages[9].english : '' }</button></Link>
          </div>
        </section>
        {/* )
        })} */}


      </section>
    </>
  )
}

export default Home