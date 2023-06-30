import SideNav from '../components/SideNav'
import Post from '../components/Post'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import profilepic from '../assets/icons8-male-user-50.png'

function Profile({post}) {
  const [loading, setLoading] = useState(true)
  const [section, setSection] = useState(true)
  const [ following, setFollowing ] = useState(false)
  const [ profilePic, setProfilePic ] = useState(null)
  const [ follow, setFollow ] = useState({})
  const [data, setData] = useState({})
  const user_id = localStorage.getItem('showProfileEmail')

  const checkIfFollowing = async () => {
    const email = getCookie('email')
    const followEmail = 'bruce.tony.1893@gmail.com'
    const data = {
      user_email: email,
      following: followEmail
    }
    const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/check_follower/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      if(result === true) {
        setFollowing(true)
      } else {
        setFollowing(false)
      }
  }

  useEffect(() => {
    checkIfFollowing()
  }, [])


  const followAcc = async () => {
    const email = getCookie('email')
    const followEmail = user_id
    const data = {
      email: email,
      to_be_followed_email: followEmail
    }


    const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/follow/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      toast.success(result)
      setFollowing(true)
  }

  const unFollowAcc = async () => {
    const email = getCookie('email')
    const unFollowEmail = user_id
    const data = {
      email: email,
      to_be_unfollowed_email: unFollowEmail
    }


    const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/unfollow/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
        body: JSON.stringify(data)
      })
      const result = await response.json()
      toast.success(result)
      setFollowing(false)
  }

  function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null;
}

const getFollowingAndFollowers = async () => {
  try {
    const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_followers_following/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      }
    })
    const result = await response.json();
    setFollow(result[0])
  } catch {
    setFollow(null)
  }
}

useEffect(() => {
  getFollowingAndFollowers()
}, [])

  const getData = async () => {
    try {
      const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_user/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
      })
      const data = await response.json()
      setProfilePic(data.profile_picture)
      if(response.status === 200) {
        setLoading(false)
      }
      setData(data)
    } catch {
      setLoading(true)
      setData(null)
      toast.error('Error fetch details')
    }
  }

  useEffect(() => {
    getData()
  }, [])
  
  const clicked = {
    marginBottom: '1rem',
    borderBottom: '2px solid #FF0080',
  }

  const unClicked = {
    marginBottom: '1rem',
    borderBottom: '2px solid #eee',
  }

  const clickSection = () => {
    setSection(!section)
  }
  return (loading ? <Spinner /> : (
    <div className="bg-white dark:bg-black dark:text-white relative">
      <div className="w-full bg-white dark:bg-black dark:text-white block lg:grid grid-cols-8">
        <SideNav />
        <div className="col-span-2 border-r"></div>
        <div className="col-span-6 h-full">
          <main>
            <div className='bg-gradient-to-r from-purple to-pink w-full h-40'></div>
            <section className='px-4'>
              <div className='relative'>
                <img src={profilePic === null ? profilepic : data.profile_picture} alt="" className='w-32 h-32 rounded-full absolute -top-10 shadow-lg' />
                {following ? <button onClick={unFollowAcc} className='text-sm md:text-normal border py-2 px-4 rounded-full absolute right-5 top-4 cursor-pointer hover:bg-pink hover:text-white'>Unfollow</button> : <button onClick={followAcc} className='text-sm md:text-normal border py-2 px-4 rounded-full absolute right-5 top-4 cursor-pointer bg-pink hover:bg-none hover:text-white'>Follow</button>}
              </div>
              <h2 className='text-xl md:text-2xl font-bold pt-24'>{data.first_name + ' ' + data.last_name}</h2>
              <span className='text-dark-grey text-sm md:text-normal'>@{data.stage_name}</span>
              <p className='mt-4 text-sm md:text-normal'>{data.bio}</p>
              <div className='flex gap-4 mt-4'>
                <p className='text-dark-grey text-sm md:text-normal'><b className='text-black dark:text-white'>{follow.following}</b> Following</p>
                <p className='text-dark-grey text-sm md:text-normal'><b className='text-black dark:text-white'>{follow.followers}</b> Followers</p>
              </div>
            </section>

            <section className='mt-8'>
              <div className='flex profile-sec'>
                <div className='w-full cursor-pointer' onClick={clickSection} style={section ? clicked : unClicked}>Post</div>
                <div className='w-full cursor-pointer' onClick={clickSection} style={section ? unClicked : clicked}>Likes</div>
              </div>
              <div className="w-full lg:w-4/5 ml-2 lg:ml-8 mb-14">
              {section ? <Post /> : 'Likes'}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div> )
  )
}

export default Profile
