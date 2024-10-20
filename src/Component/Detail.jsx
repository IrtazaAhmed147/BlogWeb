import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/Firebase'
import { useParams } from 'react-router-dom'
import Loader from './Loader'
import './Component.css'

const Detail = () => {

    const fireBase = useFirebase()
    const [data, setData] = useState(null)
    const param = useParams()
    const [url, setUrl] = useState(null)
    // const [loader, setLoader] = useState(false)



    useEffect(() => {
        fireBase.getBlogById(param.blogId).then(value => setData((value).data()))

    }, [fireBase, param.blogId])



    useEffect(() => {
        if (data) {
            const imageUrl = data.image
            fireBase.imageUrl(imageUrl).then((url) => setUrl(url))
        }
    }, [data, fireBase])

    if (data === null) return (

        <div >
            <div style={{ height: '400px', display: 'flex' }}>
                {<Loader />}
            </div>
        </div>
    )

    if (!fireBase.isLoggedIn) return (
        <div >

            <h1>Please Login</h1>
        </div>
    )


    return (
        <div className='detail'>

            <h1 className='detHead' >
                {data.title.charAt(0).toUpperCase() + data.title.slice(1).toLowerCase()}
            </h1>
            <p style={{fontSize: '13px'}}>{data.createdDate} <span style={{ color: 'grey' }}> by </span> {data.userName.charAt(0).toUpperCase() + data.userName.slice(1).toLowerCase()}</p>
            <div >
                <img className='mb-2 detailImage' src={url} alt="" />
            </div>



            <pre className='pre'>{data.content}</pre>
            {data.author.trim() && <p className='mb-3 '>Author: {data.author.charAt(0).toUpperCase() + data.author.slice(1).toLowerCase()}</p>}

            {(data.firstUrl || data.secUrl) && <h3>Links</h3>}

            <a rel='noreferrer' target='_blank' href={data.firstUrl}>{data.firstUrl}</a> <br />
            <a rel='noreferrer' target='_blank' href={data.secUrl}>{data.secUrl}</a>





        </div>
    )
}

export default Detail
