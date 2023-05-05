import { FaThumbsUp, FaComment, FaShare, FaBookmark } from 'react-icons/fa'
import { useState } from 'react'
import { Users } from '../../backend'

function AudioPostDiv({post}) {
  const [like, setLike] = useState(false)
  const [likes, setLikes] = useState(post.likes)
  const [comment, setComment] = useState(false)
  const [share, setShare] = useState(false)
  const [bookmark, setBookmark] = useState(false)

  const onLikeClick = () => {
    setLikes(like ? likes-1 : likes+1)
    setLike(!like)
  }

  const onCommentClick = () => {
    setComment(!comment)
  }

  const onShareClick = () => {
    setShare(!share)
  }

  const onBookmarkClick = () => {
    setBookmark(!bookmark)
  }

  const clicked = {
    color: '#FF0080',
  }

  const unClicked = {
    color: '#8F8F8F',
  }

  return (
    <div>
    <div className='flex gap-2 my-4 mb-2'>
      <img src={Users.filter((u) => u.id === post.userId)[0].profilePicture} alt="" className='rounded-full h-10' />
      <h4 className="text-black dark:text-white font-bold text-sm md:text-normal">{Users.filter((u) => u.id === post.userId)[0].displayName}</h4>
      <p className="text-dark-grey text-sm md:text-normal">@{Users.filter((u) => u.id === post.userId)[0].username} . {post.time}</p>
  </div>
  <audio controls>
    <source src={post.audio} className="w-full" type="audio/mp3" />
  </audio>
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
  </div>
  )
}

export default AudioPostDiv
