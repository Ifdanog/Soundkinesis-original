import googleLogo from '../assets/google-logo.png'
import skLogo from '../assets/sklogo-short.png'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { useState } from 'react'

function Forgot3() {
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate()

    const formSubmit = (e) => {
      setLoading(true)
      newPassword()

      e.preventDefault()
    }

    const newPassword = async () => {
      const password = document.getElementById('password').value
      const conPassword = document.getElementById('conPassword').value
      const newDetails = {
        unique_hex: '76eab97d9de6471898f3e78323902bd1',
        password_1: password,
        password_2: password
      }
      const response = await fetch('https://soundkinesis.herokuapp.com/reset_password/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
      },
      body: JSON.stringify(newDetails)
      })

      .then(function (response) {
        if (response.status === 200) {
          setLoading(false)
          toast.success("Password changed successfully")
          navigate('/login')
        } else if (response.status === 400) {
          toast.error('Incorrect details')
          setLoading(false)
        }
      })
      .catch(function (error) {
        toast.error('Incorrect details');
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
              <h1 className="text-2xl md:text-3xl font-bold dark:text-white">Reset Password<span className="text-purple">.</span></h1>
              <p className='text-xs text-dark-grey'>Enter your new password.</p>
              <form className="mt-8" onSubmit={formSubmit}> 
                  <div className="input-group">
                      <input type="password" id="password" className="input my-4" required />
                      <label htmlFor="password" className="label top-0">Password</label>
                  </div>
                  <div className="input-group">
                      <input type="password" id="conPassword" className="input my-4" required />
                      <label htmlFor="conPassword" className="label top-0">Confirm Password</label>
                  </div>
                  <div className="w-full inline mt-10 md:flex gap-4 my-8">
                          <button className="text-xs md:text-sm w-full text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl mx-0 md:mx-8 btn-transt font-medium">
                              Reset Password
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

export default Forgot3
