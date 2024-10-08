import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Component.css'
import { useFirebase } from '../Context/Firebase';
// import { useNavigate } from 'react-router-dom';
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
    const [loader, setLoader] = useState(false)
    const [detailErr, setDetailErr] = useState(false)


    const fireBase = useFirebase()



    let date = Date.now()
    let currentDate = new Date(date);

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();

    const createdDate = `${day}/${month}/${year}`



    const handleSubmit = async (e) => {
        // If coverPic is not a File object, you need to handle the image upload differently.
        e.preventDefault()
        setLoader(true)


        if (!content.trim()) {
            setDetailErr(true)
            setLoader(false)
        } else if (!author.trim()) {
            setAuthor('Anonymous')
            setDetailErr(false)
            setLoader(false)
        } else if (!coverPic) {
            setDetailErr(false)
            setLoader(true)

            setTitle(title.charAt(0).toUpperCase() + title.slice(1).toLowerCase())

            const response = await fetch(defaultImg);
            console.log(response)
            const blob = await response.blob();
            console.log(blob)
            const file = new File([blob], 'default.png', { type: 'image/png' });
            console.log(file)
            await fireBase.createBlog(title, author, content, file, firstUrl, secUrl, createdDate).then(() => {
                alert('Blog Created')
                setLoader(false)
            });
        } else {
            setDetailErr(false)
            setLoader(true)
            await fireBase.createBlog(title, author, content, coverPic, firstUrl, secUrl, createdDate).then(() => {
                alert('Blog Created')
                setLoader(false)
            });

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
                        <Form.Control disabled={loader} required className='input' onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />

                    </Form.Group>
                    <Form.Group className="mb-2 mt-2" >
                        <Form.Label className='mb-0'>Author Name (optional)</Form.Label>
                        <Form.Control disabled={loader} className='input' onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author Name" />

                    </Form.Group>

                    <Form.Group className="mb-0" >
                        <Form.Label>Add Content</Form.Label>
                        <textarea disabled={loader} rows='10' onChange={(e) => setContent(e.target.value)} className='textArea'></textarea>
                    </Form.Group>
                    {detailErr && <p className='text-danger '>This field is required</p>}
                    <Form.Group className="mb-3 mt-3" >
                        <Form.Label>Cover Pic (optional)</Form.Label>
                        <Form.Control disabled={loader} className='input' onChange={(e) => setCoverPic(e.target.files[0])} type="file" />

                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Enter url for reference (optional)</Form.Label>
                        <Form.Control disabled={loader} className='input' onChange={(e) => setFirstUrl(e.target.value)} type="url" placeholder="url" />
                        <Form.Control disabled={loader} className='input' onChange={(e) => setSecUrl(e.target.value)} type="url" />

                    </Form.Group>

                    


                    <Button variant="success" type="submit">
                       {loader ? 'creating...': 'Create Blog'} 
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default Createblog
