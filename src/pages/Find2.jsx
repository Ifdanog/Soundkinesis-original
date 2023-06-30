import NavBar from '../components/NavBar'
import skLogo from '../assets/sklogo-short.png'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'

function Find2() {
  const [businessNameMsg, setBusinessNameMsg] = useState('')
  const [ loading, setLoading ] = useState(false)

  const navigate = useNavigate();

  const formSubmit = (e) => {
    setLoading(true)
    registerUser()
    e.preventDefault();
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
      try {
        const lsData = {
          first_name: getCookie('first_name'),
          last_name: getCookie('last_name'),
          bio: getCookie('bio'),
          business_name: getCookie('business_name'),
          country: getCookie('country'),
          email: getCookie('email'),
          phone: getCookie('phone'),
          dob: getCookie('dob'),
          gender: getCookie('gender'),
          role: 'investor',
          password: getCookie('password')
        }

        const response = await fetch('https://soundkinesis-1ce4ca8b95b5.herokuapp.com/register_user/', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Token 2a4248e85ea9937795eeead649fe25a406ce493e'
          },
          body: JSON.stringify(lsData)
        })
        if (response.status === 400) {
            const result = await response.json()
            toast.error(result)
            setLoading(false)
            clearCookies()
            navigate('/find-an-artist/find1')
        }
          if (response.status === 200 || response.status === 201) {
            setLoading(false)
            toast.success('Registration Successful')
            navigate('/find-an-artist/find3')
            clearCookies()
          } else if (response.status === 500) {
            toast.error('Check your details')
            setLoading(false)
            clearCookies()
            navigate('/find-an-artist/find1')
        } else if (response.status === 400) {
          toast.error('Check your details')
          setLoading(false)
          clearCookies()
          navigate('/find-an-artist/find1')
      }
      } catch {
        toast.error('Check your details')
        setLoading(false)
        clearCookies()
        navigate('/find-an-artist/find1')
      }  
    }

    const validateBusinessName = () => {
      const business_name = document.getElementById('businessName')
      const re = /^[a-zA-Z]{2,100}$/

      if(!re.test(business_name.value)) {
          setBusinessNameMsg('Invalid name format')
      } else {
        setBusinessNameMsg('')
        document.cookie = `business_name=${business_name.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
      }
    }

    const validateBio = () => {
      const bio = document.getElementById('bio')
      document.cookie = `bio=${bio.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

    // var today = new Date();
    // var minDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate()).toISOString().split('T')[0];
    // document.getElementById("dob").setAttribute("max", minDate);

    const validateDOB = () => {
      const dob = document.getElementById('dob')
      
      function reverseString(str) {
        return str.split("-").reverse().join("/");
      }
      const date = reverseString(dob.value)

      document.cookie = `dob=${date}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

    const validateGender = () => {
      const gender = document.getElementById('gender')
      document.cookie = `gender=${gender.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

    const validateCountry = () => {
      const country = document.getElementById('country')
      document.cookie = `country=${country.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }

  return (loading ? <Spinner /> : (
    <>
    <NavBar />
    <hr className='-mt-1 text-white' />
    <div className='bg-gradient-to-r from-purple to-pink h-fit pt-0 md:pt-8 pb-24'>
      <div className="relative">
          <div className="bg-white dark:bg-black py-10 px-6 md:px-10 rounded-none md:rounded-2xl w-full md:w-3/4 mx-auto mt-0 md:mt-2 text-center text-black">
                <p className="align-center dark:text-white">Step 2 of 3</p>
                <div className="w-1/3 mx-auto h-0.5 rounded-xl bg-darker-grey">
                    <div className="w-2/3 h-0.5 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg"></div>
                </div>
                <h1 className="mt-4 text-2xl md:text-3xl font-bold dark:text-white">Find an Artist<span className="text-purple">.</span></h1>
                <form className="mt-8" onSubmit={formSubmit}>
                  <div className="input-group">
                      <input type="text" id="businessName" className="input my-4" onChange={validateBusinessName} required />
                      <label htmlFor="businessName" className="label top-0">Business Name</label>
                      <p className='text-xs text-pink -mt-4'>{businessNameMsg}</p>
                  </div>

                  <div className="input-group">
                      <textarea name="bio" id="bio" className='bio-input' placeholder='Write a short description of yourself' onChange={validateBio} required></textarea>
                      <label htmlFor="bio" className="label top-0 dob-label">Bio</label>
                  </div>

                  <div className="input-group">
                      <input type="date" id="dob" className="input my-4 select-input" onChange={validateDOB} required />
                      <label htmlFor="dob" className="label top-0 dob-label">Birthday</label>
                  </div>

                  <div className="input-group">
                        <select id="gender" name="gender" className='input select-input' onChange={validateGender} required>
                          <option>Choose Your Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <label htmlFor="gender" className="label top-0 dob-label">Gender</label>
                  </div>

                  <div className="input-group">
                        <select id="country" name="country" className='input select-input' onChange={validateCountry} required>
                          <option>Choose Country</option>
                                <option value="Afghanistan">Afghanistan</option>
                                <option value="Åland Islands">Åland Islands</option>
                                <option value="Albania">Albania</option>
                                <option value="Algeria">Algeria</option>
                                <option value="American Samo">American Samoa</option>
                                <option value="Andorra">Andorra</option>
                                <option value="Angola">Angola</option>
                                <option value="Anguilla">Anguilla</option>
                                <option value="Antarctica">Antarctica</option>
                                <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Armenia">Armenia</option>
                                <option value="Aruba">Aruba</option>
                                <option value="Australia">Australia</option>
                                <option value="Austria">Austria</option>
                                <option value="Azerbaijan">Azerbaijan</option>
                                <option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option>
                                <option value="Belgium">Belgium</option>
                                <option value="Belize">Belize</option>
                                <option value="Benin">Benin</option>
                                <option value="Bermuda">Bermuda</option>
                                <option value="Bhutan">Bhutan</option>
                                <option value="Bolivia">Bolivia</option>
                                <option value="Caribbean Netherlands">Caribbean Netherlands</option>
                                <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                <option value="Botswana">Botswana</option>
                                <option value="Bouvet Island">Bouvet Island</option>
                                <option value="Brazil">Brazil</option>
                                <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                <option value="Brunei">Brunei</option>
                                <option value="Bulgaria">Bulgaria</option>
                                <option value="Burkina Faso">Burkina Faso</option>
                                <option value="Burundi">Burundi</option>
                                <option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option>
                                <option value="Canada">Canada</option>
                                <option value="Cape Verde">Cape Verde</option>
                                <option value="Cayman Islands">Cayman Islands</option>
                                <option value="Central African Republic">Central African Republic</option>
                                <option value="Chad">Chad</option>
                                <option value="Chile">Chile</option>
                                <option value="China">China</option>
                                <option value="Christmas Island">Christmas Island</option>
                                <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                <option value="Colombia">Colombia</option>
                                <option value="Comoros">Comoros</option>
                                <option value="Congo - Brazzaville">Congo - Brazzaville</option>
                                <option value="Congo - Kinshasa">Congo - Kinshasa</option>
                                <option value="Cook Islands">Cook Islands</option>
                                <option value="Costa Rica">Costa Rica</option>
                                <option value="Côte d’Ivoire">Côte d’Ivoire</option>
                                <option value="Croatia">Croatia</option>
                                <option value="Cuba">Cuba</option>
                                <option value="Curaçao">Curaçao</option>
                                <option value="Cyprus">Cyprus</option>
                                <option value="Czechia">Czechia</option>
                                <option value="Denmark">Denmark</option>
                                <option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option>
                                <option value="Dominican Republic">Dominican Republic</option>
                                <option value="Ecuador">Ecuador</option>
                                <option value="Egypt">Egypt</option>
                                <option value="El Salvador">El Salvador</option>
                                <option value="Equatorial Guinea">Equatorial Guinea</option>
                                <option value="Eritrea">Eritrea</option>
                                <option value="Estonia">Estonia</option>
                                <option value="Ethiopia">Ethiopia</option>
                                <option value="Falkland Islands (Islas Malvinas)">Falkland Islands (Islas Malvinas)</option>
                                <option value="Faroe Islands">Faroe Islands</option>
                                <option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option>
                                <option value="France">France</option>
                                <option value="French Guiana">French Guiana</option>
                                <option value="French Polynesia">French Polynesia</option>
                                <option value="French Southern Territories">French Southern Territories</option>
                                <option value="Gabon">Gabon</option>
                                <option value="Gambia">Gambia</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option>
                                <option value="Gibraltar">Gibraltar</option>
                                <option value="Greece">Greece</option>
                                <option value="Greenland">Greenland</option>
                                <option value="Grenada">Grenada</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guam">Guam</option>
                                <option value="Guatemala">Guatemala</option>
                                <option value="Guernsey">Guernsey</option>
                                <option value="Guinea">Guinea</option>
                                <option value="Guinea-Bissau">Guinea-Bissau</option>
                                <option value="Guyana">Guyana</option>
                                <option value="Haiti">Haiti</option>
                                <option value="Heard & McDonald Islands">Heard & McDonald Islands</option>
                                <option value="Vatican City">Vatican City</option>
                                <option value="Honduras">Honduras</option>
                                <option value="Hong Kong">Hong Kong</option>
                                <option value="Hungary">Hungary</option>
                                <option value="Iceland">Iceland</option>
                                <option value="India">India</option>
                                <option value="Indonesia">Indonesia</option>
                                <option value="Iran">Iran</option>
                                <option value="Iraq">Iraq</option>
                                <option value="Ireland">Ireland</option>
                                <option value="Isle of Man">Isle of Man</option>
                                <option value="Israel">Israel</option>
                                <option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option>
                                <option value="Japan">Japan</option>
                                <option value="Jersey">Jersey</option>
                                <option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option>
                                <option value="Kenya">Kenya</option>
                                <option value="Kiribati">Kiribati</option>
                                <option value="North Korea">North Korea</option>
                                <option value="South Korea">South Korea</option>
                                <option value="Kosovo">Kosovo</option>
                                <option value="Kuwait">Kuwait</option>
                                <option value="Kyrgyzstan">Kyrgyzstan</option>
                                <option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option>
                                <option value="Lebanon">Lebanon</option>
                                <option value="Lesotho">Lesotho</option>
                                <option value="Liberia">Liberia</option>
                                <option value="Libya">Libya</option>
                                <option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option>
                                <option value="Luxembourg">Luxembourg</option>
                                <option value="Macao">Macao</option>
                                <option value="North Macedonia">North Macedonia</option>
                                <option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Maldives">Maldives</option>
                                <option value="Mali">Mali</option>
                                <option value="Malta">Malta</option>
                                <option value="Marshall Islands">Marshall Islands</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Micronesia">Micronesia</option>
                                <option value="Moldova">Moldova</option>
                                <option value="Monaco">Monaco</option>
                                <option value="Mongolia">Mongolia</option>
                                <option value="Montenegro">Montenegro</option>
                                <option value="Montserrat">Montserrat</option>
                                <option value="Morocco">Morocco</option>
                                <option value="Mozambique">Mozambique</option>
                                <option value="Myanmar (Burma)">Myanmar (Burma)</option>
                                <option value="Namibia">Namibia</option>
                                <option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option>
                                <option value="Netherlands">Netherlands</option>
                                <option value="New Caledonia">New Caledonia</option>
                                <option value="New Zealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option>
                                <option value="Niger">Niger</option>
                                <option value="Nigeria">Nigeria</option>
                                <option value="Niue">Niue</option>
                                <option value="Norfolk Island">Norfolk Island</option>
                                <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                                <option value="Norway">Norway</option>
                                <option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option>
                                <option value="Palau">Palau</option>
                                <option value="Palestine">Palestine</option>
                                <option value="Panama">Panama</option>
                                <option value="Papua New Guinea">Papua New Guinea</option>
                                <option value="Paraguay">Paraguay</option>
                                <option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option>
                                <option value="Pitcairn Islands">Pitcairn Islands</option>
                                <option value="Poland">Poland</option>
                                <option value="Portugal">Portugal</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Qatar">Qatar</option>
                                <option value="Réunion">Réunion</option>
                                <option value="Romania">Romania</option>
                                <option value="Russia">Russia</option>
                                <option value="Rwanda">Rwanda</option>
                                <option value="St. Barthélemy">St. Barthélemy</option>
                                <option value="St. Helena">St. Helena</option>
                                <option value="St. Kitts & Nevis">St. Kitts & Nevis</option>
                                <option value="St. Lucia">St. Lucia</option>
                                <option value="St. Martin">St. Martin</option>
                                <option value="St. Pierre & Miquelon">St. Pierre & Miquelon</option>
                                <option value="St. Vincent & Grenadines">St. Vincent & Grenadines</option>
                                <option value="Samoa">Samoa</option>
                                <option value="San Marino">San Marino</option>
                                <option value="São Tomé & Príncipe">São Tomé & Príncipe</option>
                                <option value="Saudi Arabia">Saudi Arabia</option>
                                <option value="Senegal">Senegal</option>
                                <option value="Serbia">Serbia</option>
                                <option value="Seychelles">Seychelles</option>
                                <option value="Sierra Leone">Sierra Leone</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Sint Maarten">Sint Maarten</option>
                                <option value="Slovakia">Slovakia</option>
                                <option value="Slovenia">Slovenia</option>
                                <option value="Solomon Islands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option>
                                <option value="South Africa">South Africa</option>
                                <option value="South Georgia & South Sandwich Islands">South Georgia & South Sandwich Islands</option>
                                <option value="South Sudan">South Sudan</option>
                                <option value="Spain">Spain</option>
                                <option value="Sri Lanka">Sri Lanka</option>
                                <option value="Sudan">Sudan</option>
                                <option value="Suriname">Suriname</option>
                                <option value="Svalbard & Jan Mayen">Svalbard & Jan Mayen</option>
                                <option value="Eswatini">Eswatini</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option>
                                <option value="Taiwan">Taiwan</option>
                                <option value="Tajikistan">Tajikistan</option>
                                <option value="Tanzania">Tanzania</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Timor-Leste">Timor-Leste</option>
                                <option value="Togo">Togo</option>
                                <option value="Tokelau">Tokelau</option>
                                <option value="Tonga">Tonga</option>
                                <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                <option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option>
                                <option value="Turkmenistan">Turkmenistan</option>
                                <option value="Turks & Caicos Islands">Turks & Caicos Islands</option>
                                <option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option>
                                <option value="Ukraine">Ukraine</option>
                                <option value="United Arab Emirates">United Arab Emirates</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                <option value="U.S. Outlying Islands">U.S. Outlying Islands</option>
                                <option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option>
                                <option value="Vanuatu">Vanuatu</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="British Virgin Islands">British Virgin Islands</option>
                                <option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
                                <option value="Wallis & Futuna">Wallis & Futuna</option>
                                <option value="Western Sahara">Western Sahara</option>
                                <option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option>
                                <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                    <label htmlFor="country" className="label top-0 dob-label">Country</label>
                    </div>

                  <div className="w-full flex my-8">
                      <button type='submit' className="text-xs md:text-sm w-full ml-0 text-white py-4 bg-gradient-to-r hover:bg-gradient-to-l from-purple to-pink rounded-xl btn-transt font-medium">Continue</button>
                  </div>
                </form>
            </div>
            <img src={skLogo} alt="short SoundKinesis Logo" className='h-20 absolute -bottom-20 right-5 pb-4' />
        </div>
    </div>
    <Footer />
    </>
  ))
}

export default Find2
