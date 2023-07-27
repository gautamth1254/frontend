import React,{useState,useEffect} from 'react'
import "./CreatePost.css"
import {toast} from 'react-toastify';
import {useNavigate} from "react-router-dom"


const CreatePost = () => {

    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url,setUrl] = useState("");
    const navigate = useNavigate();

    //Toast function

    const notifyA =(msg)=>toast.error(msg)
    const notifyB =(msg)=>toast.success(msg)

    useEffect(() => {

                // saving post to mongodb

        if(url){
            fetch("http://localhost:5000/createPost",{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                body,
                pic:url
            })
            }).then(res=>res.json())
            .then(data=>{if(data.error){
                notifyA(data.error)
            }else{
                notifyB("Success posted")
                navigate('/')
            }})
            .catch(err => console.log(err))
        }
           
    }, [url])
    

    //posting image to cloudinary 

    const postDetails=()=>{
        console.log(body,image);
        const data = new FormData();
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","gautamcloud")
        fetch("https://api.cloudinary.com/v1_1/gautamcloud/image/upload",{
            method: "POST",
            body:data
        }).then(res=>res.json())
        .then(data=>setUrl(data.url))  // cloudnary se jo url ayega usko seturl me dalkr usko database me daal denge  
        .catch(err=>console.log(err))

    }

    const loadfile = (event)=>{
        
        var output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);
        output.onload = function() {
            URL.revokeObjectURL(output.src) // free memory
        }
         
    };
  return (
    <div className='createPost'>
        {/* header */}
        <div className="post-header">
            <h4 style={{margin:"3px auto"}}> Create New Post</h4>
            <button id='post-btn' onClick={()=>{postDetails()}}> Share</button>
        </div>
        {/* image upload */}
        <div className="main-div">
            <img src='https://cdn.icon-icons.com/icons2/510/PNG/512/image_icon-icons.com_50366.png' id="output" alt="plzu upload correct pic"/>
            <input type="file" accept="image/*" onChange={(event)=>{loadfile(event);setImage(event.target.files[0])}} />
        </div>
        {/* details */}
        <div className="details">
            <div className="card-header">
                <div className="card-pic">
                    <img src="https://img.freepik.com/free-photo/friendly-professional-businesswoman_23-2147702121.jpg?w=1380&t=st=1685849595~exp=1685850195~hmac=2b1b6c2bd66124e21f72789f34e23fac54aa1ced490316545c637abbdc391e80" alt="" />
                </div>
                <h5>Gautam</h5>
                
            </div>
            <textarea value={body} onChange={(e) => {setBody(e.target.value)}} type="text" placeholder='Write a Caption.....'></textarea>
        </div>
    </div>
  )
}

export default CreatePost