document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Remove any existing error messages
            const existingError = document.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const addressZip = document.getElementById('addressZip').value;
            const addressCity = document.getElementById('addressCity').value;
            
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
                
                // Backend returns raw user object on success
                if (response.data && response.data._id) {
                    // Redirect to login page
                    window.location.href = '/users/login';
                } else {
                    // Unexpected response
                    showError('Registration failed. Please try again.');
                }
            } catch (error) {
                // Handle error response
                let errorMessage = 'Registration failed. Please try again.';
                if (error.response && error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                }
                showError(errorMessage);
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

