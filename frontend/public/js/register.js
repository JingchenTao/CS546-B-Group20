document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-form');
    
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
            
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        const addressZip = document.getElementById('addressZip').value.trim();
        const addressCity = document.getElementById('addressCity').value.trim();

        let inputError;
   
        if (firstName === undefined || firstName === null || typeof firstName !== 'string' || firstName.length === 0) {
            inputError = 'firstName is required, it must be a string and cannot be an empty string or just spaces';
        } else if (lastName === undefined || lastName === null || typeof lastName !== 'string' || lastName.length === 0) {
            inputError = 'lastName is required, it must be a string and cannot be an empty string or just spaces';
        }else if (email === undefined || email === null || typeof email !== 'string' || email.length === 0) {
            inputError = 'email is required, it must be a string and cannot be an empty string or just spaces';
        }else if (password === undefined || password === null || typeof password !== 'string' || password.length === 0) {
            inputError = 'password is required, it must be a string and cannot be an empty string or just spaces';
        }else if(confirmPassword === undefined || confirmPassword === null || typeof confirmPassword !== 'string' || confirmPassword.length === 0) {
            inputError = 'confirmPassword is required, it must be a string and cannot be an empty string or just spaces';
        }else if(addressZip === undefined || addressZip === null || typeof addressZip !== 'string' || addressZip.length === 0) {
            inputError = 'addressZip is required, it must be a string and cannot be an empty string or just spaces';
        }else if(addressCity === undefined || addressCity === null || typeof addressCity !== 'string' || addressCity.length === 0) {
            inputError = 'addressCity is required, it must be a string and cannot be an empty string or just spaces';
        }else if(firstName.length < 2 || firstName.length > 50 || !/^[A-Za-z\s'-]+$/.test(firstName)) {
            inputError = 'The first name or the last name must be between 2 and 50 character and it can only contain letters, spaces, apostrophes, and hyphens';
        }else if(lastName.length < 2 || lastName.length > 50 || !/^[A-Za-z\s'-]+$/.test(lastName)) {
            inputError = 'The first name or the last name must be between 2 and 50 character and it can only contain letters, spaces, apostrophes, and hyphens';
        }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())){
            inputError = 'Email is not a valid email address';
        }else if(password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
            inputError = 'Password must be at least 8 characters long, having at least one uppercase letter, one lowercase letter, one digit and one special character(without any space)';
        }else if(confirmPassword !== password){
            inputError = 'Passwords do not match.';
        }else if( ! /^[0-9]{5}(?:-[0-9]{4})?$/.test(addressZip)){
            inputError = 'Zip code must be a valid US ZIP code';
        }else if(addressCity.length >100){
            inputError = 'City must be at most 100 characters';
        }
    

        if (inputError) {
            showError(inputError); 
            return;
        }

        const submitButton = registerForm.querySelector('button[type="submit"]');
        if(submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Registering..., do not submit twice';
        }
            
        try {
            
            const response = await axios.post('/users/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                addressZip: addressZip,
                addressCity: addressCity
            }, {
                withCredentials: true
            });
                
                // Backend returns raw user
            if (response.data && response.data._id) {
                window.location.href = '/users/login';
            } else {
                showError('Registration failed. Please try again.');
            }
        } catch (error) {
            
            let errorMessage = 'Registration failed. Please try again.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            showError(errorMessage);
            } finally {
                if(submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Register';
            }
        }
        });
    }
});

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.marginTop = '10px';
    errorDiv.textContent = message;
    
    const form = document.querySelector('.register-form');
    if (form) {
        form.appendChild(errorDiv);
    }
}

