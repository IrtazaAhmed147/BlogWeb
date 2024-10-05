import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div >
      
      <Routes>
        <Route path='/login' element={<Login />} />

      </Routes>
    </div>
  );
}

export default App;
