function setThemeBasedOnBrowserPreference() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    document.body.classList.add("dark-theme");
    document
      .querySelector("#theme-toggle i")
      .classList.replace("bx-sun", "bx-moon");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  const icon = document.querySelector("#theme-toggle i");
  if (icon.classList.contains("bx-sun")) {
    icon.classList.replace("bx-sun", "bx-moon");
  } else {
    icon.classList.replace("bx-moon", "bx-sun");
  }
}
if (document.getElementById("theme-toggle")) {
  document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
  setThemeBasedOnBrowserPreference();
}
