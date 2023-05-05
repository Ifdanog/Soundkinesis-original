import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Step1 from './pages/Step1'
import Step2 from './pages/Step2'
import Step3 from './pages/Step3'
import Step4 from './pages/Step4'
import Find1 from './pages/Find1'
import Find2 from './pages/Find2'
import Find3 from './pages/Find3'
import LandingPage from './pages/LandingPage'
import ForgotPassword from './pages/ForgotPassword'
import Forgot2 from './pages/Forgot2'
import Forgot3 from './pages/Forgot3'
import Newsfeed from './pages/Newsfeed'
import Inbox from './pages/Inbox'
import Explore from './pages/Explore'
import Bookmarks from './pages/Bookmarks'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import UploadPage from './pages/UploadPage'
import EditProfile from './pages/EditProfile'
//import { RequireAuth } from 'react-auth-kit'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/forgot2' element={<Forgot2 />} />
        <Route path='/forgot3' element={<Forgot3 />} />
        
        <Route path='/find-an-artist/find1' element={<Find1 />} />
        <Route path='/find-an-artist/find2' element={<Find2 />} />
        <Route path='/find-an-artist/find3' element={<Find3 />} />

        <Route path='/become-an-artist/step1' element={<Step1 />} />
        <Route path='/become-an-artist/step2' element={<Step2 />} />
        <Route path='/become-an-artist/step3' element={<Step3 />} />
        <Route path='/become-an-artist/step4' element={<Step4 />} />

        <Route path='/join' element={<Home />} />
        <Route path='/newsfeed' element={<Newsfeed />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/inbox' element={<Inbox />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/bookmarks' element={<Bookmarks />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/editprofile' element={<EditProfile />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
