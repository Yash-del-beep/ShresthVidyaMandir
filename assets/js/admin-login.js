import { auth } from "./firebase.js";

import {

signInWithEmailAndPassword

}

from

"https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const form=document.getElementById("loginForm");

form.addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

const msg=document.getElementById("loginMessage");

try{

await signInWithEmailAndPassword(

auth,

email,

password

);

window.location.href="admin.html";

}

catch(error){

msg.innerHTML=error.message;

msg.style.color="red";

}

});