import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../Context/Firebase';
import { Link } from 'react-router-dom';

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
    const handleSignup = () => {
        navigate('/signup')
    }
    return (
        <div>


            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">InspireZone</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/createblog">Create Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
                            </li>


                        </ul>

                        {isLoggedIn && <Button onClick={signOut} variant="success" className='me-3 ms-3'>
                            Signout
                        </Button>}
                        {!isLoggedIn && <Button variant="success" onClick={handleSignin}>
                            Signin
                        </Button>}
                        {!isLoggedIn && <Button variant="success" className='me-3 ms-3' onClick={handleSignup} >
                            Signup
                        </Button>}

                    </div>
                </div>
            </nav>



            {/* <NavLink style={{ textDecoration: "none", color: "black" }} to="/">Home</NavLink>
                        <NavLink style={{ textDecoration: "none", color: "black" }} to="/createblog">Create Blog</NavLink>
                        <NavLink style={{ textDecoration: "none", color: "black" }} to="/profile">Profile</NavLink> */}




        </div>
    )
}

export default NavBar
