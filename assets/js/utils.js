/* ============================================================
   utils.js
   Reusable Utility Functions
============================================================ */

"use strict";

/* ===========================================
   SELECTORS
=========================================== */

const $ = (selector, parent = document) =>
parent.querySelector(selector);

const $$ = (selector, parent = document) =>
[...parent.querySelectorAll(selector)];


/* ===========================================
   DEBOUNCE
=========================================== */

function debounce(fn, delay = 300){

let timer;

return (...args)=>{

clearTimeout(timer);

timer=setTimeout(()=>{

fn.apply(this,args);

},delay);

};

}


/* ===========================================
   THROTTLE
=========================================== */

function throttle(fn, limit=200){

let waiting=false;

return(...args)=>{

if(waiting) return;

fn.apply(this,args);

waiting=true;

setTimeout(()=>{

waiting=false;

},limit);

};

}


/* ===========================================
   SMOOTH SCROLL
=========================================== */

function smoothScroll(target){

const element=

typeof target==="string"

? document.querySelector(target)

: target;

if(!element) return;

element.scrollIntoView({

behavior:"smooth",

block:"start"

});

}


/* ===========================================
   COPY TO CLIPBOARD
=========================================== */

async function copyText(text){

try{

await navigator.clipboard.writeText(text);

showToast("Copied Successfully");

}catch{

showToast("Copy Failed","error");

}

}


/* ===========================================
   RANDOM ID
=========================================== */

function randomID(length=10){

const chars=

"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let id="";

for(let i=0;i<length;i++){

id+=chars.charAt(

Math.floor(Math.random()*chars.length)

);

}

return id;

}


/* ===========================================
   UUID
=========================================== */

function uuid(){

return crypto.randomUUID();

}


/* ===========================================
   LOCAL STORAGE
=========================================== */

const storage={

set(key,value){

localStorage.setItem(

key,

JSON.stringify(value)

);

},

get(key){

const item=

localStorage.getItem(key);

return item

? JSON.parse(item)

:null;

},

remove(key){

localStorage.removeItem(key);

},

clear(){

localStorage.clear();

}

};


/* ===========================================
   FORMAT NUMBER
=========================================== */

function formatNumber(number){

return new Intl.NumberFormat(

"en-IN"

).format(number);

}


/* ===========================================
   FORMAT DATE
=========================================== */

function formatDate(date){

return new Intl.DateTimeFormat(

"en-IN",{

day:"2-digit",

month:"long",

year:"numeric"

}

).format(new Date(date));

}
/* ============================================================
   utils.js - Part 2
============================================================ */

/* ===========================================
   TOAST NOTIFICATION
=========================================== */

function showToast(message, type = "success", duration = 3000) {

    let container = document.querySelector(".toast-container");

    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    toast.innerHTML = `
        <span>${message}</span>
        <button>&times;</button>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    toast.querySelector("button").onclick = () => removeToast(toast);

    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

function removeToast(toast){

    toast.classList.remove("show");

    setTimeout(()=>{

        toast.remove();

    },300);

}


/* ===========================================
   LOADING OVERLAY
=========================================== */

function showLoading(){

    let loading=document.querySelector("#loading-overlay");

    if(!loading){

        loading=document.createElement("div");

        loading.id="loading-overlay";

        loading.innerHTML=`
            <div class="spinner"></div>
        `;

        document.body.appendChild(loading);

    }

    loading.classList.add("show");

}

function hideLoading(){

    const loading=document.querySelector("#loading-overlay");

    if(loading){

        loading.classList.remove("show");

    }

}


/* ===========================================
   FETCH WRAPPER
=========================================== */

async function fetchJSON(url,options={}){

    try{

        showLoading();

        const response=await fetch(url,options);

        if(!response.ok){

            throw new Error(response.statusText);

        }

        return await response.json();

    }

    catch(error){

        console.error(error);

        showToast(error.message,"error");

        return null;

    }

    finally{

        hideLoading();

    }

}


/* ===========================================
   LAZY IMAGE LOADER
=========================================== */

const lazyImages=document.querySelectorAll("img[data-src]");

if(lazyImages.length){

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const img=entry.target;

img.src=img.dataset.src;

img.removeAttribute("data-src");

observer.unobserve(img);

});

});

lazyImages.forEach(img=>observer.observe(img));

}


/* ===========================================
   SCROLL SPY
=========================================== */

const sections=document.querySelectorAll("section[id]");

if(sections.length){

const spy=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const id=entry.target.id;

document.querySelectorAll(".nav-links a").forEach(link=>{

link.classList.toggle(

"active",

link.getAttribute("href")==="#" + id

);

});

});

},{threshold:.5});

sections.forEach(section=>spy.observe(section));

}


/* ===========================================
   DOM READY
=========================================== */

function ready(callback){

if(document.readyState!=="loading"){

callback();

}else{

document.addEventListener("DOMContentLoaded",callback);

}

}


/* ===========================================
   DEVICE CHECK
=========================================== */

const device={

mobile:()=>window.innerWidth<768,

tablet:()=>window.innerWidth>=768&&window.innerWidth<1024,

desktop:()=>window.innerWidth>=1024,

touch:()=>"ontouchstart" in window

};


/* ===========================================
   EXPORT
=========================================== */

window.Utils={

$,
$$,
debounce,
throttle,
smoothScroll,
copyText,
randomID,
uuid,
storage,
formatNumber,
formatDate,
showToast,
showLoading,
hideLoading,
fetchJSON,
ready,
device

};