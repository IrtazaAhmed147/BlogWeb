import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import { Link } from 'react-router-dom';
import './Component.css'

const NavBar = () => {
    const fireBase = useFirebase()
    const [isLoggedIn, setIsloggedIn] = useState(null)
    const navigate = useNavigate()





    useEffect(() => {
        if (fireBase.isLoggedIn) {
            setIsloggedIn(true)
        } else {
            setIsloggedIn(false)
        }
    }, [fireBase.isLoggedIn])
    const signOut = () => {
        fireBase.signOutUser()
    }

    const handleSignin = () => {
        navigate('/login')
    }
   
    return (
        <div>


            <nav  className="d-flex navBar justify-content-between">
                <div  className='ms-3 fontNav d-flex justify-content-between align-items-center'>
                    <Link style={{fontWeight: '600'}} className="navbar-brand" to="/">BlogVerse</Link>
                    
                    <div  className='d-flex align-items-center ' >
                        <ul  className="p-0 d-flex navUl mb-0">

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/"  >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/createblog"  >Create Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/profile"  >Profile</Link>
                            </li>
                           

                        </ul>


                    </div>
                </div>
                        {isLoggedIn && <button style={{backgroundColor: '#d70000'}} onClick={signOut}  className='NavBtn'>
                            Sign Out
                        </button>}
                        {!isLoggedIn && <button  className='NavBtn' onClick={handleSignin}>
                            Sign In
                        </button>}
                        
            </nav>



            



        </div>
    )
}

export default NavBar
