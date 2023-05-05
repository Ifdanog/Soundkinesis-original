import SkLoader from '../assets/skLoader.gif'

function Spinner() {
    const spinnerDiv = {
        width: '100%',
        height: '100vh',
        backgroundColor: '#F7F7F7',
    }

    const spinnerImg = {
        width: '30%',
        display: 'block',
        margin: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }

  return (
    <div style={spinnerDiv} >
      <img src={SkLoader} alt="Loading..." style={spinnerImg} />
    </div>
  )
}

export default Spinner
