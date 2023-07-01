import skLogo from '../assets/sklogo-short.png'
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Footer from '../components/Footer';
import { useState, useEffect } from 'react'

function Step3() {
  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    //getgenre()
  }, [])

  let fetchedData;
  let isFetching = false;

  const getgenre = async () => {
    if (fetchedData) {
      // Use the cached data
      return Promise.resolve(fetchedData);
    }  if (fetchedData) {
      // Use the cached data
      return Promise.resolve(fetchedData);
    } else if (!isFetching) {
      // Set the flag to indicate the fetch request is in progress
      isFetching = true;
      try {
        const response = await fetch(`https://soundkinesis-1ce4ca8b95b5.herokuapp.com/get_genre`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
          },
        })
        const data = await response.json();
        
        console.log(data)
        setData(data)
        // if(response.status === 200) {
        // }
      } catch {
        setLoading(true)
        setData(null)
        toast.error('Error fetch details')
      }
    } else {
      // Fetch request is already in progress, return a pending Promise
      return new Promise((resolve) => {
        const checkFetching = () => {
          if (fetchedData) {
            // The fetch request has completed, resolve with the cached data
            resolve(fetchedData);
          } else {
            // The fetch request is still in progress, check again after a short delay
            setTimeout(checkFetching, 100);
          }
        };
        checkFetching();
      });
    }
  }

  const selectElement = document.getElementById('genre');
  const myArray = data
  // Iterate over the object and create options
  for (let i = 0; i < myArray.length; i++) {
    const option = document.createElement('option');
    option.value = myArray[i].id;
    option.text = myArray[i].name;
    selectElement.appendChild(option);
  }

    function formSubmit(e) {
       registerUser()
       e.preventDefault();
       localStorage.clear()
    }

    function getCookie(name) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
          return cookie.substring(name.length + 1, cookie.length);
        }
      }
      return null;
    }

     function clearCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

  const registerUser = async () => {
      const LSData = {
        first_name: getCookie('first_name'),
        last_name: getCookie('last_name'),
        bio: getCookie('bio'),
        stage_name: getCookie('stage_name'),
        country: getCookie('country'),
        email: getCookie('email'),
        genre_id: getCookie('genre_id'),
        phone: getCookie('phone'),
        dob: getCookie('dob'),
        gender: getCookie('gender'), 
        role: 'artist',
        password: getCookie('password'),
      }

      const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/register_user/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
        },
        body: JSON.stringify(LSData)
      });
      if (response.status === 400) {
        const result = await response.json()
        toast.error(result)
        setLoading(false)
        clearCookies()
        navigate('/become-an-artist/step1')
    }
      if (response.status === 200 || response.status === 201) {
        setLoading(false)
        toast.success('Registration Successful')
        navigate('/become-an-artist/step4')
        clearCookies()
      } else if (response.status === 500) {
        toast.error('Check your details')
        setLoading(false)
        clearCookies()
        navigate('/become-an-artist/step1')
    }
  }

    const genreArray = []
    const genreID = []
    const getSelectValue = () => {
      const selectElement = document.getElementById("genre");
      const selectedValue = selectElement.value;
      if (genreArray.includes(selectedValue)) {
        toast.error("Option already selected");
        return;
      }
      genreArray.push(selectedValue);
      displayArray()
      const selectedIndex = event.target.selectedIndex;
      const selectedOption = event.target[selectedIndex];
      const selectedOptionId = selectedOption.getAttribute('id');
      genreID.push(selectedOptionId);
      const myString = genreID.join(',');
      document.cookie = `genre_id=${myString}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

    const resultDiv = document.getElementById('result');
    const  removeSelected = () => {
      const selectedItems = document.querySelectorAll("#result li.selected");
      selectedItems.forEach((item) => {
        const itemIndex = genreArray.indexOf(item.textContent);
        if (itemIndex > -1) {
          genreArray.splice(itemIndex, 1);
        }
        item.remove();
      });
    }

    const displayArray = () => {
      const listElement = document.getElementById("result");
      listElement.innerHTML = "";
      for (let i = 0; i < genreArray.length; i++) {
        const listItem = document.createElement("li");
        listItem.className = 'genre-list-item';
        listItem.textContent = genreArray[i];
        listElement.appendChild(listItem);

        listItem.addEventListener('dblclick', removeSelected)
      }
    }

  return (
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bg-gradient-to-r from-purple to-pink h-screen pt-0 md:pt-8'>
      <div className="relative">
          <div className="bg-white dark:bg-black py-10 px-6 md:px-10 rounded-none md:rounded-2xl w-full md:w-3/4 mx-auto mt-0 md:mt-2 text-center text-black">
              <p className="align-center dark:text-white">Step 3 of 4</p>
              <div className="w-1/3 mx-auto h-0.5 rounded-xl bg-darker-grey">
                  <div className="w-3/4 h-0.5 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg"></div>
              </div>
              <h1 className="mt-4 text-2xl md:text-3xl font-bold dark:text-white">Become an Artist<span className="text-purple">.</span></h1>
              <form className="mt-8" onSubmit={formSubmit}>
                    <div className="input-group">
                        <select id="genre" name="genre" className='input select-input' onChange={getSelectValue} required>
                            <option>Choose Genre</option>
                            <option id="1">Hip-pop</option>
                            <option id="2">Rap</option>
                            <option id="3">Pop</option>
                            <option id="4">Reggae</option>
                            <option id="5">Funk</option>
                        </select>
                        <label htmlFor="genre" className="label top-0 dob-label">Genre</label>
                    </div>
              <p className="text-left text-xs text-pink -mt-4">Choose the type of songs you do. You can choose more than one.</p>

                <ul id="result" className='h-full my-8 text-left w-full'></ul>
                <div className="w-full flex my-8">
                        <button className="text-xs md:text-sm w-full ml-0 text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple-900 to-pink-500 rounded-xl btn-transt font-medium">
                            Continue
                        </button>
                </div>
              </form>
          </div>
          <img src={skLogo} alt="short SoundKinesis Logo" className='h-20 absolute -bottom-20 right-5 pb-4' />
        </div>
    </div>
    <Footer />
    </>
  )
}

export default Step3
