import logo from './logo.svg';
import React,{createContext,useState} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './components/CreatePost/CreatePost';
import { LoginContext } from './Context/LoginContext';
import Modal from './components/Modal/Modal';


function App() {

  const [userLogin, setUserLogin] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <BrowserRouter>
    <div className="App">
      <LoginContext.Provider value={{setUserLogin,setModalOpen}}>
        <Navbar login={userLogin}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>

        </Routes>
        <ToastContainer theme="dark"/>
        {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
      </LoginContext.Provider>
    </div>
    </BrowserRouter>
  );
}

export default App;
