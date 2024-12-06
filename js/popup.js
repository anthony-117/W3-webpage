document.addEventListener("DOMContentLoaded", () => {
  const disclaimerPopup = document.getElementById("disclaimer-popup");
  const continueBtn = document.getElementById("continue-btn");
  const leaveBtn = document.getElementById("leave-btn");

  const hasSeenDisclaimer = sessionStorage.getItem("disclaimerShown");

  function showDisclaimer() {
    disclaimerPopup.style.display = "flex";
  }

  function hideDisclaimer() {
    disclaimerPopup.style.display = "none";
    sessionStorage.setItem("disclaimerShown", "true");
  }

  if (!hasSeenDisclaimer) {
    showDisclaimer();
  }

  continueBtn.addEventListener("click", hideDisclaimer);

  leaveBtn.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
});
