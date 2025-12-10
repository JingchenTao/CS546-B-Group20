document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.post('/users/logout', {}, {
            withCredentials: true
        });
        
        if (response.data && response.data.loggedOut) {
            // Redirect to home page
            window.location.href = '/';
        } else {
            // Still redirect even if response is unexpected
            window.location.href = '/';
        }
    } catch (error) {
        // Even on error, try to redirect
        console.error('Logout error:', error);
        window.location.href = '/';
    }
});

