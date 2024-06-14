window.onload = async () => {
  const auth0 = await createAuth0Client({
    domain: "dev-pbahhf4mgjtjvfb1.us.auth0.com",
    client_id: "Mihra2EsfE2xW2obSchWIqLwd0li41zx",
    authorizationParams: {
      redirect_uri: "https://jrmafes.github.io/pizza-42/"
    }
  });

  // Update UI function
  const updateUI = async () => {
    const isAuthenticated = await auth0.isAuthenticated();

    document.getElementById("login").classList.toggle("hidden", isAuthenticated);
    document.querySelectorAll(".auth-visible").forEach(e => e.classList.toggle("hidden", !isAuthenticated));
    document.querySelectorAll(".auth-invisible").forEach(e => e.classList.toggle("hidden", isAuthenticated));

    if (isAuthenticated) {
      const user = await auth0.getUser();
      document.getElementById("user-name").textContent = user.name;
      document.getElementById("profile-image").src = user.picture;
      document.getElementById("user-email").textContent = user.email;
      document.getElementById("profile-data").textContent = JSON.stringify(user, null, 2);
    }
  };

  // Handle redirect callback
  try {
    await auth0.handleRedirectCallback();
  } catch (error) {
    console.log("Error handling redirect callback: ", error);
  }

  updateUI();

  // Login function
  const login = async () => {
    await auth0.loginWithRedirect({
      redirect_uri: "https://jrmafes.github.io/pizza-42/"
    });
  };

  // Logout function
  const logout = () => {
    auth0.logout({
      returnTo: "https://jrmafes.github.io/pizza-42/"
    });
  };

  // Expose login and logout functions to global scope
  window.login = login;
  window.logout = logout;

  // Optional: Add event listener to login button if needed
  const loginButton = document.getElementById("login");
  if (loginButton) {
    loginButton.addEventListener("click", login);
  }
};
