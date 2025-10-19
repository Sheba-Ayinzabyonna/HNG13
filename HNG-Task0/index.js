// Function to update the current time in milliseconds
function updateTime() {
  const timeElement = document.querySelector('[data-testid="test-user-time"]');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

// Initial call and set interval for continuous update
updateTime();
// Update every second (1000ms) - a reasonable delta for this requirement
setInterval(updateTime, 1000);
