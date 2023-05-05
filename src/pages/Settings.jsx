import DarkMode from '../components/DarkMode'
import MainNavBar from '../components/MainNavBar'
import SideNav from '../components/SideNav'

function Settings() {
  return (
    <div className="bg-white dark:bg-black relative p-2">
       <MainNavBar />
      <div className="w-full bg-white dark:bg-black dark:text-white block lg:grid grid-cols-8 gap-4">
        <SideNav />
        <div className="col-span-2 border-r"></div>
        <div className="col-span-6 h-screen">
          <h1 className='text-4xl mt-2 lg:mt-20 ml-8 lg:ml-0 font-bold'>Settings</h1>
          <DarkMode />
        </div>
      </div>
    </div>
  )
}

export default Settings
