import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import './Pages.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';

const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [userNameError, setUserNameError] = useState(false)

    const navigate = useNavigate()
    const fireBase = useFirebase()

    useEffect(() => {
        if (fireBase.isLoggedIn) {
            navigate('/')
        }
    }, [fireBase, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(password.length)

        if(!userName.trim()) {
            setUserNameError(true)
        }
        
        else if ( password.length < 6 ) {

            setPasswordError(true)
        } else {
            setEmailError(false)

            fireBase.createUser(email, password, userName).then(() => setEmailError(false)).catch((error) => { 
                setEmailError(true) 
                console.log(error)
            })
        }
        // fireBase.updateUser(userName)
    }

    const HanldeshowPass = () => {
        setShowPass((prev) => !prev)
    }



    return (
        <div className='MainLoginPage'>
            <div className='loginBox'>
                <h1 style={{ textAlign: "center" }}>Signup</h1>
                <Form style={{ width: "100%", marginTop: '30px' }} onSubmit={handleSubmit}>
                    <Form.Group className="mb-0" controlId="formBasicText">

                        <Form.Control style={{ fontSize: "14px" }} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Enter Username" />

                    </Form.Group>
                    {userNameError && <p className='text-danger   mt-0' style={{ fontSize: '12px' }}>Username required</p>}
                    <Form.Group className=" mt-3 mb-3" controlId="formBasicEmail">

                        <Form.Control style={{ fontSize: "14px" }} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />

                    </Form.Group>
                    <span className='user'>
                        <i className="fa-solid fa-user"></i>
                    </span>

                    <Form.Group className="mb-0" controlId="formBasicPassword">

                        <Form.Control style={{ fontSize: "14px" }} onChange={(e) => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} placeholder="Password" />
                    </Form.Group>

                    {emailError && <p className='text-danger  mt-0' style={{ fontSize: '12px' }}>Invalid Email or Password</p>}
                    {passwordError && <p className='text-danger  mt-0' style={{ fontSize: '12px' }}>Password length should be equal or greater than 6</p>}

                    <span className='showPassBtn' onClick={HanldeshowPass}>
                        {showPass ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                    </span>


                    <Button className='loginBtn mt-3' variant="primary" type="submit">
                        Create Account
                    </Button>

                </Form>
                <p className='registerline mt-3'>Already have an Account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Signup
