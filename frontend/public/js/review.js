document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.review-form-card');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // clean
    let oldError = document.querySelector('.review-error');
    if (oldError) oldError.remove();

    const ratingInput = form.querySelector('input[name="rating"]');
    const contentInput = form.querySelector('textarea[name="review_content"]');

    let rating = ratingInput?.value.trim();
    const review_content = contentInput?.value.trim();


     rating = Number(rating);



        
    if (typeof rating === 'undefined' || rating === null  
        || isNaN(rating) || !Number.isInteger(rating) || rating < 1 || rating > 5) {
          showError(`Provided input rating should be an integer rate, choosing form 1 to 5!`);
          return
      }
    
      if (review_content === undefined || review_content === null || typeof review_content !== 'string' || 
        review_content.length < 10 || review_content.length > 1000 || /(.)\1{4,}/.test(review_content)) {
      
             
            showError('This review must be at least 10 characters long and no more than 1000 characters long. And it should not have the same character repeated 5 times or more. ');
            return
        }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          rating: Number(rating),
          review_content
        })
      });

        if (res.redirected) {
        window.location.href = res.url;
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        showError(data.error || 'Failed to submit review.');
        return;
      }

      window.location.reload();

    } catch (err) {
      showError('Network error. Please try again.');
    }
  });

  function showError(msg) {
    const div = document.createElement('div');
    div.className = 'review-error';
    div.style.color = 'red';
    div.style.marginTop = '10px';
    div.textContent = msg;
    form.appendChild(div);
  }
});

document.addEventListener('submit', async (e) => {

  if (!e.target.classList.contains('delete-review-form')) return;

  e.preventDefault(); 

  const url = e.target.action;

  try {
    const res = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || 'Failed to delete review.');
      return;
    }

    window.location.reload();

  } catch (err) {
    console.error(err);
    alert('Network error while deleting review.');
  }
});