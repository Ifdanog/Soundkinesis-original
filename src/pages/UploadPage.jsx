import { FaUpload } from 'react-icons/fa'
import { CgClose } from 'react-icons/cg'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

function UploadPage() {
  const [ files, setFiles ] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [ audio, setAudio ] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef()

  
  const handleDrag = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
  
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

  const uploadFiles = async (e) => {
    const file = e.target.files[0];
    setFiles(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if (file.type.startsWith('audio/*')) {
      setAudio(true)
    } else {
      setAudio(false)
    }

    const emailVal = getCookie('email')

    const form = document.querySelector('form');
    const formData = new FormData(form); 
    
    formData.append('file', file);
    formData.append('email', emailVal);
    const response = await fetch(`https://soundkinesis.herokuapp.com/post/post`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
      },
      body: formData
    })
    const result = await response.json()
    toast.success(result)
  }

  const navigateNewsfeed = () => {
    navigate('/newsfeed')
    e.preventDefault();
  }

  const clearUpload = () => {
    setFiles(null)
    setAudio(false)
    setPreviewUrl(null)
  }

  return (
    <div className="bg-white dark:bg-black h-screen md:h-full relative p-2 pb-40" onDrop={handleDrag}>
      <Link className="flex mt-4 dark:text-white" to='/newsfeed'>
          <CgClose className='w-6 h-6 text-white' />
          <h2 className='ml-4 font-bold'>Upload File</h2>
      </Link>

      <section>
         <div className='w-full px-4 md:px-8'>
         <input type="file" accept="audio/*,video/*" onChange={uploadFiles} hidden />
          <div className='pb-8'>
          {previewUrl && (
            <>
              {audio ? (
                <audio src={previewUrl} alt="Preview" />
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
          <div id='file-browser-input' name='file-browser-input' onDragOver={handleDrag} onDrop={handleDrop} className="upload-div hidden md:block transition-all duration-1000 relative text-light-grey hover:text-white cursor-pointer">
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
            <div className='w-full relative'>
              <textarea name="" id="" placeholder='Tell viewer about your video' className='w-full h-20 pl-4 pt-6 text-sm' required></textarea>
              <label htmlFor="" className='absolute pl-4 top-0.5 left-0 text-xs'>Description (Required)</label>
            </div>
            <div className='w-full mt-4'>
              <div className='dark:text-white'>
                <h2>Visibility</h2>
                <p className='text-xs w-full md:w-1/2 my-2'>This determines if you want your post to be private or public. Posts marked as private won't be shown to your audience.</p>

                <select id="visibility" name="visibility" className='w-1/2 p-2 text-xs rounded-md mt-2 bg-light-grey dark:text-black' required>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
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


// import { FaUpload } from 'react-icons/fa'
// import { GrClose } from 'react-icons/gr'
// import { Link, useNavigate } from 'react-router-dom'
// import { useRef, useState } from 'react'

// function UploadPage() {
//   const [ files, setFiles ] = useState(null)
//   const navigate = useNavigate()
//   const inputRef = useRef()
  
//   const handleDrag = (e) => {
//     e.preventDefault();
//   }

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setFiles(e.dataTransfer.files)

//     const file = e.target.files
    
//     if(file) {
//       const reader = new FileReader()
      
//       const previewImage = document.getElementById('preview-image')
//       const previewDiv = document.getElementById('preview-div')

//       reader.addEventListener('load', function() {
//         previewImage.setAttribute('src', this.result);
//         previewDiv.style.display= 'flex'
//       });

//       reader.readAsDataURL(file);
//     } else {
//       previewDiv.style.display= 'none'
//       setFiles(null)
//     }
//   }

//   const uploadFiles = (e) => {
//     setFiles(e.target.files)

//     const file = e.target.files[0]
    
//     if(file) {
//       const reader = new FileReader()
//       const previewImage = document.getElementById('preview-image')
//       const previewDiv = document.getElementById('preview-div')

//       reader.addEventListener('load', function() {
//         previewImage.setAttribute('src', this.result);
//         previewDiv.style.display= 'flex'
//       });

//       reader.readAsDataURL(file);
//     } else {
//       previewDiv.style.display= 'none'
//       setFiles(null)
//     }
//   }

//   const navigateNewsfeed = () => {
//     navigate('/newsfeed')
//     e.preventDefault();
//   }

//   return (
//     <div className="bg-white dark:bg-black h-screen md:h-full relative p-2 pb-40" onDrop={handleDrag}>
//       <Link className="flex mt-4 dark:text-white" to='/newsfeed'>
//           <GrClose />
//           <h2 className='ml-4 font-bold'>Upload File</h2>
//       </Link>

//       <section>
//         <div id='preview-div' className='gap-4 w-full h-40 hidden p-4'>
//             <audio controls>
//               <source src='' id='preview-image' className='w-max-20 h-20 rounded-md' />
//             </audio> 
//         </div>
//       </section>

//       {!files ? (
//         <>
//         <div className='w-1/2 py-10 text-center mx-auto'>
//           <div id='file-browser-input' name='file-browser-input' onDragOver={handleDrag} onDrop={handleDrop} className="upload-div hidden md:block transition-all duration-1000 relative text-light-grey hover:text-white cursor-pointer">
//             <FaUpload className='upload-icon' />
//           </div>
//           <input type="file" onChange={uploadFiles} ref={inputRef} hidden />
//           <button className='bg-pink mt-8 px-8 py-2 rounded-full' onClick={() => inputRef.current.click()}>
//             <p className='text-white ml-1 text-xs md:text-sm'>Select Files</p>
//           </button>
//         </div>
//         <div className='w-1/2 mx-auto text-center -mt-4'>
//           <h2 className='text-xl md:text-2xl font-semibold dark:text-white'>Drag and drop files to upload</h2>
//           <p className='text-dark-grey text-sm md:text-normal'>Your files will be made private till you publish them</p>
//           <p className='text-pink text-xs'>The Upload button appears when you select a file</p>
//         </div>
//         </>
//       ) : (
//         <main className='w-full px-4 md:px-8'>
//           <form onSubmit={navigateNewsfeed}>
//             <div className='w-full relative'>
//               <textarea name="" id="" placeholder='Tell viewer about your video' className='w-full h-20 pl-4 pt-6 text-sm' required></textarea>
//               <label htmlFor="" className='absolute pl-4 top-0.5 left-0 text-xs'>Description (Required)</label>
//             </div>
//             <div className='w-full mt-4'>
//               <div className='dark:text-white'>
//                 <h2>Visibility</h2>
//                 <p className='text-xs w-full md:w-1/2 my-2'>This determines if you want your post to be private or public. Posts marked as private won't be shown to your audience.</p>

//                 <select id="visibility" name="visibility" className='w-1/2 p-2 text-xs rounded-md mt-2 bg-light-grey dark:text-black' required>
//                   <option value="public">Public</option>
//                   <option value="private">Private</option>
//                 </select>
//               </div>
//             </div>
//             {files && (
//           <div className='bg-white dark:bg-black'>
//             <div className='w-1/2 py-10 text-center mx-auto'>
//               <button className='bg-dark-grey mt-8 px-8 py-2 rounded-full mr-4'>
//                 <p className='text-white ml-1 text-xs md:text-sm' onClick={() => setFiles(null)}>Clear</p>
//               </button>
//               <button className='bg-pink mt-8 px-8 py-2 rounded-full'>
//                 <p className='text-white ml-1 text-xs md:text-sm'>Upload</p>
//               </button>
//             </div>
//           </div>
//           )
//         }
//           </form>
//         </main>
//       )
//       }
//         </div>
//   )
// }

// export default UploadPage
