
(function() {
  const container = document.getElementById("gi28-back");
  const btn = container.querySelector(".back-blob");
  
  let isDragging = false;
  let hasMoved = false;
  let startX, startY, offsetX, offsetY;
  
  // 1. Restore Position (Separate storage key from the right menu)
  try {
    const saved = JSON.parse(localStorage.getItem("gi28-back-pos"));
    if (saved) {
      container.style.left = saved.x + "px";
      container.style.top = saved.y + "px";
      container.style.bottom = "auto";
      container.style.right = "auto";
    }
  } catch (e) {}

  // 2. Drag Start
  btn.addEventListener("mousedown", e => {
    if (e.button !== 0) return;
    isDragging = true;
    hasMoved = false;
    startX = e.clientX;
    startY = e.clientY;
    
    const rect = container.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    container.style.transition = 'none';
  });

  // 3. Drag Move
  document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    
    if (dx > 3 || dy > 3) hasMoved = true;
    
    container.style.left = (e.clientX - offsetX) + "px";
    container.style.top = (e.clientY - offsetY) + "px";
    container.style.bottom = "auto"; 
    container.style.right = "auto";
  });

  // 4. Drag End
  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    
    localStorage.setItem("gi28-back-pos", JSON.stringify({
      x: container.offsetLeft,
      y: container.offsetTop
    }));
  });

  // 5. Click Action (Go Back)
  btn.addEventListener("click", () => {
    // Only go back if we didn't drag the button
    if (!hasMoved) {
      window.history.back();
    }
  });

})();
