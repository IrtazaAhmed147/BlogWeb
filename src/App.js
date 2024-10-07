import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import NavBar from './Component/Navbar';
import Home from './Pages/Home';
import Createblog from './Component/Createblog';
import Profile from './Component/Profile';
import Detail from './Component/Detail';
import Footer from './Component/Footer';


function App() {
  return (
    <div >
      <NavBar />
      <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/createblog' element={<Createblog />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/blog/view/:blogId' element={<Detail />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
