document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('/users/me', {
            withCredentials: true
        });
        
        if (response.data) {
            const user = response.data;
            
            // Update profile info
            const profileInfo = document.querySelector('.profile-info');
            if (profileInfo) {
                // Update name (backend uses first_name, last_name)
                const nameHeading = profileInfo.querySelector('h2');
                if (nameHeading) {
                    nameHeading.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim();
                }
                
                // Update email
                const emailPara = profileInfo.querySelectorAll('p')[0];
                if (emailPara) {
                    emailPara.innerHTML = `<strong>Email:</strong> ${user.email || ''}`;
                }
                
                // Update address
                const addressPara = profileInfo.querySelectorAll('p')[1];
                if (addressPara) {
                    if (user.addressCity && user.addressZip) {
                        addressPara.innerHTML = `<strong>Address:</strong> ${user.addressCity}, ${user.addressZip}`;
                    } else if (user.addressCity) {
                        addressPara.innerHTML = `<strong>Address:</strong> ${user.addressCity}`;
                    } else if (user.addressZip) {
                        addressPara.innerHTML = `<strong>Address:</strong> ${user.addressZip}`;
                    } else {
                        addressPara.innerHTML = `<strong>Address:</strong> Not provided`;
                    }
                }
            }
            
            // Log favorite_Parks to console (as per requirements)
            if (user.favorite_Parks) {
                console.log('Favorite Parks:', user.favorite_Parks);
            } else {
                console.log('Favorite Parks: None');
            }
            
            // Log role to console
            if (user.role) {
                console.log('User Role:', user.role);
            }
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        let errorMessage = 'Failed to load profile.';
        if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
        }
        
        // Display error on page
        const profileInfo = document.querySelector('.profile-info');
        if (profileInfo) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'red';
            errorDiv.style.marginTop = '10px';
            errorDiv.textContent = errorMessage;
            profileInfo.appendChild(errorDiv);
        }
    }
});

