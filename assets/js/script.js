// =========================
// COMBINED SCRIPT FILE
// =========================

// Initialize when document is ready
$(document).ready(function() {
  // Navbar scroll effect
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 50) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $('#toTop').fadeIn();
    } else {
      $('#toTop').fadeOut();
    }
  });

  $('#toTop').click(function() {
    $('html, body').animate({scrollTop: 0}, 800);
    return false;
  });

  // Initialize all components
  initComponents();
});

function initComponents() {
  // Set current year in footer
  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
  
  // Initialize all components
  initSmoothScrolling();
  initBackToTopButton();
  initNavbarEffects();
  initContactForm();
  initCounterAnimation();
  initImpactCounters();
  initCounters();
  initAnimations();
  initPortfolio();
  initLeadershipCarousel();
  initScrollDownButton();
  
  // Scroll to top on page load
  window.scrollTo(0, 0);
}

// =========================
// NAVIGATION & LAYOUT
// =========================

function initSmoothScrolling() {
  // Handle navigation clicks
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Skip if it's a dropdown or has a special class
    if (anchor.getAttribute('role') === 'button' || anchor.classList.contains('dropdown-toggle')) {
      return;
    }
    
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      
      e.preventDefault();
      
      const targetId = href;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Height of fixed header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
          bsCollapse.hide();
        }

        // Smooth scroll to section
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initBackToTopButton() {
  const toTopBtn = document.getElementById('toTop');
  if (!toTopBtn) return;
  
  toTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Initial state
  toTopBtn.style.display = 'none';
  
  // Update visibility on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      toTopBtn.style.display = 'flex';
      toTopBtn.style.alignItems = 'center';
      toTopBtn.style.justifyContent = 'center';
    } else {
      toTopBtn.style.display = 'none';
    }
  });
}

function initNavbarEffects() {
  const navbar = document.getElementById('mainNav');
  if (!navbar) return;

  // Add shadow on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
    
    // Update active nav link
    updateActiveNavLink();
  });
}

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';
  
  // Find the current section in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Update active class on nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// =========================
// FORMS
// =========================

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    const formSuccess = document.getElementById('formSuccess');
    if (formSuccess) {
      formSuccess.classList.remove('d-none');
    }
    
    // Reset form
    this.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      if (formSuccess) {
        formSuccess.classList.add('d-none');
      }
    }, 5000);
  });
}

// =========================
// ANIMATIONS & COUNTERS
// =========================

function initAnimations() {
  // Add your animation initialization code here
  // Example: AOS.init(); if using AOS library
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            entry.target.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            entry.target.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function initImpactCounters() {
  const counters = document.querySelectorAll('.impact-stats .counter');
  if (!counters.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            entry.target.textContent = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// =========================
// PORTFOLIO
// =========================

function initPortfolio() {
  const filterButtons = document.querySelectorAll('.portfolio-filter .btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const loadMoreBtn = document.querySelector('.load-more-btn');
  let visibleItems = 6; // Number of items to show initially
  const totalItems = portfolioItems.length;

  // Initialize portfolio items
  function initPortfolioItems() {
    // Show initial items
    portfolioItems.forEach((item, index) => {
      if (index < visibleItems) {
        item.style.display = 'block';
        // Add visible class with delay for staggered animation
        setTimeout(() => {
          item.classList.add('visible');
        }, 100 * index);
      } else {
        item.style.display = 'none';
      }
    });

    // Hide load more button if all items are visible
    if (visibleItems >= totalItems) {
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    } else {
      if (loadMoreBtn) loadMoreBtn.style.display = 'inline-flex';
    }
  }

  // Filter portfolio items
  function filterPortfolio(category) {
    portfolioItems.forEach((item, index) => {
      if (category === 'all' || item.getAttribute('data-category') === category) {
        item.style.display = 'block';
        // Add visible class with delay for staggered animation
        setTimeout(() => {
          item.classList.add('visible');
        }, 100 * (index % 3));
      } else {
        item.style.display = 'none';
        item.classList.remove('visible');
      }
    });
  }

  // Load more items
  function loadMoreItems() {
    visibleItems = Math.min(visibleItems + 3, totalItems);
    
    portfolioItems.forEach((item, index) => {
      if (index < visibleItems) {
        item.style.display = 'block';
        // Add visible class with delay for staggered animation
        setTimeout(() => {
          item.classList.add('visible');
        }, 100 * (index % 3));
      }
    });

    // Hide load more button if all items are visible
    if (visibleItems >= totalItems && loadMoreBtn) {
      loadMoreBtn.style.display = 'none';
    }
  }

  // Event listeners
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Filter items
        const filterValue = this.getAttribute('data-filter');
        filterPortfolio(filterValue);
      });
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreItems);
  }

  // Initialize portfolio on page load
  initPortfolioItems();

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observe portfolio items
  portfolioItems.forEach(item => observer.observe(item));
}

