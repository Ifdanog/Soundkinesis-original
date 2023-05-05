function Suggest({user}) {
  return (
    <div>
      <div className="flex mt-4 justify-between gap-2">
            <div className="flex gap-4">
                <img src={user.profilePicture} alt="" className="rounded-full h-10" />
                <div>
                    <h3 className='text-sm md:text-normal'>{user.displayName}
                    </h3>
                    <p className="text-dark-grey text-xs">followed by @{user.username}</p>
                </div>
            </div>
            <a className="text-pink font-bold text-sm md:text-normal cursor-pointer ">Follow</a>
        </div>
    </div>
  )
}

export default Suggest
