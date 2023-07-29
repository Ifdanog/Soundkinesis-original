import soundKinesisLogo from '../assets/logocolor.png'
import profilepic from '../assets/icons8-male-user-50.png'
import { FaHome } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'
import { BsChatLeftTextFill } from 'react-icons/bs'
import { MdExplore, MdNotifications, MdLogout, MdAdd } from 'react-icons/md'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function SideNav() {
    const navigate = useNavigate()

    const clicked = {
        color: '#FF0080',
        fontWeight: 'bold',
        fontSize: '1.1rem',
    }

    const unClicked = {
        color: '#8F8F8F',
        fontSize: '1.1rem'
    }

    const imgClicked = {
        border: '2px solid #FF0080',
    }

    const imgUnClicked = {
        border: 'none',
    }

    const downClicked = {
        color: '#FF0080',
        fontWeight: 'bold',
        fontSize: '1.5rem',
    }

    const downUnClicked = {
        color: '#8F8F8F',
        fontSize: '1.5rem'
    }

    const pathMatchRoute = (route) => {
        if(route === location.pathname) {
            return true
        }
    }

    const logoutFunc = () => {
        window.localStorage.removeItem('isLoggedIn')
        navigate('/')
    }

  return (
    <>
    <div className="lg:fixed bg-white dark:bg-black lg:h-screen cols-span-2">
    <Link to='/newsfeed'>
        <img src={soundKinesisLogo} alt="Soundkinesis Logo" className='h-16 lg:h-20 ml-6 hidden lg:block cursor-pointer' />
      </Link>            <nav className='hidden lg:block pr-12 ml-8'>
                <ul>
                    <li className='side-li my-8 flex gap-4 flex-wrap content-center'>
                        <NavLink to="/newsfeed" className='flex gap-4 text-black dark:text-white hover:text-pink'>
                            <FaHome style={pathMatchRoute('/newsfeed') ? clicked : unClicked} />
                            <span style={pathMatchRoute('/newsfeed') ? clicked : unClicked}>Home</span>
                        </NavLink>
                    </li>
                    <li className='side-li mb-8 flex gap-4'>
                        <NavLink to="/explore" className='flex gap-4 text-black dark:text-white hover:text-pink'>
                            <MdExplore style={pathMatchRoute('/explore') ? clicked : unClicked} />
                            <span style={pathMatchRoute('/explore') ? clicked : unClicked}>Explore</span>
                        </NavLink>
                    </li>
                    <li className='side-li mb-8 flex gap-4'>
                        <NavLink to="/inbox" className='flex gap-4 text-black dark:text-white hover:text-pink'>
                            <BsChatLeftTextFill style={pathMatchRoute('/inbox') ? clicked : unClicked} />
                            <span style={pathMatchRoute('/inbox') ? clicked : unClicked}>Inbox</span>
                        </NavLink>
                    </li>
                    <li className='side-li mb-8 flex gap-4'>
                        <NavLink to="/notifications" className='flex gap-4 text-black dark:text-white hover:text-pink'>
                            <MdNotifications style={pathMatchRoute('/notifications') ? clicked : unClicked} />
                            <span style={pathMatchRoute('/notifications') ? clicked : unClicked}>Notifications</span>
                        </NavLink>
                    </li>
                    <li className='side-li mb-8 flex gap-4'>
                        <NavLink to="/settings" className='flex gap-4 text-black dark:text-white hover:text-pink'>
                            <FiSettings style={pathMatchRoute('/settings') ? clicked : unClicked} />
                            <span style={pathMatchRoute('/settings') ? clicked : unClicked}>Settings</span>
                        </NavLink>
                    </li>
                    <li className='side-li mb-8 flex gap-4'>
                        <NavLink to="/profile" className='flex gap-4 text-black dark:text-white hover:text-pink'>
                            <img src={profilepic} alt="" style={pathMatchRoute('/profile') ? imgClicked : imgUnClicked} className='rounded-full h-8' />
                            <span style={pathMatchRoute('/profile') ? clicked : unClicked}>Profile</span>
                        </NavLink>
                    </li>
                </ul>
                <ul className="absolute bottom-0">
                    <li className='side-li mb-8 flex gap-4'>
                        <NavLink to="/" onClick={logoutFunc} className='flex gap-4 text-black dark:text-white hover:text-pink'>
                            <MdLogout style={{marginTop: '3px'}} />
                            <span>Logout</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>

        <nav className="block lg:hidden down fixed bottom-0">
        <ul className="h-14 flex justify-between gap-8 bg-white dark:bg-black dark:border dark:border-white rounded-tr-3xl rounded-tl-3xl mt-4 px-8 py-3 shadow">
            <li className="down-li">
                <NavLink to='/newsfeed' className='flex flex-nowrap flex-col text-center'>
                    <FaHome style={pathMatchRoute('/newsfeed') ? downClicked : downUnClicked} />
                </NavLink>
            </li>
            <li className='down-li'>
                <Link to='/inbox' className='flex flex-nowrap flex-col text-center'>
                    <BsChatLeftTextFill style={pathMatchRoute('/inbox') ? downClicked : downUnClicked} />
                </Link>
            </li>
            <li className='down-li'>
                <NavLink to='/upload' className='flex flex-nowrap flex-col text-center'>
                    <MdAdd className='text-3xl text-dark-grey' />
                </NavLink>
            </li>
            <li className='down-li'>
                <NavLink to='/notifications' className='flex flex-nowrap flex-col text-center'>
                    <MdNotifications style={pathMatchRoute('/notifications') ? downClicked : downUnClicked} />
                </NavLink>
            </li>
            <li className='down-li'>
                <NavLink to="/profile" className='flex gap-4 text-black hover:text-pink'>
                    <img src={profilepic} alt="" className='rounded-full w-6 h-6' style={pathMatchRoute('/profile') ? imgClicked : imgUnClicked} />
                </NavLink>
            </li>
        </ul>
    </nav>
    </>
  )
}

export default SideNav
