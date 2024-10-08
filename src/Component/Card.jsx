import React, { useEffect, useState } from 'react'
import './Component.css'
import { useFirebase } from '../Context/Firebase'
import defaultImg from '../image/default.png'
import profileDef from '../image/profile.png'
import { useLocation, useNavigate } from 'react-router-dom'


const Card = (props) => {

  const fireBase = useFirebase()
  const [url, setUrl] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [title, setTitle] = useState(null)
  const [id, setId] = useState(null)
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    fireBase.imageUrl(props.image).then((url) => setUrl(url)).catch(() => setUrl(null))
    // console.log(id)
    // console.log(title)
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
    console.log('delte btn')


    fireBase.deletePost(id).then(() => {
      alert("post Deleted")
      window.location.reload();
    }).catch((err) => console.log(err));
    setShowModal(false);
  }





  return (
    <div className='cardBox' >
      <div className='d-flex'>
        <img className='profile' src={profileDef} alt="" />
        <span>{props.userName.charAt(0).toUpperCase() + props.userName.slice(1).toLowerCase()}</span>
      </div>
      <div>
        <img height='150px' width='100%' src={url ? url : defaultImg} alt="" />
      </div>
      <div>
        <h3>{props.title.charAt(0).toUpperCase() + props.title.slice(1).toLowerCase()}</h3>
        <p style={{ fontSize: "13px" }}>{props.content.slice(0, 150)}...</p>
        <div className='d-flex justify-content-between'>
          <div style={{ fontSize: "12px" }}>

            <span>Created At: {props.createdDate}</span> <br />
            <span>Views 0</span>
          </div>
          <div >

            <button className='viewBtn me-1' onClick={handleView}>View</button>

            {location.pathname === '/profile' && <button type="button" onClick={() => handleDelState(props.id, props.title)} style={{ backgroundColor: '#d90000', padding: '4px 10px' }} className='viewBtn' > <i className="fa-solid fa-trash"></i> </button>}

            {/* modal */}

            {showModal && (
              <div className="modal show" style={{ display: 'block' }} >
                <div className="modal-dialog" >
                  <div className="modal-content">
                    <div className="modal-header" style={{ border: 'none' }}>
                      <h1 className="modal-title">{title}</h1>
                      <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
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

    </div>
  )
}

export default Card
