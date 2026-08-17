import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './Pages/Add';
import List from './Pages/List';
import Order from './Pages/Order';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">

      <ToastContainer />
      
      <Navbar/>
      <hr/>

      <div className='next-portion'>
        <Sidebar/>

        <Routes>

          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="/order" element={<Order/>}/>

        </Routes>
      </div>
    </div>
  );
}

export default App;
