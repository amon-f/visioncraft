document.addEventListener('DOMContentLoaded', function() {
  const notes = document.querySelectorAll('.leadership-note');
  const dots = document.querySelectorAll('.note-nav-dots .dot');
  const carousel = document.querySelector('.leadership-carousel');
  let currentIndex = 0;
  let autoSlideInterval;
  let isAnimating = false;
  const ANIMATION_DURATION = 600; // ms
  const AUTO_SLIDE_DELAY = 8000; // ms
  const SWIPE_THRESHOLD = 50; // px

  // Function to show a specific note with smooth transition
  function showNote(index, direction = 'next') {
    if (isAnimating) return;
    isAnimating = true;
    
    // Update current index with boundary checks
    currentIndex = (index + notes.length) % notes.length;
    
    // Get current and next notes
    const currentNote = document.querySelector('.leadership-note.active');
    const nextNote = notes[currentIndex];
    
    // Update active dot
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    
    // Set initial states
    nextNote.style.display = 'block';
    nextNote.style.opacity = '0';
    nextNote.style.transform = direction === 'next' ? 'translateX(30px)' : 'translateX(-30px)';
    
    // Trigger reflow
    void nextNote.offsetWidth;
    
    // Start transition
    nextNote.style.transition = `opacity ${ANIMATION_DURATION}ms ease, transform ${ANIMATION_DURATION}ms ease`;
    
    if (currentNote) {
      currentNote.style.transition = `opacity ${ANIMATION_DURATION}ms ease, transform ${ANIMATION_DURATION}ms ease`;
      currentNote.style.opacity = '0';
      currentNote.style.transform = direction === 'next' ? 'translateX(-30px)' : 'translateX(30px)';
    }
    
    // Show new note
    nextNote.style.opacity = '1';
    nextNote.style.transform = 'translateX(0)';
    
    // Update active classes after transition
    setTimeout(() => {
      if (currentNote) {
        currentNote.style.display = 'none';
        currentNote.classList.remove('active');
      }
      nextNote.classList.add('active');
      isAnimating = false;
    }, ANIMATION_DURATION);
  }

  // Function to go to next note
  function nextNote() {
    const nextIndex = (currentIndex + 1) % notes.length;
    showNote(nextIndex, 'next');
  }

  // Function to go to previous note
  function prevNote() {
    const prevIndex = (currentIndex - 1 + notes.length) % notes.length;
    showNote(prevIndex, 'prev');
  }

  // Auto-rotate notes
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextNote, AUTO_SLIDE_DELAY);
  }

  // Pause auto-rotation on hover
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseleave', startAutoSlide);
    
    // Add navigation buttons
    const navButtons = `
      <button class="carousel-nav prev" aria-label="Previous">
        <i class="bi bi-chevron-left"></i>
      </button>
      <button class="carousel-nav next" aria-label="Next">
        <i class="bi bi-chevron-right"></i>
      </button>
    `;
    carousel.insertAdjacentHTML('beforeend', navButtons);
    
    // Navigation button handlers
    carousel.querySelector('.carousel-nav.next').addEventListener('click', () => {
      nextNote();
      startAutoSlide(); // Reset timer on manual navigation
    });
    
    carousel.querySelector('.carousel-nav.prev').addEventListener('click', () => {
      prevNote();
      startAutoSlide(); // Reset timer on manual navigation
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'BODY') {
        if (e.key === 'ArrowRight') {
          nextNote();
          startAutoSlide();
        } else if (e.key === 'ArrowLeft') {
          prevNote();
          startAutoSlide();
        }
      }
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

  // Touch events for mobile swipe
  let touchStartX = 0;
  let touchStartTime = 0;
  
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartTime = Date.now();
      clearInterval(autoSlideInterval);
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
      if (!touchStartX) return;
      
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      
      // Prevent scrolling when swiping horizontally
      if (Math.abs(diff) > 10) {
        e.preventDefault();
      }
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
      if (!touchStartX) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      const timeDiff = Date.now() - touchStartTime;
      const velocity = Math.abs(diff) / timeDiff;
      
      // If swipe is fast enough or moves beyond threshold
      if (Math.abs(diff) > SWIPE_THRESHOLD || velocity > 0.3) {
        if (diff > 0) {
          nextNote(); // Swipe left
        } else {
          prevNote(); // Swipe right
        }
      }
      
      touchStartX = 0;
      startAutoSlide();
    }, { passive: true });
  }

  // Initialize
  if (notes.length > 0) {
    // Hide all notes except the first one
    notes.forEach((note, index) => {
      if (index !== 0) {
        note.style.display = 'none';
      } else {
        note.classList.add('active');
        dots[0].classList.add('active');
      }
    });
    
    startAutoSlide();
  }
});
