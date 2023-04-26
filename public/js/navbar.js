document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.querySelector("#mobile-menu");

  menuButton.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
  })
})
