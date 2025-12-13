document.addEventListener('DOMContentLoaded', () => {
  const commentForms = document.querySelectorAll('.comment-form');

  if (!commentForms.length) return;

  commentForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // clean old error
      const oldError = form.querySelector('.comment-error');
      if (oldError) oldError.remove();

      const textarea = form.querySelector('textarea[name="comment_content"]');
      const comment_content = textarea.value.trim();

      if (!comment_content) {
        showError(form, 'Comment cannot be empty.');
        return;
      }

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ comment_content })
        });

        const data = await res.json();

        if (!res.ok) {
          showError(form, data.error || 'Failed to post comment.');
          return;
        }

        window.location.reload();

      } catch (err) {
        showError(form, 'Network error. Please try again.');
      }
    });
  });

  function showError(form, msg) {
    const div = document.createElement('div');
    div.className = 'comment-error';
    div.style.color = 'red';
    div.style.marginTop = '6px';
    div.textContent = msg;
    form.appendChild(div);
  }
});

document.addEventListener('submit', async (e) => {
  if (!e.target.classList.contains('delete-comment-form')) return;

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
      alert(data.error || 'Failed to delete comment.');
      return;
    }

    //refresh if success
    window.location.reload();

  } catch (err) {
    alert('Network error while deleting comment.');
  }
});


