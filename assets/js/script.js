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
  initServiceModals();
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
// SERVICES
// =========================

// Service data - you can expand this with more services as needed
const servicesData = {
    'startup-branding': {
        title: 'Startup Brand Identity',
        image: 'assets/img/services/startup-branding.jpg',
        description: 'Craft a unique and memorable brand identity that resonates with your target audience. Our comprehensive branding services include logo design, color palette, typography, and brand guidelines that will set your startup apart.',
        features: [
            'Logo & Visual Identity Design',
            'Brand Strategy & Positioning',
            'Brand Style Guide',
            'Business Card & Stationery Design',
            'Brand Voice & Messaging',
            'Competitor Analysis'
        ],
        price: 'From $2,499',
        timeline: '4-6 weeks'
    },
    'web-development': {
        title: 'Web Development',
        image: 'assets/img/services/web-development.jpg',
        description: 'Build a powerful online presence with our custom web development services. We create fast, responsive, and user-friendly websites that drive engagement and conversions for your business.',
        features: [
            'Custom Website Development',
            'E-commerce Solutions',
            'Mobile-First Design',
            'CMS Integration',
            'Website Maintenance',
            'Performance Optimization'
        ],
        price: 'From $3,999',
        timeline: '6-8 weeks'
    },
    'digital-marketing': {
        title: 'Digital Marketing',
        image: 'assets/img/services/digital-marketing.jpg',
        description: 'Reach your target audience and grow your business with our data-driven digital marketing strategies. We help you connect with customers across multiple digital channels.',
        features: [
            'SEO & Content Marketing',
            'Social Media Management',
            'PPC Advertising',
            'Email Marketing',
            'Analytics & Reporting',
            'Conversion Rate Optimization'
        ],
        price: 'Custom Pricing',
        timeline: 'Ongoing'
    },
    'video-production': {
        title: 'Corporate Video Production',
        image: 'assets/img/services/video-production.jpg',
        description: 'Tell your brand\'s story through compelling video content. Our professional video production services help you engage your audience and communicate your message effectively.',
        features: [
            'Concept Development',
            'Scriptwriting',
            'Professional Videography',
            'Motion Graphics',
            'Video Editing',
            'Post-Production'
        ],
        price: 'From $4,999',
        timeline: '4-8 weeks'
    },
    'performance-marketing': {
        title: 'Performance Marketing',
        image: 'assets/img/services/performance-marketing.jpg',
        description: 'Maximize your marketing ROI with our performance-driven strategies. We focus on delivering measurable results through data analysis and optimization.',
        features: [
            'Paid Advertising',
            'Retargeting Campaigns',
            'Conversion Optimization',
            'A/B Testing',
            'ROI Tracking',
            'Marketing Automation'
        ],
        price: 'Custom Pricing',
        timeline: 'Ongoing'
    },
    'global-movement': {
        title: 'Global Movement',
        image: 'assets/img/services/global-movement.jpg',
        description: 'Expand your brand\'s reach with our global marketing strategies. We help you adapt your message for international audiences and navigate cultural differences.',
        features: [
            'International Market Research',
            'Localization Services',
            'Global Campaign Management',
            'Cross-Cultural Consulting',
            'Multilingual Content',
            'Global SEO'
        ],
        price: 'Custom Pricing',
        timeline: 'Varies by scope'
    }
};

// Initialize service modals
function initServiceModals() {
    // Add click event to all service cards
    document.querySelectorAll('.service-card').forEach(card => {
        const serviceId = card.getAttribute('data-service');
        if (serviceId && servicesData[serviceId]) {
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on a link or button inside the card
                if (e.target.tagName === 'A' || e.target.closest('a, button')) {
                    return;
                }
                openServiceModal(servicesData[serviceId]);
            });
            
            // Add cursor pointer to indicate clickable
            card.style.cursor = 'pointer';
        }
    });

    // Close modal when clicking the close button or outside the modal
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                closeServiceModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeServiceModal();
        }
    });
}

// Open service modal with data
function openServiceModal(serviceData) {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;

    // Populate modal with service data
    modal.querySelector('.modal-title').textContent = serviceData.title;
    modal.querySelector('.modal-image').src = serviceData.image;
    modal.querySelector('.modal-image').alt = serviceData.title;
    modal.querySelector('.modal-description').textContent = serviceData.description;
    
    // Populate features
    const featuresList = modal.querySelector('.modal-features');
    if (featuresList) {
        featuresList.innerHTML = serviceData.features
            .map(feature => `<li>${feature}</li>`)
            .join('');
    }
    
    // Set price and timeline
    modal.querySelector('.modal-price').textContent = serviceData.price;
    modal.querySelector('.modal-timeline').textContent = serviceData.timeline;
    
    // Show modal
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus for accessibility
    modal.focus();
}

// Close service modal
function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (!modal) return;
    
    document.body.style.overflow = '';
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

// =========================
// PORTFOLIO
// =========================

