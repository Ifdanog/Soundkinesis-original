import { VideoPosts } from '../../backend'
import PostDiv from './PostDiv'

function Post() {
  return (
    <>
    <div className='col-span-4'>
      <main className="w-full mx-auto mt-4 mb-14 ml-0 px-2">
        <div>
          {VideoPosts.map((p) => (
            <PostDiv key={p.id} post={p} />
          ))}
      </div>
      </main>
    </div> 
    </>
  )
}

export default Post
