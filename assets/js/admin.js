/* ==========================================
   SVM Admin Panel
   Part 1
========================================== */

import {
    auth,
    db,
    storage
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    collection,
    getDocs,
     addDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-storage.js";

/* ==========================================
   Admin Class
========================================== */

class AdminPanel {

    constructor() {

        this.init();

    }

    async init() {

        this.checkLogin();

        this.loadDashboard();

        this.logout();

    }

    /* ======================================
       Login Check
    ====================================== */

    checkLogin() {

        onAuthStateChanged(auth, user => {

            if (!user) {

                window.location.href = "admin-login.html";

            }

        });

    }

    /* ======================================
       Dashboard
    ====================================== */

    async loadDashboard() {

        this.count("admissions", "totalAdmissions");

        this.count("notices", "totalNotices");

        this.count("results", "totalResults");

        this.count("gallery", "totalGallery");

        this.count("staff", "totalStaff");

    }

    async count(collectionName, elementId) {

        const element = document.getElementById(elementId);

        if (!element) return;

        try {

            const snapshot = await getDocs(

                collection(db, collectionName)

            );

            element.textContent = snapshot.size;

        }

        catch (err) {

            console.error(err);

        }

    }

    /* ======================================
       Logout
    ====================================== */

    logout() {

        const btn = document.getElementById("logoutBtn");

        if (!btn) return;

        btn.addEventListener("click", async () => {

            if (!confirm("Logout ?")) return;

            await signOut(auth);

            window.location.href = "admin-login.html";

        });

    }

}

/* ==========================================
   Helpers
========================================== */

function toast(msg) {

    alert(msg);

}

function loader(show = true) {

    const loader = document.getElementById("loader");

    if (!loader) return;

    loader.style.display = show

        ? "flex"

        : "none";

}

/* ==========================================
   Start
========================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

    window.app = new AdminPanel();

     app.initAdmissions();
     app.initNotices();
     app.initGallery();
     app.initResults();
     app.initStaff();
    app.initSettings();

    }

);
/* ==========================================
   Admissions
========================================== */

AdminPanel.prototype.initAdmissions = function () {

    const form = document.getElementById("admissionForm");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            this.saveAdmission();

        });

    }

    this.loadAdmissions();

};

AdminPanel.prototype.saveAdmission = async function () {

    loader(true);

    try {

        const data = {

            studentName: document.getElementById("studentName").value,

            fatherName: document.getElementById("fatherName").value,

            studentClass: document.getElementById("studentClass").value,

            phone: document.getElementById("phone").value,

            createdAt: serverTimestamp()

        };

        await addDoc(

            collection(db, "admissions"),

            data

        );

        toast("Admission Added");

        document.getElementById("admissionForm").reset();

        this.loadAdmissions();

        this.loadDashboard();

    }

    catch (err) {

        console.error(err);

        toast("Error");

    }

    loader(false);

};

AdminPanel.prototype.loadAdmissions = async function () {

    const tbody = document.querySelector("#admissionTable tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const snapshot = await getDocs(

        collection(db, "admissions")

    );

    snapshot.forEach(item => {

        const d = item.data();

        tbody.innerHTML += `

<tr>

<td>${d.studentName}</td>

<td>${d.fatherName}</td>

<td>${d.studentClass}</td>

<td>${d.phone}</td>

<td>

<button onclick="deleteAdmission('${item.id}')">

Delete

</button>

</td>

</tr>

`;

    });

};

window.deleteAdmission = async function (id) {

    if (!confirm("Delete Admission?")) return;

    await deleteDoc(

        doc(db, "admissions", id)

    );

    toast("Deleted");

    app.loadAdmissions();

    app.loadDashboard();

};

AdminPanel.prototype.searchAdmissions = function () {

    const search = document

        .getElementById("admissionSearch")

        ?.value

        .toLowerCase();

    document

        .querySelectorAll("#admissionTable tbody tr")

        .forEach(row => {

            row.style.display =

                row.innerText

                .toLowerCase()

                .includes(search)

                ? ""

                : "none";

        });

};
/* ==========================================
   Notice Management
========================================== */

