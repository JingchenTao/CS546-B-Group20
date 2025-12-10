
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
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
        try {
            const response = await axios.post('/users/login', {
                email: email,
                password: password
            }, {
                withCredentials: true
            });
                
            // Backend return
            if (response.data && response.data._id) {
                window.location.href = '/users/userProfile';
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

