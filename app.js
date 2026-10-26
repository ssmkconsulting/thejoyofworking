const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
const mobile = matchMedia('(max-width: 800px)');
const setMenu = open => {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.dataset.collapsed = String(mobile.matches && !open);
};
menuButton.hidden = false;
setMenu(false);
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
mobile.addEventListener('change', () => setMenu(false));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
document.querySelectorAll('[data-interest]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('#interest').value = link.dataset.interest;
    if (link.dataset.keynote && !document.querySelector('#message').value.trim()) {
      document.querySelector('#message').value = 'I’d like to explore bringing A Million Edits to our event.';
    }
  });
});
const form = document.querySelector('#contact-form');
form.addEventListener('submit', event => {
  if (!form.hasAttribute('action')) {
    event.preventDefault();
    document.querySelector('#contact-status').textContent = 'This form isn’t connected yet. Your message has not been sent.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
