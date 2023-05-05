import { AudioPosts } from '../../backend'
import AudioPostDiv from './AudioPostDiv'

function Audio() {
  return (
    <>
    <div className='col-span-4'>
      <main className="w-4/5 lg:w-full mx-auto mt-4 mb-14">
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
