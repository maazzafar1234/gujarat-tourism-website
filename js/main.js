// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu toggle
  initMobileMenu();
  
  // Header scroll effect
  initHeaderScroll();
  
  // Initialize gallery filter and modal
  initGallery();
  
  // Initialize form submission
  initForms();
  
  // Initialize modal functionality for 'Read More' and 'Learn More'
  initReadMoreLearnMore();
  
  // Initialize chatbot
  initChatbot();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = this.querySelector('i');
    if (mainNav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mainNav.classList.remove('active');
      const icon = mobileMenuToggle.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });
}

// Gallery Functionality
function initGallery() {
  // Gallery filtering
  const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      
      // Filter gallery items
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
  
  // Gallery Modal
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCaption = document.getElementById('modal-caption');
  const closeModal = document.querySelector('.close-modal');
  
  // Open modal when clicking on gallery overlay or zoom button
  galleryItems.forEach(item => {
    const overlay = item.querySelector('.gallery-overlay');
    const zoomBtn = item.querySelector('.gallery-zoom');
    function showModal(e) {
      e.preventDefault();
      const imgSrc = item.querySelector('img').src;
      const caption = item.querySelector('h4').textContent;
      const description = item.querySelector('p').textContent;
      modalImg.src = imgSrc;
      modalCaption.innerHTML = `<h4>${caption}</h4><p>${description}</p>`;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
    // Attach to both overlay and zoom icon for better UX
    if (overlay) overlay.addEventListener('click', showModal);
    if (zoomBtn) zoomBtn.addEventListener('click', showModal);
  });
  
  // Close modal
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });
  
  // Close modal when clicking outside the content
  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Form Submissions
function initForms() {
  // Contact Form
  const contactForm = document.getElementById('inquiry-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Normally you would send the form data to a server here
      // For demo purposes, we'll just show an alert

      // Simple form validation
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      // Success message
      alert('Thank you for your message. We will contact you shortly!');

      // Reset form
      contactForm.reset();
    });
  }

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('newsletter-toast');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'newsletter-toast';
      toastContainer.style.position = 'fixed';
      toastContainer.style.top = '20px';
      toastContainer.style.right = '20px';
      toastContainer.style.padding = '10px 20px';
      toastContainer.style.backgroundColor = 'rgba(34,197,94,0.85)'; // greenish
      toastContainer.style.color = '#fff';
      toastContainer.style.fontWeight = '600';
      toastContainer.style.borderRadius = '6px';
      toastContainer.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
      toastContainer.style.zIndex = '9999';
      toastContainer.style.opacity = '0';
      toastContainer.style.transition = 'opacity 0.3s ease';
      document.body.appendChild(toastContainer);
    }

    const showToast = (message) => {
      toastContainer.textContent = message;
      toastContainer.style.opacity = '1';
      setTimeout(() => {
        toastContainer.style.opacity = '0';
      }, 3000);
    };

    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('newsletter-email').value;

      if (!email) {
        alert('Please enter your email address.');
        return;
      }

      // Show toast message
      showToast('Subscribed successfully!');

      // Reset form
      newsletterForm.reset();
    });
  }
}

// Utility Functions
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    window.scrollTo({
      top: section.offsetTop - 100,
      behavior: 'smooth'
    });
  }
}

// --- Add modal functionality for 'Read More' and 'Learn More' ---
function initReadMoreLearnMore() {
  // Read More on Destinations
  const readMores = document.querySelectorAll('.read-more[data-info]');
  // Learn More on Experiences
  const learnMores = document.querySelectorAll('.learn-more[data-info]');
  const infoModal = document.getElementById('info-modal');
  const infoBody = document.getElementById('info-modal-body');
  const closeBtn = document.getElementById('close-info-modal');

  function openInfoModal(title, info) {
    infoBody.innerHTML = `<h2>${title}</h2><p>${info}</p>`;
    infoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeInfoModal() {
    infoModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  readMores.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openInfoModal(this.dataset.title, this.dataset.info);
    });
  });
  learnMores.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      openInfoModal(this.dataset.title, this.dataset.info);
    });
  });
  if (closeBtn) closeBtn.addEventListener('click', closeInfoModal);

  // Close when clicking outside modal-content
  infoModal.addEventListener('click', function(e) {
    if (e.target === infoModal) closeInfoModal();
  });
}

