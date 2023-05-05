function Card({children}) {
  return (
    <div className='dark'>
      <div className="bg-white dark:bg-black dark:text-white py-16 rounded-none md:rounded-2xl w-full md:max-w-fit mx-auto mt-0 text-center text-black">
        {children}
      </div>
    </div>
  )
}

export default Card
