import React,{useEffect,useState} from 'react'
import './Profile.css'

const Profile = () => {

  const [pic, setPic] = useState([])

  useEffect(() => {
    
    fetch('http://localhost:5000/mypost', {
      headers:{
        Authorization:"Bearer "+ localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then((result)=>{
      setPic(result)
    })
    .catch((err)=>console.log(err))
  }, [])
  
  return (
    <div className='profile'>
      {/* profile-frame */}
      <div className='profile-frame'>
        {/* profile-pic */}
        <div className='profile-pic'>
          <img src="https://img.freepik.com/free-photo/friendly-professional-businesswoman_23-2147702121.jpg?w=1380&t=st=1685849595~exp=1685850195~hmac=2b1b6c2bd66124e21f72789f34e23fac54aa1ced490316545c637abbdc391e80" alt="" />
        </div>
        {/* profile-data */}
        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info" style={{display:'flex'}}>
            <p>40 posts</p>
            <p>40 follower</p>
            <p>40 followering</p>
          </div>
        </div>

      </div>

      <hr style={{width:'90%',opacity:"0.8",margin:"25px auto"}}/>
      {/* Gallery */}
      <div className="gallery">
        {pic.map((pics)=>{
          return <img key={pics._id} src={pics.photo} className='item' alt='images'></img>
        })}
      </div>
       
    </div>
  )
}

export default Profile