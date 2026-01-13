const toggle = document.getElementById("navToggle")
const menu = document.getElementById(gi28Menu);
toggle.addEventListener("click", () => {
  toggle.classListt.toggle("active");
  menu.classList.toggle("open");
});
