import React, { useEffect, useState } from 'react'
import poster from '../image/poster.jpg'
import './Pages.css';
import { useFirebase } from '../Context/Firebase';
// import { useNavigate } from 'react-router-dom';
import Card from '../Component/Card';
import Loader from '../Component/Loader';

const Home = () => {
    const fireBase = useFirebase()
    // const navigate = useNavigate()
    const [blog, setBlog] = useState([])
    const [loader, setLoader] = useState(true)




    useEffect(() => {

        const fetchBlogs = async () => {
            try {
                const blogsData = await fireBase.getBlog(); // Assuming this returns a querySnapshot
                const sortedBlogs = blogsData.docs.sort((latestDate, date) => {
                    return new Date(date.data().createdDate) - new Date(latestDate.data().createdDate);
                });
                setBlog(sortedBlogs);
            } catch (error) {
                console.log("Error fetching blogs:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchBlogs();
    }, [fireBase])

    console.log(blog.docs)


    return (
        <>

            <div className='posterBox'>

                <div style={{ backgroundImage: `url(${poster})`, }} className='poster'>

                </div>
                <div className='color'></div>
                <div className='content'>
                    <h1 >BlogVerse</h1>
                    <p>Where ideas come to life and stories unfold. Explore, engage, and embrace the art of blogging!</p>
                </div>
            </div>

            <h1 className='ms-3 mt-3'>Blogs</h1>


            <div className='CardMain'>

                {loader && <Loader />}
                {blog.map((element) => (
                    <Card key={element.id} link={`/blog/view/${element.id}`} id={element.id} {...element.data()} />
                ))}

            </div>
        </>
    )
}

export default Home
