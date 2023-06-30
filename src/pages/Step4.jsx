import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import skLogo from '../assets/sklogo-short.png'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'
import { useState } from 'react'
import { toast } from 'react-toastify'

function Step4() {
  const [ loading, setLoading ] = useState(false)
  const [ showInput, setShowInput ] = useState(false)
  const navigate = useNavigate();


    const formSubmit = (e) => {
       navigate('/login')
       setLoading(true)
      e.preventDefault();
      validatePin()
    }

    const validatePin = async () => {
      try {
        const emailVal = getCookie('email')
        const pin = document.getElementById('code').value
        const data = {
          email: emailVal,
          pin: pin
        }

        const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/validate_email_pin/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
          },
          body: JSON.stringify(data),
        })
        setShowInput(true)
        setLoading(false)
        toast.success('Email Verified')
      } catch (error) {
        toast.error('Incorrect Details')
        setShowInput(false)
        setLoading(false)
      }
    }

    const sendCode = () => {
      fetchCode()
    }

    const resendCode = async () => {
      try {
        const emailVal = getCookie('email')
        const data = {
          email: emailVal
        }

        const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/resend_otp/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
          },
          body: JSON.stringify(data),
        })
        setShowInput(true)
        setLoading(false)
        toast.success('OTP sent!')
        if(response.status === 400) {
          toast.error('Unused OTP available')
        }
      } catch (error) {
        toast.error('Incorrect Details')
        setShowInput(false)
        setLoading(false)
      }
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

    const emailValue = getCookie('email')
    const fetchCode = async () => {
      try {
        const emailVal = getCookie('email')
        const data = {
          email: emailVal
        }

        const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/validate_email/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
          },
          body: JSON.stringify(data),
        })
        setShowInput(true)
        setLoading(false)
        toast.success('OTP sent!')
        if(response.status === 400) {
          toast.error('Unused OTP available')
        }
      } catch (error) {
        toast.error('Incorrect Details')
        setShowInput(false)
        setLoading(false)
      }
    }

  return (loading ? <Spinner /> : (
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bg-gradient-to-r from-purple to-pink h-full lg:h-screen pt-0 md:pt-8 pb-24'>
      <div className="relative">
          <div className="bg-white dark:bg-black py-10 px-6 md:px-10 rounded-none md:rounded-2xl w-full md:w-3/4 mx-auto mt-0 md:mt-2 text-center text-black">
                <p className="align-center dark:text-white">Step 4 of 4</p>
                <div className="w-1/3 mx-auto h-0.5 rounded-xl bg-darker-grey">
                    <div className="w-full h-0.5 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg"></div>
                </div>
                <h1 className="mt-4 text-2xl md:text-3xl font-bold dark:text-white">Become an Artist<span className="text-purple">.</span></h1>
                <h3 className='text-left text-sm mt-8 dark:text-white'>Choose how you verify your Account<span className="text-purple">.</span></h3>
                <form className="-mt-2" onSubmit={formSubmit}>
                  {/* <div className="input-group">
                      <input type="tel" id="phoneNoCode" className="input select-input my-4" placeholder='Enter number to send code' required />
                      <label htmlFor="phoneNoCode" className="label top-0 dob-label">Phone Verification</label>
                      <span className='send-code absolute top-10 ml-2/4 right-0 mr-5 text-xs md:text-sm bg-gradient-to-r from-purple to-pink bg-clip-text font-medium cursor-pointer hover:bg-gradient-to-l'>Send Code</span>
                  </div> */}

                  <div className="input-group">
                      <input type="email" id="email" className="input select-input my-4" placeholder='Enter email to send code' value={emailValue} required />
                      <label htmlFor="emailCode" className="label top-0 dob-label">Email Verification</label>
                      <span onClick={sendCode} className='send-code absolute top-10 ml-2/4 right-0 mr-5 text-xs md:text-sm bg-purple bg-clip-text font-medium cursor-pointer hover:bg-pink'>Send Code</span>
                  </div>
                  {showInput ? (<div className="input-group">
                      <input type="number" id="code" className="input select-input my-4" placeholder='Enter code sent to your email' maxLength='4' required />
                      <label htmlFor="code" className="label top-0 dob-label">Code</label>
                  </div>) : null}
                  <div className='relative mb-10'>
                    <a href="" className='text-black dark:text-white verify inline absolute left-0 text-sm underline'>Security Verification Unavailable?</a>
                  </div>

                  <div className="w-full flex my-8">
                      <button className="text-xs md:text-sm w-full ml-0 text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple to-pink rounded-xl btn-transt font-medium">Finish</button>
                  </div>
                  <p className='text-xs text-dark-grey'>Did not receive the code? <Link className="text-pink underline underline-offset-2" onClick={resendCode}>Resend Code</Link></p>
                </form>
            </div>
            <img src={skLogo} alt="short SoundKinesis Logo" className='h-20 absolute -bottom-20 right-5 pb-4' />
        </div>
      </div>
    <Footer />
    </>
  ))
}

export default Step4