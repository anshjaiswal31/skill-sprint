import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login'
import Profile from './pages/Profile';
import JobDetails from './pages/JobDetails';
 import './App.css';
import Jobs from './pages/Jobs';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import Navbar from './components/Navbar';
function App() {
  const user=useSelector(selectUser);

  return (
    <div className="App">
      
      <Router>
      {/* <Navbar/> */}
      {user?<Navbar/>:null}
        <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          {user && user.userType==="admin"?<Route path='/jobdetails' element={<JobDetails/>}/>:null}
          {/* <Route path='/jobdetails' element={<JobDetails/>}/> */}
          {user?<Route path='/jobs' element={<Jobs/>}/>:null}
          {/* <Route path='/loggedinuser' element={<LoggedInUser/>}/> */}
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
