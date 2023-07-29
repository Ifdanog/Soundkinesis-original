import { useState, useEffect } from "react"
import { toast } from 'react-toastify'

function Suggestions() {
    const [ data, setData ] = useState([])
    const [ follow, setFollow ] = useState({})
    const [ following, setFollowing ] = useState(false)

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

    useEffect(() => {
      getSuggestedUser()
    }, [])

      const getSuggestedUser = async () => {
        const emailVal = getCookie('email')
            
        const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_users/${emailVal}`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
          }
          })
          const result = await response.json()
          setData(result)
      }

      const checkIfFollowing = async (suggestedUserEmail) => {
        const email = getCookie('email');
        const checkIfFollowingData = {
          user_email: email,
          following: suggestedUserEmail,
        };
        const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/check_follower/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
            },
            body: JSON.stringify(checkIfFollowingData)
          })
          const result = await response.json()
          if(result === true) {
            setFollowing(true)
          } else {
            setFollowing(false)
          }
        }

      const followAcc = async (email) => {
        const followEmail = email; // Use the email of the user to follow
        const followData = {
          email: getCookie('email'),
          to_be_followed_email: followEmail,
        };
    
        const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/follow/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
            },
            body: JSON.stringify(followData)
          })
        const result = await response.json();
        toast.success(result);
    
        // Update the follow status for the user
        setData((prevData) =>
          prevData.map((user) =>
            user.email === email ? { ...user, following: true } : user
          )
        );
      };
    
      const unFollowAcc = async (email) => {
        const unFollowEmail = email; // Use the email of the user to unfollow
        const unFollowData = {
          email: getCookie('email'),
          to_be_unfollowed_email: unFollowEmail,
        };
    
        const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/unfollow/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
            },
            body: JSON.stringify(unFollowData)
          })

        const result = await response.json();
        toast.success(result);
    
        // Update the follow status for the user
        setData((prevData) =>
          prevData.map((user) =>
            user.email === email ? { ...user, following: false } : user
          )
        );
      };
  return (
    <div className="hidden lg:block col-span-2">
        <div className="mt-40 flex justify-between">
            <h2 className="text-dark-grey font-bold">Suggestions for you</h2>
            <a className="font-bold cursor-pointer hover:text-darker-grey">See all</a>
        </div>

        {data.map((item, index) => (
            // <li className="text-dark-grey text-xs pr-2 border-r">
              <div key={index} >
                <div className="flex p-2 mt-2 rounded-lg justify-between gap-2 hover:bg-light-grey dark:hover:bg-darker-grey transition">
                        <div className="flex gap-4">
                            <img src={item.profile_image} alt="" className="rounded-full h-10" />
                            <div>
                                <h3 className='text-sm md:text-normal'>{item.stage_name}</h3>
                                <p className="text-dark-grey text-xs">{item.description}</p>
                            </div>
                        </div>
                        {checkIfFollowing(item.suggested_user_email) ? 
                          (<a onClick={() => followAcc(item.suggested_user_email)} className="text-pink font-bold text-sm md:text-normal cursor-pointer">Follow</a>) :
                          (<a onClick={() => unFollowAcc(item.suggested_user_email)} className="text-pink font-bold text-sm md:text-normal cursor-pointer">Unfollow</a>)
                        }
                    </div>
            </div>
            //</li>
          ))}
        
        <div className="suggest-footer">
            <ul className='overflow-hidden flex mt-8 gap-2'>
                <li className='text-dark-grey text-xs pr-2 border-r'>About</li>
                <li className='text-dark-grey text-xs pr-2 border-r'>About</li>
                <li className='text-dark-grey text-xs pr-2 border-r'>About</li>
                <li className='text-dark-grey text-xs pr-2 border-r'>About</li>
                <li className='text-dark-grey text-xs pr-2 border-r'>About</li>
                <li className='text-dark-grey text-xs'>About</li>
            </ul>
            <p className='mt-4 text-dark-grey text-xs'>&copy; 2023 SOUNDKINESIS from Dev_Dan</p>
        </div>
    </div>
  )
}

export default Suggestions


 {/* {Users.map(u => (
        
        ))} */}