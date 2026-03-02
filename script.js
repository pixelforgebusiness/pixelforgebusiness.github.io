// script.js
document.addEventListener('DOMContentLoaded', function() {
  // ===== INTERSECTION OBSERVER (fade animations) =====
  const sections = document.querySelectorAll('.fade-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // optional: keep observing to handle dynamic content, but we can unobserve after first show
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px' // slightly before entering viewport
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // ===== SMOOTH HOVER + ADDITIONAL GLOW (already in CSS, but we ensure smoothness) =====
  // Navbar background change on scroll (subtle)
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255,255,255,0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
    } else {
      navbar.style.background = 'rgba(255,255,255,0.8)';
      navbar.style.boxShadow = 'none';
    }
  });

  // Optional: add active link highlighting based on scroll (UX)
  const sectionsWithId = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  function highlightNav() {
    let scrollY = window.scrollY;
    sectionsWithId.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // style for active link (small addition, not in CSS, inject dynamically)
  const style = document.createElement('style');
  style.innerHTML = `.nav-links a.active { color: var(--primary); border-bottom-color: var(--primary); }`;
  document.head.appendChild(style);
  
  window.addEventListener('scroll', highlightNav);
  highlightNav(); // initial

  // ===== form submit feedback (optional – but action is handled by formsubmit) =====
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      // we can show a quick local alert (optional) but the redirect will happen
      // just to let user know it's sending
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending... <i class="fa-regular fa-spinner fa-spin"></i>';
      btn.disabled = true;
      // FormSubmit will handle the rest, but if there's an error we reset (not needed usually)
      // but we can reset on page hide? Not needed.
    });
  }
});
