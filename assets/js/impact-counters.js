document.addEventListener('DOMContentLoaded', function() {
  // Animate impact counters
  const animateCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');
    const speed = 200; // The lower the faster
    
    counters.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-counter'));
      const count = +counter.innerText;
      const increment = target / speed;
      
      // Set initial value
      if (count < target) {
        counter.innerText = '0';
        
        // Add animation delay based on index
        counter.style.setProperty('--delay', index);
        
        // Animate counter
        const updateCount = () => {
          const count = +counter.innerText;
          const newCount = Math.ceil(count + increment);
          
          if (newCount < target) {
            counter.innerText = newCount.toLocaleString();
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target.toLocaleString();
            // Add + if it's the million counter
            if (target >= 1000000) {
              counter.innerText = target/1000000 + 'M+';
            } else if (target >= 1000) {
              counter.innerText = (target/1000).toFixed(1) + 'K+';
            }
          }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            updateCount();
            observer.unobserve(counter);
          }
        }, { threshold: 0.5 });
        
        observer.observe(counter);
      }
    });
  };

  // Initialize impact counters
  animateCounters();

  // Re-animate counters when they come into view (for page navigation)
  const impactSection = document.getElementById('global-impact');
  if (impactSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    }, { threshold: 0.1 });
    observer.observe(impactSection);
  }
});
