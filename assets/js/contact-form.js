document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formSteps = Array.from(document.querySelectorAll('.form-step'));
  const nextButtons = document.querySelectorAll('.btn-next');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const progressBar = document.querySelector('.progress-bar');
  const sendAnotherBtn = document.getElementById('send-another');
  
  let currentStep = 0;

  // Initialize form
  showStep(currentStep);
  updateProgressBar();

  // Next button click handler
  nextButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetStep = parseInt(this.getAttribute('data-next')) - 1;
      
      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        currentStep = targetStep;
        showStep(currentStep);
        updateProgressBar();
      }
    });
  });

  // Previous button click handler
  prevButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetStep = parseInt(this.getAttribute('data-prev')) - 1;
      currentStep = targetStep;
      showStep(currentStep);
      updateProgressBar();
    });
  });

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateStep(currentStep)) {
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const spinner = submitBtn.querySelector('.spinner-border');
      
      submitBtn.disabled = true;
      spinner.classList.remove('d-none');
      
      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        // Hide form and show success message
        form.style.display = 'none';
        document.querySelector('.form-success').classList.remove('d-none');
        
        // Reset form and scroll to top
        form.reset();
        window.scrollTo({
          top: form.offsetTop - 100,
          behavior: 'smooth'
        });
      }, 1500);
    }
  });

  // Send another message button
  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function() {
      document.querySelector('.form-success').classList.add('d-none');
      form.style.display = 'block';
      currentStep = 0;
      showStep(currentStep);
      updateProgressBar();
    });
  }

  // Show current step
  function showStep(stepIndex) {
    formSteps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.add('active');
        // Focus first input in the current step
        const firstInput = step.querySelector('input, select, textarea');
        if (firstInput) firstInput.focus();
      } else {
        step.classList.remove('active');
      }
    });
  }

  // Update progress bar
  function updateProgressBar() {
    const progress = ((currentStep + 1) / formSteps.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
  }

  // Validate current step
  function validateStep(stepIndex) {
    const currentStep = formSteps[stepIndex];
    const inputs = currentStep.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }

      // Email validation
      if (input.type === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          input.classList.add('is-invalid');
          input.nextElementSibling.textContent = 'Please enter a valid email address';
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }
      }
    });

    // Special validation for radio buttons
    const radioGroups = currentStep.querySelectorAll('input[type="radio"][required]');
    if (radioGroups.length > 0) {
      const radioGroupName = radioGroups[0].name;
      const isAnyRadioChecked = document.querySelector(`input[name="${radioGroupName}"]:checked`) !== null;
      
      if (!isAnyRadioChecked) {
        const radioContainer = radioGroups[0].closest('.service-options');
        if (radioContainer) {
          radioContainer.classList.add('is-invalid');
          const errorDiv = radioContainer.nextElementSibling;
          if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
            errorDiv.style.display = 'block';
          }
          isValid = false;
        }
      } else if (radioGroups[0].closest('.service-options')) {
        radioGroups[0].closest('.service-options').classList.remove('is-invalid');
      }
    }

    return isValid;
  }

  // Real-time validation
  form.addEventListener('input', function(e) {
    const input = e.target;
    if (input.hasAttribute('required')) {
      if (input.value.trim() === '') {
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    }
  });

  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0) {
        value = value.match(/(\d{0,3})(\d{0,3})(\d{0,4})/).slice(1).join(' ').trim();
      }
      e.target.value = value;
    });
  }
});
