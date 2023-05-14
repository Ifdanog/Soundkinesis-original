import skLogo from '../assets/sklogo-short.png'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Card from '../components/Card'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bg-gradient-to-r from-purple to-pink h-screen pt-0 md:pt-8'>
      <div className="relative">
            <Card>
                <p className='text-xs md:text-sm text-dark-grey'>Start for free</p>
                <div>
                    <h1 className="text-xl md:text-4xl font-bold w-1/2 mx-auto">What would you want to do on this platform<span className="text-pink-500">?</span></h1>
                </div>
                <div className="mt-8">
                <Link to="/find-an-artist/find1">
                    <button className="text-sm md:text-normal text-white mb-8 font-medium px-10 py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl mx-8 btn-transt">
                        Find an Artist
                    </button>
                    </Link>
                    <Link to="/become-an-artist/step1">
                    <button className="dark:text-white text-sm md:text-normal text-black font-medium px-1 py-1 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl">
                      <div className="px-8 py-3 rounded-lg dark:bg-black bg-white btn-transt">Become an Artist</div>
                    </button>
                    </Link>
                </div>
                <p className='text-xs md:text-sm  text-dark-grey mt-4 md:mt-0'>Already an artist? <Link to="/login" className='text-pink underline underline-offset-2'>Login</Link></p>
            </Card>

            <img src={skLogo} alt="short SoundKinesis Logo" className='h-20 absolute -bottom-20 right-5 pb-4' />
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Home
