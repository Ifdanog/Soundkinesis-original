import { FaThumbsUp, FaComment, FaShare, FaBookmark } from 'react-icons/fa'
import { AiOutlineSend } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import profilepic from '../assets/icons8-male-user-50.png'

function AudioPostDiv() {
  const [like, setLike] = useState([])
  const [likes, setLikes] = useState('0')
  const [comment, setComment] = useState({});
  const [share, setShare] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ profilePic, setProfilePic ] = useState(null)
  const [data, setData] = useState([])
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getPosts()
  }, [])

  const getPosts = async () => {
    setLoading(true)
   try {
    const emailVal = getCookie('email')
    const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/post/${emailVal}/Audio`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      }
    })
    const result = await response.json();
      if(response.status === 200) {
        setLoading(false)
      }
      setData(result)
      setLike(Array(result.length).fill(false))
      localStorage.setItem('showProfileEmail', result[0].user_id)

    } catch {
      setLoading(false)
      setData(null)
      toast.error('Error fetch details')
    }
  }

  const getData = async () => {
    try {
      const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_user/${data.user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
      })
      const result = await response.json()
      setProfilePic(result.profile_picture)
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

  const likePost = async (postId, index) => {
    const emailVal = getCookie('email');
    const post_id = postId;
    const likeData = {
      email: emailVal,
      post_id: post_id
    };
  
    const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/like', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: JSON.stringify(likeData)
    });
    setLikes(likes + 1);
    setLike(prevLike => {
      const updatedLike = [...prevLike];
      updatedLike[index] = true
      return updatedLike;
    });
  };
  
  const unLikePost = async (postId, index) => {
    const emailVal = getCookie('email');
    const post_id = postId;
    const unLikeData = {
      email: emailVal,
      post_id: post_id
    };
  
    const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/remove_like', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: JSON.stringify(unLikeData)
    });
    setLikes(likes - 1);
    setLike(prevLike => {
      const updatedLike = [...prevLike];
      updatedLike[index] = false
      return updatedLike;
    });
  };
  

  const commentOnPost = async (postId, e) => {
    e.preventDefault();
  
    const emailVal = getCookie('email');
    const post_id = postId
    const comment = document.getElementById('comment').value;
    const commentData = {
      email: emailVal,
      post_id: post_id,
      comment: comment
    };
  
    const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/comment', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: JSON.stringify(commentData)
    });
  
    const result = await response.json();
    toast.success(result);
    document.getElementById('comment').value = '';
  }; 

  const onCommentClick = (postId) => {
    setComment((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };
  

  const onShareClick = () => {
    setShare(!share)
  }

  const onBookmarkClick = () => {
    setBookmark(!bookmark)
  }

  const clicked = {
    color: '#FF0080',
    fontSize: '1.4rem',
    transition: 'all .2s'
  }

  const unClicked = {
    color: '#8F8F8F',
    fontSize: '1.2rem'
  }
  
  const showProfile = async () => {
    navigate('/userprofile')
  }

  const postData = data;
  let currentItem = null;
  const itemsArray = [];
  
  if (data === null) {
  } else if (data.length === 0) {
  } else {
    for (let i = 0; i < postData.length; i += 3) {
      currentItem = postData[i];
      itemsArray.push(currentItem);
    }
  }

  return (loading ? <Spinner /> : (
    <div>
    {itemsArray.map((data, index) => (
      <div key={index} className='hover:bg-light-grey dark:hover:bg-darker-grey transition cursor-pointer p-4 rounded-lg'>
    <div className='flex gap-2 p-2 rounded-md mb-2 hover:bg-white dark:hover:bg-black' onClick={showProfile}>
      <img src={profilePic === null ? profilepic : data.profile_picture} alt="" className='rounded-full h-10' />
      <h4 className="text-black dark:text-white font-bold text-sm md:text-normal">{data.name}</h4>
      <p className="text-dark-grey text-sm md:text-normal">@{data.stage_name} . {data.created_at}</p>
  </div>
  <audio className='w-full' controls>
    <source src={data.file} className="w-full" type="audio/mp3" />
  </audio>
  <div className='flex justify-between py-4'>
      <div className='flex gap-4'>
      {data.i_like ? (
        <FaThumbsUp
          className='cursor-pointer'
          style={clicked}
          onClick={() => unLikePost(data.post_id, index)}
        />
      ) : like[index] ? (
        <FaThumbsUp
          className='cursor-pointer'
          style={clicked}
          onClick={() => unLikePost(data.post_id, index)}
        />
      ) : (
        <FaThumbsUp
          className='cursor-pointer'
          style={unClicked}
          onClick={() => likePost(data.post_id, index)}
        />
      )}
         
      <FaComment
        className='cursor-pointer'
        onClick={() => onCommentClick(data.post_id)}
        style={comment[data.post_id] ? clicked : unClicked}
      />

          <FaShare className='cursor-pointer' onClick={onShareClick} style={share ? clicked : unClicked} />
      </div>
      <FaBookmark className='cursor-pointer' onClick={onBookmarkClick} style={bookmark ? clicked : unClicked} />
  </div>
  <div className='flex gap-4'>
          <p className="text-sm md:text-normal"><b>{data.likes}</b> likes</p>
          <p className="text-sm md:text-normal"><b>{data.comments}</b> comments</p>
        </div>
  <p className="text-sm md:text-normal"><b className='mr-4'>{data.description}</b></p>
  {comment[data.post_id] && (
    <div className='relative mt-2'>
    <form onSubmit={(e) => commentOnPost(data.post_id, e)}>
      <textarea id='comment' type="text" placeholder='Type in your comments...' className='w-full text-sm md:text-normal bg-white dark:bg-black p-2 border border-pink dark:border-white rounded-lg' required></textarea>
      <button type='submit' className="bg-dark-grey hover:bg-pink rounded-lg p-2 absolute top-2 right-2">
        <AiOutlineSend className="text-2xl text-white" /> 
      </button>
    </form>
  </div>
)}
  </div>
  ))}
  </div>
  ))
}

export default AudioPostDiv
