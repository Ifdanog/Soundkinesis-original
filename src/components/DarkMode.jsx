import { useState, useEffect } from 'react'

function DarkMode() {
  const [ darkMode, setDarkMode ] = useState(null)

  const toggleOffDarkMode = () => {
    setDarkMode(false)
  }

  const toggleOnDarkMode = () => {
      setDarkMode(true)
  }

  useEffect(() => {
      if(darkMode === true) {
          document.body.classList.add('dark')
      } else {
          document.body.classList.remove('dark')
      }
  }, [darkMode])

  const selected = {
    backgroundColor: '#1D2123',
    color: '#eee',
    border: '1px solid #000',
    padding: '.5rem 1rem',
    borderRadius: '.5rem',
  }

  const unSelected = {
    backgroundColor: '#eee',
    color: '#1D2123',
    border: '1px solid #000',
    padding: '.5rem 1rem',
    borderRadius: '.5rem',
  }


  return (
    <div className="col-span-6 h-screen">
        <div className="mt-4 flex gap-4">
        <button style={!darkMode ? selected : unSelected} onClick={toggleOnDarkMode}>Darkmode</button>
        <button style={!darkMode ? unSelected : selected} onClick={toggleOffDarkMode}>Lightmode</button>
        </div>
    </div>
  )
}

export default DarkMode
