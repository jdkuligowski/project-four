import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'



const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState(false)

  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('skiAgent-user-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      console.log(formData)
      setUserTokenToLocalStorage(data.token)
      //console.log(data.token)
      console.log({ data })
      window.localStorage.setItem('skiAgent-username', formData.email)
      navigate('/resorts')
    } catch (error) {
      setErrors(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }

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
    <section className='login-page'>
      <section className='login-content'>
        <section className='form-section'>
          <form className='form-detail' onSubmit={handleSubmit}>
            <div className='icon'>
              <img src="/project-images/cable-car-cabin.png" alt='logo' />
            </div>
            <h1>Ski Agent</h1>
            <p>{languages ? languageState === 'english' ? languages[22].english : languageState === 'french' ? languages[22].french : languageState === 'german' ? languages[22].german : languages[22].english : ''}</p>
            <hr />
            {/* Email */}
            <label htmlFor='email'></label>
            <input type='email' name='email' className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
            {/* Password */}
            <label htmlFor='password'></label>
            <input type='password' name='password' className='input' placeholder={languages ? languageState === 'english' ? languages[23].english : languageState === 'german' ? languageState === 'french' ? languages[23].french : languages[23].german : languages[23].english : ''} value={formData.password} onChange={handleChange} />
            {/* {errors && <p className='denied-text'>Please enter the correct login details</p>} */}
            {/* Submit */}
            <button className='sign-up' type='submit'>{languages ? languageState === 'english' ? languages[24].english : languageState === 'french' ? languages[24].french : languageState === 'german' ? languages[24].german : languages[24].english : ''}</button>
            <h5>{languages ? languageState === 'english' ? languages[25].english : languageState === 'french' ? languages[25].french : languageState === 'german' ? languages[25].german : languages[25].english : ''}<Link to={'/register'}>
              <span>{languages ? languageState === 'english' ? languages[46].english : languageState === 'french' ? languages[46].french : languageState === 'german' ? languages[46].german : languages[46].english : ''}</span></Link> </h5>
            {/* <button className = 'sign-in'>Sign up</button> */}
          </form>
        </section>
        <section className='login-overview'>
          <h1>{languages ? languageState === 'english' ? languages[26].english : languageState === 'french' ? languages[26].french : languageState === 'german' ? languages[26].german : languages[26].english : ''}</h1>
          <h1>{languages ? languageState === 'english' ? languages[27].english : languageState === 'french' ? languages[27].french : languageState === 'german' ? languages[27].german : languages[27].english : ''}</h1>
          <Link to={'/register'}><button>{languages ? languageState === 'english' ? languages[28].english : languageState === 'french' ? languages[28].french : languageState === 'german' ? languages[29].german : languages[28].english : ''}</button></Link>
        </section>
      </section>
    </section>
  )
}

export default Login

