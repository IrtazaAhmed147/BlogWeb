import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Component.css'
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';

const Createblog = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [coverpic, setCoverPic] = useState('')
    const [firstUrl, setFirstUrl] = useState('')
    const [secUrl, setSecUrl] = useState('')

    const fireBase = useFirebase()
    const navigate = useNavigate()

    useEffect(()=> {
        if(fireBase.isLoggedIn){
            navigate('/')
        } else {
            navigate('/login')
        }
    },[fireBase, navigate])

    const handleSubmit = (e)=> {
        e.preventDefault()
    }



    return (
        <div>
            <div className='form'>
                <h1>Create Blog</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Title</Form.Label>
                        <Form.Control className='input' type="text" placeholder="Enter Title" />

                    </Form.Group>
                    <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Author Name</Form.Label>
                        <Form.Control className='input' type="text" placeholder="Author Name" />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Add Content</Form.Label>
                        <textarea cols='130' rows='10' className='textArea'></textarea>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Cover Pic</Form.Label>
                        <Form.Control className='input' type="file" />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Enter url for reference</Form.Label>
                        <Form.Control className='input' controlId="formBasicUrl" type="url" placeholder="url" />
                        <Form.Control className='input' type="url" />

                    </Form.Group>


                    <Button variant="success" type="submit">
                        Create Blog
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Createblog
