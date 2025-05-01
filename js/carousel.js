
// Carousel and Slideshow Functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Hero Slideshow
  initHeroSlideshow();
  
  // Initialize Destination Carousel
  initDestinationCarousel();
  
  // Initialize Testimonial Slider
  initTestimonialSlider();
});

// Hero Slideshow
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slideshow-dots .dot');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  let currentSlide = 0;
  let slideInterval;
  
  // Function to show a specific slide
  function showSlide(index) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set the current slide and add active class
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  // Function to show the next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    showSlide(nextIndex);
  }
  
  // Function to show the previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    showSlide(prevIndex);
  }
  
  // Set up click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showSlide(index);
      resetSlideInterval();
    });
  });
  
  // Set up prev/next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      resetSlideInterval();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      nextSlide();
      resetSlideInterval();
    });
  }
  
  // Auto-advance slides
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
  }
  
  // Initialize
  showSlide(0);
  startSlideInterval();
}

// Destination Carousel
function initDestinationCarousel() {
  const carousel = document.querySelector('.destination-carousel');
  const prevBtn = document.getElementById('prev-destination');
  const nextBtn = document.getElementById('next-destination');
  
  if (!carousel || !prevBtn || !nextBtn) return;
  
  const cardWidth = 320; // Card width + gap
  const scrollAmount = cardWidth * 2;
  
  prevBtn.addEventListener('click', function() {
    carousel.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  });
  
  nextBtn.addEventListener('click', function() {
    carousel.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  });
  
  // Check if scroll buttons should be visible
  function updateScrollButtonsVisibility() {
    const isScrollable = carousel.scrollWidth > carousel.clientWidth;
    const isScrolledToStart = carousel.scrollLeft <= 10;
    const isScrolledToEnd = carousel.scrollWidth - carousel.scrollLeft - carousel.clientWidth <= 10;
    
    if (!isScrollable) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = isScrolledToStart ? 'none' : 'flex';
      nextBtn.style.display = isScrolledToEnd ? 'none' : 'flex';
    }
  }
  
  // Initialize button visibility
  setTimeout(updateScrollButtonsVisibility, 100);
  
  // Update button visibility on scroll and window resize
  carousel.addEventListener('scroll', updateScrollButtonsVisibility);
  window.addEventListener('resize', updateScrollButtonsVisibility);
}

// Testimonial Slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.testimonial-dots .dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentIndex = 0;
  
  if (testimonials.length === 0) return;
  
  // Function to show a specific testimonial
  function showTestimonial(index) {
    // Remove active class from all testimonials and dots
    testimonials.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Set the current index and add active class
    currentIndex = index;
    testimonials[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }
  
  // Set up click events for dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      showTestimonial(index);
    });
  });
  
  // Set up prev/next buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) {
        prevIndex = testimonials.length - 1;
      }
      showTestimonial(prevIndex);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= testimonials.length) {
        nextIndex = 0;
      }
      showTestimonial(nextIndex);
    });
  }
  
  // Auto-rotate testimonials
  let testimonialInterval = setInterval(function() {
    let nextIndex = currentIndex + 1;
    if (nextIndex >= testimonials.length) {
      nextIndex = 0;
    }
    showTestimonial(nextIndex);
  }, 7000);
  
  // Pause auto-rotation when user interacts
  [prevBtn, nextBtn].forEach(btn => {
    if (btn) {
      btn.addEventListener('click', function() {
        clearInterval(testimonialInterval);
      });
    }
  });
  
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      clearInterval(testimonialInterval);
    });
  });
  
  // Initialize
  showTestimonial(0);
}
