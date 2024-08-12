let lastScrollTop = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    header.classList.add('hidden');  // Hilangkan header saat scroll ke bawah
  } else {
    header.classList.remove('hidden');  // Tampilkan header saat scroll ke atas
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});
