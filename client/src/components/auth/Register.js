

const Register = () => {


  return (

  
    <form className='form-detail' >
      <h1>Create Account</h1>
      <h4>Use your email address to register with us</h4>
      <hr/>
      {/* Username */}
      <label htmlFor='username'></label>
      <input type='text' name='username' className='input' placeholder='Username' />
      {/* {errors && <p className = 'denied-text'>Please input username</p>} */}
      {/* Email */}
      <label htmlFor='email'></label>
      <input type='email' name='email' className='input' placeholder='Email' />
      {/* {errors && <p className = 'denied-text'>Please input email</p>} */}
      {/* Password */}
      <label htmlFor='password'></label>
      <input type='password' name='password' className='input' placeholder='Password' />
      {/* {errors && <p className = 'denied-text'>Please input password</p>} */}
      {/* Password Confirmation */}
      <label htmlFor='passwordConfirmation'></label>
      <input type='password' name='passwordConfirmation' className='input' placeholder='Password Confirmation' />
      {/* Submit */}
      <button type = 'submit'>Register</button>
    </form>
    

  )
}

export default Register