// Navbar
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if (bar) {
    bar.addEventListener("click", () => {
        nav.classList.add("active");
    })
}

if (close) {
    close.addEventListener("click", () => {
        nav.classList.remove("active");
    })
}

// Product Details
var mainImg = document.getElementById("MainImg");
var smallImg = document.getElementsByClassName("small-img")

for (let i = 0; i < smallImg.length; i++) {
    smallImg[i].onclick = function () {
        mainImg.src = smallImg[i].src;
    }
}

// Swipe login register
var a = document.getElementById("login");
var b = document.getElementById("register");

function login() {
    if (window.innerWidth <= 477) {
        a.style.left = "40px";
        b.style.right = "-520px";
    } else {
        a.style.left = "4px";
        b.style.right = "-520px";
    }
    a.style.opacity = 1;
    b.style.opacity = 0;
}


function register() {
    if (window.innerWidth <= 477) {
        a.style.left = "-310px";
        b.style.right = "40px";
    } else {
        a.style.left = "-510px";
        b.style.right = "5px";
    }
    a.style.opacity = 0;
    b.style.opacity = 1;
}

function toggleLoginButton() {
    const loginInputs = document.querySelectorAll('#login .input-field');
    const loginButton = document.querySelector('#login .submit');

    let allFilled = true;
    loginInputs.forEach(input => {
        if (input.value === '') {
            allFilled = false;
        }
    });

    if (loginButton) {
        loginButton.style.backgroundColor = allFilled ? 'var(--brown-medium)' : 'var(--beige-dark)';
        loginButton.style.cursor = allFilled ? 'pointer' : 'not-allowed';
    }
}

function toggleRegisterButton() {
    const registerInputs = document.querySelectorAll('#register .input-field');
    const registerButton = document.querySelector('#register .submit');

    let allFilled = true;
    registerInputs.forEach(input => {
        if (input.value === '') {
            allFilled = false;
        }
    });

    if (registerButton) {
        registerButton.style.backgroundColor = allFilled ? 'var(--brown-medium)' : 'var(--beige-dark)';
        registerButton.style.cursor = allFilled ? 'pointer' : 'not-allowed';
    }
}

function toggleResetButton(stepId) {
    const inputs = document.querySelectorAll(`#${stepId} .input-field,  #${stepId} .code-input`);
    const button = document.querySelector(`#${stepId} .submit`);

    let allFilled = true;
    inputs.forEach(input => {
        if (input.value === '') {
            allFilled = false;
        }
    });

    if (button) {
        button.style.backgroundColor = allFilled ? 'var(--brown-medium)' : 'var(--beige-dark)';
        button.style.cursor = allFilled ? 'pointer' : 'not-allowed';
    }
}

['step1', 'step2', 'step3'].forEach(stepId => {
    document.querySelectorAll(`#${stepId} .input-field,  #${stepId} .code-input`).forEach(input => {
        input.addEventListener('input', () => toggleResetButton(stepId));
    });

    toggleResetButton(stepId);
});

document.querySelectorAll('#login .input-field').forEach(input => {
    input.addEventListener('input', toggleLoginButton);
});

document.querySelectorAll('#register .input-field').forEach(input => {
    input.addEventListener('input', toggleRegisterButton);
});

toggleLoginButton();
toggleRegisterButton();
toggleResetButton();

// See Password
document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.querySelector("#togglePassword");
    const togglePassword1 = document.querySelector("#togglePassword1");

    if (togglePassword) {
        togglePassword.addEventListener("click", function () {
            const type = password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            this.classList.toggle("fa-eye");
            this.classList.toggle("fa-eye-slash");
        });
    }

    if (togglePassword1) {
        togglePassword1.addEventListener("click", function () {
            const type = password1.getAttribute("type") === "password" ? "text" : "password";
            password1.setAttribute("type", type);
            this.classList.toggle("fa-eye");
            this.classList.toggle("fa-eye-slash");
        });
    }
});


// Cart Page
function formatRupiah(angka) {
    return 'Rp' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function hitungSubtotal() {
    const rows = document.querySelectorAll('tbody tr');
    let totalKeranjang = 0;

    rows.forEach(row => {
        const hargaElement = row.querySelector('td:nth-child(4)');
        const qtyElement = row.querySelector('input[type="number"]');
        const subtotalElement = row.querySelector('td:nth-child(6)');

        if (hargaElement && qtyElement && subtotalElement) {
            const harga = parseInt(hargaElement.innerText.replace(/[^0-9]/g, '')) || 0;
            const qty = parseInt(qtyElement.value) || 0;
            const subtotal = harga * qty;

            subtotalElement.innerText = formatRupiah(subtotal);
            totalKeranjang += subtotal;
        }
    });

    const subtotalCell = document.querySelector('#subtotal td:last-child');
    const totalCell = document.querySelector('#subtotal tr:last-child td:last-child');
    if (subtotalCell && totalCell) {
        subtotalCell.innerText = formatRupiah(totalKeranjang);
        totalCell.innerText = formatRupiah(totalKeranjang);
    }
}

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', hitungSubtotal);
});

window.onload = hitungSubtotal;

// Reset password 
function nextStep(step) {
    if (step === 1) {
        let emailOrPhone = document.getElementById('emailOrPhone').value;
        if (emailOrPhone) {
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'block';
            document.getElementById('headerText').innerText = 'Verifikasi Kode';
        }
    } else if (step === 2) {
        let verificationCode = '';
        for (let i = 1; i <= 6; i++) {
            verificationCode += document.getElementById(`code${i}`).value;
        }

        if (verificationCode.length === 6) {
            document.getElementById('step2').style.display = 'none';
            document.getElementById('step3').style.display = 'block';
            document.getElementById('headerText').innerText = 'Ubah Kata Sandi';
        }
    }
}

function changePassword() {
    let newPassword = document.getElementById('newPassword').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    if (!newPassword || !confirmPassword) {
        return;
    }
    if (newPassword === confirmPassword) {
        alert("Kata sandi berhasil diubah!");
        window.location.href = "user.html";
    } else {
        alert("Kata sandi tidak cocok!");
    }
}

