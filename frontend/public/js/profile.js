document.addEventListener('DOMContentLoaded', async () => {
  console.log('profile.js loaded');

  try {
    const response = await fetch('/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Failed to fetch user data' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const user = await response.json();
    console.log('user from /users/me:', user);

    // Name
    const nameElement = document.getElementById('profile-name');
    if (nameElement) {
      const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
      nameElement.textContent = fullName || 'Not provided';
    }

    // Email
    const emailElement = document.getElementById('profile-email');
    if (emailElement) {
      emailElement.textContent = user.email || 'Not provided';
    }

    // Address
    const addressElement = document.getElementById('profile-address');
    if (addressElement) {
      const parts = [];
      if (user.address_city) parts.push(user.address_city);
      if (user.address_zip) parts.push(user.address_zip);
      addressElement.textContent = parts.length > 0 ? parts.join(', ') : 'Not provided';
    }

    // Favorites
    const favoritesList = document.getElementById('favorites-list');
    const noFavoritesMessage = document.getElementById('no-favorites-message');

    if (favoritesList && noFavoritesMessage) {
      if (!user.favorite_Parks || user.favorite_Parks.length === 0) {
        noFavoritesMessage.style.display = 'block';
        favoritesList.style.display = 'none';
      } else {
        noFavoritesMessage.style.display = 'none';
        favoritesList.style.display = 'block';
        favoritesList.innerHTML = '';

        user.favorite_Parks.forEach((parkId) => {
          const li = document.createElement('li');
          li.textContent = parkId || 'Park ID not available';
          favoritesList.appendChild(li);
        });
      }
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);

    const nameElement = document.getElementById('profile-name');
    const emailElement = document.getElementById('profile-email');
    const addressElement = document.getElementById('profile-address');

    if (nameElement) nameElement.textContent = 'Error loading data';
    if (emailElement) emailElement.textContent = 'Error loading data';
    if (addressElement) addressElement.textContent = 'Error loading data';

    alert(`Error: ${error.message || 'Failed to load profile information'}`);
  }
});

