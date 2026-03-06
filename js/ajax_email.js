document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const statusDiv = document.getElementById('email_status');
    const submitBtn = document.getElementById('submitBtn');
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    emailInput.addEventListener('blur', async () => {
        const emailVal = emailInput.value.trim();
        
        if (emailPattern.test(emailVal)) {
            statusDiv.innerHTML = '<span style="color:gray;">Checking availability...</span>';
            
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
                console.error('AJAX Error:', error);
                statusDiv.innerHTML = '<span class="text-danger">Error checking email.</span>';
            }
        } else {
            statusDiv.innerHTML = '';
        }
    });
});
