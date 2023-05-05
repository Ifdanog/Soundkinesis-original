import skLogo from '../assets/sklogo-short.png'
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Footer from '../components/Footer';
// import { GrClose } from 'react-icons/gr'

function Step3() {
  const navigate = useNavigate();

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

  const registerUser = async () => {
    try {
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

      const response = await fetch('https://soundkinesis.herokuapp.com/register_user/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token 89cfc93ea3f431ebc2cfec5058d29e5882792cd1'
        },
        body: JSON.stringify(LSData)
      });
      if(response.status === 200 || response.status === 201) {
        navigate('/become-an-artist/step4')
        toast.success('Registration Successful')
      }
    } catch (error) {
      toast.error('Check your details')
    }
    // clearStorage()
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
      console.log('okay')
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
                            <option id="1" value='Afro'>Afro</option>
                            <option id="2" value='Soul'>Soul</option>
                            <option id="3" value='RnB'>RnB</option>
                            <option id="4" value='Rap'>Rap</option>
                            <option id="5" value='Hip-Hop'>Hip-Hop</option>
                            <option id="6" value='Pop'>Pop</option>
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
