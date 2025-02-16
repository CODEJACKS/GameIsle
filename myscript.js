// Register the Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('serviceworker.js').then(() => {
        console.log('Service Worker registered successfully.');
    });
}

let deferredPrompt = null;
const installButton = document.querySelector("#install");

// Detect if the user came from PWA Hub with ?install-pwa=true
const urlParams = new URLSearchParams(window.location.search);
const shouldPromptInstall = urlParams.get("install-pwa");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    
    if (installButton) {
        installButton.removeAttribute("hidden");
    }

    // If user came from PWA Hub, show the install prompt automatically
    if (shouldPromptInstall) {
        setTimeout(() => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => {
                console.log(`User response to the install prompt: ${choice.outcome}`);
                deferredPrompt = null;
            });
        }, 2000); // Small delay for better user experience
    }
});

// Handle manual install button click
if (installButton) {
    installButton.addEventListener("click", async () => {
        if (!deferredPrompt) return;
        
        hideInstallPromotion(); // Hide any custom install prompt UI
        await deferredPrompt.prompt();
        
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        
        deferredPrompt = null;
    });
}

// Hide install button after installation
window.addEventListener("appinstalled", () => {
    console.log("PWA was installed");
    disableInAppInstallPrompt();
});

// Utility function to hide install button
function disableInAppInstallPrompt() {
    deferredPrompt = null;
    if (installButton) {
        installButton.setAttribute("hidden", "");
    }
}

function hideInstallPromotion() {
    if (installButton) {
        installButton.style.display = "none";
    }
}


document.addEventListener("DOMContentLoaded", function() {
  const navbar = document.querySelector(".navbar");
  const navLinks = navbar.querySelectorAll("a");

  navLinks.forEach(link => {
    link.addEventListener("mouseover", function() {
      link.style.backgroundColor = "#555";
      link.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    });

    link.addEventListener("mouseout", function() {
      link.style.backgroundColor = "";
      link.style.boxShadow = "";
    });
  });

  function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const christmasDate = new Date(currentYear, 11, 25); // December 25th
    const timeDifference = christmasDate - now;
    const daysUntilChristmas = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    document.getElementById('countdown').innerText = `${daysUntilChristmas} days until Christmas!`;
  }

  updateCountdown();
  setInterval(updateCountdown, 86400000); // Update every 24 hours

  // Leaderboard and high score system
  var highScores = [
    { name: "Player1", score: 1000 },
    { name: "Player2", score: 900 },
    { name: "Player3", score: 800 }
  ];

  var highScoresList = document.getElementById("high-scores");
  highScores.forEach(function(score) {
    var listItem = document.createElement("li");
    listItem.textContent = score.name + ": " + score.score;
    highScoresList.appendChild(listItem);
  });

  // Achievements or badges
  var achievements = [
    { name: "First Win", description: "Win your first game" },
    { name: "High Scorer", description: "Score over 1000 points" }
  ];

  var achievementList = document.getElementById("achievement-list");
  achievements.forEach(function(achievement) {
    var listItem = document.createElement("li");
    listItem.textContent = achievement.name + ": " + achievement.description;
    achievementList.appendChild(listItem);
  });

  // Voting system for rating and reviewing games
  var ratingForm = document.getElementById("rating-form");
  ratingForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var rating = document.getElementById("rating").value;
    var review = "User rated this game " + rating + " out of 5.";
    var reviewDiv = document.createElement("div");
    reviewDiv.textContent = review;
    document.getElementById("reviews").appendChild(reviewDiv);
  });

  // Social media sharing options
  var socialMediaLinks = document.querySelectorAll("#social-media a");
  socialMediaLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      var url = link.href;
      window.open(url, "_blank");
    });
  });

  // Comment section or forum
  var commentForm = document.getElementById("comment-form");
  commentForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var comment = document.getElementById("comment").value;
    var commentDiv = document.createElement("div");
    commentDiv.textContent = comment;
    document.getElementById("comment-list").appendChild(commentDiv);
    document.getElementById("comment").value = "";
  });

  // Newsletter or email subscription feature
  var subscriptionForm = document.getElementById("subscription-form");
  subscriptionForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    alert("Thank you for subscribing with email: " + email);
    document.getElementById("email").value = "";
  });

  // Website appearance customization options
  var customizationForm = document.getElementById("customization-form");
  customizationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var theme = document.getElementById("theme").value;
    if (theme === "light") {
      document.body.style.backgroundColor = "#FFFFFF";
      document.body.style.color = "#000000";
    } else if (theme === "dark") {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#FFFFFF";
    }
    localStorage.setItem("theme", theme);
  });

  // Apply saved theme on page load
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    if (savedTheme === "light") {
      document.body.style.backgroundColor = "#FFFFFF";
      document.body.style.color = "#000000";
    } else if (savedTheme === "dark") {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#FFFFFF";
    }
  }

  // Personalized game recommendations
  var recommendations = [
    { name: "Game 1", link: "game1.html" },
    { name: "Game 2", link: "game2.html" }
  ];

  var recommendationList = document.getElementById("recommendation-list");
  recommendations.forEach(function(recommendation) {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    link.href = recommendation.link;
    link.textContent = recommendation.name;
    listItem.appendChild(link);
    recommendationList.appendChild(listItem);
  });

  // Load personalized game recommendations based on user preferences
  var userPreferences = localStorage.getItem("userPreferences");
  if (userPreferences) {
    userPreferences = JSON.parse(userPreferences);
    // Update recommendations based on user preferences
    // This is a placeholder, you can implement your own logic here
    recommendations = recommendations.filter(function(recommendation) {
      return userPreferences.includes(recommendation.name);
    });
    recommendationList.innerHTML = "";
    recommendations.forEach(function(recommendation) {
      var listItem = document.createElement("li");
      var link = document.createElement("a");
      link.href = recommendation.link;
      link.textContent = recommendation.name;
      listItem.appendChild(link);
      recommendationList.appendChild(listItem);
    });
  }

  // Add event listener for "Accept" button to hide the cookies banner
  var acceptCookiesButton = document.getElementById("accept-cookies");
  acceptCookiesButton.addEventListener("click", function() {
    document.getElementById("cookie-consent-banner").style.display = "none";
    localStorage.setItem("cookieConsent", "accepted");
  });

  // Add event listener for "Decline" button to hide the cookies banner
  var declineCookiesButton = document.getElementById("decline-cookies");
  declineCookiesButton.addEventListener("click", function() {
    document.getElementById("cookie-consent-banner").style.display = "none";
    localStorage.setItem("cookieConsent", "declined");
  });

  // Check user preference in local storage to hide the cookies banner on page load
  var cookieConsent = localStorage.getItem("cookieConsent");
  if (cookieConsent === "accepted" || cookieConsent === "declined") {
    document.getElementById("cookie-consent-banner").style.display = "none";
  }

  // Search functionality
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", function() {
    const query = searchInput.value.toLowerCase();
    const gameLinks = document.querySelectorAll(".container a");

    gameLinks.forEach(function(link) {
      const gameName = link.textContent.toLowerCase();
      if (gameName.includes(query)) {
        link.style.display = "block";
      } else {
        link.style.display = "none";
      }
    });
  });

  // Subtle animations
  const buttons = document.querySelectorAll(".custom-button");
  buttons.forEach(button => {
    button.addEventListener("mouseover", function() {
      button.style.transform = "scale(1.05)";
      button.style.transition = "transform 0.3s ease";
    });

    button.addEventListener("mouseout", function() {
      button.style.transform = "scale(1)";
    });
  });
});
