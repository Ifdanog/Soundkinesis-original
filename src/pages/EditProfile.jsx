import { GrClose } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import profilepic from '../assets/pexels-spencer-selover-428364 1.png'

function EditProfile() {
  return (
    <div className="bg-white dark:bg-black relative">
    <div className="w-full bg-white dark:bg-black block">
        <div className='bg-white dark:bg-black dark:text-white flex justify-between w-full h-20 p-4'>
            <Link className="flex mt-4" to='/profile'>
                <GrClose />
                <h2 className='ml-4 font-bold'>Edit Profile</h2>
            </Link>
            <button className='bg-pink px-8 py-1 rounded-full'>
                <p className='text-white text-xs md:text-sm'>Save</p>
            </button>
        </div>
        <div className='bg-gradient-to-r from-purple to-pink w-full h-40'></div>
        <section className="px-10 pb-10">
            <div className='relative'>
                <img src={profilepic} alt="" className='w-32 h-32 rounded-full absolute -top-10' />
            </div>
    
            <main>
                <form className='py-24'>
                    <div className="input-group">
                        <input type="text" id="firstName" className="input name-input" value='Tom' required />
                        <label htmlFor="firstName" className="label">First Name</label>
                    </div>
                    <div className="input-group last-name-input-group">
                        <input type="text" id="lastName" className="input name-input last-name" value='Lauferson' required />
                        <label htmlFor="lastName" className="label">Last Name</label>
                    </div>
                    <div className="input-group">
                      <input type="text" id="stageName" className="input my-4" value='lordloki' required />
                      <label htmlFor="stageName" className="label top-0">Stage Name</label>
                    </div>
                    <div className="input-group">
                      <textarea name="bio" id="bio" className='bio-input' value='A powerful singer' placeholder='Write a short description of yourself' required></textarea>
                      <label htmlFor="bio" className="label top-0 dob-label">Bio</label>
                    </div>
                    <div className="input-group">
                      <input type="tel" id="phone" className="input my-4" required />
                      <label htmlFor="phoneNumber" className="label top-0">Business Phone</label>
                    </div>
                    <div className="input-group">
                      <input type="date" id="dob" className="input my-4 select-input" required />
                      <label htmlFor="dob" className="label top-0 dob-label">Birthday</label>
                  </div>
                </form>
            </main>
        </section>
    </div>
  </div>
  )
}

export default EditProfile
