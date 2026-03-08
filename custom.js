// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
reveals.forEach(r => observer.observe(r));

// Sticky CTA
const sticky = document.getElementById('stickyCta');
window.addEventListener('scroll', () => {
    sticky.classList.toggle('visible', window.scrollY > 400);
});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const form = document.getElementById("orderForm");
const btn = document.getElementById("submitBtn");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    btn.disabled = true;
    btn.innerText = "অর্ডার হচ্ছে...";
    console.log("form: ", form)
    const formData = new FormData(form);
    console.log("formData: ", formData)
    fetch("http://127.0.0.1:8000/api/v1/order-create/", {
        method: "POST",
        headers: {
            "X-CSRFToken": getCookie("csrftoken")
        },
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log("data: ", data)
            btn.disabled = false;
            btn.innerText = "অর্ডার নিশ্চিত করুন 🌿";

            if (data.success) {
                alert("✅ অর্ডার সফল হয়েছে");
                form.reset();
            }
            else {
                alert("❌ অর্ডার করা যায়নি");
            }

        })
        .catch(err => {
            btn.disabled = false;
            btn.innerText = "অর্ডার নিশ্চিত করুন 🌿";
            alert("Server Error");
        });

});
