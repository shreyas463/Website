document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.skills-filter-btn');
  const categories = document.querySelectorAll('.skill-category');

  if (!filterBtns.length || !categories.length) return;

  const applyFilter = (filter) => {
    filterBtns.forEach((b) => {
      const isActive = b.dataset.filter === filter;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    categories.forEach((card, index) => {
      const groups = (card.dataset.groups || '').split(' ');
      const show = filter === 'all' || groups.includes(filter);
      card.classList.toggle('is-hidden', !show);

      if (show) {
        card.classList.remove('is-revealed');
        void card.offsetWidth;
        card.classList.add('is-revealed');
        card.style.animationDelay = `${index * 0.05}s`;
      }
    });
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
  });
});
