// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Active nav link on scroll
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener('scroll', () => {
  let current = "home";
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (top >= offset && top < offset + height) current = sec.id;
  });
  navLinks.forEach(li => {
    li.classList.remove('active');
    if (li.getAttribute('href') === '#' + current) li.classList.add('active');
  });

  // Back to top button
  document.getElementById('toTop').style.display = window.scrollY > 400 ? 'block' : 'none';
});

document.getElementById('toTop').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

// Demo form capture
$('#contactForm').on('submit', function (e) {
  e.preventDefault();
  $('#formSuccess').removeClass('d-none');
  this.reset();
});