// =========================
// SCROLL DOWN BUTTON
// =========================

function initScrollDownButton() {
  const scrollDownBtn = document.querySelector('.hero-scroll');
  if (!scrollDownBtn) return;

  scrollDownBtn.addEventListener('click', function() {
    const nextSection = document.querySelector('section:not(.hero)');
    if (nextSection) {
      const headerOffset = 80;
      const elementPosition = nextSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
}

// =========================
// LEADERSHIP CAROUSEL
// =========================

function initLeadershipCarousel() {
  const carousel = document.querySelector('.leadership-carousel');
  if (!carousel) return;
  
  const notes = document.querySelectorAll('.leadership-note');
  const dots = document.querySelectorAll('.note-nav-dots .dot');
  let currentIndex = 0;
  let autoSlideInterval;
  let isAnimating = false;
  const ANIMATION_DURATION = 600; // ms
  const AUTO_SLIDE_DELAY = 8000; // ms
  const SWIPE_THRESHOLD = 50; // px
  let touchStartX = 0;
  let touchEndX = 0;

  // Initialize the carousel
  function initCarousel() {
    if (notes.length === 0) return;
    
    // Show first note
    showNote(0);
    
    // Start auto-slide
    startAutoSlide();
    
    // Add event listeners
    setupEventListeners();
  }
  
  // Show note at specified index
  function showNote(index, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (index + notes.length) % notes.length;
    const currentNote = document.querySelector('.leadership-note.active');
    const nextNote = notes[currentIndex];

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Fade in next note
    nextNote.style.display = 'block';
    nextNote.style.opacity = '0';
    nextNote.style.transition = `opacity ${ANIMATION_DURATION}ms ease`;
    
    // Fade out current note
    if (currentNote) {
      currentNote.style.opacity = '0';
    }
    
    // Fade in next note
    setTimeout(() => {
      if (currentNote) {
        currentNote.classList.remove('active');
        currentNote.style.display = 'none';
      }
      
      nextNote.style.opacity = '1';
      nextNote.classList.add('active');
      
      setTimeout(() => {
        isAnimating = false;
      }, ANIMATION_DURATION);
    }, ANIMATION_DURATION);
  }
  
  // Go to next note
  function nextNote() {
    showNote(currentIndex + 1, 'next');
  }
  
  // Go to previous note
  function prevNote() {
    showNote(currentIndex - 1, 'prev');
  }
  
  // Start auto-slide
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextNote, AUTO_SLIDE_DELAY);
  }
  
  // Handle touch events for swipe
  function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
  }
  
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }
  
  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous
        prevNote();
      } else {
        // Swipe left - go to next
        nextNote();
      }
      // Reset auto-slide timer
      startAutoSlide();
    }
  }
  
  // Set up event listeners
  function setupEventListeners() {
    // Previous/Next buttons
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevNote();
        startAutoSlide();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextNote();
        startAutoSlide();
      });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (index !== currentIndex) {
          const direction = index > currentIndex ? 'next' : 'prev';
          showNote(index, direction);
          startAutoSlide();
        }
      });
    });
    
    // Touch events for mobile
    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Pause auto-slide on hover
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
      startAutoSlide();
    });
    
    // Pause auto-slide when tab is not active
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(autoSlideInterval);
      } else {
        startAutoSlide();
      }
    });
  }
  
  // Initialize the carousel
  initCarousel();
}
