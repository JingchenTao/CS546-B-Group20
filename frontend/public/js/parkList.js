  document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.parks-grid');
  const form = document.getElementById('park-search-form');

  if (!container) return;

  const renderParks = (parks) => {
    if (!parks || parks.length === 0) {
      container.innerHTML = '<p>No parks found.</p>';
      return;
    }

    container.innerHTML = parks.map(p => `
      <div class="park-card">
        <h2>${p.park_name}</h2>
        <p><strong>Location:</strong> ${p.park_location}</p>
        <p><strong>Type:</strong> ${p.park_type}</p>
        <p><strong>Rating:</strong> ${p.rating} / 5</p>
        <p><strong>Reviews:</strong> ${p.reviewCount ?? 0}</p>
        <a href="/parks/${p._id}">View Details</a>
      </div>
    `).join('');
  };

  // fetch
  const fetchParks = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `/api/parks?${query}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch parks');
      const parks = await res.json();
      renderParks(parks);
    } catch (e) {
      console.error(e);
      container.innerHTML = '<p>Failed to load parks.</p>';
    }
  };

  fetchParks( );

  // search/filter/sort
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const params = {};

      for (let [key, value] of formData.entries()) {
        if (value && value.trim() !== '') {
          params[key] = value.trim();
        }
      }

      fetchParks(params);
    });
  }
});