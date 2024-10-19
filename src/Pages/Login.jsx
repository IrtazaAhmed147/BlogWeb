import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import './Pages.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import Loader from '../Component/Loader';


const Login = () => {


    const fireBase = useFirebase()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (fireBase.isLoggedIn) {
            navigate('/')
        }
    }, [fireBase, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoader(true)
        fireBase.loginUser(email, password).then(() => {
            setError(false)
            setLoader(false)
        }).catch(() => {
            setError(true)
            setLoader(false)
        })
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
                        <Form.Control style={{ fontSize: "14px" }} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Email" />

                    </Form.Group>


                    <Form.Group className="mb-0 inputIconBox" controlId="formBasicPassword" >
                        <input className='inputNav' onChange={(e) => setPassword(e.target.value)} type={showPass ? 'text' : 'password'} placeholder="Password" />
                        <span style={{ top: '34%' }} className='showPassBtn ' onClick={HanldeshowPass}>
                            {showPass ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                        </span>
                    </Form.Group>

                    {error && <p className='text-danger mb-0 mt-0' style={{ fontSize: '12px' }}>Invalid Email/Password</p>}

                    <Button className='loginBtn mt-3' variant="primary" type="submit">
                        Login
                    </Button>

                </Form>
                <p className='registerline mt-3'>Don't have an Account? <Link to="/signup">Signup</Link></p>
            </div>
            {loader && <div className='popUp'>
                <Loader />
            </div>}
        </div>
    )
}

export default Login
