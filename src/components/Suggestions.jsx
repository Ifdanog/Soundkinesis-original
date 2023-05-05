import { Users } from '../../backend'
import Suggest from './Suggest'

function Suggestions() {
  return (
    <div className="hidden lg:block col-span-2">
        <div className="mt-40 flex justify-between">
            <h2 className="text-dark-grey font-bold">Suggestions for you</h2>
            <a className="font-bold cursor-pointer hover:text-darker-grey">See all</a>
        </div>

        {Users.map(u => (
            <Suggest key={u.id} user={u} />
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
