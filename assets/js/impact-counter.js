document.addEventListener('DOMContentLoaded', function() {
  // Animated Counter
  const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  };

  // Initialize counter
  const counterElement = document.getElementById('impactCounter');
  if (counterElement) {
    const targetNumber = 1000000; // Set your target number here
    animateCounter(counterElement, targetNumber);
  }

  // Add animation class to stats when they come into view
  const stats = document.querySelectorAll('.stat-item');
  if (stats.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('counter-animate');
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    stats.forEach(stat => {
      statsObserver.observe(stat);
    });
  }
});
