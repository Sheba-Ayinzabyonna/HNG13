const timeElement = document.querySelector('[data-testid="test-user-time"]');

function updateTime() {
  // Get the current time in milliseconds
  const now = Date.now();

  // Update the content
  if (timeElement) {
    timeElement.textContent = now;
  }
}

// Run immediately on load
updateTime();

// Optionally, update the time every second (or at a reasonable interval)
// setInterval(updateTime, 1000);
