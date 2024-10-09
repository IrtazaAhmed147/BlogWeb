import React, { useState } from 'react'
import './Component.css'
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import defaultImg from '../image/default.png'

import Loader from './Loader';

const Createblog = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [coverPic, setCoverPic] = useState(null)
    const [firstUrl, setFirstUrl] = useState('')
    const [secUrl, setSecUrl] = useState('')
    const [loader, setLoader] = useState(false)
    const [detailErr, setDetailErr] = useState(false)


    const fireBase = useFirebase()
    const navigate = useNavigate()






    let date = Date.now()
    let currentDate = new Date(date);

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    const createdDate = `${day}/${month}/${year}`



    const handleSubmit = async (e) => {
        // If coverPic is not a File object, you need to handle the image upload differently.




        e.preventDefault();

        // Start the loader
        setLoader(true);

        try {
            if (!content.trim()) {
                setDetailErr(true);
                setLoader(false);
            }
            else {



                // Handle cover pic
                let coverImage = coverPic;
                if (!coverImage) {

                    // Fetch default image if no cover pic provided
                    const response = await fetch(defaultImg);
                    const blob = await response.blob();
                    coverImage = new File([blob], 'default.png', { type: 'image/png' });
                }

                // Call Firebase function to create blog
                await fireBase.createBlog(title, author, content, coverImage, firstUrl, secUrl, createdDate);
                alert('Blog Created');
                navigate('/')

            }
        } catch (error) {
            console.error('Error creating blog:', error);
        } finally {
            // Reset loader and any other state
            setLoader(false);
        }


    }




    if (!fireBase.isLoggedIn) return <h1>Please Login</h1>

    return (
        <div>
            <div className='form'>
                <h1>Create Blog</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-0" >
                        <Form.Label className='mb-0' >Title</Form.Label>
                        <Form.Control required className='input' onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />

                    </Form.Group>
                    <Form.Group className="mb-2 mt-2" >
                        <Form.Label className='mb-0'>Author Name (optional)</Form.Label>
                        <Form.Control className='input' onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author Name" />

                    </Form.Group>

                    <Form.Group className="mb-0" >
                        <Form.Label>Add Content</Form.Label>
                        <textarea rows='10' onChange={(e) => setContent(e.target.value)} className='textArea'></textarea>
                    </Form.Group>

                    {detailErr && <p className='text-danger '>This field is required</p>}

                    <Form.Group className="mb-3 mt-3" >
                        <Form.Label>Cover Pic (optional)</Form.Label>
                        <Form.Control className='input' onChange={(e) => setCoverPic(e.target.files[0])} type="file" />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Links (optional)</Form.Label>
                        <Form.Control className='input' onChange={(e) => setFirstUrl(e.target.value)} type="url" placeholder="url" />
                        <Form.Control className='input' onChange={(e) => setSecUrl(e.target.value)} type="url" />

                    </Form.Group>

                    <Button variant="success" type="submit">
                        {loader ? 'creating...' : 'Create Blog'}
                    </Button>

                </Form>

            </div>

            {loader && <div className='popUp'>
                <Loader />
            </div>}

        </div>



    )
}

export default Createblog
