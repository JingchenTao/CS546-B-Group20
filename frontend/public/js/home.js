document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('featured-parks');
  if (!container) return;

  try {
    const res = await fetch('/api/parks/popular?limit=3');
    if (!res.ok) {
      throw new Error('Failed to fetch popular parks');
    }

    const parks = await res.json();

    if (!parks || parks.length === 0) {
      container.innerHTML = '<p>No popular parks available.</p>';
      return;
    }

    container.innerHTML = parks.map(park => `
      <article class="park-card">
        <h3 class="park-name">${park.park_name}</h3>
        <p class="park-location">${park.park_location}</p>
        <p class="park-description">
          ${park.description || 'No description available.'}
        </p>
        <a href="/parks/${park._id}" class="details-btn">
          View Details
        </a>
      </article>
    `).join('');

  } catch (err) {
    console.error(err);
    container.innerHTML =
      '<p class="error-message">Failed to load featured parks.</p>';
  }
});
