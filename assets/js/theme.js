/* ============================================================
   theme.js
   Theme Manager
============================================================ */

"use strict";

class ThemeManager {

    constructor() {

        this.storageKey = "svm-theme";

        this.root = document.documentElement;

        this.button = document.querySelector("#theme-toggle");

        this.init();

    }

    init() {

        const saved = localStorage.getItem(this.storageKey);

        if (saved) {

            this.setTheme(saved);

        } else {

            this.detectSystemTheme();

        }

        this.bindEvents();

    }

    detectSystemTheme() {

        const dark = window.matchMedia(

            "(prefers-color-scheme: dark)"

        ).matches;

        this.setTheme(dark ? "dark" : "light");

    }

    bindEvents() {

        if (!this.button) return;

        this.button.addEventListener(

            "click",

            () => this.toggle()

        );

    }

    toggle() {

        const current =

            this.root.getAttribute("data-theme");

        this.setTheme(

            current === "dark"

            ? "light"

            : "dark"

        );

    }

    setTheme(theme) {

        this.root.setAttribute(

            "data-theme",

            theme

        );

        localStorage.setItem(

            this.storageKey,

            theme

        );

        this.updateButton(theme);

    }

    updateButton(theme) {

        if (!this.button) return;

        this.button.innerHTML =

            theme === "dark"

            ? '<i class="bi bi-sun-fill"></i>'

            : '<i class="bi bi-moon-stars-fill"></i>';

    }

}

document.addEventListener(

    "DOMContentLoaded",

    () => new ThemeManager()

);
/* ============================================================
   theme.js - Part 2
============================================================ */

/* ===========================================
   SYSTEM THEME LISTENER
=========================================== */

const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

mediaQuery.addEventListener("change", (event) => {

    if (localStorage.getItem("svm-theme")) return;

    document.documentElement.setAttribute(
        "data-theme",
        event.matches ? "dark" : "light"
    );

});


/* ===========================================
   SMOOTH THEME TRANSITION
=========================================== */

function enableThemeTransition() {

    document.documentElement.classList.add("theme-transition");

    clearTimeout(enableThemeTransition.timer);

    enableThemeTransition.timer = setTimeout(() => {

        document.documentElement.classList.remove("theme-transition");

    }, 400);

}

document.addEventListener("click", e => {

    if (e.target.closest("#theme-toggle")) {

        enableThemeTransition();

    }

});


/* ===========================================
   THEME EVENTS
=========================================== */

document.addEventListener("theme:change", e => {

    console.log(
        `Theme Changed → ${e.detail.theme}`
    );

});


/* ===========================================
   OVERRIDE SET THEME
=========================================== */

const originalSetTheme =
ThemeManager.prototype.setTheme;

ThemeManager.prototype.setTheme = function(theme){

    originalSetTheme.call(this, theme);

    document.dispatchEvent(

        new CustomEvent(

            "theme:change",

            {

                detail:{

                    theme

                }

            }

        )

    );

};


/* ===========================================
   OPTIONAL ACCENT COLOR
=========================================== */

function setAccent(color){

    document.documentElement

    .style

    .setProperty(

        "--svm-orange",

        color

    );

    localStorage.setItem(

        "accent-color",

        color

    );

}

const savedAccent=

localStorage.getItem(

"accent-color"

);

if(savedAccent){

setAccent(savedAccent);

}


/* ===========================================
   RESET THEME
=========================================== */

function resetTheme(){

localStorage.removeItem(

"svm-theme"

);

localStorage.removeItem(

"accent-color"

);

location.reload();

}


/* ===========================================
   EXPORT
=========================================== */

window.Theme={

setAccent,

resetTheme

};