import { FaThumbsUp, FaComment, FaShare, FaBookmark } from 'react-icons/fa'
import { useState } from 'react'
import { Users } from '../../backend'

function PostDiv({post}) {
  const [like, setLike] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [comment, setComment] = useState(false)
  const [share, setShare] = useState(false)
  const [bookmark, setBookmark] = useState(false)

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

  const likePost = async () => {
    const emailVal = getCookie('email')
    const post_id = 1
    const data = {
      emaill: emailVal,
      post_id: post_id
    }

    const response = await fetch('https://soundkinesis.herokuapp.com/post/like', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
      },
      body: JSON.stringify(data)
    })
  }

  const unLikePost = async () => {
    const emailVal = getCookie('email')
    const post_id = 1
    const data = {
      emaill: emailVal,
      post_id: post_id
    }

    const response = await fetch('https://soundkinesis.herokuapp.com/post/remove_like', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
      },
      body: JSON.stringify(data)
    })
  }

  const onLikeClick = () => {
    setLikes(like ? likes-1 : likes+1)
    setLike(!like)
    if(like === true) {
      likePost()
    } else {
      unLikePost()
    }
  }

  const commentOnPost = async () => {
    const emailVal = getCookie('email')
    const post_id = 1
    const comment = document.getElementById('comment').value
    const data = {
      emaill: emailVal,
      post_id: post_id,
      comment: comment
    }

    const response = await fetch('https://soundkinesis.herokuapp.com/post/comment', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
      },
      body: JSON.stringify(data)
    })
  }

  const onCommentClick = () => {
    setComment(!comment)
    commentOnPost()
  }

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
  const commentDiv = (
    <div>
      <textarea id='comment' type="text" placeholder='Type in your comments...' className='w-full text-sm md:text-normal bg-white dark:bg-black p-2 border border-black dark:border-white rounded-lg'></textarea>
    </div>
  )

  return (
    <div className='hover:bg-light-grey dark:hover:bg-darker-grey transition cursor-pointer p-4 rounded-lg'>
    <div className='flex gap-2 my-4 mb-2'>
      <img src={Users.filter((u) => u.id === post.userId)[0].profilePicture} alt="" className='rounded-full h-10' />
      <h4 className="text-black dark:text-white font-bold text-sm md:text-normal">{Users.filter((u) => u.id === post.userId)[0].displayName}</h4>
      <p className="text-dark-grey text-sm md:text-normal">@{Users.filter((u) => u.id === post.userId)[0].username} . {post.time}</p>
  </div>
  <video className='w-full' controls>
    <source src={post.video} className="w-full" type="video/mp4" />
  </video>
  <div className='flex justify-between py-4'>
      <div className='flex gap-4'>
          <FaThumbsUp className='cursor-pointer' onClick={onLikeClick} style={like ? clicked : unClicked} />
          <FaComment className='cursor-pointer' onClick={onCommentClick} style={comment ? clicked : unClicked} />
          <FaShare className='cursor-pointer' onClick={onShareClick} style={share ? clicked : unClicked} />
      </div>
      <FaBookmark className='cursor-pointer' onClick={onBookmarkClick} style={bookmark ? clicked : unClicked} />
  </div>
  <p className="text-sm md:text-normal"><b>{likes}</b> likes</p>
  <p className="text-sm md:text-normal"><b className='mr-4'>{Users.filter((u) => u.id === post.userId)[0].username}</b> {post.desc}</p>
  {commentDiv}
  </div>
  )
}

export default PostDiv
