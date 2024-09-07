document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
  
    let currentSlide = 0;
  
    function updateSlider() {
      const offset = -currentSlide * 100;
      sliderWrapper.style.transform = `translateX(${offset}%)`;
    }
  
    function showPrevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    }
  
    function showNextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }
  
    prevButton.addEventListener('click', showPrevSlide);
    nextButton.addEventListener('click', showNextSlide);
  
    updateSlider(); // Inicializa o slider
  });
  