import HOH from '../assets/alexandru-acea-RQgKM1h2agA-unsplash 1.png'
import FF from '../assets/aneesh-mandava-JYGMpnMygjY-unsplash 1.png'
import TA from '../assets/emile-seguin-R9OueKOtGGU-unsplash 1.png'

function Creators() {
  return (
    <div>
      <h2 className='text-normal md:text-2xl font-bold py-8'>Top Creators</h2>
      <p className='text-sm md:text-normal'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis nemo doloremque obcaecati necessitatibus minima molestias fugiat, molestiae dolores aperiam inventore quibusdam, saepe laudantium ipsum? Nisi eaque vel debitis quibusdam at?</p>
      <div className='mt-10 block md:grid md:grid-cols-2 lg:grid-cols-3  gap-10'>
                <div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>1</p>
                        <img src={HOH} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Head over Heart</p>
                            <p className='ml-6'>Nora Anderson -  Head Ov...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>1</p>
                        <img src={HOH} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Head over Heart</p>
                            <p className='ml-6'>Nora Anderson -  Head Ov...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>1</p>
                        <img src={HOH} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Head over Heart</p>
                            <p className='ml-6'>Nora Anderson -  Head Ov...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>1</p>
                        <img src={HOH} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Head over Heart</p>
                            <p className='ml-6'>Nora Anderson -  Head Ov...</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>2</p>
                        <img src={FF} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Fire-Fighters</p>
                            <p className='ml-6'>Rugg Thunder -  The Ban...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>2</p>
                        <img src={FF} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Fire-Fighters</p>
                            <p className='ml-6'>Rugg Thunder -  The Ban...</p>
                        </div>
                    </div>
                    <div className='flex text-xs md:text-sm'>
                        <p>2</p>
                        <img src={FF} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Fire-Fighters</p>
                            <p className='ml-6'>Rugg Thunder -  The Ban...</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>3</p>
                        <img src={TA} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Thoughts Alone</p>
                            <p className='ml-6'>One -  The Team...</p>
                        </div>
                    </div>
                    <div className='flex mb-4 text-xs md:text-sm'>
                        <p>3</p>
                        <img src={TA} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Thoughts Alone</p>
                            <p className='ml-6'>One -  The Team...</p>
                        </div>
                    </div>
                    <div className='flex text-xs md:text-sm'>
                        <p>3</p>
                        <img src={TA} alt="wizkid' picture" className='h-14 ml-4' />
                        <div>
                            <p className='ml-6 text-left'>Thoughts Alone</p>
                            <p className='ml-6'>One -  The Team...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Creators