function initPortfolio() {
  // Portfolio data
  const portfolioData = [
    {
      id: 'corporate-identity',
      title: 'Corporate Identity Design',
      category: 'branding',
      client: 'Nexus Enterprises',
      year: '2023',
      description: 'Complete brand identity overhaul including logo, color palette, typography, and brand guidelines.',
      features: ['Logo Design', 'Brand Guidelines', 'Business Stationery', 'Social Media Kit'],
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      link: '#',
      testimonial: 'The new design perfectly captures our vision and values.'
    },
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      category: 'web',
      client: 'UrbanStyle',
      year: '2023',
      description: 'Responsive e-commerce platform with modern UI/UX design and secure checkout.',
      features: ['UI/UX Design', 'Mobile Development', 'Payment Integration', 'SEO Optimization'],
      images: [
        'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      link: '#',
      testimonial: 'Online sales increased by 150% with the new platform.'
    },
    {
      id: 'digital-campaign',
      title: 'Digital Marketing Campaign',
      category: 'marketing',
      client: 'GreenLife Organics',
      year: '2023',
      description: 'Comprehensive digital marketing campaign across multiple channels.',
      features: ['Social Media', 'PPC Advertising', 'Email Marketing', 'Analytics'],
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      ],
      link: '#',
      testimonial: '3x ROI in the first quarter with our targeted campaign.'
    }
  ];

  // Create portfolio modal
  function createPortfolioModal() {
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
      <div class="portfolio-modal-content">
        <button class="portfolio-modal-close">&times;</button>
        <div class="portfolio-modal-body">
          <div class="portfolio-modal-gallery">
            <img src="" alt="Project Image" class="portfolio-modal-main-image">
            <div class="portfolio-modal-thumbnails"></div>
          </div>
          <div class="portfolio-modal-details">
            <span class="portfolio-modal-category"></span>
            <h2 class="portfolio-modal-title"></h2>
            <p class="portfolio-modal-description"></p>
            
            <div class="portfolio-modal-features">
              <h4><i class="bi bi-check-circle"></i> Project Highlights</h4>
              <ul></ul>
            </div>
            
            <div class="portfolio-modal-meta">
              <div class="portfolio-modal-meta-item">
                <div class="portfolio-modal-meta-label">Client</div>
                <div class="portfolio-modal-meta-value portfolio-client"></div>
              </div>
              <div class="portfolio-modal-meta-item">
                <div class="portfolio-modal-meta-label">Year</div>
                <div class="portfolio-modal-meta-value portfolio-year"></div>
              </div>
            </div>
            
            <div class="portfolio-modal-testimonial">
              <p><em>"<span class="testimonial-text"></span>"</em></p>
            </div>
            
            <div class="portfolio-modal-cta">
              <a href="#" class="btn btn-primary" target="_blank">View Project</a>
              <a href="#contact" class="btn btn-outline-primary">Start Your Project</a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // Setup event listeners
  function setupEventListeners() {
    // Filter buttons
    document.querySelectorAll('.portfolio-filter .btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.getAttribute('data-filter');
        filterPortfolio(filter);
        
        // Update active state
        document.querySelectorAll('.portfolio-filter .btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });

    // Portfolio items
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.portfolio-card');
      if (card) {
        const projectId = card.getAttribute('data-project');
        const project = portfolioData.find(p => p.id === projectId);
        if (project) {
          openPortfolioModal(project);
        }
      }
    });

    // Close modal
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('portfolio-modal') || 
          e.target.classList.contains('portfolio-modal-close')) {
        closePortfolioModal();
      }
    });

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePortfolioModal();
      }
    });
  }

  // Filter portfolio items
  function filterPortfolio(filter) {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || filter === category) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Open portfolio modal
  function openPortfolioModal(project) {
    const modal = document.querySelector('.portfolio-modal');
    const modalContent = modal.querySelector('.portfolio-modal-content');
    
    // Set project data
    modal.querySelector('.portfolio-modal-category').textContent = project.category.charAt(0).toUpperCase() + project.category.slice(1);
    modal.querySelector('.portfolio-modal-title').textContent = project.title;
    modal.querySelector('.portfolio-modal-description').textContent = project.description;
    modal.querySelector('.portfolio-client').textContent = project.client;
    modal.querySelector('.portfolio-year').textContent = project.year;
    modal.querySelector('.testimonial-text').textContent = project.testimonial;
    modal.querySelector('.btn-primary').setAttribute('href', project.link);
    
    // Set main image
    const mainImage = modal.querySelector('.portfolio-modal-main-image');
    mainImage.src = project.images[0];
    mainImage.alt = project.title;
    
    // Set thumbnails
    const thumbnailsContainer = modal.querySelector('.portfolio-modal-thumbnails');
    thumbnailsContainer.innerHTML = '';
    
    project.images.forEach((img, index) => {
      const thumbnail = document.createElement('div');
      thumbnail.className = 'portfolio-modal-thumbnail' + (index === 0 ? ' active' : '');
      thumbnail.innerHTML = `<img src="${img}" alt="${project.title} - ${index + 1}">`;
      
      thumbnail.addEventListener('click', () => {
        mainImage.src = img;
        document.querySelectorAll('.portfolio-modal-thumbnail').forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
      });
      
      thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Set features
    const featuresList = modal.querySelector('.portfolio-modal-features ul');
    featuresList.innerHTML = project.features.map(feature => 
      `<li><i class="bi bi-check"></i> ${feature}</li>`
    ).join('');
    
    // Show modal
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
    
    // Focus for accessibility
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.portfolio-modal-close').focus();
  }

  // Close portfolio modal
  function closePortfolioModal() {
    const modal = document.querySelector('.portfolio-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modal.setAttribute('aria-hidden', 'true');
  }

  // Initialize
  createPortfolioModal();
  setupEventListeners();
  console.log('Portfolio initialized');

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
