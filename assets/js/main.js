// ===============================
// LOADER
// ===============================

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if(loader){

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},500);

}

document.body.classList.add("loaded");

});


// ===============================
// STICKY NAVBAR
// ===============================

const navbar=document.getElementById("navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

navbar.classList.add("scrolled");

}else{

navbar.classList.remove("scrolled");

}

});


// ===============================
// SCROLL PROGRESS
// ===============================

const progress=document.getElementById("scroll-progress");

window.addEventListener("scroll",()=>{

const total=

document.documentElement.scrollHeight-

window.innerHeight;

const value=

(window.scrollY/total)*100;

if(progress){

progress.style.width=value+"%";

}

});


// ===============================
// BACK TO TOP
// ===============================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="back-top";

document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


// ===============================
// THEME TOGGLE
// ===============================

const toggle=document.getElementById("theme-toggle");

if(toggle){

toggle.onclick=()=>{

const html=document.documentElement;

const current=

html.getAttribute("data-theme");

const next=

current==="dark"

?

"light"

:

"dark";

html.setAttribute("data-theme",next);

localStorage.setItem("theme",next);

};

const saved=localStorage.getItem("theme");

if(saved){

document.documentElement

.setAttribute("data-theme",saved);

}

}


// ===============================
// AOS
// ===============================

if(typeof AOS!=="undefined"){

AOS.init({

duration:900,

once:true,

offset:100

});

}
// =======================================
// CUSTOM CURSOR
// =======================================

const cursor=document.getElementById("cursor");
const follower=document.getElementById("cursor-follower");

if(cursor && follower){

let mouseX=0;
let mouseY=0;

document.addEventListener("mousemove",(e)=>{

mouseX=e.clientX;
mouseY=e.clientY;

cursor.style.left=mouseX+"px";
cursor.style.top=mouseY+"px";

});

function animateCursor(){

const x=parseFloat(follower.style.left)||0;
const y=parseFloat(follower.style.top)||0;

follower.style.left=x+(mouseX-x)*0.15+"px";
follower.style.top=y+(mouseY-y)*0.15+"px";

requestAnimationFrame(animateCursor);

}

animateCursor();

document.querySelectorAll("a,button,.btn").forEach(el=>{

el.addEventListener("mouseenter",()=>{

cursor.classList.add("active");
follower.classList.add("active");

});

el.addEventListener("mouseleave",()=>{

cursor.classList.remove("active");
follower.classList.remove("active");

});

});

}


// =======================================
// MOUSE GLOW
// =======================================

const glow=document.getElementById("mouse-glow");

if(glow){

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";
glow.style.top=e.clientY+"px";

});

}


// =======================================
// RIPPLE EFFECT
// =======================================

document.querySelectorAll(".btn").forEach(btn=>{

btn.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

const rect=btn.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.className="ripple";

ripple.style.left=e.clientX-rect.left-size/2+"px";
ripple.style.top=e.clientY-rect.top-size/2+"px";

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});


// =======================================
// PARTICLE BACKGROUND
// =======================================

const canvas=document.getElementById("particle-canvas");

if(canvas){

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

const particles=[];

for(let i=0;i<70;i++){

particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height,

r:Math.random()*3+1,

dx:(Math.random()-0.5),

dy:(Math.random()-0.5)

});

}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{

ctx.beginPath();

ctx.arc(p.x,p.y,p.r,0,Math.PI*2);

ctx.fillStyle="rgba(255,255,255,.15)";

ctx.fill();

p.x+=p.dx;
p.y+=p.dy;

if(p.x<0||p.x>canvas.width)p.dx*=-1;
if(p.y<0||p.y>canvas.height)p.dy*=-1;

});

requestAnimationFrame(draw);

}

draw();

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});

}


// =======================================
// SMOOTH SCROLL
// =======================================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

const target=document.querySelector(link.getAttribute("href"));

if(target){

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

}

});

});
// =======================================
// MOBILE MENU
// =======================================

const menuBtn=document.querySelector(".menu-toggle");
const navLinks=document.querySelector(".nav-links");

if(menuBtn && navLinks){

menuBtn.addEventListener("click",()=>{

navLinks.classList.toggle("open");
menuBtn.classList.toggle("active");

});

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("open");
menuBtn.classList.remove("active");

});

});

}


// =======================================
// ACTIVE NAV LINK
// =======================================

const currentPage=location.pathname.split("/").pop();

document.querySelectorAll(".nav-links a").forEach(link=>{

const href=link.getAttribute("href");

if(href===currentPage){

link.classList.add("active");

}

});


// =======================================
// COUNTER ANIMATION
// =======================================

document.querySelectorAll(".stat-num,.stat-card h2").forEach(counter=>{

const target=parseInt(counter.innerText);

if(isNaN(target)) return;

let count=0;

const speed=Math.max(10,Math.floor(target/50));

const update=()=>{

count+=speed;

if(count>=target){

counter.innerText=target;

}else{

counter.innerText=count;

requestAnimationFrame(update);

}

};

update();

});


// =======================================
// FAQ ACCORDION
// =======================================

document.querySelectorAll(".faq-question").forEach(item=>{

item.addEventListener("click",()=>{

const parent=item.parentElement;

parent.classList.toggle("active");

});

});


// =======================================
// GALLERY LIGHTBOX
// =======================================

const lightbox=document.getElementById("gallery-lightbox");

if(lightbox){

const img=lightbox.querySelector("img");

document.querySelectorAll(".gallery-item img,.gallery-card img").forEach(image=>{

image.addEventListener("click",()=>{

img.src=image.src;

lightbox.classList.add("show");

});

});

lightbox.addEventListener("click",()=>{

lightbox.classList.remove("show");

});

}


// =======================================
// REVEAL ON SCROLL
// =======================================

const reveals=document.querySelectorAll(".reveal");

const revealObserver=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("active");

}

});

},{

threshold:.2

});

reveals.forEach(el=>{

revealObserver.observe(el);

});


// =======================================
// LAZY IMAGE LOADING
// =======================================

document.querySelectorAll("img").forEach(img=>{

img.loading="lazy";

});


// =======================================
// COPYRIGHT YEAR
// =======================================

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}


// =======================================
// CONSOLE MESSAGE
// =======================================

console.log(

"%cShreshtha Vidya Mandir Inter College",

"color:#4f46e5;font-size:18px;font-weight:bold;"

);

console.log(

"%cDeveloped with ❤️",

"color:#10b981;font-size:14px;"

);