// --- Enable Previous/Next on Destinations Carousel even if items are small ---
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

  // Always show buttons (do not hide, for always-enabled requirement)
  prevBtn.style.display = 'flex';
  nextBtn.style.display = 'flex';
}
document.addEventListener('DOMContentLoaded', function() {
  initDestinationCarousel();
});

// --- CHATBOT ---
function initChatbot() {
  const chatbotFab = document.getElementById('chatbot-fab');
  const chatbotModal = document.getElementById('chatbot-modal');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotBody = document.getElementById('chatbot-body');

  // Open chatbot window
  chatbotFab.addEventListener('click', () => {
    chatbotModal.classList.add('active');
    chatbotInput.focus();
  });
  // Close chatbot window
  chatbotClose.addEventListener('click', () => {
    chatbotModal.classList.remove('active');
  });
  // Send message logic
  function sendUserMessage(msg) {
    if (!msg.trim()) return;
    const userDiv = document.createElement('div');
    userDiv.className = 'chatbot-msg chatbot-msg-user';
    userDiv.textContent = msg;
    chatbotBody.appendChild(userDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
    setTimeout(() => sendBotReply(msg), 500);
  }
  function sendBotReply(msg) {
    // Basic replies for demo (can add more rules)
    let reply = '';
    const m = msg.toLowerCase();
    if (m.includes('hello') || m.includes('hi')) {
      reply = "Namaste! How may I assist you with Gujarat tourism?";
    } else if (m.includes('statue')) {
      reply = "The Statue of Unity is the world’s tallest statue, honoring Sardar Vallabhbhai Patel in Kevadia.";
    } else if (m.includes('culture')) {
      reply = "Gujarat’s culture includes dance like Garba/Dandiya, vibrant festivals, and exquisite handicrafts.";
    } else if (m.includes('food')) {
      reply = "Don’t miss Gujarati Thali, dhokla, fafda, and sweets like jalebi!";
    } else if (m.includes('lion') || m.includes('wildlife')) {
      reply = "Gir National Park is famous for the Asiatic lion. Visit between December and April for the best experience.";
    } else if (m.includes('thank')) {
      reply = "You’re welcome! Happy to help.";
    } else {
      reply = "I’m here to help! Ask me about destinations, culture, food, or anything about Gujarat.";
    }
    const botDiv = document.createElement('div');
    botDiv.className = 'chatbot-msg chatbot-msg-bot';
    botDiv.textContent = reply;
    chatbotBody.appendChild(botDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
  }
  chatbotSend.addEventListener('click', () => {
    const msg = chatbotInput.value;
    sendUserMessage(msg);
    chatbotInput.value = '';
  });
  chatbotInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      chatbotSend.click();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const travelDateInput = document.getElementById("travel-date");
  const inquiryForm = document.getElementById("inquiry-form");

  // Set the minimum travel date to today
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  travelDateInput.setAttribute("min", minDate);

  // Handle form submission
  inquiryForm.addEventListener("submit", (event) => {
    const selectedDate = travelDateInput.value;
    const errorMessage = document.createElement("p");
    errorMessage.style.color = "red";

    // Check if the selected travel date is valid
    if (selectedDate && selectedDate < minDate) {
      event.preventDefault(); // Prevent form submission
      errorMessage.textContent = "Travel date cannot be in the past.";
      if (!travelDateInput.nextElementSibling) {
        travelDateInput.parentNode.appendChild(errorMessage);
      }
    } else if (travelDateInput.nextElementSibling) {
      // Remove any existing error message
      travelDateInput.parentNode.removeChild(travelDateInput.nextElementSibling);
    }
  });
});

