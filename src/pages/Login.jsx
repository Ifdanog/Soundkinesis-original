import googleLogo from '../assets/google-logo.png'
import skLogo from '../assets/sklogo-short.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import { useState } from 'react'

function Login() {
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

    function formSubmit(e) {
      loginUser()
      setLoading(true)
      e.preventDefault();
  }

  const loginUser = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const loginData = {
      email: email,
      password: password
    }

    document.cookie = `email=${email}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    
    const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/login', {
      method: 'POST',
      //mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: JSON.stringify(loginData)
      })
      .then(response => {
        if (response.status === 200) {
            setLoading(false)
            toast.success('Login Successful')
            window.localStorage.setItem('isLoggedIn', true)
            navigate('/newsfeed')
          } else if (response.status === 400) {
            toast.error('Invalid login details')
            setLoading(false)
          }
        })
      .catch(error => {
        toast.error('Invalid login details');
        setLoading(false)
        console.log(error)
      })
  }
  

  return (loading ? <Spinner /> : (
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bg-gradient-to-r from-purple to-pink h-screen pt-0 md:pt-8 pb-24'>
      <div className="relative">
          <div className="bg-white dark:bg-black dark:text-black py-10 px-6 md:px-10 rounded-none md:rounded-2xl w-full md:w-3/4 mx-auto mt-0 md:mt-2 text-center text-black">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Welcome Back<span className="text-purple">.</span></h1>
              <p className='text-xs text-dark-grey'>Don't have an account? <Link to='/join' className='text-pink underline underline-offset-2'>Create an Account</Link></p>
              <form className="mt-8" onSubmit={formSubmit}> 
                  <div className="input-group">
                      <input type="email" id="email" className="input my-4" required />
                      <label htmlFor="email" className="label top-0">Email</label>
                  </div>

                  <div className="input-group">
                      <input type="password" id="password" className="input my-4" required />
                      <label htmlFor="password" className="label top-0">Password</label>
                  </div>

                  <div className='relative mb-20'>
                    <Link to="/forgot-password" className='verify inline absolute left-0 mt-4 text-sm underline dark:text-white'>Forgot Password?</Link>
                  </div>

                  <div className="w-full inline mt-10 md:flex gap-4 my-8">
                          <button className="text-xs md:text-sm w-full ml-0 text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl mx-8 btn-transt font-medium">
                              Login
                          </button>
                      <button className="text-xs md:text-sm w-full mt-4 md:mt-0 text-black px-0.5 py-0.5 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl">
                          <div className="py-3 rounded-lg bg-white font-medium btn-transt">
                              <img src={googleLogo} alt="google's logo" className='h-6 inline' />
                              Sign Up with Google</div>
                      </button>
                  </div>
              </form>
          </div>
          <img src={skLogo} alt="short SoundKinesis Logo" className='h-20 absolute -bottom-20 right-5 pb-4' />
        </div>
    </div>
    <Footer />
    </>
  ))
}

export default Login
