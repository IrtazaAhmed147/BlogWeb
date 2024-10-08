import React, { useEffect, useState } from 'react'
import defPerson from '../image/defPerson.png'
import { useFirebase } from '../Context/Firebase'
import Card from './Card'
// import { useNavigate } from 'react-router-dom'


const Profile = () => {




  const fireBase = useFirebase()
  const [blog, setBlog] = useState([])
  // const navigate = useNavigate()


  // useEffect(() => {
  //   if (fireBase.isLoggedIn) {
  //     navigate('/profile')
  //   } else {
  //     navigate('/login')
  //   }

  // }, [fireBase, navigate])

  useEffect(() => {
    if (fireBase.isLoggedIn) {
      fireBase.fetchMyBlogs(fireBase.myUser.uid)?.then((blog) => setBlog(blog.docs))

    }
  }, [fireBase])

  if (!fireBase.isLoggedIn) return (
    <>
    <div>

    <h1 >Please Login</h1>
    </div>
    </>
  )




  return (
    <div>

      <h1 className='ms-3'>Profile</h1>
      <div className='d-flex gap-3 profbox  align-items-center'>

        <img className='profImg' src={defPerson} alt="" />
        <div>

          <h1>Username: {fireBase.myUser.displayName.charAt(0).toUpperCase() + fireBase.myUser.displayName.slice(1).toLowerCase()}</h1>
          <h1>Email: {fireBase.myUser.email}</h1>
        </div>
      </div>
      <div style={{ padding: "20px" }} className='profileCardBox'>

        {blog.map((element) => (
          <Card key={element.id} {...element.data()} id={element.id} link={`/blog/view/${element.id}`} />
        ))}
      </div>



    </div>
  )
}

export default Profile
