const testingBypass = true; // set to false when deploying



function reserveCottage(event, cottageName) {
  event.preventDefault();
  const form = event.target;
  const startDate = form.start.value;
  const endDate = form.end.value;

  if (new Date(startDate) >= new Date(endDate)) {
    alert("End date must be after start date.");
    return false;
  }

  alert(`Reserved "${cottageName}" from ${startDate} to ${endDate}.`);
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const testingBypass = true; // Set to false when deploying

  let userData;

  if (testingBypass) {
    // 👇 Fake data for testing without login
    userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'test123' // if your code ever needs it
    };
  } else {
    try {
      const userDataString = localStorage.getItem('userData');
      if (!userDataString) {
        window.location.href = 'login.html';
        return;
      }

      userData = JSON.parse(userDataString);

      if (!userData.name || !userData.email) {
        window.location.href = 'login.html';
        return;
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      window.location.href = 'login.html';
      return;
    }
  }

  // 🎯 At this point, userData is safe to use
  document.getElementById('user-name').textContent = userData.name;
  document.getElementById('user-email').textContent = userData.email;

  const container = document.querySelector('.container');
  if (container) {
    container.style.visibility = 'visible';
  }
});


function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}
