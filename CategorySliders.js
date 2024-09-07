document.addEventListener('DOMContentLoaded', function() {
    // Função para inicializar um slider
    function initializeSlider(wrapperClass, slideClass, prevButtonClass, nextButtonClass) {
      const sliderWrapper = document.querySelector(wrapperClass);
      const slides = document.querySelectorAll(slideClass);
      const prevButton = document.querySelector(prevButtonClass);
      const nextButton = document.querySelector(nextButtonClass);
  
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
    }
  
    // Inicializa os sliders
    initializeSlider('.slider-wrapper1', '.slide1', '.prev1', '.next1');
    initializeSlider('.slider-wrapper2', '.slide2', '.prev2', '.next2');
    initializeSlider('.slider-wrapper3', '.slide3', '.prev3', '.next3');
  });
  