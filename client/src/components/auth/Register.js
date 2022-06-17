import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    first_name: '',
    last_name: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    // first_name: '',
    // last_name: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(e.target.name)
    console.log(e.target.value)
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      navigate('/login')
    } catch (err) {
      setErrors(err.response.status + ' ' + err.response.statusText)
    }
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
      <section className='register-content'>
        <form className='form-detail' onSubmit={handleSubmit} >
          <h1>{languages ? languageState === 'english' ? languages[28].english : languageState === 'french' ? languages[28].french : languageState === 'german' ? languages[28].german : languages[28].english : ''}</h1>
          <p>{languages ? languageState === 'english' ? languages[29].english : languageState === 'french' ? languages[29].french : languageState === 'german' ? languages[29].german : languages[29].english : ''}</p>
          <hr />
          {/* First_name */}
          <label htmlFor='first_name'></label>
          <input type='text' name='first_name' className='input' placeholder={languages ? languageState === 'english' ? languages[30].english : languageState === 'french' ? languages[30].french : languageState === 'german' ? languages[30].german : languages[30].english : ''} value={formData.first_name} onChange={handleChange} />
          {/* Last name */}
          <label htmlFor='last_name'></label>
          <input type='text' name='last_name' className='input' placeholder={languages ? languageState === 'english' ? languages[31].english : languageState === 'french' ? languages[31].french : languageState === 'german' ? languages[31].german : languages[31].english : ''} value={formData.last_name} onChange={handleChange} />
          {/* Username */}
          <label htmlFor='username'></label>
          <input type='text' name='username' className='input' placeholder={languages ? languageState === 'english' ? languages[34].english : languageState === 'french' ? languages[34].french : languageState === 'german' ? languages[34].german : languages[34].english : ''} value={formData.username} onChange={handleChange} />
          {/* {errors && <p className = 'denied-text'>Please input username</p>} */}
          {/* Email */}
          <label htmlFor='email'></label>
          <input type='email' name='email' className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
          {/* {errors && <p className = 'denied-text'>Please input email</p>} */}
          {/* Password */}
          <label htmlFor='password'></label>
          <input type='password' name='password' className='input' placeholder={languages ? languageState === 'english' ? languages[23].english : languageState === 'french' ? languages[23].french : languageState === 'german' ? languages[23].german : languages[23].english : ''}value={formData.password} onChange={handleChange} />
          {/* {errors && <p className = 'denied-text'>Please input password</p>} */}
          {/* Password Confirmation */}
          <label htmlFor='passwordConfirmation'></label>
          <input type='password' name='passwordConfirmation' className='input' placeholder={languages ? languageState === 'english' ? languages[32].english : languageState === 'french' ? languages[32].french : languageState === 'german' ? languages[32].german : languages[32].english : ''}value={formData.passwordConfirmation} onChange={handleChange} />
          {/* Submit */}
          <hr/>
          <button type='submit'>{languages ? languageState === 'english' ? languages[33].english : languageState === 'french' ? languages[33].french : languageState === 'german' ? languages[33].german : languages[33].english : ''}</button>
        </form>
      </section>
    </section>

  )
}

export default Register