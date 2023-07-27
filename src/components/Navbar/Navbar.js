import React,{useContext} from 'react'
import Instalogo from '../../image/instalogo.png'

import './Navbar.css'
import {Link} from 'react-router-dom'
import { LoginContext } from '../../Context/LoginContext'
import { useNavigate } from 'react-router-dom'


const Navbar = ({login}) => {

  const navigate = useNavigate();

  const {setModalOpen} = useContext(LoginContext)

  const loginStatus = ()=>{
    const token = localStorage.getItem("jwt")
    if(login || token){
      return[
        <>
         <Link to="/profile">
          <li>Profile</li>
        </Link>
        <Link to="/createpost">
          <li>Create Post</li>
        </Link>
        <Link to={""}>
          <button className='primaryBtn' onClick={()=>{setModalOpen(true)}}>Log Out</button>
        </Link>
        </>
      ]
    }else{
      return[
        <>
         <Link to="/signup">
          <li>SignUp</li>
        </Link>
        <Link to="/signin">
          <li>Login</li>
        </Link>
        </>
      ]
    }
  }

  return (
    <div className='navbar' >
      <img src={Instalogo} alt="" className='img' onClick={()=>{navigate('/allposts')}}/>
      <ul className='nav-menu'>
        {loginStatus()}
        
      </ul>
    </div>
  )
}

export default Navbar