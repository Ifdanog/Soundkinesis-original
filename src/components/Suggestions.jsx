import { useState, useEffect } from "react"

function Suggestions() {
    const [ data, setData ] = useState({})

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
      //getSuggestedUser()
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
  return (
    <div className="hidden lg:block col-span-2">
        <div className="mt-40 flex justify-between">
            <h2 className="text-dark-grey font-bold">Suggestions for you</h2>
            <a className="font-bold cursor-pointer hover:text-darker-grey">See all</a>
        </div>

        {/* {Users.map(u => (
            <div>
                <div className="flex mt-4 justify-between gap-2">
                        <div className="flex gap-4">
                            <img src={u.profilePicture} alt="" className="rounded-full h-10" />
                            <div>
                                <h3 className='text-sm md:text-normal'>{u.displayName}</h3>
                                <p className="text-dark-grey text-xs">followed by @{u.username}</p>
                            </div>
                        </div>
                        <a className="text-pink font-bold text-sm md:text-normal cursor-pointer ">Follow</a>
                    </div>
            </div>
        ))} */}
        
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
