

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch current user data
        const response = await axios.get('/users/me', {
            withCredentials: true
        });

        if (response.data) {
            const user = response.data;

            // Update profile
            const nameHeading = document.getElementById('profile-name');
            const emailPara = document.getElementById('profile-email');
            const addressPara = document.getElementById('profile-address');

            // Name + Email + Address
            if (nameHeading) {
                nameHeading.textContent = `${user.first_name || ''} ${user.last_name || ''}`.trim();
            }
            if (emailPara) {
                emailPara.innerHTML = `<strong>Email:</strong> ${user.email || ''}`;
            }
            if (addressPara) {
                if (user.address_city && user.address_zip) {
                    addressPara.innerHTML = `<strong>Address:</strong> ${user.address_city}, ${user.address_zip}`;
                } else if (user.address_city) {
                    addressPara.innerHTML = `<strong>Address:</strong> ${user.address_city}`;
                } else if (user.address_zip) {
                    addressPara.innerHTML = `<strong>Address:</strong> ${user.address_zip}`;
                } else {
                    addressPara.innerHTML = `<strong>Address:</strong> Not provided`;
                }
            }

            // Favorites 
            if (user.favorite_Parks) {
                console.log('Favorite Parks:', user.favorite_Parks);
            } else {
                console.log('Favorite Parks: None');
            }
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
