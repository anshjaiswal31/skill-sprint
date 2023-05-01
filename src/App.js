import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login'
import Profile from './pages/Profile';
import JobDetails from './pages/JobDetails';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/Profile' element={<Profile/>}/>
          <Route path='/jobdetails' element={<JobDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
} 

export default App;
