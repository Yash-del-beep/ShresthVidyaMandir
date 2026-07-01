/* ============================================================
   counter.js
   Animated Counter
============================================================ */

"use strict";

class Counter {

    constructor(element){

        this.element=element;

        this.target=parseInt(

            element.dataset.count||0

        );

        this.duration=parseInt(

            element.dataset.duration||2000

        );

        this.current=0;

        this.started=false;

    }

    animate(){

        if(this.started) return;

        this.started=true;

        const start=performance.now();

        const step=(time)=>{

            const progress=Math.min(

                (time-start)/this.duration,

                1

            );

            const ease=

            1-Math.pow(

                1-progress,

                3

            );

            this.current=Math.floor(

                ease*this.target

            );

            this.element.textContent=

            this.current.toLocaleString();

            if(progress<1){

                requestAnimationFrame(step);

            }else{

                this.element.textContent=

                this.target.toLocaleString();

            }

        };

        requestAnimationFrame(step);

    }

}

/* ======================================
   INIT
====================================== */

const counters=[

...document.querySelectorAll(

".counter"

)

];

const observer=

new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)

return;

entry.target.counter.animate();

observer.unobserve(

entry.target

);

});

},{

threshold:.4

});

counters.forEach(el=>{

el.counter=new Counter(el);

observer.observe(el);

});
/* ======================================
   PREFIX / SUFFIX SUPPORT
====================================== */

Counter.prototype.render=function(value){

const prefix=

this.element.dataset.prefix||"";

const suffix=

this.element.dataset.suffix||"";

this.element.textContent=

`${prefix}${value.toLocaleString()}${suffix}`;

};

/* Override */

Counter.prototype.animate=function(){

if(this.started) return;

this.started=true;

const start=performance.now();

const animate=(time)=>{

const progress=Math.min(

(time-start)/this.duration,

1

);

const ease=

1-Math.pow(

1-progress,

3

);

const value=Math.floor(

ease*this.target

);

this.render(value);

if(progress<1){

requestAnimationFrame(animate);

}else{

this.render(this.target);

}

};

requestAnimationFrame(animate);

};

/* ======================================
   REFRESH
====================================== */

window.Counter={

refresh(){

document

.querySelectorAll(".counter")

.forEach(el=>{

if(!el.counter){

el.counter=new Counter(el);

observer.observe(el);

}

});

}

};