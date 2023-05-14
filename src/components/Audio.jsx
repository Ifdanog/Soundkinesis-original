import { AudioPosts } from '../../backend'
import AudioPostDiv from './AudioPostDiv'

function Audio() {
  return (
    <>
    <div className='col-span-4'>
      <main className="w-full mx-auto mt-4 mb-14 ml-0 px-2">
        <div>
        {AudioPosts.map((p) => (
            <AudioPostDiv key={p.id} post={p} />
          ))}
      </div>
      </main>
    </div> 
    </>
  )
}

export default Audio
