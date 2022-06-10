
const Login = () => {


  return (
    <section className='form-page'>
      <form className='form-detail'> 
        <h1>Sign in to your account</h1>
        <hr />
        {/* Email */}
        <label htmlFor='email'></label>
        <input type='email' name='email' className='input' placeholder='Email' />
        {/* Password */}
        <label htmlFor='password'></label>
        <input type='password' name='password' className='input' placeholder='Password'  />
        {/* {errors && <p className='denied-text'>Please enter the correct login details</p>} */}
        {/* Submit */}
        <button type='submit'>Sign in</button>
      </form>
      {/* <section className='new-user'>
        <h1>New to seeded?</h1>
        <h4>Sign up for tips tricks and everything you need to start your plant-keeping journey</h4>
        <Link to={`/register`}>
          <button>Sign up</button>
        </Link>

      </section> */}
    </section>
  )
}

export default Login

