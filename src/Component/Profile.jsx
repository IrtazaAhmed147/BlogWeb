import React, { useEffect, useState } from 'react'
import defPerson from '../image/defPerson.png'
import { useFirebase } from '../Context/Firebase'
import Card from './Card'
import { useNavigate } from 'react-router-dom'

const Profile = () => {




  const fireBase = useFirebase()
  const [blog, setBlog] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    if (fireBase.isLoggedIn) {
        navigate('/profile')
    } else {
        navigate('/login')
    }

    // console.log(coverPic)
}, [fireBase, navigate])

  useEffect(()=> {
    if(fireBase.isLoggedIn) {
      fireBase.fetchMyBlogs(fireBase.myUser.uid)?.then((blog)=> setBlog(blog.docs))
      
    }
  },[fireBase])
  // console.log(blog)

  if (!fireBase.isLoggedIn) return <h1>Please Login</h1>



  return (
    <div>
      <h1>Profile</h1>
      <div className='d-flex gap-3  align-items-center'>

        <img width='200px'  src={defPerson} alt="" />
        <div>

        <h1>Username: {fireBase.myUser.displayName}</h1>
        <h1>Email: {fireBase.myUser.email}</h1>
        </div>
      </div>
    <div style={{ padding: "20px" }} className='profileCardBox'>

      {blog.map((element)=> (
        <Card key={element.id} {...element.data()} id={element.id} link={`/blog/view/${element.id}`}/>
      ))}
      </div>

    </div>
  )
}

export default Profile
