/* ==========================================
   LUMI APARTMENT
   Premium JavaScript & Multi-Language Switcher
========================================== */

// 1. Chức năng Chuyển đổi Ngôn ngữ (EN - VI)
const btnEn = document.getElementById("btn-en");
const btnVi = document.getElementById("btn-vi");
const langElements = document.querySelectorAll(".lang");

function changeLanguage(lang) {
    // Cập nhật trạng thái active cho nút bấm
    if (lang === "vi") {
        btnVi.classList.add("active");
        btnEn.classList.remove("active");
    } else {
        btnEn.classList.add("active");
        btnVi.classList.remove("active");
    }

    // Quét qua các thẻ có class "lang" để dịch
    langElements.forEach(el => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) {
            // Nếu thẻ chứa HTML (như thẻ <br> để xuống dòng) thì dùng innerHTML, ngược lại dùng textContent
            if (text.includes("<br>") || text.includes("✔")) {
                el.innerHTML = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Lưu lựa chọn ngôn ngữ của người dùng vào bộ nhớ trình duyệt (Local Storage)
    localStorage.setItem("preferredLanguage", lang);
}

// Lắng nghe sự kiện click trên các nút chuyển ngôn ngữ
if (btnEn && btnVi) {
    btnEn.addEventListener("click", () => changeLanguage("en"));
    btnVi.addEventListener("click", () => changeLanguage("vi"));
}

// Khi tải trang: Tự động áp dụng ngôn ngữ đã chọn trước đó hoặc mặc định là tiếng Anh (EN)
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("preferredLanguage") || "en";
    changeLanguage(savedLang);
});


// 2. Header Scroll Effect
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
        header.style.background = "rgba(15,15,15,.92)";
        header.style.backdropFilter = "blur(18px)";
        header.style.boxShadow = "0 15px 35px rgba(0,0,0,.25)";
        header.style.padding = "18px 7%";
    } else {
        header.style.background = "rgba(0,0,0,.15)";
        header.style.boxShadow = "none";
        header.style.padding = "25px 7%";
    }
});


// 3. Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({
                behavior:"smooth"
            });
        }
    });
});


// 4. Fade Animation
const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.15
});

document.querySelectorAll("section").forEach(section=>{
    section.classList.add("hidden");
    observer.observe(section);
});


// 5. Gallery Hover
document.querySelectorAll(".gallery-grid img").forEach(img=>{
    img.addEventListener("mouseenter",()=>{
        img.style.transform="scale(1.05)";
    });
    img.addEventListener("mouseleave",()=>{
        img.style.transform="scale(1)";
    });
});


// 6. Button Hover
document.querySelectorAll(".primary,.secondary,.book-btn").forEach(btn=>{
    btn.addEventListener("mouseenter",()=>{
        btn.style.transform="translateY(-3px)";
    });
    btn.addEventListener("mouseleave",()=>{
        btn.style.transform="translateY(0)";
    });
});


// 7. Page Loading
window.addEventListener("load",()=>{
    document.body.classList.add("loaded");
});


// 8. Footer Year
const year = new Date().getFullYear();
const footer = document.querySelector("footer p:last-child");
if(footer){
    footer.innerHTML = `© ${year} Lumi Apartment. All Rights Reserved.`;
}