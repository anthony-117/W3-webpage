document.addEventListener("DOMContentLoaded", () => {
  const disclaimerPopup = document.getElementById("disclaimer-popup");
  const continueBtn = document.getElementById("continue-btn");
  const leaveBtn = document.getElementById("leave-btn");

  const hasSeenDisclaimer = sessionStorage.getItem("disclaimerShown");

  function showDisclaimer() {
    disclaimerPopup.style.display = "flex";
    disclaimerPopup.classList.add("active");

    document.body.style.overflow = "hidden";
  }

  function hideDisclaimer() {
    disclaimerPopup.style.display = "none";
    disclaimerPopup.classList.remove("active");

    document.body.style.overflow = "auto";

    sessionStorage.setItem("disclaimerShown", "true");
  }

  if (!hasSeenDisclaimer) {
    showDisclaimer();
  }

  continueBtn.addEventListener("click", hideDisclaimer);

  leaveBtn.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });

  disclaimerPopup.addEventListener("click", (e) => {
    if (e.target === disclaimerPopup) {
      e.preventDefault();
      e.stopPropagation();
    }
  });
});
