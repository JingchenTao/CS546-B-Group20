  document.addEventListener('DOMContentLoaded', async () => {
    const PAGE_SIZE = 50;
    let currentPage = 1;
    let allParks = [];

  const container = document.querySelector('.parks-grid');
  const form = document.getElementById('park-search-form');

  if (!container) return;

  // pagination
  const updatePagination = () => {
  const totalPages = Math.ceil(allParks.length / PAGE_SIZE);
  const pageInfo = document.getElementById('page-info');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (pageInfo) {
      pageInfo.textContent =
        totalPages === 0 ? '' : `Page ${currentPage} of ${totalPages}`;
    }

    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
  };


  const renderParks = () => {
    container.textContent = '';
    
    if (!allParks || allParks.length === 0) {
    const p = document.createElement('p');
    p.textContent = 'No parks found.';
    container.appendChild(p);
    updatePagination();
    return;
  }
    
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageParks = allParks.slice(start, end);

    for (const p of pageParks) {
    const card = document.createElement('div');
    card.className = 'park-card';

    const h2 = document.createElement('h2');
    h2.textContent = p.park_name ?? '';
    card.appendChild(h2);

    const loc = document.createElement('p');
    loc.textContent = `Location: ${p.park_location ?? ''}`;
    card.appendChild(loc);

    const type = document.createElement('p');
    type.textContent = `Type: ${p.park_type ?? ''}`;
    card.appendChild(type);

    const meta = document.createElement('p');
    meta.className = 'park-meta';
    meta.textContent = `⭐ ${p.rating ?? 0} / 5  📝 ${p.reviewCount ?? 0}`;
    card.appendChild(meta);

    const a = document.createElement('a');
    a.textContent = 'View Details';
    a.href = `/parks/${encodeURIComponent(String(p._id ?? ''))}`;
    card.appendChild(a);

    container.appendChild(card);
  }

  updatePagination();
  };
    
    //read query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const initialParams = {};

  for (const [key, value] of urlParams.entries()) {
    if (value && value.trim() !== '') {
     initialParams[key] = value;
    }
  }
     // sync form with URL params
     if (form) {
  Object.entries(initialParams).forEach(([key, value]) => {
    if (form.elements[key]) {
      form.elements[key].value = value;
    }
  });
}

  // fetch
  const fetchParks = async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const url = `/api/parks?${query}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch parks');
      
      allParks = await res.json();
      currentPage = 1;
      renderParks();

    } catch (e) {
      container.innerHTML = '<p>Failed to load parks.</p>';
    }
  };

    // pagination buttons
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { 
         if (currentPage > 1) {
           currentPage--;
           renderParks();
           window.scrollTo(0, 0);
     }
  });

  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(allParks.length / PAGE_SIZE);
    if (currentPage < totalPages) {
      currentPage++;
      renderParks();
      window.scrollTo(0, 0);
    }
  });
}

  // search/filter/sort
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const params = {};

      for (const [key, value] of formData.entries()) {
        if (value && value.trim() !== '') {
          params[key] = value.trim();
        }
      }

      fetchParks(params);
    });
  }

  fetchParks(initialParams);
});