import { VideoPosts } from '../../backend'
import PostDiv from './PostDiv'

function Post() {
  return (
    <>
    <div className='col-span-4'>
      <main className="w-4/5 lg:w-full mx-auto mt-4 mb-14">
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
