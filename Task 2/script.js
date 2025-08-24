document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const successText = document.getElementById('successText');

    const fields = {
        fullName: document.getElementById('fullName'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    const showError = (field, message) => {
        const errorEl = document.getElementById(`${field.id}Error`);
        field.classList.add('error');
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    };

    const clearError = (field) => {
        const errorEl = document.getElementById(`${field.id}Error`);
        field.classList.remove('error');
        errorEl.style.display = 'none';
    };

    const validateField = (field) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let isValid = true;
        
        clearError(field);

        if (field.value.trim() === '') {
            showError(field, `Please enter your ${field.id.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
            isValid = false;
        } else if (field.type === 'email' && !emailPattern.test(field.value)) {
            showError(field, 'Please enter a valid email address');
            isValid = false;
        }
        return isValid;
    };

    Object.values(fields).forEach(field => {
        field.addEventListener('blur', () => validateField(field));
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        Object.values(fields).forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            const userName = fields.fullName.value.trim();

            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                successText.textContent = `Thank you, ${userName}! Your message has been received.`;
                
                successMessage.style.display = 'flex';
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 2000);
        }
    });
});