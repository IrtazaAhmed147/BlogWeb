import React, { useEffect, useState } from 'react'
import { useFirebase } from '../Context/Firebase'
import { useParams } from 'react-router-dom'

const Detail = () => {

    const fireBase = useFirebase()
    const [data, setData] = useState(null)
    const param = useParams()
    const [url, setUrl] = useState(null)


    // useEffect(() => {
    //     if (fireBase.isLoggedIn) {
   
    //         setLoader(false)
    //     } else {
    //         setLoader(true)
    //     }
    // }, [fireBase, navigate])

    useEffect(() => {
        fireBase.getBlogById(param.blogId).then(value => setData((value).data()))
        
    }, [fireBase, param.blogId])

    // console.log(data)

    useEffect(()=> {
        if(data){
            const imageUrl = data.image
            fireBase.imageUrl(imageUrl).then((url)=> setUrl(url))
        }
    },[data, fireBase])

    if (data === null) return <h1>Loading...</h1>
    if (!fireBase.isLoggedIn) return (
        <div style={{minHeight: '81.25vh'}}>

         <h1>Please Login</h1> 
        </div>
        )


    return (
        <div className='detail'>
            <div >
            <img  width='100%' height='500px' className='mb-2' src={url} alt="" />
                </div> 
            
            <h1 style={{fontSize: "4rem"}}>
                {data.title.charAt(0).toUpperCase() + data.title.slice(1).toLowerCase()}
                </h1>
            <p>{data.content}</p>
            <p>Author: {data.author.charAt(0).toUpperCase() + data.author.slice(1).toLowerCase()}</p>
            <h3>Links for Reference</h3>
            {/* <span ></span> */}
            <a rel='noreferrer' target='_blank' href={data.firstUrl}>{data.firstUrl}</a> <br />
            <a rel='noreferrer' target='_blank' href={data.secUrl}>{data.secUrl}</a>

            <p className='mb-0'>UserName: {data.userName}</p>
            <p className='mb-0'>Email: {data.userEmail}</p>
        </div>
    )
}

export default Detail
