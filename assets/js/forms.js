/* ============================================================
   forms.js
   Form Validation & Submission
============================================================ */

"use strict";

class FormValidator {

    constructor(form){

        this.form=form;

        this.fields=[...form.querySelectorAll(

            "input, textarea, select"

        )];

        this.init();

    }

    init(){

        this.fields.forEach(field=>{

            field.addEventListener(

                "blur",

                ()=>this.validateField(field)

            );

            field.addEventListener(

                "input",

                ()=>this.clearError(field)

            );

        });

        this.form.addEventListener(

            "submit",

            e=>this.submit(e)

        );

    }

    validateField(field){

        const value=field.value.trim();

        const type=field.type;

        const required=field.required;

        if(required && !value){

            return this.error(

                field,

                "This field is required."

            );

        }

        if(type==="email"){

            const regex=

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(value && !regex.test(value)){

                return this.error(

                    field,

                    "Invalid Email Address"

                );

            }

        }

        if(type==="tel"){

            const phone=

            /^[6-9]\d{9}$/;

            if(value && !phone.test(value)){

                return this.error(

                    field,

                    "Invalid Mobile Number"

                );

            }

        }

        this.success(field);

        return true;

    }

    error(field,message){

        field.classList.add("error");

        field.classList.remove("success");

        let small=

        field.parentNode.querySelector(".error-text");

        if(!small){

            small=document.createElement("small");

            small.className="error-text";

            field.parentNode.appendChild(small);

        }

        small.textContent=message;

        return false;

    }

    success(field){

        field.classList.remove("error");

        field.classList.add("success");

        const small=

        field.parentNode.querySelector(".error-text");

        if(small) small.remove();

    }

    clearError(field){

        field.classList.remove("error");

        const small=

        field.parentNode.querySelector(".error-text");

        if(small) small.remove();

    }

    validate(){

        let valid=true;

        this.fields.forEach(field=>{

            if(!this.validateField(field))

            valid=false;

        });

        return valid;

    }

    async submit(e){

        e.preventDefault();

        if(!this.validate()) return;

        this.form.classList.add("loading");

        setTimeout(()=>{

            this.form.classList.remove("loading");

            Utils.showToast(

                "Form Submitted Successfully"

            );

            this.form.reset();

        },1500);

    }

}

document.addEventListener(

"DOMContentLoaded",

()=>{

document

.querySelectorAll("form")

.forEach(form=>{

new FormValidator(form);

});

});
/* ===========================================
   FILE VALIDATION
=========================================== */

document

.querySelectorAll(

'input[type="file"]'

)

.forEach(input=>{

input.addEventListener(

"change",

()=>{

const file=input.files[0];

if(!file) return;

const maxSize=

5*1024*1024;

if(file.size>maxSize){

Utils.showToast(

"Maximum file size is 5MB",

"error"

);

input.value="";

return;

}

}

);

});

/* ===========================================
   LOADING BUTTON
=========================================== */

function loadingButton(btn,state){

if(state){

btn.disabled=true;

btn.dataset.text=btn.innerHTML;

btn.innerHTML=`

<span class="spinner"></span>

Please Wait...

`;

}else{

btn.disabled=false;

btn.innerHTML=

btn.dataset.text;

}

}

/* ===========================================
   AJAX SUBMIT
=========================================== */

async function ajaxSubmit(

form,

url

){

const button=

form.querySelector(

'button[type="submit"]'

);

loadingButton(button,true);

const data=

new FormData(form);

try{

const response=

await fetch(url,{

method:"POST",

body:data

});

if(response.ok){

Utils.showToast(

"Submitted Successfully"

);

form.reset();

}else{

throw new Error();

}

}catch{

Utils.showToast(

"Submission Failed",

"error"

);

}finally{

loadingButton(

button,

false

);

}

}

/* ===========================================
   EXPORT
=========================================== */

window.Forms={

ajaxSubmit,

loadingButton

};