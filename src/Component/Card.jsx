import React, { useEffect, useState } from 'react'
import './Component.css'
import { useFirebase } from '../Context/Firebase'
import defaultImg from '../image/default.png'
import profileDef from '../image/profile.png'
import { useNavigate } from 'react-router-dom'


const Card = (props) => {

    const fireBase = useFirebase()
    const [url, setUrl] = useState(null)
    const navigate = useNavigate()

    useEffect(()=> {
        fireBase.imageUrl(props.image).then((url)=> setUrl(url)).catch(()=> setUrl(null))
    },[fireBase, props.image])

    const handleView = ()=> {
      navigate(props.link)
    }

  return (
    <div className='cardBox' >
      <div className='d-flex'>
        <img className='profile' src={profileDef} alt="" />
          <span>{props.userName}</span>
      </div>
      <div>
        <img height='150px' width='100%' src={url? url: defaultImg} alt="" />
      </div>
      <div>
        <h3>{props.title}</h3>
        <p style={{fontSize: "13px"}}>{props.content.slice(0, 150)}...</p>
        <div className='d-flex justify-content-between'>
          <div style={{fontSize: "12px"}}>

            <span>Created At: {props.createdDate}</span> <br />
            <span>Views 0</span>
          </div>
            <button className='viewBtn' onClick={handleView}>View</button>
        </div>
      </div>

    </div>
  )
}

export default Card
