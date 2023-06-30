import { GrClose } from 'react-icons/gr'
import { FaUpload } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import profilepic from '../assets/icons8-male-user-50.png'
import Spinner from '../components/Spinner'
import { useState, useEffect, useRef } from 'react'

function EditProfile() {
  const [loading, setLoading] = useState(true)
  const [ profilePic, setProfilePic ] = useState(null)
  const [data, setData] = useState({})
  const [ files, setFiles ] = useState(null)
  const [ previewUrl, setPreviewUrl ] = useState('')
  const inputRef = useRef()

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

  const getData = async () => {
    const emailVal = getCookie('email')
    try {
      const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_user/${emailVal}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
      })
      const data = await response.json();
      setProfilePic(data.profile_picture)
      if(response.status === 200) {
        setLoading(false)

      }
      setData(data)
    } catch {
      setLoading(true)
      setData(null)
      toast.error('Error fetch details')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const emailVal = getCookie('email')
  const phone = document.getElementById('phone')
  const first_name = document.getElementById('first_name')
  const last_name = document.getElementById('last_name')
  const stage_name = document.getElementById('stage_name')
  const bio = document.getElementById('bio')
  const dob = document.getElementById('dob')
  const file = document.getElementById('file')

  const editProfile = async(e) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append('email', emailVal);
    formData.append('phone', phone);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('stage_name', stage_name);
    formData.append('bio', bio);
    formData.append('dob', dob);
    formData.append('file', file);
    try {
      const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/edit_user/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
        body: formData
      })
      const result = await response.json();
      if(response.status === 200) {
        setLoading(false)
        toast.success('Profile Edited')
      }
      setData(result)
    } catch {
      setLoading(false)
      toast.error('Check your details')
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFiles(droppedFile);
    uploadFile(droppedFile);
  };
  
  const uploadFiles = (e) => {
    const file = e.target.files[0];
    setFiles(file);
    uploadFile(file);
  };

  
  const uploadFile = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const clearUpload = () => {
    setFiles(null)
    setPreviewUrl(null)
  }

  return (loading ? <Spinner /> : (
    <div className="bg-white dark:bg-black relative">
    <div className="w-full bg-white dark:bg-black block">
        <div className='bg-white dark:bg-black dark:text-white flex justify-between w-full h-20 p-4'>
            <Link className="flex mt-4" to='/profile'>
                <GrClose />
                <h2 className='ml-4 font-bold'>Edit Profile</h2>
            </Link>
        </div>
        <div className='bg-gradient-to-r from-purple to-pink w-full h-40'></div>
        <section className="px-10 pb-10">
            <div className='relative'>
            <img src={profilePic === null ? profilepic : data.profile_picture} alt="" className='w-32 h-32 rounded-full absolute -top-10' />
                {previewUrl && (
                  <GrClose className='w-32 h-32 absolute text-white' onClick={clearUpload} />
                )}
                <section>
                  <div className='w-full px-4 md:px-8'>
                  <input type="file" accept="image/*" onChange={uploadFiles} hidden />
                    <div className='py-8'>
                    {previewUrl && (
                      <img src={previewUrl} alt="Preview" />
                    )}
                    </div>
                  </div>
                </section>

                {!files ? (
                  <>
                  <div className='w-1/2 py-10 text-center mx-auto'>
                    <div id='file-browser-input' name='file-browser-input' onDragOver={handleDragOver} onDrop={handleDrop} className="upload-div hidden md:block transition-all duration-1000 relative text-light-grey hover:text-white cursor-pointer">
                      <FaUpload className='upload-icon' />
                    </div>
                    <input type="file" onChange={uploadFiles} ref={inputRef} hidden />
                    <button className='bg-pink hover:bg-dark-grey mt-8 px-8 py-2 rounded-full' onClick={() => inputRef.current.click()}>
                      <p className='text-white ml-1 text-xs md:text-sm'>Select Files</p>
                    </button>
                  </div>
                  <div className='w-1/2 mx-auto text-center -mt-4'>
                    <h2 className='text-xl md:text-2xl font-semibold dark:text-white'>Drag and drop files to upload</h2>
                    <p className='text-dark-grey text-sm md:text-normal'>Your files will be made private till you publish them</p>
                    <p className='text-pink text-xs'>The Upload button appears when you select a file</p>
                  </div>
                  </>
                ) : null }
            </div>
    
            <main>
                <form className='py-24' onSubmit={editProfile}>
                    <div className="input-group">
                        <input type="text" id="firstName" className="input name-input" placeholder={data.first_name} />
                        <label htmlFor="firstName" className="label">First Name</label>
                    </div>
                    <div className="input-group last-name-input-group">
                        <input type="text" id="lastName" className="input name-input last-name" placeholder={data.last_name} />
                        <label htmlFor="lastName" className="label">Last Name</label>   
                    </div>
                    <div className="input-group">
                      <input type="text" id="stageName" className="input my-4" placeholder={data.stage_name} />
                      <label htmlFor="stageName" className="label top-0">Stage Name</label>
                    </div>
                    <div className="input-group">
                      <textarea name="bio" id="bio" className='bio-input' placeholder={data.bio} onChange={() => {}}></textarea>
                      <label htmlFor="bio" className="label top-0 dob-label">Bio</label>
                    </div>
                    <div className="input-group">
                      <input type="tel" id="phone" placeholder={data.phone_number} className="input my-4" />
                      <label htmlFor="phoneNumber" className="label top-0">Phone</label>
                    </div>
                    <div className="input-group">
                      <input type="date" id="dob" placeholder=
                      {data.dob} className="input my-4 select-input" />
                      <label htmlFor="dob" className="label top-0 dob-label">Birthday</label>
                  </div>
                  <button className='bg-pink px-8 py-1 rounded-full'>
                    <p className='text-white text-xs md:text-sm'>Save</p>
                </button>
                </form>
            </main>
        </section>
    </div>
  </div>
  ))
}

export default EditProfile
