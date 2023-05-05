import soundKinesisLogo from '../assets/logo.png'
import smilingMan from '../assets/man.png'
import edit from '../assets/edit.png'
import HOH from '../assets/alexandru-acea-RQgKM1h2agA-unsplash 1.png'
import FF from '../assets/aneesh-mandava-JYGMpnMygjY-unsplash 1.png'
import TA from '../assets/emile-seguin-R9OueKOtGGU-unsplash 1.png'
import broadcast from '../assets/broadcast.png'
import profileSearch from '../assets/Profilesearch.png'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { FaMoon, FaSun } from 'react-icons/fa'
import { MdKeyboardArrowUp } from 'react-icons/md'
import { useState, useEffect } from 'react'

function LandingPage() {
    const [ darkMode, setDarkMode ] = useState(null)

    useEffect(() => {
        if(darkMode === true) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }, [darkMode])

    const toggleOffDarkMode = () => {
        setDarkMode(false)
    }

    const toggleOnDarkMode = () => {
        setDarkMode(true)
    }

    function toggleMenu() {
        document.querySelector('.sideNav').classList.toggle('visible');
    }
  return (
    <div className='dark:bg-black dark:text-white bg-white text-black'>
        <header id='top' className='bg-image h-full flex justify-between px-10 lg:px-16'>
            <img src={soundKinesisLogo} alt="Soundkinesis Logo" className='h-16 lg:h-20' />
            <nav className="hidden lg:block">
            <ul className='flex gap-8 text-white'>
                <li className='mt-6'>
                    <Link to="/">Home</Link>
                </li>
                <li className='mt-6'>
                    <a href="#features">Features</a>
                </li>
                <li className='mt-6'>
                    <a href="#about">About</a>
                </li>
                <li className='mt-6'>
                    <Link to="/">Contact</Link>
                </li>
                <li className='mt-6 ml-8'>
                    <Link to="/login" className='font-medium'>Login</Link>
                </li>
                <li className="mt-6 -ml-4">
                    <Link to="/join" className='font-medium bg-pink py-2 px-8 rounded-full'>Sign Up</Link>
                </li>
            </ul>
            </nav>
        </header>

        <p className="block lg:hidden text-4xl menuBtn" onClick={toggleMenu}>&#9776;</p>

        <nav className="sideNav hidden opacity-0 transition-all duration-1000">
            <ul className='py-4 px-8'>
                <li className='px-4 py-2 active:bg-pink active:text-white'><Link to="/">Home</Link></li>
                <li className='px-4 py-2 active:bg-pink active:text-white'><a href="#features">Features</a></li>
                <li className='px-4 py-2 active:bg-pink active:text-white'><a href="#about">About</a></li>
                <li className='px-4 py-2 active:bg-pink active:text-white'><Link to="/">Contact</Link></li>
                <li className='px-4 py-2 active:bg-pink active:text-white'><Link to="/login">Login</Link></li>
                <li className='px-4 py-2 active:bg-pink active:text-white'><Link to="/join">SignUp</Link></li>
            </ul>
        </nav>

        <hr className='-mt-1 text-white' />

        <div className="relative">
            <div className='fixed top-20 right-0 bg-dark-black rounded-l-full py-2 pl-2 pr-4 z-10 cursor-pointer'>
                {darkMode ? <FaSun className='text-white' onClick={toggleOffDarkMode} /> : <FaMoon className='text-white' onClick={toggleOnDarkMode} />}
            </div>
        </div>
        <div className="relative">
            <div className='fixed w-12 h-12 bottom-10 right-10 bg-dark-black rounded-full py-2 px-2 z-10 cursor-pointer shadow-lg'>
                <a href='#top'>{<MdKeyboardArrowUp className='text-3xl text-white' />}</a>
            </div>
        </div>
        <header className='relative bg-image h-full px-14 pb-14'>
            <h1 className='text-4xl lg:text-6xl lg:w-2/3 w-full text-center lg:text-left text-white font-bold pt-28'>Find and Hire <br /> Talented Musicians</h1>
            <p className='text-white lg:w-1/3 w-full lg:text-left text-center my-4'>Discover the most talented musicians of this generation on our ever growing platform</p>
            <div className='w-full md:w-2/3 text-center lg:text-left lg:mx-0 mx-auto'>
                <Link to="/join"><button className='font-medium bg-pink py-2 px-8 rounded-full text-white'>Get Started</button></Link>
                <button className='py-1 px-8 border border-pink ml-4 rounded-full text-white mt-4 md:mt-0'>Learn More</button>
            </div>
            <img src={smilingMan} alt="Picture of a smiling man with an headset on" className='absolute right-0 hidden lg:block md:top-0' />
        </header>
        <div id='features' className='mt-20 w-3/4 mx-auto'>
            <h3 className='font-bold text-xl text-center'>Features</h3>
            <p className='w-4/5 md:w-1/3 mx-auto text-sm text-center font-medium'>To enable you get the best out of the platform, we have some amazing features like:</p>
            <div className='block lg:grid lg:grid-cols-2 xl:flex gap-20 mt-10'>
                <div className="w-4/5 md:w-1/2 lg:w-full mx-auto xl:w-full bg-gradient-to-r from-purple to-pink rounded-tr-3xl rounded-bl-3xl p-1 mb-8 xl:mb-0">
                    <div className='dark:bg-black dark:text-white bg-white rounded-tr-3xl rounded-bl-3xl p-8'>
                        <img src={broadcast} alt="" className='h-10' />
                        <p className='font-medium text-xs md:text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos nihil debitis nam natus cumque ipsum at omnis sequi molestiae molestias</p>
                    </div>
                </div>
                <div className="w-4/5 md:w-1/2 lg:w-full mx-auto xl:w-full bg-gradient-to-r from-purple to-pink rounded-tr-3xl rounded-bl-3xl p-1 mb-8 xl:mb-0">
                    <div className='dark:bg-black dark:text-white bg-white rounded-tr-3xl rounded-bl-3xl p-8'>
                        <img src={edit} alt="" className='h-10' />
                        <p className='font-medium text-xs md:text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos nihil debitis nam natus cumque ipsum at omnis sequi molestiae molestias</p>
                    </div>
                </div>
                <div className="w-4/5 md:w-1/2 lg:w-full mx-auto xl:w-full bg-gradient-to-r from-purple to-pink rounded-tr-3xl rounded-bl-3xl p-1 mb-8 xl:mb-0">
                    <div className='dark:bg-black dark:text-white bg-white rounded-tr-3xl rounded-bl-3xl p-8'>
                        <img src={profileSearch} alt="" className='h-10' />
                        <p className='font-medium text-xs md:text-sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non eos nihil debitis nam natus cumque ipsum at omnis sequi molestiae molestias</p>
                    </div>
                </div>
            </div>
        </div>
        <hr className='w-3/5 mx-auto text-pink mt-20' />
        <div id="topCreators"  className='mt-20 text-center w-3/4 mx-auto pb-36'>
            <h3 className='font-bold text-xl'>Top Creators</h3>
            <p className='w-4/5 md:w-1/3 mx-auto text-sm'>To enable you get the best out of the platform, we have some amazing features like:</p>
            <div className='mt-10 block md:grid md:grid-cols-2 lg:grid-cols-3  gap-10'>
                <div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>1</p>
                        <img src={HOH} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Head over Heart</p>
                            <p className='ml-6'>Nora Anderson -  Head Ov...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>1</p>
                        <img src={HOH} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Head over Heart</p>
                            <p className='ml-6'>Nora Anderson -  Head Ov...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>1</p>
                        <img src={HOH} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Head over Heart</p>
                            <p className='ml-6'>Nora Anderson -  Head Ov...</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>2</p>
                        <img src={FF} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Fire-Fighters</p>
                            <p className='ml-6'>Rugg Thunder -  The Ban...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>2</p>
                        <img src={FF} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Fire-Fighters</p>
                            <p className='ml-6'>Rugg Thunder -  The Ban...</p>
                        </div>
                    </div>
                    <div className='flex text-xs md:text-sm'>
                        <p>2</p>
                        <img src={FF} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Fire-Fighters</p>
                            <p className='ml-6'>Rugg Thunder -  The Ban...</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>3</p>
                        <img src={TA} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Thoughts Alone</p>
                            <p className='ml-6'>One -  The Team...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>3</p>
                        <img src={TA} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Thoughts Alone</p>
                            <p className='ml-6'>One -  The Team...</p>
                        </div>
                    </div>
                    <div className='flex text-xs md:text-sm'>
                        <p>3</p>
                        <img src={TA} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Thoughts Alone</p>
                            <p className='ml-6'>One -  The Team...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="getStarted" className='bg-gradient-to-r from-purple to-pink py-28'>
            <div className='block lg:flex w-4/5 xl:w-3/4 2xl:w-3/5 mx-auto shadow-xl rounded-tl-3xl rounded-br-3xl'>
                <div className='w-full lg:w-1/2 bg-gradient-to-l from-purple to-pink text-center lg:text-left lg:pl-14 py-24 rounded-tl-3xl'>
                    <h4 className='w-3/4 mx-auto text-white text-xl lg:text-2xl font-bold w-2/3 text-center lg:text-left'>Find and Hire Talented Musicians</h4>
                    <p className='w-3/4 mx-auto text-white text-sm w-2/3 mt-4 text-center lg:text-left'>Discover amazing individuals with musical talents that you would love to work with.</p>
                    <div className='w-2/3 mx-auto'>
                    <Link to="/join"><button className='bg-gradient-to-r from-purple to-pink font-medium py-2 px-8 rounded-full mt-6 text-white'>Get Started</button></Link>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 concert'>
                </div>
            </div>
        </div>
        
        <div id="about" className='my-20'>
        <h3 className='font-bold text-xl text-center'>About</h3>
        <p className='text-center w-3/4 mx-auto my-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum nulla eget porta efficitur. Integer elementum ante blandit venenatis mattis. Proin ante dolor, placerat vel erat molestie, feugiat sodales purus. Phasellus scelerisque augue ut molestie bibendum.</p>
        <p className='text-center w-3/4 mx-auto my-4'>Fusce ac fermentum elit. Etiam consequat mauris vel fermentum rutrum. Integer porta elit et nisl vestibulum fermentum sit amet ac tellus. Phasellus sed ex tempor sem tincidunt tincidunt. Nunc blandit lacus vel commodo tempor. Cras quis tempor ipsum, quis vestibulum neque.</p>
        <p className='text-center w-3/4 mx-auto my-4'> Sed ut sapien vel augue vulputate commodo et et dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec tempor tristique ante, a pellentesque arcu sagittis sed. Sed porta sodales sapien quis dignissim. Nullam lacinia odio risus, at ullamcorper lacus commodo id.</p>
        </div>

        <Footer />
    </div>
  )
}

export default LandingPage
