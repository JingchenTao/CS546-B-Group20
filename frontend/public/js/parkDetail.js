document.addEventListener('DOMContentLoaded', () => {
  // frontend validation for review
  const reviewForm = document.querySelector('.review-form');

  if (!reviewForm) return;
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
});
