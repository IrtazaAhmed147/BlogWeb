import React, { useEffect, useState } from 'react'
import './Component.css'
import { useFirebase } from '../Context/Firebase'
import defaultImg from '../image/default.png'
import profileDef from '../image/profile.png'
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
  const [views, setViews] = useState(0)
  const [loader, setLoader] = useState(false)


  useEffect(() => {
    fireBase.imageUrl(props.image).then((url) => setUrl(url)).catch(() => setUrl(null))


    fireBase.getViews(props.id)
      .then((count) => setViews(count))
      .catch(() => setViews(0));

  }, [fireBase, props.image, props.id])

  const handleView = () => {
    navigate(props.link)

    const currentUserId = fireBase.myUser?.uid;

    if (currentUserId !== props.userId) {
      const newViewsCount = views + 1;
      setViews(newViewsCount)
      fireBase.updateViews(props.id, newViewsCount).then(() => console.log("count", newViewsCount)).catch((err) => console.log(err));
    }

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





  return (
    <>
      <div className='cardBox' >

        <div className='d-flex'>
          <img className='profile' src={profileDef} alt="" />
          <span>{(props.userName.charAt(0).toUpperCase() + props.userName.slice(1).toLowerCase())}</span>
        </div>

        <div>
          <img height='150px' width='100%' src={url ? url : defaultImg} alt="" />
        </div>

        <div>

          <h3>{(props.title.charAt(0).toUpperCase() + props.title.slice(1).toLowerCase()).slice(0, 30)}</h3>
          <p style={{ fontSize: "13px" }}>{props.content.slice(0, 150)}...</p>

          <div className='d-flex justify-content-between'>

            <div style={{ fontSize: "12px" }}>
              <span>Created At: {props.createdDate}</span> <br />
              <span>Views {views}</span>
            </div>

            <div>

              <button className='viewBtn me-1' onClick={handleView}>View</button>

              {location.pathname === '/profile' && <button type="button" onClick={() => handleDelState(props.id, props.title)} style={{ backgroundColor: '#d90000', padding: '4px 10px' }} className='viewBtn' > <i className="fa-solid fa-trash"></i> </button>}

              {/* modal */}

              {showModal && (
                <div className="modal show" style={{ display: 'block' }} >
                  <div className="modal-dialog" >
                    <div className="modal-content">
                      <div className="modal-header" style={{ border: 'none' }}>
                        <h1 className="modal-title">{title.slice(0, 30)}</h1>
                        <button type="button" className="btn-close" style={{alignSelf: 'self-start'}} onClick={() => setShowModal(false)}></button>
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
      {loader && <div className='popUp'  style={{opacity: '0.6'}}>
        <Loader />
      </div>}
    </>


  )
}

export default Card
