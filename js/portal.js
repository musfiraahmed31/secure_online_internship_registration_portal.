document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const emailInput = document.getElementById('email');
    const statusDiv = document.getElementById('email_status');
    const submitBtn = document.getElementById('submitBtn');

    // 1. REGEX PATTERNS (Matching your assignment requirements)
    const patterns = {
        student_id: /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{3}-\d{3}$/, // FA21-BCS-001
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        cnic: /^\d{5}-\d{7}-\d{1}$/, // 12345-1234567-1
        phone: /^03\d{9}$/ // 03XXXXXXXXX
    };

    // 2. AJAX EMAIL CHECK (Prevention against duplicate registration)
    emailInput.addEventListener('blur', async () => {
        const emailVal = emailInput.value.trim();
        if (patterns.email.test(emailVal)) {
            statusDiv.innerHTML = '<span style="color:gray;">Verifying...</span>';
            try {
                const response = await fetch(`check_email.php?email=${encodeURIComponent(emailVal)}`);
                const data = await response.json();
                if (data.exists) {
                    statusDiv.innerHTML = '<span class="text-danger">Email Already Registered</span>';
                    emailInput.classList.add('is-invalid');
                    submitBtn.disabled = true;
                } else {
                    statusDiv.innerHTML = '<span class="text-success">Email Available</span>';
                    emailInput.classList.remove('is-invalid');
                    submitBtn.disabled = false;
                }
            } catch (error) {
                statusDiv.innerHTML = '<span class="text-danger">Error checking email.</span>';
            }
        }
    });

    // 3. MULTI-LEVEL VALIDATION (Prevents invalid submissions)
    form.addEventListener('submit', (e) => {
        let isValid = true;

        const validateField = (id, pattern) => {
            const el = document.getElementById(id);
            if (!pattern.test(el.value.trim())) {
                el.classList.add('is-invalid');
                isValid = false;
            } else {
                el.classList.remove('is-invalid');
            }
        };

        // Run all regex tests
        validateField('student_id', patterns.student_id);
        validateField('email', patterns.email);
        validateField('password', patterns.password);
        validateField('cnic', patterns.cnic);
        validateField('phone', patterns.phone);

        // Required field checks (Name & Department)
        ['full_name', 'department'].forEach(id => {
            const el = document.getElementById(id);
            if (el.value.trim() === '') {
                el.classList.add('is-invalid');
                isValid = false;
            } else { el.classList.remove('is-invalid'); }
        });

        // Password matching check
        const pwd = document.getElementById('password');
        const confirm = document.getElementById('confirm_password');
        if (pwd.value !== confirm.value || confirm.value === "") {
            confirm.classList.add('is-invalid');
            isValid = false;
        } else { confirm.classList.remove('is-invalid'); }

        // CGPA range check
        const cgpaEl = document.getElementById('cgpa');
        const cgpa = parseFloat(cgpaEl.value);
        if (isNaN(cgpa) || cgpa < 0 || cgpa > 4) {
            cgpaEl.classList.add('is-invalid');
            isValid = false;
        } else { cgpaEl.classList.remove('is-invalid'); }

        // PDF File Validation
        const fileInput = document.getElementById('resume');
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            if (file.type !== 'application/pdf' || file.size > 2 * 1024 * 1024) {
                fileInput.classList.add('is-invalid');
                isValid = false;
            } else { fileInput.classList.remove('is-invalid'); }
        } else {
            fileInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            alert("Please correct the errors in the highlighted fields.");
        }
    });
});

// 4. UI LOGIC: TAB SWITCHING
function openTab(evt, tabName) {
    const contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) contents[i].classList.remove("active");

    const links = document.getElementsByClassName("tab-link");
    for (let i = 0; i < links.length; i++) links[i].classList.remove("active");

    document.getElementById(tabName).classList.add("active");
    
    // Set active header style
    const tabIndex = tabName === 'identity' ? 0 : tabName === 'security' ? 1 : 2;
    links[tabIndex].classList.add("active");
}

// 5. UI LOGIC: PASSWORD TOGGLE
function togglePassword(id, icon) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// 6. FORM RESET (To submit another response)
function resetForm() {
    document.getElementById('statusView').style.display = 'none';
    document.getElementById('mainCard').style.display = 'block';
    document.getElementById('registrationForm').reset();
    openTab(null, 'identity');
}