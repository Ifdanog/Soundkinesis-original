import googleLogo from '../assets/google-logo.png'
import skLogo from '../assets/sklogo-short.png'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useState } from 'react';

function Find1() {
    const [firstMsg, setFirstMsg] = useState('')
    const [lastMsg, setLastMsg] = useState('')
    const [emailMsg, setEmailMsg] = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('')
    const navigate = useNavigate();

    function formSubmit(e) {
       navigate('/find-an-artist/find2')
        e.preventDefault();
    }

    const validateFirstName = () => {
        const first_name = document.getElementById('firstName')
        const re = /^[a-zA-Z]{2,100}$/

        if(!re.test(first_name.value)) {
            setFirstMsg('Invalid name format')
        } else {
            setFirstMsg('')
            document.cookie = `first_name=${first_name.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        }
    }

    const validateLastName = () => {
        const last_name = document.getElementById('lastName')
        const re = /^[a-zA-Z]{2,100}$/

        if(!re.test(last_name.value)) {
            setLastMsg('Invalid name format')
        } else {
            setLastMsg('')
            document.cookie = `last_name=${last_name.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        }
    }

    const validateEmail = () => {
        const email = document.getElementById('email')
        const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

        if(!re.test(email.value)) {
            setEmailMsg('Invalid email format')
        } else {
            setEmailMsg('')
            document.cookie = `email=${email.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        }
    }

    const validatePhone = () => {
        const phone = document.getElementById('phone')
        document.cookie = `phone=${phone.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

    const validatePassword = () => {
        const password = document.getElementById('password')
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

        if(!re.test(password.value)) {
            setPasswordMsg('Invalid password: must be between 8 and 15 characters and must include one lowercase and one uppercase letter, one numeric digit and one special character')
        } else {
            setPasswordMsg('')
            document.cookie = `password=${password.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
        }
    }

    const validateConfirmPassword = () => {
        const password = document.getElementById('password')
        const confirmPassword = document.getElementById('conPassword')

        if(password.value !== confirmPassword.value) {
            setConfirmPasswordMsg('Check your password')
        } else {
            setConfirmPasswordMsg('')
        }
    }

    function toggleShowPassword(inputFieldId, iconId) {
    const inputField = document.getElementById(inputFieldId);
    const icon = document.getElementById(iconId);
    
    if (inputField.type === "password") {
      inputField.type = "text";
      icon.className = 'text-grey';
    } else {
      inputField.type = "password";
      icon.className = 'text-black';
    }
  }

  return (
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bgStyle bg-gradient-to-r from-purple to-pink'>
      <div className="relative">
          <div className="dark:bg-black bg-white py-10 px-6 md:px-10 rounded-none md:rounded-2xl w-full md:w-3/4 mx-auto mt-0 md:mt-2 text-center text-black">
              <p className="align-center dark:text-white">Step 1 of 3</p>
              <div className="w-1/3 mx-auto h-0.5 rounded-xl bg-darker-grey">
                  <div className="w-1/3 h-0.5 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg"></div>
              </div>
              <h1 className="text-2xl md:text-3xl mt-4 font-bold dark:text-white">Find an Artist<span className="text-purple">.</span></h1>
              <p className='text-xs text-dark-grey'>Already have an account? <Link to='/login' className='text-pink underline underline-offset-2'>Login</Link></p>
              <form className="mt-8" onSubmit={formSubmit}>
                  <div className="name-div mt-4">
                      <div className="input-group">
                          <input type="text" id="firstName" className="input name-input" onChange={validateFirstName} required />
                          <label htmlFor="firstName" className="label">First Name</label>
                          <p className='text-xs text-pink -mt-4'>{firstMsg}</p>
                      </div>
                      <div className="input-group last-name-input-group">
                          <input type="text" id="lastName" className="input name-input last-name" onChange={validateLastName} required />
                          <label htmlFor="lastName" className="label">Last Name</label>
                          <p className='text-xs text-pink -mt-4'>{lastMsg}</p>
                      </div>
                  </div>
                  <div className="input-group">
                      <input type="email" id="email" className="input my-4" onChange={validateEmail} required />
                      <label htmlFor="email" className="label top-0">Business Email</label>
                      <p className='text-xs text-pink -mt-4'>{emailMsg}</p>
                  </div>

                  <div className="input-group">
                      <input type="tel" id="phone" className="input mb-0" onChange={validatePhone} required />
                      <label htmlFor="phoneNumber" className="label top-0">Business Phone</label>
                  </div>

                  <div className="input-group -mt-4">
                      <input type="password" id="password" className="input my-4" onChange={validatePassword} required />
                      <label htmlFor="password" className="label top-0">Password</label>
                      <p className='text-xs text-pink -mt-4'>{passwordMsg}</p>
                  </div>

                  <div className="input-group">
                      <input type="password" id="conPassword" className="input my-4" onChange={validateConfirmPassword} required />
                      <label htmlFor="conPassword" className="label top-0">Confirm Password</label>
                      <p className='text-xs text-pink -mt-4'>{confirmPasswordMsg}</p>
                  </div>

                  <div className="w-full inline md:flex gap-4 my-8">
                        <button type="submit" className="text-xs md:text-sm w-full ml-0 text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl mx-8 btn-transt font-medium">
                            Continue
                        </button>
                      <button className="text-xs md:text-sm w-full mt-4 md:mt-0 text-black px-0.5 py-0.5 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl">
                          <div className="py-3 rounded-lg bg-white font-medium btn-transt dark:bg-black dark:text-white">
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
  )
}

export default Find1


// {IfeOluwa18}