document.addEventListener('DOMContentLoaded', () => {
  // frontend validation for review
  const reviewForm = document.querySelector('.review-form');

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      // remove old error if we have
      const oldError = document.querySelector('.error-message');
      if (oldError) {
        oldError.remove();
      }

      const ratingInput = reviewForm.querySelector('input[name="rating"]');
      const commentInput = reviewForm.querySelector('textarea[name="review_content"]');

      const rating = ratingInput ? ratingInput.value.trim() : '';
      const comment = commentInput ? commentInput.value.trim() : '';

      if (!rating || !comment) {
        e.preventDefault();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'Please fill out all required fields.';
        errorDiv.style.color = 'red';
        errorDiv.style.marginTop = '10px';

        reviewForm.appendChild(errorDiv);
      }
    });
  }

  // admin edit park
  const adminEditBtn = document.getElementById('admin-edit-park');
  const editForm = document.getElementById('admin-edit-form');
  const cancelEditBtn = document.getElementById('cancel-edit-park');
  const editParkForm = document.getElementById('edit-park-form');
  
  if (adminEditBtn && editForm) {
    adminEditBtn.addEventListener('click', () => {
      const isHidden = editForm.style.display === 'none' || editForm.style.display === '';
      editForm.style.display = isHidden ? 'block' : 'none';
      
      if (isHidden) {
        const locationSelect = document.getElementById('edit-park-location');
        const parkCard = document.querySelector('.park-detail-card');
        const parkLocation = parkCard ? parkCard.getAttribute('data-park-location') : null;
        if (locationSelect && parkLocation) {
          locationSelect.value = parkLocation;
        }
      }
    });
  }
  
  if (cancelEditBtn && editForm) {
    cancelEditBtn.addEventListener('click', () => {
      editForm.style.display = 'none';
    });
  }
  
  if (editParkForm) {
    editParkForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const parkId = adminEditBtn ? adminEditBtn.getAttribute('data-park-id') : null;
      if (!parkId) return;
      
      const parkName = document.getElementById('edit-park-name').value.trim();
      const description = document.getElementById('edit-park-description').value.trim();
      const parkType = document.getElementById('edit-park-type').value.trim();
      const parkZip = document.getElementById('edit-park-zip').value.trim();
      const parkLocation = document.getElementById('edit-park-location').value;
      
      if (!parkName || !description || !parkType || !parkZip || !parkLocation) {
        alert('Please fill out all fields');
        return;
      }
      
      const zipArray = parkZip.split(',').map(z => z.trim()).filter(z => z);
      
      try {
        const res = await fetch(`/api/parks/${parkId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            park_name: parkName,
            description: description,
            park_type: parkType,
            park_zip: zipArray.length === 1 ? zipArray[0] : zipArray,
            park_location: parkLocation
          })
        });
        
        if (!res.ok) {
          const data = await res.json();
          alert(data.error || 'Failed to update park');
          return;
        }
        
        window.location.reload();
      } catch (err) {
        alert('Network error. Please try again.');
      }
    });
  }

  // admin delete park
  const adminDeleteBtn = document.getElementById('admin-delete-park');
  if (adminDeleteBtn) {
    adminDeleteBtn.addEventListener('click', async () => {
      if (!confirm('Are you sure you want to delete this park?')) {
        return;
      }

      const parkId = adminDeleteBtn.getAttribute('data-park-id');

      try {
        const res = await fetch(`/api/parks/${parkId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        });

        if (!res.ok) {
          const data = await res.json();
          alert(data.error || 'Failed to delete park');
          return;
        }

        window.location.href = '/parks';
      } catch (err) {
        alert('Network error. Please try again.');
      }
    });
  }
});
