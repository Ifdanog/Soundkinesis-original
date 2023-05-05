import upload from '../assets/58 1fingers2.png'

function NewUploads() {
  return (
    <>
      <h2 className='text-normal md:text-2xl font-bold py-8'>New Uploads and Releases</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div>
          <img src={upload} alt='' />
          <b>Tom Lauferson</b>
          <p className="text-sm md:text-normal">Single <b className='text-xl px-1'>.</b> Hand Signs</p>
        </div>

        <div>
          <img src={upload} alt='' />
          <b>Tom Lauferson</b>
          <p className="text-sm md:text-normal">Single <b className='text-xl px-1'>.</b> Hand Signs</p>
        </div>

        <div>
          <img src={upload} alt='' />
          <b>Tom Lauferson</b>
          <p className="text-sm md:text-normal">Single <b className='text-xl px-1'>.</b> Hand Signs</p>
        </div>

        <div>
          <img src={upload} alt='' />
          <b>Tom Lauferson</b>
          <p className="text-sm md:text-normal">Single <b className='text-xl px-1'>.</b> Hand Signs</p>
        </div>

        <div>
          <img src={upload} alt='' />
          <b>Tom Lauferson</b>
          <p className="text-sm md:text-normal">Single <b className='text-xl px-1'>.</b> Hand Signs</p>
        </div>

        <div>
          <img src={upload} alt='' />
          <b>Tom Lauferson</b>
          <p className="text-sm md:text-normal">Single <b className='text-xl px-1'>.</b> Hand Signs</p>
        </div>
      </div>
    </>
  )
}

export default NewUploads
