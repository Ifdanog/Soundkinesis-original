import MainNavBar from '../components/MainNavBar';
import profilepic from '../assets/icons8-male-user-50.png'
import { useState, useEffect } from 'react'

function Search() {
    const [ loading, setLoading ] = useState(false)
    const [ data, setData ] = useState([])
    const [ profilePic, setProfilePic ] = useState([])
    const [ searchResults, setSearchResults ] = useState([])

    useEffect(() => {
        searchArtist()
      }, [])
    const searchArtist = async (e) => {
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
          e.preventDefault();
      }

      const getData = async () => {
        try {
          const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_user/${setSearchResults[0].email}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
            },
          })
          const data = await response.json();
          setProfilePic(data.profile_picture)
          if(response.status === 200) {
            setLoading(false)
          }
          setData(data)
        } catch {
          setLoading(false)
          setData(null)
          toast.error('Error fetch details')
        }
      }

    const searchedUser = (
                <div className="hover:bg-light-grey dark:hover:bg-darker-grey cursor-pointer p-4 rounded-md flex justify-between gap-2">
                        <div className="flex gap-4">
                            <img src={profilepic} alt="" className="rounded-full h-10" />
                            <div>
                                <h3 className='text-sm md:text-normal'>Mikasa Ackermann</h3>
                                <p className="text-dark-grey text-xs">followed by @erwin_s</p>
                            </div>
                        </div>
                        <a className="text-pink font-bold text-sm md:text-normal cursor-pointer ">Follow</a>
                    </div>
    )
  return (
    <div className="w-full h-screen bg-white dark:bg-black dark:text-white">
        <MainNavBar />
        <div className='relative top-20'>
            {searchedUser}
            {searchedUser}
            {searchedUser}
            {searchedUser}
            {searchedUser}
        </div>
    </div>
  );
};

export default Search;
