(function() {
  const fab = document.getElementById("gi28-fab");
  const mainBtn = fab.querySelector(".fab-main");
  
  let isDragging = false, hasMoved = false;
  let startX, startY, offsetX, offsetY;
  
  // Restore Position
  const saved = JSON.parse(localStorage.getItem("gi28-fab-pos"));
  if (saved) {
    fab.style.left = saved.x + "px";
    fab.style.top = saved.y + "px";
    fab.style.right = "auto";
    fab.style.bottom = "auto";
  }

  // Mouse Down
  mainBtn.addEventListener("mousedown", e => {
    if (e.button !== 0) return;
    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    startY = e.clientY;
    const rect = fab.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    fab.style.transition = 'none'; // Instant drag
  });

  // Mouse Move
  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    if (dx > 3 || dy > 3) hasMoved = true;
    fab.style.left = (e.clientX - offsetX) + "px";
    fab.style.top = (e.clientY - offsetY) + "px";
    fab.style.right = "auto";
    fab.style.bottom = "auto";
  });

  // Mouse Up
  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    localStorage.setItem("gi28-fab-pos", JSON.stringify({ x: fab.offsetLeft, y: fab.offsetTop }));
  });

  // Click (Toggle)
  mainBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!hasMoved) fab.classList.toggle("open");
  });
  
  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!fab.contains(e.target) && fab.classList.contains("open")) {
      fab.classList.remove("open");
    }
  });
})();
