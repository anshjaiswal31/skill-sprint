import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login'
import Profile from './pages/Profile';
import JobDetails from './pages/JobDetails';
import Jobs from './pages/Jobs';
import {useSelector} from 'react-redux';
import {selectUser} from './features/userSlice';
import Navbar from './components/Navbar';
import EditProfile from './pages/EditProfile';
import JobsDashboard from './pages/JobsDashboard';
import AllApplications from './pages/AllApplications';
function App(){
  const user=useSelector(selectUser);

  return (
    <div className="App">
      
      <Router>
      {/* <Navbar/> */}
      {user?<Navbar/>:null}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          {user?<Route path='/edit' element={<EditProfile/>}/>:null}
          {user && user.userType==="admin"?<Route path='/jobdetails' element={<JobDetails/>}/>:null}
          {user?<Route path='/jobs' element={<Jobs/>}/>:null}
          {user && user.userType==="admin"?<Route path='/jobsdashboard' element={<JobsDashboard/>}/>:null}
          <Route path='/allapplications/:jobid' element={<AllApplications/>}/>
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
