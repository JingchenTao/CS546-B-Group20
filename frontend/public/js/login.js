
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Remove current error messages
            const existingError = document.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            let inputError;

            if (email === undefined || email === null || typeof email !== 'string' || email.length === 0) {
                inputError = 'email is required, it must be a string and cannot be an empty string or just spaces';
            }else if (password === undefined || password === null || typeof password !== 'string' || password.length === 0) {
                inputError = 'password is required, it must be a string and cannot be an empty string or just spaces';
            }else if(password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
                inputError = 'Password must be at least 8 characters long, having at least one uppercase letter, one lowercase letter, one digit and one special character(without any space)';
            }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase())){
                inputError = 'Email is not a valid email address';
            }

            if (inputError) {
                showError(inputError); 
                return;
            }

            const submitButton = loginForm.querySelector('button[type="submit"]');
            if(submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Still logging in, do not press the button twice';
            }
            
        try {
            const response = await axios.post('/users/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });
                
            // Backend return
            if (response.data && response.data._id) {
                if (response.data.role === 'admin') {
                    window.location.href = '/users/adminProfile';
                } else {
                    window.location.href = '/users/userProfile';
                }
            } else {
                showError('Login failed. Please try again.');
            }
        } catch (error) {

                //error reply
            let errorMessage = 'Login failed. Please try again.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            showError(errorMessage);
            }finally {
                if(submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Login';
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
    
    const form = document.querySelector('.login-form');
    if (form) {
        form.appendChild(errorDiv);
    }
}

