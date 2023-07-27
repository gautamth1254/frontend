import React,{useEffect,useState} from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [comment, setComment] = useState();

  console.log(data);

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if(token==null){
      navigate('./signup')
    }
    fetch("http://localhost:5000/allposts",{
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>setData(result))
    .catch(err => console.log(err))
  }, [])
  
  const likePost=(id)=>{
    fetch("http://localhost:5000/like",{
      method:"put",
      headers:{
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id === result._id){
            return result 
        }else{
          return posts
        }
      })
      setData(newData)
      console.log(result);
      console.log(data);
    })
  }

  const unlikePost=(id)=>{
    fetch("http://localhost:5000/unlike",{
      method:"put",
      headers:{
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId:id
      })
    }).then(res=>res.json())
    .then((result)=>{
      const newData = data.map((posts)=>{
        if(posts._id === result._id){
            return result 
        }else{
          return posts
        }
      })
      setData(newData)
      console.log(result);
      console.log(data);
    })
  }

// function to add comment to database

  const addComment = (text,id)=>{
    fetch("http://localhost:5000/comment",{
      method: "put",
      headers:{
        "Content-type":"application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        text:text,
        postId:id
      })
    }).then(res=>res.json())
    .then((result)=>{
      console.log(result);
      console.log(data);
    })
    //console.log(comment);
  }

  return (
    <div className='home'>
      {/* card */}
      {data.map((posts)=>{
        return(
          <div className='card'>
        {/* card header */}
        <div className='card-header'>
          <div className="card-pic">
            <img src="https://img.freepik.com/free-photo/friendly-professional-businesswoman_23-2147702121.jpg?w=1380&t=st=1685849595~exp=1685850195~hmac=2b1b6c2bd66124e21f72789f34e23fac54aa1ced490316545c637abbdc391e80" alt="" />
          </div>
          <h5>{posts.postedBy.name}</h5>
        </div>
        {/* card-image */}
        <div className="card-image">
          <img src={posts.photo} alt="" />
        </div>
        {/* card-content */}
        <div className="card-content">
          {
            posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
            ?(<span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=>{unlikePost(posts._id)}}>
            favorite
          </span>):( <span className="material-symbols-outlined"  onClick={()=>{likePost(posts._id)}}>
            favorite
          </span>)
          }
         
          
          <p>{posts.likes.length} Like</p>
          <p>{posts.body}</p>
        </div>

        {/* add-comment */}
        <div className="add-comment">
        <span className="material-symbols-outlined">
          mood
        </span>
        <input type="text" placeholder='Add Comments' onChange={(e)=>{setComment(e.target.value)}}/>
        <button className='comment' onClick={()=>addComment(comment,posts._id)}>Post</button>
        </div>
      </div>
        )
      })}
      
    </div>
  )
}

export default Home