document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for internal links
  document.querySelectorAll('a.navlink').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Animate skill bars when they enter viewport
  function animateSkills() {
    document.querySelectorAll('.bar i').forEach(function (el) {
      if (el.dataset.animated) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.style.width = el.getAttribute('data-value') + '%';
        el.dataset.animated = '1';
      }
    });
  }
  window.addEventListener('scroll', animateSkills);
  window.addEventListener('load', animateSkills);

  // Modal: open with project details
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function openModal(html) {
    modalContent.innerHTML = html;
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal() {
    modal.classList.add('hidden');
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('[data-project]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const id = this.dataset.project;
      let html = '';
      if (id === 'eatenly') {
        html = '<h3>Website: Eatenly</h3>' +
               '<p class="muted">Website untuk restoran — landing, menu, dan pemesanan sederhana.</p>' +
               '<ul><li>Peran: Frontend</li><li>Teknologi: HTML, CSS, JS</li><li>Tahun: 2025</li></ul>';
      } else if (id === 'resume') {
        html = '<h3>Personal Resume</h3>' +
               '<p class="muted">Resume ini tersedia sebagai web dan PDF. Klik tombol "Download Resume" untuk unduhan PDF.</p>';
      } else {
        html = '<h3>Detail Proyek</h3><p class="muted">Detail belum tersedia.</p>';
      }
      openModal(html);
    });
  });

  // close modal
  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  // Theme toggle: toggle body.dark and persist preference
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
    document.body.classList.add('dark');
    if (themeToggle) themeToggle.setAttribute('aria-pressed', 'true');
    if (themeToggle) themeToggle.textContent = 'Light';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const isDark = document.body.classList.toggle('dark');
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      themeToggle.textContent = isDark ? 'Light' : 'Theme';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Small UX: animate skills immediately if content is in view on load
  animateSkills();
});