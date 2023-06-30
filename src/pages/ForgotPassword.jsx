import googleLogo from '../assets/google-logo.png'
import skLogo from '../assets/sklogo-short.png'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useState } from 'react'

function ForgotPassword() {
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

    const formSubmit = (e) => {
      setLoading(true)
      forgotPass()

      e.preventDefault()
    }

    const forgotPass = async () => {
      const email = document.getElementById('email').value
      document.cookie = `email=${email}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;

      const forgotDetails = {
        email: email
      }
      const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/forgot_password/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: JSON.stringify(forgotDetails)
      })

      .then(function (response) {
        if (response.status === 200) {
          setLoading(false)
          toast.success('Code Sent!')
          navigate('/forgot2')
        } else if (response.status === 400) {
          toast.error('Check Email')
          setLoading(false)
        }
      })
      .catch(function (error) {
        toast.error('Check Email');
        setLoading(false)
      })
      }
      
  return (loading ? <Spinner/> :( 
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bg-gradient-to-r from-purple to-pink h-screen pt-0 md:pt-8 pb-24'>
      <div className="relative">
          <div className="bg-white dark:bg-black dark:text-black py-10 px-6 md:px-10 rounded-none md:rounded-2xl w-full md:w-3/4 mx-auto mt-0 md:mt-2 text-center text-black">
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Forgot Password<span className="text-purple">.</span></h1>
              <p className='text-xs text-dark-grey'>Enter the email connected to your account.</p>
              <form className="mt-8" onSubmit={formSubmit}> 
                  <div className="input-group">
                      <input type="email" id="email" className="input my-4" required />
                      <label htmlFor="email" className="label top-0">Email</label>
                  </div>

                  <div className="w-full inline mt-10 md:flex gap-4 my-8">
                          <button className="text-xs md:text-sm w-full text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl mx-0 btn-transt font-medium">
                              Send Code
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

export default ForgotPassword
