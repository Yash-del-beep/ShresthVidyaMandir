/* ============================================================
   FIREBASE FULL SETUP + AUTH + DB + STORAGE (SINGLE FILE)
============================================================ */

"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

/* ================= AUTH ================= */
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

/* ================= FIRESTORE ================= */
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

/* ================= STORAGE ================= */
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

/* ============================================================
   FIREBASE CONFIG
============================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyCtuvKsWgayfyvshLzxMjzmnjYvvYI2Ams",
  authDomain: "shreshtha-vidya-mandir.firebaseapp.com",
  projectId: "shreshtha-vidya-mandir",
  storageBucket: "shreshtha-vidya-mandir.firebasestorage.app",
  messagingSenderId: "737785926258",
  appId: "1:737785926258:web:05c6674e432f3a4186e8eb"
};

/* ============================================================
   INIT
============================================================ */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* ============================================================
   AUTH FUNCTIONS
============================================================ */
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function authState(callback) {
  return onAuthStateChanged(auth, callback);
}

/* ============================================================
   CONTACT FORM
============================================================ */
export async function saveContact(data) {
  return addDoc(collection(db, "contacts"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

/* ============================================================
   ADMISSION FORM
============================================================ */
export async function saveAdmission(data) {
  return addDoc(collection(db, "admissions"), {
    ...data,
    status: "Pending",
    createdAt: serverTimestamp()
  });
}

/* ============================================================
   GET NOTICES
============================================================ */
export async function getNotices() {
  const snap = await getDocs(collection(db, "notices"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ============================================================
   GET RESULTS
============================================================ */
export async function getResults() {
  const snap = await getDocs(collection(db, "results"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ============================================================
   GET GALLERY
============================================================ */
export async function getGallery() {
  const snap = await getDocs(collection(db, "gallery"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/* ============================================================
   FILE UPLOAD
============================================================ */
export async function uploadFile(file, path) {
  const storageRef = ref(storage, `${path}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

/* ============================================================
   UPDATE DATA
============================================================ */
export function updateItem(collectionName, id, data) {
  return updateDoc(doc(db, collectionName, id), data);
}

/* ============================================================
   DELETE DATA
============================================================ */
export function removeItem(collectionName, id) {
  return deleteDoc(doc(db, collectionName, id));
}

/* ============================================================
   EXPORT CORE (optional use)
============================================================ */
export {
  auth,
  db,
  storage
};