AdminPanel.prototype.initNotices = function () {

    const form = document.getElementById("noticeForm");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            this.saveNotice();

        });

    }

    this.loadNotices();

};

AdminPanel.prototype.saveNotice = async function () {

    loader(true);

    try {

        const data = {

            title: document.getElementById("noticeTitle").value,

            description: document.getElementById("noticeDescription").value,

            date: document.getElementById("noticeDate").value,

            createdAt: serverTimestamp()

        };

        await addDoc(

            collection(db, "notices"),

            data

        );

        toast("Notice Added Successfully");

        document.getElementById("noticeForm").reset();

        this.loadNotices();

        this.loadDashboard();

    }

    catch (err) {

        console.error(err);

        toast("Unable to save notice");

    }

    loader(false);

};

AdminPanel.prototype.loadNotices = async function () {

    const tbody = document.querySelector("#noticeTable tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const snapshot = await getDocs(

        collection(db, "notices")

    );

    snapshot.forEach(item => {

        const notice = item.data();

        tbody.innerHTML += `

<tr>

<td>${notice.title}</td>

<td>${notice.description}</td>

<td>${notice.date}</td>

<td>

<button onclick="deleteNotice('${item.id}')">

Delete

</button>

</td>

</tr>

`;

    });

};

window.deleteNotice = async function (id) {

    if (!confirm("Delete this notice?")) return;

    await deleteDoc(

        doc(db, "notices", id)

    );

    toast("Notice Deleted");

    app.loadNotices();

    app.loadDashboard();

};

AdminPanel.prototype.searchNotices = function () {

    const keyword = document
        .getElementById("noticeSearch")
        ?.value
        .toLowerCase();

    document
        .querySelectorAll("#noticeTable tbody tr")
        .forEach(row => {

            row.style.display = row.innerText
                .toLowerCase()
                .includes(keyword)

                ? ""

                : "none";

        });

};
/* ==========================================
   Gallery Management
========================================== */

AdminPanel.prototype.initGallery = function () {

    const form = document.getElementById("galleryForm");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            this.uploadGallery();

        });

    }

    this.loadGallery();

};

AdminPanel.prototype.uploadGallery = async function () {

    loader(true);

    try {

        const file = document.getElementById("galleryImage").files[0];

        if (!file) {

            toast("Select Image");

            loader(false);

            return;

        }

        const imageRef = ref(

            storage,

            "gallery/" + Date.now() + "-" + file.name

        );

        await uploadBytes(imageRef, file);

        const imageUrl = await getDownloadURL(imageRef);

        await addDoc(collection(db, "gallery"), {

            title: document.getElementById("galleryTitle").value,

            image: imageUrl,

            createdAt: serverTimestamp()

        });

        toast("Image Uploaded");

        document.getElementById("galleryForm").reset();

        this.loadGallery();

        this.loadDashboard();

    }

    catch (err) {

        console.error(err);

        toast("Upload Failed");

    }

    loader(false);

};

AdminPanel.prototype.loadGallery = async function () {

    const container = document.getElementById("galleryContainer");

    if (!container) return;

    container.innerHTML = "";

    const snapshot = await getDocs(collection(db, "gallery"));

    snapshot.forEach(item => {

        const data = item.data();

        container.innerHTML += `

<div class="gallery-card">

<img src="${data.image}" alt="${data.title}">

<h4>${data.title}</h4>

<button onclick="deleteGallery('${item.id}')">

Delete

</button>

</div>

`;

    });

};

window.deleteGallery = async function (id) {

    if (!confirm("Delete Image?")) return;

    await deleteDoc(doc(db, "gallery", id));

    toast("Image Deleted");

    app.loadGallery();

    app.loadDashboard();

};
/* ==========================================
   Result Management
========================================== */

AdminPanel.prototype.initResults = function () {

    const form = document.getElementById("resultForm");

    if (form) {

        form.addEventListener("submit", (e) => {

            e.preventDefault();

            this.uploadResult();

        });

    }

    this.loadResults();

};

