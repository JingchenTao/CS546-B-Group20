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

    const rating = ratingInput?.value.trim();
    const review_content = contentInput?.value.trim();

    if (!rating || !review_content) {
      showError('Please fill out all required fields.');
      return;
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
      method: 'POST', // 让 app.js rewrite 成 DELETE
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