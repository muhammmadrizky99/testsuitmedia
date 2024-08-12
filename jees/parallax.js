window.addEventListener('scroll', function () {
    const scrollPosition = window.pageYOffset;
    const bannerImage = document.querySelector('.banner-image img');
    
    // Membuat efek parallax dengan mengubah posisi gambar
    bannerImage.style.transform = `translateY(${scrollPosition * 0.5}px)`;
  });