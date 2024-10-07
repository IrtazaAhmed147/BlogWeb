import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Component.css'
import { useFirebase } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';
// import default from '../' 
// import default from 
import defaultImg from '../image/default.png'

const Createblog = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [coverPic, setCoverPic] = useState(null)
    const [firstUrl, setFirstUrl] = useState('')
    const [secUrl, setSecUrl] = useState('')

    const fireBase = useFirebase()
    const navigate = useNavigate()

    useEffect(() => {
        if (fireBase.isLoggedIn) {
            navigate('/createblog')
        } else {
            navigate('/login')
        }

        // console.log(coverPic)
    }, [fireBase, navigate])


    let date = Date.now()
    let currentDate = new Date(date);

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    const createdDate = `${day}/${month}/${year}`



    // console.log(coverPic)
    const handleSubmit = async (e) => {
        e.preventDefault()
        // const imageToUpload = coverPic ? coverPic : defaultImg;

        // If coverPic is not a File object, you need to handle the image upload differently.
        if (!coverPic) {
            const response = await fetch(defaultImg);
            console.log(response)
            const blob = await response.blob();
            console.log(blob)
            const file = new File([blob], 'default.png', { type: 'image/png' });
            console.log(file)
            await fireBase.createBlog(title, author, content, file, firstUrl, secUrl, createdDate);
        } else {
            await fireBase.createBlog(title, author, content, coverPic, firstUrl, secUrl, createdDate);
        }

    }
    // console.log(coverPic)
    




    return (
        <div>
            <div className='form'>
                <h1>Create Blog</h1>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" >
                        <Form.Label className='mb-0' >Title</Form.Label>
                        <Form.Control className='input' onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />

                    </Form.Group>
                    <Form.Group className="mb-2" >
                        <Form.Label className='mb-0'>Author Name</Form.Label>
                        <Form.Control className='input' onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author Name" />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Add Content</Form.Label>
                        <textarea  rows='10' onChange={(e) => setContent(e.target.value)} className='textArea'></textarea>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Cover Pic</Form.Label>
                        <Form.Control className='input' onChange={(e) => setCoverPic(e.target.files[0])} type="file" />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Enter url for reference</Form.Label>
                        <Form.Control className='input' onChange={(e) => setFirstUrl(e.target.value)} type="url" placeholder="url" />
                        <Form.Control className='input' onChange={(e) => setSecUrl(e.target.value)} type="url" />

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
