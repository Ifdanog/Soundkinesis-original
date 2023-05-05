import soundKinesisLogo from '../assets/logo.png'
import { FaTwitter, FaTelegram, FaLinkedin, FaInstagram, FaDiscord } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='bg-black'>
        <div className='block md:flex justify-between px-16 h-16 -ml-10 md:ml-0 mb-48  md:mb-0'>
            <img src={soundKinesisLogo} alt="Soundkinesis Logo" className='h-16' />
            <nav className='text-white'>
                <ul className='block md:flex gap-10'>
                    <li className='mt-4'><Link to="/" className='leading-8'>Home</Link></li>
                    <li className='mt-4'><Link to="/#features" className='leading-8'>Features</Link></li>
                    <li className='mt-4'><Link to="/#about" className='leading-8'>About</Link></li>
                    <li className='mt-4'><Link to="/" className='leading-8'>Contact</Link></li>
                </ul>
            </nav>
        </div>
            <hr className='w-full my-4 text-white w-full md:w-3/4 mx-0 md:mx-auto' />
        <div className='block md:flex -ml-10 md:ml-0 justify-between px-14 pb-8 h-10'>
            <Link to="/join"><button className='bg-pink rounded-full text-white h-10 px-8 mt-4 md:mt-0'>Get Started</button></Link>
            <div className='flex mt-8 md:mt-2 gap-4'>
                <Link to=""><FaTelegram className='h-6 text-pink' /></Link>
                <Link to=""><FaDiscord className='h-6 text-pink' /></Link>
                <Link to=""><FaInstagram className='h-6 text-pink' /></Link>
                <Link to=""><FaLinkedin className='h-6 text-pink' /></Link>
                <Link to=""><FaTwitter className='h-6 text-pink' /></Link>
            </div>
        </div>
        <p className='-ml-10 md:ml-0 mt-20 text-white text-xs pl-16 py-4'>&copy; 2022 <span>SOUND<b>KINESIS</b></span>, ALL RIGHTS RESERVED</p>
    </footer>
  )
}

export default Footer