AdminPanel.prototype.uploadResult = async function () {

    loader(true);

    try {

        const file = document.getElementById("resultFile").files[0];

        if (!file) {

            toast("Select PDF");

            loader(false);

            return;

        }

        const pdfRef = ref(

            storage,

            "results/" + Date.now() + "-" + file.name

        );

        await uploadBytes(pdfRef, file);

        const pdfUrl = await getDownloadURL(pdfRef);

        await addDoc(collection(db, "results"), {

            className: document.getElementById("resultClass").value,

            session: document.getElementById("resultSession").value,

            fileName: file.name,

            pdf: pdfUrl,

            createdAt: serverTimestamp()

        });

        toast("Result Uploaded");

        document.getElementById("resultForm").reset();

        this.loadResults();

        this.loadDashboard();

    }

    catch (err) {

        console.error(err);

        toast("Upload Failed");

    }

    loader(false);

};

AdminPanel.prototype.loadResults = async function () {

    const tbody = document.querySelector("#resultTable tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    const snapshot = await getDocs(

        collection(db, "results")

    );

    snapshot.forEach(item => {

        const r = item.data();

        tbody.innerHTML += `

<tr>

<td>${r.className}</td>

<td>${r.session}</td>

<td>

<a href="${r.pdf}" target="_blank">

View PDF

</a>

</td>

<td>

<button onclick="deleteResult('${item.id}')">

Delete

</button>

</td>

</tr>

`;

    });

};

window.deleteResult = async function (id) {

    if (!confirm("Delete Result?")) return;

    await deleteDoc(

        doc(db, "results", id)

    );

    toast("Result Deleted");

    app.loadResults();

    app.loadDashboard();

};

AdminPanel.prototype.searchResults = function () {

    const key = document

        .getElementById("resultSearch")

        ?.value

        .toLowerCase();

    document

        .querySelectorAll("#resultTable tbody tr")

        .forEach(row => {

            row.style.display =

                row.innerText

                .toLowerCase()

                .includes(key)

                ? ""

                : "none";

        });

};
/* ==========================================
   Staff + Settings
========================================== */

// Staff
AdminPanel.prototype.initStaff = function () {

    const form = document.getElementById("staffForm");

    if (form) {

        form.addEventListener("submit", e => {

            e.preventDefault();

            this.saveStaff();

        });

    }

    this.loadStaff();

};

AdminPanel.prototype.saveStaff = async function () {

    const photo = document.getElementById("staffPhoto").files[0];

    let photoURL = "";

    if (photo) {

        const fileRef = ref(storage, "staff/" + Date.now() + "-" + photo.name);

        await uploadBytes(fileRef, photo);

        photoURL = await getDownloadURL(fileRef);

    }

    await addDoc(collection(db, "staff"), {

        name: document.getElementById("staffName").value,

        designation: document.getElementById("staffDesignation").value,

        photo: photoURL,

        createdAt: serverTimestamp()

    });

    toast("Staff Added");

    document.getElementById("staffForm").reset();

    this.loadStaff();

    this.loadDashboard();

};

AdminPanel.prototype.loadStaff = async function () {

    const box = document.getElementById("staffContainer");

    if (!box) return;

    box.innerHTML = "";

    const snap = await getDocs(collection(db, "staff"));

    snap.forEach(docItem => {

        const s = docItem.data();

        box.innerHTML += `

<div class="staff-card">

<img src="${s.photo}" width="80">

<h4>${s.name}</h4>

<p>${s.designation}</p>

<button onclick="deleteStaff('${docItem.id}')">

Delete

</button>

</div>

`;

    });

};

window.deleteStaff = async function(id){

    if(!confirm("Delete Staff?")) return;

    await deleteDoc(doc(db,"staff",id));

    app.loadStaff();

    app.loadDashboard();

};

/* ==========================================
   Settings
========================================== */

AdminPanel.prototype.initSettings = function(){

    const form=document.getElementById("settingsForm");

    if(!form) return;

    form.addEventListener("submit",e=>{

        e.preventDefault();

        localStorage.setItem(

            "schoolName",

            document.getElementById("schoolName").value

        );

        localStorage.setItem(

            "schoolEmail",

            document.getElementById("schoolEmail").value

        );

        localStorage.setItem(

            "schoolPhone",

            document.getElementById("schoolPhone").value

        );

        toast("Settings Saved");

    });

};