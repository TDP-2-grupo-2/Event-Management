// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ref, uploadBytesResumable, getDownloadURL, getStorage, deleteObject } from "firebase/storage";
let md5 = require("md5");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAJCA06Lz2NlvRcfZIHjPIc0MfhLQT0Q2o",
    authDomain: "tdp2-ticketapp.firebaseapp.com",
    projectId: "tdp2-ticketapp",
    storageBucket: "tdp2-ticketapp.appspot.com",
    messagingSenderId: "584299102101",
    appId: "1:584299102101:web:fc5577d8ca33b16f0dc09c",
    measurementId: "G-WF572HC30P"
  };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(firebaseApp);


export const handleUploadFirebaseImage = async (name, image) => {
    const formatFile = '.'+name.split('.')[1];
    const firebaseFileName = md5(name+(new Date()))+formatFile;

    const storageRef = ref(firebaseStorage, `files/${firebaseFileName}`);
    await uploadBytesResumable(storageRef, image);

    return firebaseFileName; 
}

export const getFirebaseImage = async (name) => {
    return await getDownloadURL(ref(firebaseStorage, name));
}

export const deleteFirebaseImage = async (name) => {
    const fileRef = ref(firebaseStorage, name);
    try{
        await deleteObject(fileRef);
    }catch(error){
        throw new Error(error);
    }
}


export const uploadImageToStorageWithURI = async (name, path) => {

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
            resolve(xhr.response);
        };
        xhr.onerror = function(e) {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', path, true);
        xhr.send(null);
    });

    const formatFile = '.'+name.split('.')[1];
    const firebaseFileName = md5(name+(new Date()))+formatFile;

    const storageRef = ref(firebaseStorage, `files/${firebaseFileName}`);
    await uploadBytesResumable(storageRef, blob);

    blob.close();

    return firebaseFileName;
}