import React,{useEffect,useState} from 'react'
import signuplogo from '../../image/instalogo.png'
import './SignUp.css'
import {Link,useNavigate} from 'react-router-dom'
import {toast } from 'react-toastify';

const SignUp = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //Toast 

    const notifyA = (msg)=> toast.error(msg);
    const notifyB = (msg)=> toast.success(msg);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    const postData = () =>{
        //checking email

        if(!emailRegex.test(email)){
            notifyA("Invalid email")
            return;
            //console.log("false");
        }else if(!passwordRegex.test(password)){
            notifyA("Password must contain at least 8 character incluing at least 1 number, lower upper case letter and special character ex:- @,#,?,!")
            return
        }

        // console.log({
        //     name,
        //     email,
        //     userName,
        //     password
        // })
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                //key,value
                name:name,
                userName:userName,
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                notifyA(data.error)
            }else{
                notifyB(data.message)
                navigate("/signin")
            }
            
            console.log(data)
        })
    }



    return (
        <div className='signup'>

            <div className='form-container'>

                <div className='form'>
                    <img src={signuplogo} alt="" className='signuplogo'/>
                    <p className='loginPara'>
                        Signup to see photos and videos
                        <br/>
                        from your friends
                    </p>
                    <div>
                        <input type="email" name='email' value={email} id='email' placeholder='Email' onChange={((e)=>{setEmail(e.target.value)})}/>
                    </div>
                    <div>
                        <input type="text" name='name' id='name' placeholder='Full Name' value={name} onChange={((e)=>{setName(e.target.value)})}/>
                    </div>
                    <div>
                        <input type="text" name='username' id='username' placeholder='Username' value={userName} onChange={((e)=>{setUserName(e.target.value)})}/>
                    </div>
                    <div>
                        <input type="password" name='password' id='password' placeholder='Password' value={password} onChange={((e)=>{setPassword(e.target.value)})}/>
                    </div>
                    <p className='loginPara' style={{fontSize: '12px',margin: '3px 0px'}}>
                        By signing up ,you agree to out Term, <br/> privacy policy ans cookies policy
                    </p>
                    <input type="submit" id='submit-btn' className='submit-btn' value='Sign Up' onClick={()=>{postData()}}/>

                </div>

                <div className='form2'>
                    Already have an account ? 
                    <Link to='/signin'>
                        <span style={{color:"blue",cursor:'pointer'}}> Sign In</span>

                    </Link>
                </div>
            </div>
        </div>
    )
    }

export default SignUp


// mongodb username gautam1254 password gautam1254.