import MainNavBar from '../components/MainNavBar'
import SideNav from '../components/SideNav'

function Notifications() {
  const notification = (
    <div className='hover:bg-light-grey dark:hover:bg-dark-grey cursor-pointer p-4 rounded-md mt-4'>
      <p>You have a new post like from @jake</p>
      <span className='text-xs text-dark-grey dark:text-light-grey'>2mins ago</span>
    </div>
  )
  return (
    <div className="bg-white dark:bg-black dark:text-white relative p-2">
       <MainNavBar />
      <div className="w-full bg-white dark:bg-black dark:text-white block lg:grid grid-cols-8 gap-4">
        <SideNav />
        <div className="col-span-2 border-r"></div>
        <div className="col-span-6 h-screen">
          <div className='mt-2 lg:mt-20 ml-8 lg:ml-0'>
            <div className="flex justify-between">
              <h1 className='text-2xl font-bold'>Notifications</h1>
              <span className='text-sm text-dark-grey cursor-pointer hover:text-light-grey'>Mark all as read</span>
            </div>
            {notification}
            {notification}
            {notification}
            {notification}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
