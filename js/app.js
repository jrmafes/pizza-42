auth0.createAuth0Client({
  domain: "dev-pbahhf4mgjtjvfb1.us.auth0.com",
  clientId: "Mihra2EsfE2xW2obSchWIqLwd0li41zx",
  authorizationParams: {
    redirect_uri: "https://jrmafes.github.io/pizza-42/"
  }
}).then(async (auth0Client) => {
  // Assumes a button with id "login" in the DOM
  const loginButton = document.getElementById("login");

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

window.onload = async () => {
  await auth0.handleRedirectCallback();
  updateUI();
};

  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.loginWithRedirect();
  });

  if (location.search.includes("state=") && 
      (location.search.includes("code=") || 
      location.search.includes("error="))) {
    await auth0Client.handleRedirectCallback();
    window.history.replaceState({}, document.title, "/");
  }

  // Assumes a button with id "logout" in the DOM
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    auth0Client.logout();
  });

  const isAuthenticated = await auth0Client.isAuthenticated();
  const userProfile = await auth0Client.getUser();

  // Assumes an element with id "profile" in the DOM
  const profileElement = document.getElementById("profile");

  if (isAuthenticated) {
    profileElement.style.display = "block";
    profileElement.innerHTML = `
            <p>${userProfile.name}</p>
            <img src="${userProfile.picture}" />
          `;
  } else {
    profileElement.style.display = "none";
  }
});
