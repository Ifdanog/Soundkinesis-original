import { Link } from 'react-router-dom'
import soundKinesisLogo from '../assets/logo.png'

function NavBar() {
    function toggleMenu() {
        document.querySelector('.sideNav').classList.toggle('visible');
    }

    return (
        <>
        <header className='bg-gradient-to-r from-purple to-pink h-full flex justify-between px-8 md:px-16'>
            <img src={soundKinesisLogo} alt="Soundkinesis Logo" className='h-16 lg:h-20' />
            <nav className="hidden md:block">
                <ul className='flex gap-8'>
                    <li className='mt-6'>
                        <Link to="/" className='text-white'>Home</Link>
                    </li>
                    <li className='mt-6'>
                        <Link to="/join" className='text-white'>Join</Link>
                    </li>
                </ul>
            </nav>
        </header>
        
        <p className="block md:hidden text-4xl menuBtn" onClick={toggleMenu}>&#9776;</p>
        <nav className="sideNav bg-light-grey hidden opacity-0 transition-all duration-1000">
            <ul className='py-4 px-8'>
                <li className='px-4 py-2 active:bg-pink active:text-white'><Link to="/">Home</Link></li>
                <li className='px-4 py-2 active:bg-pink active:text-white'><Link to="/join">Join</Link></li>
            </ul>
        </nav>
        </>
    )
}

export default NavBar