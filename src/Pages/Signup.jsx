import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import './Pages.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';

const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    const fireBase = useFirebase()

    useEffect(()=> {
        if(fireBase.isLoggedIn){
            navigate('/')
        }
    },[fireBase, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        fireBase.createUser(email, password)
    }

    const HanldeshowPass = () => {
        setShowPass((prev) => !prev)
    }



    return (
        <div className='MainLoginPage'>
            <div className='loginBox'>
                <h1 style={{ textAlign: "center" }}>Signup</h1>
                <Form style={{ width: "100%", marginTop: '30px' }} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        {/* <Form.Label style={{margin: "0px"}}>Email address</Form.Label> */}
                        <Form.Control style={{ fontSize: "14px" }} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />

                    </Form.Group>
                    <span className='user'>
                        <i className="fa-solid fa-user"></i>
                    </span>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        {/* <Form.Label style={{margin: "0px"}}>Password</Form.Label> */}
                        <Form.Control style={{ fontSize: "14px" }} onChange={(e) => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} placeholder="Password" />
                    </Form.Group>
                    <span className='showPassBtn' onClick={HanldeshowPass}>
                        {showPass ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                    </span>

                    <Button className='loginBtn' variant="primary" type="submit">
                        Create Account
                    </Button>

                </Form>
                <p className='registerline mt-3'>Already have an Account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Signup
