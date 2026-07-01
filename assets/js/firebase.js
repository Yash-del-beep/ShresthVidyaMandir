/* ============================================================
   firebase.js
   Firebase Configuration
============================================================ */

"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {

getFirestore,

collection,

addDoc,

getDocs,

doc,

updateDoc,

deleteDoc,

serverTimestamp

}

from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {

getStorage,

ref,

uploadBytes,

getDownloadURL

}

from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";

import {

getAuth,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";


/* ======================================
   FIREBASE CONFIG
====================================== */

const firebaseConfig={

apiKey:"YOUR_API_KEY",

authDomain:"YOUR_PROJECT.firebaseapp.com",

projectId:"YOUR_PROJECT_ID",

storageBucket:"YOUR_PROJECT.appspot.com",

messagingSenderId:"XXXXXXXX",

appId:"XXXXXXXX"

};


/* ======================================
   INITIALIZE
====================================== */

const app=initializeApp(firebaseConfig);

const db=getFirestore(app);

const storage=getStorage(app);

const auth=getAuth(app);


/* ======================================
   EXPORT
====================================== */

export{

db,

storage,

auth,

collection,

addDoc,

getDocs,

doc,

updateDoc,

deleteDoc,

serverTimestamp,

ref,

uploadBytes,

getDownloadURL,

signInWithEmailAndPassword,

signOut,

onAuthStateChanged

};
/* ============================================================
   firebase.js - CRUD
============================================================ */

import {
db,
storage,
collection,
addDoc,
getDocs,
doc,
updateDoc,
deleteDoc,
serverTimestamp,
ref,
uploadBytes,
getDownloadURL
} from "./firebase.js";

/* ===========================================
   CONTACT FORM
=========================================== */

export async function saveContact(data){

try{

await addDoc(

collection(db,"contacts"),

{

...data,

createdAt:serverTimestamp()

}

);

return true;

}catch(error){

console.error(error);

return false;

}

}


/* ===========================================
   ADMISSION FORM
=========================================== */

export async function saveAdmission(data){

try{

await addDoc(

collection(db,"admissions"),

{

...data,

status:"Pending",

createdAt:serverTimestamp()

}

);

return true;

}catch(error){

console.error(error);

return false;

}

}


/* ===========================================
   NOTICES
=========================================== */

export async function getNotices(){

const snapshot=

await getDocs(

collection(db,"notices")

);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}


/* ===========================================
   RESULTS
=========================================== */

export async function getResults(){

const snapshot=

await getDocs(

collection(db,"results")

);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}


/* ===========================================
   GALLERY
=========================================== */

export async function getGallery(){

const snapshot=

await getDocs(

collection(db,"gallery")

);

return snapshot.docs.map(doc=>({

id:doc.id,

...doc.data()

}));

}


/* ===========================================
   FILE UPLOAD
=========================================== */

export async function uploadFile(file,path){

const storageRef=

ref(

storage,

`${path}/${file.name}`

);

await uploadBytes(

storageRef,

file

);

return await getDownloadURL(

storageRef

);

}


/* ===========================================
   UPDATE DOCUMENT
=========================================== */

export async function updateItem(

collectionName,

id,

data

){

await updateDoc(

doc(

db,

collectionName,

id

),

data

);

}


/* ===========================================
   DELETE DOCUMENT
=========================================== */

export async function removeItem(

collectionName,

id

){

await deleteDoc(

doc(

db,

collectionName,

id

)

);

}