import React from 'react'
import { useEffect, useState } from 'react'
import MyPostDiv from './MyPostDiv'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

function MyPost() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getPosts()
  }, [])  

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

  const getPosts = async () => {
    try {
     const emailVal = getCookie('email')
     const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/post/all_post/${emailVal}`, {
       method: 'GET',
       headers: {
         "Content-Type": "application/json",
         'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
       }
     })
     const data = await response.json();
       if(response.status === 200) {
         setLoading(false)
       }
       setData(data)
     } catch {
       setLoading()
       setData(null)
       toast.error('Error fetch details')
     }
   }

  return (loading ? <Spinner /> : (
    <>
    <div className='col-span-4'>
      <main className="w-full min-h-screen mx-auto mt-4 mb-14 ml-0 px-2">
        <div>
        {data
          .filter((p, index) => index % 3 === 0) // Filter out non-multiple-of-3 indexes
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Sort by creation time
          .map((p, index) => {
            const commentIndex = index + 1;
            const comment = data[commentIndex];
            return <MyPostDiv key={p.post_id} post={p} comments={comment} />;
        })}



        </div>
      </main>
    </div> 
    </>
  ))
}

export default MyPost
