import googleLogo from '../assets/google-logo.png'
import skLogo from '../assets/sklogo-short.png'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useState } from 'react'

function Forgot2() {
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()
    const formSubmit = (e) => {
      setLoading(true)
      verifyPin()

      e.preventDefault()
    }

    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1, cookie.length);
        }
      }
      return null;
    }

     function clearCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
    const emailVal = getCookie('email')

    const verifyPin = async () => {
      const emailVal = getCookie('email')
      const code = document.getElementById('code').value
      const forgotDetails = {
        email: emailVal,
        pin: code
      }
      const response = await fetch('https://soundkinesis.herokuapp.com/forgot_pass_verify_pin/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
      },
      body: JSON.stringify(forgotDetails)
      })
      
      const unique_hex = await response.json()
      document.cookie = `unique_hex=${unique_hex}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        
        if (response.status === 200) {
          setLoading(false)
          toast.success('Code verified!')
          navigate('/forgot3')
          clearCookies()
        } else if (response.status === 400 || response.status === 500) {
          toast.error('Check details')
          setLoading(false)
          clearCookies()
        }
      }
    
  return (loading ? <Spinner/> :( 
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bg-gradient-to-r from-purple to-pink h-screen pt-0 md:pt-8 pb-24'>
      <div className="relative">
          <div className="bg-white dark:bg-black dark:text-black py-10 px-6 md:px-10 rounded-none md:rounded-2xl w-full md:w-3/4 mx-auto mt-0 md:mt-2 text-center text-black">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Enter Code<span className="text-purple">.</span></h1>
              <p className='text-xs text-dark-grey'>Enter the code sent to your email</p>
              <form className="mt-8" onSubmit={formSubmit}> 
                  <div className="input-group">
                      <input type="email" id="email" className="input my-4" value={emailVal} required />
                      <label htmlFor="email" className="label top-0">Email</label>
                  </div>

                  <div className="input-group">
                      <input type="number" id="code" className="input my-4" required />
                      <label htmlFor="code" className="label top-0">Code</label>
                  </div>

                  <div className="w-full inline mt-10 md:flex gap-4 my-8">
                          <button className="text-xs md:text-sm w-full text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl mx-0 md:mx-8 btn-transt font-medium">
                              Confirm Code
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

export default Forgot2
