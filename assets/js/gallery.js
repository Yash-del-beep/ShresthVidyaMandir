/* ============================================================
   gallery.js
   Premium Gallery System
============================================================ */

"use strict";

class Gallery {

    constructor() {

        this.items = [...document.querySelectorAll(".gallery-card")];

        this.lightbox = document.querySelector("#gallery-lightbox");

        this.image = this.lightbox?.querySelector("img");

        this.caption = this.lightbox?.querySelector(".caption");

        this.current = 0;

        this.init();

    }

    init() {

        if (!this.items.length || !this.lightbox) return;

        this.items.forEach((item, index) => {

            item.addEventListener("click", () => {

                this.open(index);

            });

        });

        this.bind();

    }

    bind() {

        document.addEventListener("keydown", e => {

            if (!this.lightbox.classList.contains("show")) return;

            if (e.key === "Escape") this.close();

            if (e.key === "ArrowRight") this.next();

            if (e.key === "ArrowLeft") this.prev();

        });

        this.lightbox.addEventListener("click", e => {

            if (e.target === this.lightbox)

                this.close();

        });

    }

    open(index) {

        this.current = index;

        this.update();

        this.lightbox.classList.add("show");

        document.body.style.overflow = "hidden";

    }

    close() {

        this.lightbox.classList.remove("show");

        document.body.style.overflow = "";

    }

    next() {

        this.current++;

        if (this.current >= this.items.length)

            this.current = 0;

        this.update();

    }

    prev() {

        this.current--;

        if (this.current < 0)

            this.current = this.items.length - 1;

        this.update();

    }

    update() {

        const img = this.items[this.current].querySelector("img");

        this.image.src = img.src;

        this.image.alt = img.alt;

        if (this.caption)

            this.caption.textContent =

            img.alt || "";

    }

}

document.addEventListener(

"DOMContentLoaded",

()=>{

window.gallery =

new Gallery();

});
/* ============================================================
   gallery.js - Part 2
============================================================ */

/* ===========================================
   CATEGORY FILTER
=========================================== */

const filterButtons = document.querySelectorAll(".gallery-filter button");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const category = button.dataset.filter;

        gallery.items.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {

                card.style.display = "";
                requestAnimationFrame(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                });

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.9)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 250);

            }

        });

    });

});


/* ===========================================
   SWIPE SUPPORT
=========================================== */

let startX = 0;

gallery.image.addEventListener("touchstart", e => {

    startX = e.changedTouches[0].clientX;

});

gallery.image.addEventListener("touchend", e => {

    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 60)
        gallery.next();

    if (endX - startX > 60)
        gallery.prev();

});


/* ===========================================
   MOUSE WHEEL
=========================================== */

gallery.lightbox.addEventListener("wheel", e => {

    e.preventDefault();

    if (e.deltaY > 0)
        gallery.next();
    else
        gallery.prev();

});


/* ===========================================
   DOWNLOAD IMAGE
=========================================== */

const downloadBtn =
document.querySelector("#gallery-download");

if(downloadBtn){

downloadBtn.addEventListener("click",()=>{

const img=gallery.image;

const link=document.createElement("a");

link.href=img.src;

link.download=img.alt||"image";

link.click();

});

}


/* ===========================================
   FULLSCREEN
=========================================== */

const fullscreenBtn=
document.querySelector("#gallery-fullscreen");

if(fullscreenBtn){

fullscreenBtn.addEventListener("click",()=>{

const img=gallery.image;

if(img.requestFullscreen){

img.requestFullscreen();

}

});

}


/* ===========================================
   CLOSE BUTTON
=========================================== */

const closeBtn=
document.querySelector("#gallery-close");

closeBtn?.addEventListener(

"click",

()=>gallery.close()

);


/* ===========================================
   NEXT / PREVIOUS BUTTONS
=========================================== */

document
.querySelector("#gallery-next")
?.addEventListener(

"click",

()=>gallery.next()

);

document
.querySelector("#gallery-prev")
?.addEventListener(

"click",

()=>gallery.prev()

);


/* ===========================================
   PRELOAD IMAGES
=========================================== */

gallery.items.forEach(card=>{

const img=card.querySelector("img");

const preload=new Image();

preload.src=img.src;

});