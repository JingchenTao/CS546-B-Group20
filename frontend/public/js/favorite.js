document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('favorite-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const parkId = btn.dataset.parkId;

    try {
      const res = await fetch(`/users/me/favorites/${parkId}`, {
        method: 'POST',
        credentials: 'include'
      });

      // without log in
      if (res.status === 401) {
        alert('Please login to add parks to your favorites.');
        return;
      }

      // log in
      btn.classList.toggle('favorited');

      btn.textContent = btn.classList.contains('favorited')
        ? '💔 Remove Favorite'
        : '❤️ Add / Remove Favorite';

    } catch (e) {
      alert('Network error. Please try again.');
      console.error(e);
    }
  });
});