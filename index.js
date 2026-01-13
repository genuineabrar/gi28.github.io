// Smooth Number Counter Animation
        document.addEventListener('DOMContentLoaded', () => {
            const counters = document.querySelectorAll('.stat-value');
            
            counters.forEach(counter => {
                const targetText = counter.getAttribute('data-target');
                let isCurrency = false;
                let isPercent = false;
                let target = 0;

                if (counter.innerText === '$') isCurrency = true;
                if (counter.innerText === '%') isPercent = true;

                target = parseInt(targetText);
                if(isNaN(target)) target = 0;

                const duration = 2000;
                const frameDuration = 1000 / 60;
                const totalFrames = Math.round(duration / frameDuration);
                const easeOutQuad = t => t * (2 - t);

                let frame = 0;
                const countTo = target;

                const counterTimer = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = Math.round(countTo * progress);

                    let displayValue = currentCount;
                    
                    // Formatting logic
                    if (currentCount > 1000000) {
                         displayValue = (currentCount / 1000000).toFixed(1) + 'M';
                    } else if (currentCount > 1000) {
                        displayValue = (currentCount / 1000).toFixed(1) + 'K';
                    }

                    if (isCurrency) {
                        counter.innerText = '$' + displayValue;
                    } else if (isPercent) {
                        counter.innerText = currentCount + '%';
                    } else {
                        counter.innerText = displayValue;
                    }

                    if (frame === totalFrames) {
                        clearInterval(counterTimer);
                    }
                }, frameDuration);
            });

            // Animate Progress Bars
            const bars = document.querySelectorAll('.progress-fill');
            bars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 500);
            });

            // Intersection observer for fade-in animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.card, .kpi-card').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'all 0.6s ease-out';
                observer.observe(el);
            });
        });

        // Cursor effect canvas setup
        const canvas = document.getElementById('gi28-cursor-canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            
            const resizeCanvas = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            window.addEventListener('resize', resizeCanvas);
            resizeCanvas();
            
            let mouseX = -100, mouseY = -100;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });
            
            function drawCursor() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Outer ring
                ctx.strokeStyle = 'rgba(0, 242, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 15, 0, Math.PI * 2);
                ctx.stroke();
                
                // Inner circle
                ctx.fillStyle = 'rgba(233, 46, 251, 0.3)';
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 4, 0, Math.PI * 2);
                ctx.fill();
                
                // Center dot
                ctx.fillStyle = 'rgba(0, 242, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, 2, 0, Math.PI * 2);
                ctx.fill();
                
                requestAnimationFrame(drawCursor);
            }
            
            drawCursor();
        }

        // Popup functionality
        let timer;
        function openPopup() {
            document.getElementById('popup').style.display = 'flex';
            let s = 5;
            document.getElementById('t').textContent = s;
            timer = setInterval(() => {
                s--;
                document.getElementById('t').textContent = s;
                if (s <= 0) {
                clearInterval(timer);
                goQuiz();
                }
            }, 1000);
        }

        function goQuiz() {
            clearInterval(timer);
            location.href = 'tools.html';
        }

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    
    

  /* ======================================================
   ABOUT DEVELOPER – PREMIUM 3D CARDS VERSION
   Author: Abrar Khan
====================================================== */

/* ========== FADE IN ON LOAD ========== */
document.querySelectorAll(".fade").forEach((el, i) => {
  setTimeout(() => el.classList.add("show"), 150 * i);
});

/* ========== SKILL PROGRESS ANIMATION ========== */
document.querySelectorAll(".bar div").forEach(bar => {
  const width = bar.getAttribute("data-w");
  setTimeout(() => {
    bar.style.width = width;
  }, 800);
});

/* ========== 3D CARD LOGIC ========== */
const card = document.getElementById("card");

let rotX = 0;
let rotY = 0;
let velX = 0;
let velY = 0;
let isDragging = false;
let lastX = 0;
let lastY = 0;
let autoRotate = true;

/* ========== PREMIUM SOUND ========== */
const touchSound = new Audio(
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_8c1d7d6d2f.mp3?filename=click-124467.mp3"
);
touchSound.volume = 0.12;

/* ========== AUTO ROTATION LOOP ========== */
function animateCard() {
  if (!isDragging && autoRotate) {
    rotY += 0.12;
  }

  rotX += velX;
  rotY += velY;

  velX *= 0.92;
  velY *= 0.92;

  card.style.transform = `
    rotateX(${rotX}deg)
    rotateY(${rotY}deg)
  `;

  updateShadow();
  requestAnimationFrame(animateCard);
}
animateCard();

/* ========== DYNAMIC SHADOW ========== */
function updateShadow() {
  const shadowX = rotY * 0.6;
  const shadowY = rotX * 0.6;

  card.style.boxShadow = `
    ${-shadowX}px ${shadowY}px 100px rgba(0,0,0,.9),
    0 0 60px rgba(178,108,255,.5),
    inset 0 2px 4px rgba(255,255,255,.08),
    inset 0 -2px 4px rgba(0,0,0,.6)
  `;
}

/* ========== MOUSE EVENTS ========== */
card.addEventListener("mousedown", e => {
  isDragging = true;
  autoRotate = false;
  lastX = e.clientX;
  lastY = e.clientY;
  touchSound.play().catch(()=>{});
});

window.addEventListener("mouseup", () => {
  isDragging = false;
  autoRotate = true;
});

window.addEventListener("mousemove", e => {
  if (!isDragging) return;

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  rotY += dx * 0.45;
  rotX -= dy * 0.45;

  velY = dx * 0.06;
  velX = -dy * 0.06;

  lastX = e.clientX;
  lastY = e.clientY;
});

/* ========== TOUCH EVENTS ========== */
card.addEventListener("touchstart", e => {
  autoRotate = false;
  isDragging = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
  touchSound.play().catch(()=>{});
}, { passive:true });

card.addEventListener("touchmove", e => {
  if (!isDragging) return;

  const x = e.touches[0].clientX;
  const y = e.touches[0].clientY;

  const dx = x - lastX;
  const dy = y - lastY;

  rotY += dx * 0.5;
  rotX -= dy * 0.5;

  velY = dx * 0.07;
  velX = -dy * 0.07;

  lastX = x;
  lastY = y;
}, { passive:true });

card.addEventListener("touchend", () => {
  isDragging = false;
  autoRotate = true;
});

/* ========== INSTAGRAM DEEP LINK ========== */
card.addEventListener("click", () => {
  const url = /Android|iPhone|iPad/i.test(navigator.userAgent)
    ? "instagram://user?username=dev.abrarkhan"
    : "https://www.instagram.com/dev.abrarkhan";
  window.location.href = url;
});


const cookieBox = document.getElementById("cookieConsent");
const acceptAll = document.getElementById("acceptAll");
const acceptNecessary = document.getElementById("acceptNecessary");

// Show popup if no choice saved
if(!localStorage.getItem("cookieConsent")){
  cookieBox.style.display = "flex";
}

// Accept all cookies
acceptAll.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "all");
  cookieBox.style.display = "none";
});

// Accept only necessary cookies
acceptNecessary.addEventListener("click", () => {
  localStorage.setItem("cookieConsent", "necessary");
  cookieBox.style.display = "none";
});
