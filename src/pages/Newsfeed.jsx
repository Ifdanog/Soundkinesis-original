import Post from '../components/Post'
import SideNav from '../components/SideNav'
import MainNavBar from '../components/MainNavBar'
import Suggestions from '../components/Suggestions'
import { Link } from 'react-router-dom'
import Audio from '../components/Audio'
import { useState } from 'react'

function Newsfeed() {
  const [showVideo, setShowVideo] = useState(true)

  const clickedBtn = {
    width: '50%',
    padding: '.5rem',
    borderLeftRadius: '100%',
    backgroundColor: '#1D2123',
    color: '#eee',
    fontSize: '.8rem',
  }

  const unClickedBtn = {
    width: '50%',
    padding: '.5rem',
    borderRadius: '100%',
    color: '#1D2123',
    fontSize: '.8rem',
  }

  const onClick = () => {
    setShowVideo(!showVideo)
    
  }
  return (    
    <div className="bg-white dark:bg-black dark:text-white relative p-2">
       <MainNavBar />
      <div className="w-full block lg:grid grid-cols-8 gap-4 mb-14">
        <SideNav />
        <div className="col-span-2 border-r h-full"></div>
        <div className="col-span-4">
          <div className='border w-2/3 sm:w-1/3 dark:bg-white rounded-full overflow-hidden mt-4 lg:mt-20 mb-10 ml-6 lg:ml-0'>
            <Link>
              <button onClick={onClick} style={showVideo ? clickedBtn : unClickedBtn}>Video</button>
            </Link>
            <Link>
              <button onClick={onClick} id='newsBtn' style={showVideo ? unClickedBtn : clickedBtn}>Audio</button>
            </Link>
        </div>
        {showVideo ? <Post /> : <Audio />}
        </div>
        <Suggestions />
      </div>
    </div>
  )
}

export default Newsfeed
