import MainNavBar from '../components/MainNavBar'
import SideNav from '../components/SideNav'
import { Link, Route, Routes } from 'react-router-dom' 
import { AiOutlineSearch } from 'react-icons/ai'
import profilepic from '../assets/pexels-spencer-selover-428364 1.png'
import Chat from '../components/Chat'

function Inbox() {
  const iconStyles = {
    color: '#FF0080', 
    fontSize: '1.5rem', 
    cursor: 'pointer',
}

var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();

const chatLink = (
  <Link to='/chat' className="flex mt-4 justify-between gap-2 hover:bg-light-grey dark:hover:bg-dark-grey dark:text-white cursor-pointer p-4 rounded-lg">
    <div className="flex gap-4 content-center">
        <img src={profilepic} alt="" className="rounded-full h-10" />
        <div>
            <h3 className='text-sm md:text-normal'>Temari Nara</h3>
            <p className="text-dark-grey dark:text-light-grey text-xs">Hi, how are you today?</p>
        </div>
      </div>
      <a className="text-pink font-bold text-sm md:text-normal">{time}</a>
  </Link>
)

  return (
    <div className="bg-white dark:bg-black dark:text-white relative p-2">
       <MainNavBar />
      <div className="w-full bg-white dark:bg-black dark:text-white block lg:grid grid-cols-8 gap-4">
        <SideNav />
        <div className="col-span-2 border-r"></div>
        <div className="col-span-6 h-screen">
          <main className='block lg:grid grid-cols-9 gap-4 mt-2 lg:mt-20 mx-auto lg:ml-0'>
            <div className='col-span-4 bg-light-grey dark:bg-black dark:text-white inbox-height border-none lg:border rounded-lg p-4 shadow-lg'>
              <div className='relative'>
                <input type="text" name="search" id="search" placeholder='Search artist...' className='w-full text-xs md:text-sm px-4 py-2 rounded-full' />
                <label htmlFor="search">
                  <AiOutlineSearch style={iconStyles} className='h-4 absolute top-2 right-2' />
                </label>
              </div>

              <div className='mt-8'>
                <h1 className='text-xl md:text-3xl font-bold'>Inbox</h1>
                <div className='overflow-auto'>
                  {chatLink}
                  {chatLink}
                  {chatLink}
                  {chatLink}
                </div>
              </div>
            </div>
            <div className='col-span-5 inbox-height bg-pink rounded-md'>
              <Routes>
                <Route path='/chat' element={<Chat />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Inbox
