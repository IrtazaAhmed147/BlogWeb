import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Pages.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';


const Login = () => {


    const fireBase = useFirebase()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=> {
        if(fireBase.isLoggedIn){
            navigate('/')
        }
    },[fireBase, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        fireBase.loginUser(email, password)
    }

    const HanldeshowPass = () => {
        setShowPass((prev) => !prev)
    }

    return (
        <div className='MainLoginPage'>
            <div className='loginBox'>
                <h1 style={{ textAlign: "center" }}>Login</h1>
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
                        Login
                    </Button>

                </Form>
                <p className='registerline mt-3'>Don't have an Account? <Link to="/signup">Signup</Link></p>
            </div>
        </div>
    )
}

export default Login
