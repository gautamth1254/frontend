import React,{useState,useContext} from 'react'
import signinlogo from '../../image/instalogo.png'
import './SignIn.css'
import {Link,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify';
import { LoginContext } from '../../Context/LoginContext';



const SignIn = () => {

    const {setUserLogin} = useContext(LoginContext)

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    //Toast function

    const notifyA =(msg)=>toast.error(msg)
    const notifyB =(msg)=>toast.success(msg)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    const setData = () => {

        if(!emailRegex.test(email)){
            notifyA("Invalid email")
            return;
            //console.log("false");
        }

        fetch("http://localhost:5000/signin",{
        method: 'POST',
        headers : { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            email: email,
            password: password
            })
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                notifyA(data.error)
            }else{
                notifyB("Signed in successfully")
                console.log(data);
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user',JSON.stringify(data.user))

                setUserLogin(true)
                navigate("/")
            }
            console.log(data)
        })
    }


  return (
    <div className="signin">
        <div className="loginform">
            <img src={signinlogo} alt="" className='signinlogo' />
            
            <div>
                <input type="email" name='email' id='email' placeholder='Email' value={email} onChange={((e)=>{setEmail(e.target.value)})}/>
            </div>
           
            <div>
                <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={((e)=>{setPassword(e.target.value)})}/>
            </div>
           <input type="submit" id='login-btn' value='Sign In' onClick={()=>{setData()}}/>
        </div>
        <div className="loginform2">
                Create a new account ? 
                <Link to='/signup'>
                    <span style={{color:"blue",cursor:'pointer'}}> Sign Up</span>

                </Link>
        </div>
    </div>
  )
}

export default SignIn