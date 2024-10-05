import { initializeApp } from "firebase/app";
import React, { useContext, createContext } from "react";
const firebaseConfig = {
    apiKey: "AIzaSyAF6kO_1c0Wcs2Tv4vSHbRKUKZerVDFXZw",
    authDomain: "blogweb-147.firebaseapp.com",
    projectId: "blogweb-147",
    storageBucket: "blogweb-147.appspot.com",
    messagingSenderId: "186667260757",
    appId: "1:186667260757:web:185bf7dc4f6d0b5b216ddc"
};

const app = initializeApp(firebaseConfig);

const Datacontext = createContext(null)
export const useFirebase = () => useContext(Datacontext)

export const Dataprovider = (props) => {
    return (
        <Datacontext.Provider>
            {props.children}
        </Datacontext.Provider>
    )
}
