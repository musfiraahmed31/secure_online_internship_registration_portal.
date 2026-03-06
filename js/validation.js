document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    const patterns = {
        student_id: /^[a-zA-Z]{2}\d{2}-[a-zA-Z]{3}-\d{3}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        cnic: /^\d{5}-\d{7}-\d{1}$/,
        phone: /^03\d{9}$/
    };

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

        validateField('student_id', patterns.student_id);
        validateField('email', patterns.email);
        validateField('password', patterns.password);
        validateField('cnic', patterns.cnic);
        validateField('phone', patterns.phone);

        ['full_name', 'department'].forEach(id => {
            const el = document.getElementById(id);
            if (el.value.trim() === '') {
                el.classList.add('is-invalid');
                isValid = false;
            } else { el.classList.remove('is-invalid'); }
        });

        const pwd = document.getElementById('password');
        const confirm = document.getElementById('confirm_password');
        if (pwd.value !== confirm.value || confirm.value === "") {
            confirm.classList.add('is-invalid');
            isValid = false;
        } else { confirm.classList.remove('is-invalid'); }

        const cgpaEl = document.getElementById('cgpa');
        const cgpa = parseFloat(cgpaEl.value);
        if (isNaN(cgpa) || cgpa < 0 || cgpa > 4) {
            cgpaEl.classList.add('is-invalid');
            isValid = false;
        } else { cgpaEl.classList.remove('is-invalid'); }

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

        if (!isValid) e.preventDefault();
    });
});
