import { FaThumbsUp, FaComment, FaShare, FaBookmark } from 'react-icons/fa'
import { AiOutlineSend } from 'react-icons/ai'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Spinner from './Spinner'
import profilepic from '../assets/icons8-male-user-50.png'

function PostDiv({ post, comments }) {
  const [data, setData] = useState([])
  const [posts, setPosts] = useState({ [post.post_id]: { ...post, comment: '' } });
  const [likedPosts, setLikedPosts] = useState(() => {
  // Get an array of post objects from the 'posts' object
  const postArray = Object.values(posts);

  // Filter the post objects based on the 'i_like' property and map them to their IDs
  const likedPostIds = postArray
    .filter((post) => post.i_like)
    .map((post) => post.post_id);

  return likedPostIds;
});
  const [likes, setLikes] = useState({})
  const [comment, setComment] = useState({})
  const [share, setShare] = useState(false)
  const [bookmark, setBookmark] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ profilePic, setProfilePic ] = useState(null)
  const navigate = useNavigate() 

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

  const handleLike = async (postId) => {
    // Check if the post is already liked
    const isLiked = likedPosts.includes(postId);
  
    if (isLiked) {
      // Unlike the post
      await unLikePost(postId);
      const updatedLikedPosts = likedPosts.filter((id) => id !== postId);
      setLikedPosts(updatedLikedPosts);
    } else {
      // Like the post
      await likePost(postId);
      const updatedLikedPosts = [...likedPosts, postId];
      setLikedPosts(updatedLikedPosts);
    }
  
    setPosts((prevPosts) => {
      const postToUpdate = prevPosts[postId];
      const isLiked = postToUpdate.i_like;
      const updatedLikeCount = isLiked ? Math.max(postToUpdate.likes - 1, 0) : postToUpdate.likes + 1;
  
      return {
        ...prevPosts,
        [postId]: {
          ...postToUpdate,
          likes: updatedLikeCount,
          i_like: !isLiked, // Toggle the value of i_like after liking/unliking
        },
      };
    });
  };
  
  
  

  const likePost = async (postId) => {
    const emailVal = getCookie('email');
    const post_id = postId;
    const likeData = {
      email: emailVal,
      post_id: post_id
    };
  
      await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/like', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: JSON.stringify(likeData)
    });


  };

  const unLikePost = async (postId) => {
    const emailVal = getCookie('email');
    const post_id = postId;
    const unLikeData = {
      email: emailVal,
      post_id: post_id
    };
  
    await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/remove_like', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
      },
      body: JSON.stringify(unLikeData)
    });

  };
  

  const commentOnPost = async (postId, e) => {
    e.preventDefault();

  const emailVal = getCookie('email');
  const post_id = postId;
  const comment = posts[postId].comment;
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
    setPosts((prevPosts) => {
      const updatedPost = prevPosts[postId];
      const updatedCommentCount = updatedPost.comments + 1;
  
      return {
        ...prevPosts,
        [postId]: {
          ...updatedPost,
          comments: updatedCommentCount,
        },
      };
    });
  }; 

  const onCommentClick = (postId) => {
    setComment((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId]
    }));
  };
  

  // const onShareClick = () => {
  //   setShare(!share)
  // }

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
    // Find the corresponding post object within the posts state
    const updatedPost = Object.values(posts).find((p) => p.id === post.id);

    // Accessing the likes value from the updated post object
    const updatedLikes = updatedPost?.likes;
    
  return (loading ? <Spinner /> : (
    <div>
      <div className='hover:bg-light-grey dark:hover:bg-darker-grey transition cursor-pointer p-4 rounded-lg'>
      <div className='flex gap-2 p-2 rounded-md mb-2 hover:bg-white dark:hover:bg-black' onClick={showProfile}>
        <img src={profilePic === null ? profilepic : post.profile_picture} alt="" className='rounded-full h-10' />
        <h4 className="text-black dark:text-white font-bold text-sm md:text-normal">{post.name}</h4>
        <p className="text-dark-grey text-sm md:text-normal">@{post.stage_name} . {post.created_at}</p>
      </div>
      <video className='w-full' controls>
        <source src={post.file} className="w-full" type="video/mp4" />
      </video>
      <div className='flex justify-between py-4'>
          <div className='flex gap-4'>
          <button
            onClick={() => handleLike(post.post_id)}
          >
            {post.i_like === false ? (
              likedPosts.includes(post.post_id) ? (
                <FaThumbsUp
                  className='cursor-pointer'
                  style={clicked}
                  onClick={() => unLikePost(post.post_id)}
                />
              ) : (
                <FaThumbsUp
                  className='cursor-pointer'
                  style={unClicked}
                  onClick={() => likePost(post.post_id)}
                />
              )) : (
                <FaThumbsUp
                  className='cursor-pointer'
                  style={clicked}
                  onClick={() => unLikePost(post.post_id)}
                />
              )}
          </button>

          <FaComment
            className='cursor-pointer'
            onClick={() => onCommentClick(post.post_id)}
            style={comment[post.post_id] ? clicked : unClicked}
          />

              {/* <FaShare className='cursor-pointer' onClick={onShareClick} style={share ? clicked : unClicked} /> */}
          </div>
          <FaBookmark className='cursor-pointer' onClick={onBookmarkClick} style={bookmark ? clicked : unClicked} disabled />
      </div>
      <div className='flex gap-4'>
        <p className="text-sm md:text-normal"><b>{updatedLikes}</b> likes</p>
        <p className="text-sm md:text-normal"><b>{posts[post.post_id]?.comments}</b> comments</p>
      </div>
      <p className="text-sm md:text-normal"><b className='mr-4'>{post.description}</b></p>
      {comment[post.post_id] && (
        <div className='relative mt-2'>
        <form onSubmit={(e) => commentOnPost(post.post_id, e)}>
          <textarea id='comment' type="text" placeholder='Type in your comments...' className='w-full text-sm md:text-normal bg-white dark:bg-black p-2 border border-pink dark:border-white rounded-lg' value={post.comment} onChange={(e) => {
            const updatedPosts = { ...posts };
            updatedPosts[post.post_id].comment = e.target.value;
            setPosts(updatedPosts);
          }} required></textarea>
          <button type='submit' className="bg-dark-grey hover:bg-pink rounded-lg p-2 absolute top-2 right-2">
            <AiOutlineSend className="text-2xl text-white" /> 
          </button>
        </form>
        {comments && comments.length > 0 && (
        <div>
          {comments.map((comment) => (
            <div key={post.post_id} className='hover:bg-light-grey dark:hover:bg-dark-grey cursor-pointer p-4 rounded-md mt-4'>
              <h3 className='font-bold'>{comment.username}</h3>
              <p>{comment.comment}</p>
              </div>
          ))}
        </div>
      )}
        </div>
      )}
  </div>
  </div>
  ))
}

export default PostDiv
