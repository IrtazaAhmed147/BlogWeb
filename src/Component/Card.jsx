import React, { useEffect, useState } from 'react'
import './Component.css'
import { useFirebase } from '../Context/Firebase'
import defaultImg from '../image/default.png'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'

const Card = (props) => {

  const fireBase = useFirebase()
  const [url, setUrl] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [title, setTitle] = useState(null)
  const [id, setId] = useState(null)
  const [showModal, setShowModal] = useState(false);
  // const [views, setViews] = useState(0)
  const [loader, setLoader] = useState(false)
  const [blog, setBlog] = useState([])

  useEffect(() => {
    if (fireBase.isLoggedIn) {
      fireBase.fetchMyBlogs(fireBase.myUser.uid)?.then((blog) => {

        setBlog(blog.docs)

      })
    }
  }, [fireBase])


  useEffect(() => {
    fireBase.imageUrl(props.image).then((url) => setUrl(url)).catch(() => setUrl(null))

  }, [fireBase, props.image])

  const handleView = () => {
    navigate(props.link)
  }


  const handleDelState = (id, title) => {
    setId(id)
    setTitle(title)
    setShowModal(true);
  }


  const handleDel = () => {

    setLoader(true)

    fireBase.deletePost(id).then(() => {

      alert("post Deleted")
      window.location.reload();


    }).catch((err) => console.log(err))
      .finally(() => {
        setLoader(false)
      })
    setShowModal(false);

  }

  const handleEdit = (id) => {
    console.log(id)
    const edit = blog.find(task => task.id === id)

    fireBase.setEditTask(edit.data());
    console.log("Editing task:", edit.data());
    navigate(`/editblog/${id}`)

  }



  return (
    <>
      <div className='cardBox' >



        <div>


          <div>
            <img style={{ cursor: 'pointer' }} onClick={handleView} height='150px' width='100%' src={url ? url : defaultImg} alt="Coverpic" />
          </div>

          <div>
            <h3 style={{ cursor: 'pointer' }} onClick={handleView}>{(props.title.charAt(0).toUpperCase() + props.title.slice(1).toLowerCase()).slice(0, 43)}</h3>
            <p style={{ fontSize: "13px" }}>{props.content.slice(0, 150)}...</p>
          </div>
        </div>

        <div className='d-flex justify-content-between'>

          <div style={{ fontSize: "12px" }}>
            <span>{(props.userName.charAt(0).toUpperCase() + props.userName.slice(1).toLowerCase())} - {props.createdDate}</span>

          </div>

          <div>



            {location.pathname === '/profile' && <button type="button" onClick={() => handleEdit(props.id)} style={{ backgroundColor: '#006900', padding: '4px 10px' }} className='viewBtn me-1' > <i className="fa-solid fa-pen"></i> </button>}


            {location.pathname === '/profile' && <button type="button" onClick={() => handleDelState(props.id, props.title)} style={{ backgroundColor: '#d90000', padding: '4px 10px' }} className='viewBtn' > <i className="fa-solid fa-trash"></i> </button>}

            {/* modal */}

            {showModal && (
              <div className="modal show" style={{ display: 'block' }} >
                <div className="modal-dialog" >
                  <div className="modal-content">
                    <div className="modal-header" style={{ border: 'none' }}>
                      <h1 className="modal-title">{title.slice(0, 30)}</h1>
                      <button type="button" className="btn-close" style={{ alignSelf: 'self-start' }} onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                      Do you want to delete this post?
                    </div>
                    <div className="modal-footer" style={{ border: 'none' }}>
                      <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                      <button type="button" onClick={handleDel} style={{ backgroundColor: '#d90000', padding: '7px 10px' }} className='viewBtn'>
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}







          </div>
        </div>

      </div>
      {loader && <div className='popUp' style={{ opacity: '0.6' }}>
        <Loader />
      </div>}
    </>


  )
}

export default Card
