import './App.css';
import { Route, Routes } from 'react-router';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import AdminHome from './components/Admin/AdminHome';
import SignUp from './components/SignUp/SignUp';
import UpdateUser from './components/UpdateUser/UpdateUser';
import CreateUser from './components/CreateUser/CreateUser';


function App() {
  return (
    <div className="App">
     <Header />
     <Routes>
      
      <Route path="" element={<Login />} />
      <Route path="home" element={<AdminHome />} />
      <Route path='login' element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="update/:id" element={<UpdateUser />} />
      <Route path="create" element={<CreateUser />} />
     

     </Routes>

     <Footer />
    </div>
  );
}

export default App;
