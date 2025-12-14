document.addEventListener('DOMContentLoaded', () => {
  console.log('adminProfile.js loaded');
  
  const form = document.getElementById('promote-user-form');
  const messageElement = document.getElementById('promote-message');

  if (form) { 
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const userId = document.getElementById('user-id-input').value.trim();
      messageElement.textContent = ''; 
      
      if (!userId) {
        messageElement.textContent = 'Please enter a User ID.';
        messageElement.style.color = 'red';
        return;
      }

      try {
        const response = await fetch('/admin/role', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: userId }) 
        });

        const data = await response.json();

        if (response.ok) {
          messageElement.textContent = `Success: User ${userId} has been promoted to Administrator.`;
          messageElement.style.color = 'green';
          form.reset(); 
        } else {
          const errorMsg = data.message || 'Failed to promote user.';
          messageElement.textContent = `Error: ${errorMsg}`;
          messageElement.style.color = 'red';
        }
      } catch (error) {
        console.error('Promotion failed:', error);
        messageElement.textContent = 'Network or server error occurred.';
        messageElement.style.color = 'red';
      }
    });
  }
});