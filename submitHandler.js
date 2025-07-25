// submitHandler.js

export async function handleSubmit(picks) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split('T')[0];

  try {
    const response = await fetch('/submit-picks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: formattedDate, picks }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server error:', errorText);
      alert('Failed to save your picks. Please try again.');
    } else {
      console.log('Picks submitted successfully!');
    }
  } catch (error) {
    console.error('Network error:', error);
    alert('Failed to reach the server.');
  }
}
