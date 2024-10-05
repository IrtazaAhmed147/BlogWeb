import React, { useEffect } from 'react'
import poster from '../image/poster.jpg'
import './Pages.css';
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const fireBase = useFirebase()
    const navigate = useNavigate()

    useEffect(()=> {
        if(fireBase.isLoggedIn){
            navigate('/')
        } else {
            navigate('/login')
        }
    },[fireBase, navigate])

    return (
        <>

            <div className='posterBox'>

                <div style={{ backgroundImage: `url(${poster})`, }} className='poster'>
                    
                </div>
                <div className='color'></div>
                <div className='content'>
                    <h1 style={{fontSize: "70px"}}>Blog Website</h1>
                    <p>Where ideas come to life and stories unfold. Explore, engage, and embrace the art of blogging!</p>
                    </div>
            </div>
        </>
    )
}

export default Home
