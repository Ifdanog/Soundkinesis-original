import { FaSearch } from 'react-icons/fa'
import { MdAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

function MainNavBar() {
  const searchArtist = async (e) => {
    const searchValue = document.getElementById('search').value
    const data = {
      search_word: searchValue
    }
    const response = await fetch('http://soundkinesis.herokuapp.com/search_artist/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
      },
      body: JSON.stringify(data)
      })
  }
  const iconStyles = {
    color: '#FF0080', 
    fontSize: '1.2rem', 
    cursor: 'pointer',
}

  return (
    <header className='absolute right-2'>
       <div className='pt-4 gap-4 hidden lg:flex'>
        <div className='relative'>
            <input type="text" name="search" id="search" placeholder='Search artist...' className='w-full text-xs md:text-sm px-4 py-2 rounded-full dark:bg-black dark:text-white border dark:border-white' />
            <label htmlFor="search">
              <FaSearch onClick={searchArtist} style={iconStyles} className='h-4 absolute top-2 right-2' />
            </label>
        </div>
        <div>
            <Link to='/upload'>
              <button className='flex bg-pink px-4 py-2 rounded-full'>
                  <MdAdd style={{ color: '#eee', height: '1.2rem' }} />
                  <p className='text-white ml-1 text-xs md:text-sm'>Upload</p>
              </button>
            </Link>
        </div>
       </div>
    </header>
  )
}

export default MainNavBar
