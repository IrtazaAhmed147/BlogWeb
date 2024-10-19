import React, { useEffect, useState } from 'react'
import './Component.css'
import { useNavigate, useParams } from 'react-router-dom';
import { useFirebase } from '../Context/Firebase';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import defaultImg from '../image/default.png'

import Loader from './Loader';

const Edit = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    // const [coverPic, setCoverPic] = useState(null)
    const [firstUrl, setFirstUrl] = useState('')
    const [secUrl, setSecUrl] = useState('')
    const [loader, setLoader] = useState(false)
    const [detailErr, setDetailErr] = useState(false)
    // const [editContent, setEditContent] = useState(null)

    const fireBase = useFirebase()
    const navigate = useNavigate()
    const param = useParams()

    const [data, setData] = useState(null)
   
    useEffect(() => {
        const fetchData = async () => {
            const value = await fireBase.getBlogById(param.blogId);
            setData(value.data());
        };

        fetchData();
    }, [fireBase, param.blogId]);

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setContent(data.content);
            setAuthor(data.author);
            setFirstUrl(data.firstUrl);
            setSecUrl(data.secUrl);
            // setCoverPic(data.image);
        }
    }, [data]);





    const handleEdit = async (e) => {
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

                // let coverImage = coverPic;
                // if (!coverImage) {

                //     // Fetch default image if no cover pic provided
                //     const response = await fetch(defaultImg);
                //     const blob = await response.blob();
                //     coverImage = new File([blob], 'default.png', { type: 'image/png' });
                // }

                // Call Firebase function to create blog
                await fireBase.update(param.blogId, title, author, content, firstUrl, secUrl);
                alert('Blog Edited');
                navigate('/profile')

            }
        } catch (error) {
            console.error('Error creating blog:', error);
        } finally {
            // Reset loader and any other state
            setLoader(false);
        }


    }




    if (!data) return <h1>Loading</h1>

    return (
        <div>
            <div className='form'>
                        <Button variant="light" style={{marginBottom: '15px'}} onClick={()=> navigate('/profile')}>
                        <i className="fa-solid fa-left-long"></i>
                        </Button>
                <h1>Edit Blog</h1>

                <Form onSubmit={handleEdit}>
                    <Form.Group className="mb-0" >
                        <Form.Label className='mb-0' >Title</Form.Label>
                        <Form.Control required value={title} className='input' onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter Title" />

                    </Form.Group>
                    <Form.Group className="mb-2 mt-2" >
                        <Form.Label className='mb-0'>Author Name (optional)</Form.Label>
                        <Form.Control className='input' value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author Name" />

                    </Form.Group>

                    <Form.Group className="mb-0" >
                        <Form.Label>Add Content</Form.Label>
                        <textarea rows='10' value={content} onChange={(e) => setContent(e.target.value)} className='textArea'></textarea>
                    </Form.Group>

                    {detailErr && <p className='text-danger '>This field is required</p>}

                    {/* <Form.Group className="mb-3 mt-3" >
                        <Form.Label>Cover Pic (optional)</Form.Label>
                        <Form.Control className='input' onChange={(e) => setCoverPic(e.target.files[0])} type="file" />

                    </Form.Group> */}

                    <Form.Group className="mb-3" >
                        <Form.Label>Links (optional)</Form.Label>
                        <Form.Control className='input' value={firstUrl} onChange={(e) => setFirstUrl(e.target.value)} type="url" placeholder="url" />
                        <Form.Control className='input' value={secUrl} onChange={(e) => setSecUrl(e.target.value)} type="url" />

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Edit Blog
                    </Button>

                </Form>

            </div>

            {loader && <div className='popUp'>
                <Loader />
            </div>}

        </div>

    )
}

export default Edit
