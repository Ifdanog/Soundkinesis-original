import { CgClose } from 'react-icons/cg'
import profilepic from '../assets/icons8-male-user-50.png'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
import soundKinesisLogo from '../assets/logocolor.png'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Search() {
    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState([])
    const [ profilePic, setProfilePic ] = useState([])
    const [ searchResults, setSearchResults ] = useState([])
    const [ dataResults, setDataResults ]= useState([])
    const navigate = useNavigate()

    const searchArtist = async () => {
        const searchValue = document.getElementById('search').value
        const data = {
          search_word: searchValue
        }
        const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/search_artist/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
          },
          body: JSON.stringify(data)
          })
          const result = await response.json()
          setSearchResults(result)

          if(result.length !== null) {
            for (let i = 0; i < result.length; i++) {
              getData(result[i].email);
            }
          }
      }

      useEffect(() => {
        searchArtist()
      }, [])

      const iconStyles = {
        color: '#FF0080', 
        fontSize: '1.4rem', 
        cursor: 'pointer',
      }
      const getData = async (searchEmail) => {
        try {
          const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_user/${searchEmail}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
            },
          })
          const datas = await response.json();
          setProfilePic(datas.profile_picture)
          if(response.status === 200) {
            setLoading(false)
          }
          setData(datas)
          setDataResults((prevDataResults) => [...prevDataResults, datas]);
        } catch {
          setLoading(false)
          setData(null)
          toast.error('Error fetch detail')
        }

      }
      const showProfile = async () => {
        navigate('/userprofile')
      }
  return (
    <div className="w-full h-max-full bg-white dark:bg-black dark:text-white">
      <Link to='/newsfeed'>
        <img src={soundKinesisLogo} alt="Soundkinesis Logo" className='h-16 lg:h-20 ml-6 hidden lg:block cursor-pointer' />
      </Link>
        <div className='w-full p-4 gap-4 hidden lg:flex'>
        <div className='w-full relative'>
            <input type="text" name="search" id="search" placeholder='Search artist...' className='w-full h-14 text-xs md:text-sm px-4 py-2 rounded-lg dark:bg-black dark:text-white border dark:border-white' required/>
            <CgClose onClick={() => document.getElementById('search').value = ''} style={iconStyles} className='h-4 absolute top-4 right-8' />
            <label htmlFor="search">
              <FaSearch onClick={searchArtist} style={iconStyles} className='h-4 absolute top-4 right-2' />
            </label>
        </div>
        </div>
        <div className='relative top-20'> 
        {dataResults.map((d, index) => (
          <div
            key={index}
            className="hover:bg-light-grey dark:hover:bg-darker-grey cursor-pointer p-4 rounded-md flex justify-between gap-2"
            onClick={showProfile}
          >
            <div className="flex gap-4">
              <img
                src={profilePic === null ? profilepic : d.profile_picture}
                alt={`${d.first_name} ${d.last_name}`}
                className="rounded-full h-10"
              />
              <div>
                <h3 className="text-sm md:text-normal">
                  {d.first_name + ' ' + d.last_name}
                </h3>
                <p className="text-dark-grey text-xs">{d.bio}</p>
              </div>
            </div>
            <a className="text-pink font-bold text-sm md:text-normal cursor-pointer bg-white dark:bg-black">
              Follow
            </a>
          </div>
        ))}       
        </div>
    </div>
  );
};

export default Search;
