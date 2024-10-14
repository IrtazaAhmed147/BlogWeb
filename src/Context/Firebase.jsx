import { initializeApp } from "firebase/app";
import React, { useContext, createContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAF6kO_1c0Wcs2Tv4vSHbRKUKZerVDFXZw",
    authDomain: "blogweb-147.firebaseapp.com",
    projectId: "blogweb-147",
    storageBucket: "blogweb-147.appspot.com",
    messagingSenderId: "186667260757",
    appId: "1:186667260757:web:185bf7dc4f6d0b5b216ddc"
};

const app = initializeApp(firebaseConfig);


// Auth
const fireBaseAuth = getAuth(app)

// firestore instance
const fireStore = getFirestore(app)

// storage instance
const storage = getStorage(app)

const Datacontext = createContext(null)
export const useFirebase = () => useContext(Datacontext)

export const Dataprovider = (props) => {


    const [myUser, setMyUser] = useState(null)
    const [editTask, setEditTask] = useState(null)

    // Create user
    const createUser = async (email, password, displayName) => {

        const userCredential = await createUserWithEmailAndPassword(fireBaseAuth, email, password);
        const user = userCredential.user

        await updateProfile(user, { displayName });

        

    }

    // Login user
    const loginUser = async (email, password) => {
        const res = await signInWithEmailAndPassword(fireBaseAuth, email, password)
        return res
    }

    useEffect(() => {
        onAuthStateChanged(fireBaseAuth, (user) => {
            if (user) {
                setMyUser(user)
               
            } else {
                setMyUser(null)
              
            }
        })

    }, [myUser])

    const isLoggedIn = myUser ? true : false
    


    

    // signout user

    const signOutUser = () => {
        signOut(fireBaseAuth)
    }

    // making collection


    const createBlog = async (title, author, content, coverPic, firstUrl, secUrl, createdDate) => {
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic}`)
        const uploadRes = await uploadBytes(imageRef, coverPic)
        return await addDoc(collection(fireStore, "Blog"), {
            title,
            author,
            content,
            image: uploadRes.ref.fullPath,
            firstUrl,
            secUrl,
            createdDate,
            views: 0,
            userId: myUser.uid,
            userEmail: myUser.email,
            userName: myUser.displayName,
        })

    }

    const getBlog = () => {
        return getDocs(collection(fireStore, 'Blog'))
    }

    const imageUrl = (path) => {
        return getDownloadURL(ref(storage, path))
    }

    const getBlogById = async (id) => {
        const docRef = doc(fireStore, 'Blog', id)
        const res = await getDoc(docRef)
        return res
    }

    const fetchMyBlogs = async (userId) => {
        const collectionRef = collection(fireStore, "Blog")
        const q = query(collectionRef, where('userId', '==', userId))
        const res = await getDocs(q)
        return res
    }

    // delete post

    const deletePost = async (id) => {
        const delRef = doc(fireStore, "Blog", id)
        const res = await deleteDoc(delRef)
        return res
    }


    // update views

    const update = async (id, title, author, content, firstUrl, secUrl,) => {
       
        const docRef = doc(fireStore, 'Blog', id)
        await updateDoc(docRef, {
            title,
            author,
            content,
            firstUrl,
            secUrl,
        })

    }

    // get views

    const getViews = async (id)=> {
        const docRef = doc(fireStore, 'Blog', id)
        const result = await getDoc(docRef);
        if (result.exists()) {
            return result.data().views; // Return the views count
        } else {
            throw new Error("No such document!");
        }
    }


    return (
        <Datacontext.Provider value={{
            createUser,
            loginUser,
            myUser,
            isLoggedIn,
            createBlog,
            getBlog,
            imageUrl,
            signOutUser,
            getBlogById,
            fetchMyBlogs,
            deletePost,
            update,
            getViews,
            editTask,
            setEditTask,
        
        }}>
            {props.children}
        </Datacontext.Provider>
    )
}
