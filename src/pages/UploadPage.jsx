import { FaUpload } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import thumbNail from '../assets/icons8-male-user-50.png'

function UploadPage() {
  const [ files, setFiles ] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [ audio, setAudio ] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef()

  
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

  const uploadFile = async (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  
    if (file.type.startsWith('audio/')) {
      setAudio(true);
    } else {
      setAudio(false);
    }
  };

  const sendToBackend = async (file) => {
    const emailVal = getCookie('email');
    const visibleMode = document.getElementById('visibility').value
    const titleVal = document.getElementById('title').value
    const descVal = document.getElementById('description').value
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('visibility', visibleMode)
    formData.append('email', emailVal);
    formData.append('title', titleVal);
    formData.append('description', descVal);
  
    const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/post`, {
      method: 'POST',
      headers: {
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: formData
    });
  
    const result = await response.json();
    toast.success(result);
  }

  const navigateNewsfeed = () => {
    navigate('/newsfeed')
    sendToBackend(files)
    e.preventDefault();
  }

  const clearUpload = () => {
    setFiles(null)
    setAudio(false)
    setPreviewUrl(null)
  }

  return (
    <div className="bg-white dark:bg-black h-screen md:h-full relative p-2 pb-40" onDrop={handleDrop}>
      <Link className="flex mt-4 dark:text-white" to='/newsfeed'>
          <CgClose className='w-6 h-6 text-black dark:text-white' />
          <h2 className='ml-4 font-bold'>Upload File</h2>
      </Link>

      <section>
         <div className='w-full px-4 md:px-8'>
         <input type="file" accept="audio/*,video/*" onChange={uploadFiles} hidden />
          <div className='py-8'>
          {previewUrl && (
            <>
              {audio ? (
                <audio src={previewUrl} alt="Preview" controls />
              ) : (
                <video src={previewUrl} alt="Preview" controls />
              )}
            </>
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
      ) : (
        <main className='w-full px-4 md:px-8'>
          <form id='form' onSubmit={navigateNewsfeed}>
          <div className='w-full relative mb-10'>
              <input name="title" id="title" placeholder='Name your content' className='w-full h-14 pl-4 pt-6 text-sm' required />
              <label htmlFor="title" className='absolute pl-4 top-0.5 left-0 text-xs'>Title (Required)</label>
            </div>
            <div className='w-full relative'>
              <textarea name="description" id="description" placeholder='Tell viewer about your content' className='w-full h-20 pl-4 pt-6 text-sm' required></textarea>
              <label htmlFor="description" className='absolute pl-4 top-0.5 left-0 text-xs'>Description (Required)</label>
            </div>
            <div className='w-full mt-4'>
              <div className='dark:text-white'>
                <h2>Visibility</h2>
                <p className='text-xs w-full md:w-1/2 my-2'>This determines if you want your post to be private or public. Posts marked as private won't be shown to your audience.</p>

                <select id="visibility" name="visibility" className='w-1/2 p-2 text-xs rounded-md mt-2 bg-light-grey dark:text-black' required>
                  <option value="visible">Public</option>
                  <option value="hidden">Private</option>
                </select>
              </div>
            </div>
            {files && (
          <div className='bg-white dark:bg-black'>
            <div className='w-1/2 py-10 text-center mx-auto'>
              <button className='bg-dark-grey mt-8 px-8 py-2 rounded-full mr-4'>
                <p className='text-white ml-1 text-xs md:text-sm' onClick={clearUpload}>Clear</p>
              </button>
              <button className='bg-pink mt-8 px-8 py-2 rounded-full'>
                <p className='text-white ml-1 text-xs md:text-sm'>Upload</p>
              </button>
            </div>
          </div>
          )
        }
          </form>
        </main>
      )
      }
        </div>
  )
}

export default UploadPage