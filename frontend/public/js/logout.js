document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.post('/users/logout', {}, {
            withCredentials: true
        });
        
        if (response.data && response.data.loggedOut) {
            window.location.href = '/';
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/';
    }
});

