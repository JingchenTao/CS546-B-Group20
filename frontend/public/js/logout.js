document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/users/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      console.log('Logout response:', data);
    }

    window.location.href = '/';
  } catch (error) {
    console.error('Logout error:', error);
    window.location.href = '/';
  }
});

