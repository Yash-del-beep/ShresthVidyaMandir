/* ============================================================
   particles.js
   Hero Background Particles
============================================================ */

"use strict";

class Particle {

    constructor(canvas){

        this.canvas=canvas;
        this.ctx=canvas.getContext("2d");

        this.reset();

    }

    reset(){

        this.x=Math.random()*this.canvas.width;

        this.y=Math.random()*this.canvas.height;

        this.radius=Math.random()*3+1;

        this.speedX=(Math.random()-0.5)*0.5;

        this.speedY=(Math.random()-0.5)*0.5;

        this.opacity=Math.random()*0.5+0.2;

    }

    update(){

        this.x+=this.speedX;

        this.y+=this.speedY;

        if(this.x<0||this.x>this.canvas.width){

            this.speedX*=-1;

        }

        if(this.y<0||this.y>this.canvas.height){

            this.speedY*=-1;

        }

    }

    draw(){

        this.ctx.beginPath();

        this.ctx.arc(

            this.x,

            this.y,

            this.radius,

            0,

            Math.PI*2

        );

        this.ctx.fillStyle=

        `rgba(255,255,255,${this.opacity})`;

        this.ctx.fill();

    }

}

class ParticleEngine{

    constructor(selector="#particle-canvas"){

        this.canvas=document.querySelector(selector);

        if(!this.canvas) return;

        this.ctx=this.canvas.getContext("2d");

        this.particles=[];

        this.resize();

        window.addEventListener(

            "resize",

            ()=>this.resize()

        );

        this.create();

        this.animate();

    }

    resize(){

        this.canvas.width=window.innerWidth;

        this.canvas.height=window.innerHeight;

    }

    create(){

        this.particles=[];

        const count=

        Math.min(

            120,

            Math.floor(window.innerWidth/15)

        );

        for(let i=0;i<count;i++){

            this.particles.push(

                new Particle(this.canvas)

            );

        }

    }

    animate(){

        this.ctx.clearRect(

            0,

            0,

            this.canvas.width,

            this.canvas.height

        );

        this.particles.forEach(p=>{

            p.update();

            p.draw();

        });

        requestAnimationFrame(

            ()=>this.animate()

        );

    }

}

document.addEventListener(
    "DOMContentLoaded",
    ()=>{
        window.__particleEngine__ = new ParticleEngine();
    }
);
/* ============================================================
   particles.js - Part 2
============================================================ */

/* ===========================================
   MOUSE
=========================================== */

ParticleEngine.prototype.mouse = {

x:null,

y:null,

radius:140

};

window.addEventListener("mousemove",e=>{

const engine=window.__particleEngine__;

if(!engine) return;

engine.mouse.x=e.clientX;

engine.mouse.y=e.clientY;

});

window.addEventListener("mouseleave",()=>{

const engine=window.__particleEngine__;

if(!engine) return;

engine.mouse.x=null;

engine.mouse.y=null;

});


/* ===========================================
   CONNECT PARTICLES
=========================================== */

ParticleEngine.prototype.connect=function(){

for(let a=0;a<this.particles.length;a++){

for(let b=a+1;b<this.particles.length;b++){

const dx=

this.particles[a].x-

this.particles[b].x;

const dy=

this.particles[a].y-

this.particles[b].y;

const distance=

Math.sqrt(dx*dx+dy*dy);

if(distance<130){

this.ctx.beginPath();

this.ctx.moveTo(

this.particles[a].x,

this.particles[a].y

);

this.ctx.lineTo(

this.particles[b].x,

this.particles[b].y

);

this.ctx.strokeStyle=

`rgba(255,255,255,${
0.12-(distance/1300)
})`;

this.ctx.lineWidth=1;

this.ctx.stroke();

}

}

}

};


/* ===========================================
   MOUSE REPULSION
=========================================== */

ParticleEngine.prototype.mouseEffect=function(){

if(this.mouse.x===null) return;

this.particles.forEach(p=>{

const dx=

this.mouse.x-p.x;

const dy=

this.mouse.y-p.y;

const dist=

Math.sqrt(dx*dx+dy*dy);

if(dist<this.mouse.radius){

const angle=

Math.atan2(dy,dx);

p.x-=Math.cos(angle)*1.5;

p.y-=Math.sin(angle)*1.5;

}

});

};


/* ===========================================
   OVERRIDE ANIMATION
=========================================== */

const oldAnimate=

ParticleEngine.prototype.animate;

ParticleEngine.prototype.animate=function(){

this.ctx.clearRect(

0,

0,

this.canvas.width,

this.canvas.height

);

this.mouseEffect();

this.particles.forEach(p=>{

p.update();

p.draw();

});

this.connect();

requestAnimationFrame(

()=>this.animate()

);

};


/* ===========================================
   MOBILE OPTIMIZATION
=========================================== */

ParticleEngine.prototype.create=function(){

this.particles=[];

const count=

window.innerWidth<768

?35

:90;

for(

let i=0;

i<count;

i++

){

this.particles.push(

new Particle(this.canvas)

);

}

};


/* ===========================================
   INIT
=========================================== */

document.addEventListener(

"DOMContentLoaded",

()=>{

window.__particleEngine__=

new ParticleEngine();

}

);