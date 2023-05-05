import MainNavBar from '../components/MainNavBar'
import SideNav from '../components/SideNav'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Creators from '../components/Creators'
import NewUploads from '../components/NewUploads'

function Explore() {
  const [ showUpload, setShowUpload ] = useState(true)

  const selected = {
    backgroundColor: '#1D2123',
    color: '#eee',
    border: '1px solid #000',
    padding: '.5rem 1rem',
    borderRadius: '.5rem',
  }

  const unSelected = {
    backgroundColor: '#eee',
    color: '#1D2123',
    border: '1px solid #000',
    padding: '.5rem 1rem',
    borderRadius: '.5rem',
  }

  const onClick = () => {
    setShowUpload(!showUpload)
  }

  return (
    <div className="bg-white dark:bg-black dark:text-white relative p-2">
      <MainNavBar />
      <div className="w-full bg-white dark:bg-black dark:text-white block lg:grid grid-cols-8 gap-4">
        <SideNav />
        <div className="col-span-2 border-r h-full"></div>
        <div className="col-span-6 h-full">
          <main className="w-4/5 lg:w-full mx-auto mt-0 lg:mt-20 mb-14">
            <div className='flex gap-8'>
              <Link>
                <button style={showUpload ? selected : unSelected} onClick={onClick}>New Uploads</button>
              </Link>
              <Link>
                <button style={showUpload ? unSelected : selected} onClick={onClick}>Top Creators</button>
              </Link>
            </div>
            {showUpload ? <NewUploads /> : <Creators />}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Explore
