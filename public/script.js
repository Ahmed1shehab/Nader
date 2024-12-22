const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get email and password from the form
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Send a POST request to the backend
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // Handle the response
    const data = await response.json();
    if (response.ok) {
      // Redirect to admin.html on success
      window.location.href = '/admin.html';
    } else {
      // Show an error message
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
