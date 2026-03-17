(function () {
  var banner = document.getElementById("cookie-banner");
  var acceptBtn = document.getElementById("cookie-accept");

  if (localStorage.getItem("cookieConsent") === "accepted") {
    banner.style.display = "none";
    return;
  }

  banner.style.display = "flex";

  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "accepted");
    banner.style.display = "none";
  });
})();
