import React, { useState } from 'react'
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
    first_name: '',
    last_name: '',
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

  return (


    <form className='form-detail' onSubmit={handleSubmit} >
      <h1>Create Account</h1>
      <h4>Use your email address to register with us</h4>
      <hr />
      {/* First_name */}
      <label htmlFor='first_name'></label>
      <input type='text' name='first_name' className='input' placeholder='First Name' value={formData.first_name} onChange={handleChange} />
      {/* Last name */}
      <label htmlFor='last_name'></label>
      <input type='text' name='last_name' className='input' placeholder='Last Name' value={formData.last_name} onChange={handleChange} />
      {/* Username */}
      <label htmlFor='username'></label>
      <input type='text' name='username' className='input' placeholder='Username' value={formData.username} onChange={handleChange} />
      {/* {errors && <p className = 'denied-text'>Please input username</p>} */}
      {/* Email */}
      <label htmlFor='email'></label>
      <input type='email' name='email' className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
      {/* {errors && <p className = 'denied-text'>Please input email</p>} */}
      {/* Password */}
      <label htmlFor='password'></label>
      <input type='password' name='password' className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
      {/* {errors && <p className = 'denied-text'>Please input password</p>} */}
      {/* Password Confirmation */}
      <label htmlFor='passwordConfirmation'></label>
      <input type='password' name='passwordConfirmation' className='input' placeholder='Password Confirmation' value={formData.passwordConfirmation} onChange={handleChange} />
      {/* Submit */}
      <button type='submit'>Register</button>
    </form>


  )
}

export default Register