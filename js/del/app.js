auth0.createAuth0Client({
  domain: "dev-pbahhf4mgjtjvfb1.us.auth0.com",
  clientId: "Mihra2EsfE2xW2obSchWIqLwd0li41zx",
  authorizationParams: {
    redirect_uri: "https://jrmafes.github.io/pizza-42/"
  }
}).then(async (auth0Client) => {
  // Assumes buttons with ids "login" and "logout" and an element with id "profile" in the DOM
  const loginButton = document.getElementById("login");
  const logoutButton = document.getElementById("logout");
  const profileElement = document.getElementById("profile");

  // Handle the login button click
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.loginWithRedirect();
  });

  // Handle the logout button click
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.logout({ returnTo: window.location.origin });
  });

  // Handle the redirect callback
  if (location.search.includes("state=") && 
      (location.search.includes("code=") || 
      location.search.includes("error="))) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  // Check if the user is authenticated
  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    // Fetch and display user profile information
    const userProfile = await auth0Client.getUser();
    profileElement.style.display = "block";
    profileElement.innerHTML = `
      <p>${userProfile.name}</p>
      <img src="${userProfile.picture}" alt="Profile Picture" />
      <p>${userProfile.email}</p>
    `;
  } else {
    profileElement.style.display = "none";
  }

  // Update UI based on authentication state
  updateUI(isAuthenticated);

  function updateUI(isAuthenticated) {
    if (isAuthenticated) {
      loginButton.style.display = "none";
      logoutButton.style.display = "block";
    } else {
      loginButton.style.display = "block";
      logoutButton.style.display = "none";
    }
  }
});
