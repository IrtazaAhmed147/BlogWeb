import { initializeApp } from "firebase/app";
import React, { useContext, createContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";



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


const Datacontext = createContext(null)
export const useFirebase = () => useContext(Datacontext)



export const Dataprovider = (props) => {


    const [myUser, setMyUser] = useState(null)


    // Create user
    const createUser = (email, password) => {
        createUserWithEmailAndPassword(fireBaseAuth, email, password).then(alert("user Created")).catch((error) => console.log(error))
    }
    // Login user
    const loginUser = (email, password) => {
        signInWithEmailAndPassword(fireBaseAuth, email, password).then(alert("user logged in")).catch((error) => console.log(error))
    }
    useEffect(() => {
        onAuthStateChanged(fireBaseAuth, (user) => {
            if (user) {
                setMyUser(user)
                console.log('user is available')
            } else {
                setMyUser(null)
                console.log('user is not available')
            }
        })

    }, [myUser])

    const isLoggedIn = myUser ? true : false
    // making collection

    





    return (
        <Datacontext.Provider value={{ createUser, loginUser, myUser, isLoggedIn }}>
            {props.children}
        </Datacontext.Provider>
    )
}
