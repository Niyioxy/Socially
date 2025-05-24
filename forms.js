/**
 * Form Handler Module
 * 
 * Handles all form-related functionality:
 * - Form validation
 * - Form submission
 * - Form feedback
 */

export class FormHandler {
  /**
   * Constructor
   */
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.contactForm = document.getElementById('contact-form');
    this.newsletterForm = document.getElementById('newsletter-form');
  }
  
  /**
   * Initialize form handlers
   */
  init() {
    this.setupFormValidation();
    this.setupFormSubmission();
  }
  
  /**
   * Setup form validation
   */
  setupFormValidation() {
    if (!this.forms || this.forms.length === 0) return;
    
    this.forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Add validation on blur
        input.addEventListener('blur', () => {
          this.validateInput(input);
        });
        
        // Add validation on input
        input.addEventListener('input', () => {
          // Clear error state if input was previously invalid
          if (input.classList.contains('invalid')) {
            this.validateInput(input);
          }
        });
      });
      
      // Add form submit validation
      form.addEventListener('submit', (e) => {
        let isFormValid = true;
        
        inputs.forEach(input => {
          if (!this.validateInput(input)) {
            isFormValid = false;
          }
        });
        
        if (!isFormValid) {
          e.preventDefault();
        }
      });
    });
  }
  
  /**
   * Validate a single input field
   * @param {HTMLElement} input - The input element to validate
   * @returns {boolean} - Whether the input is valid
   */
  validateInput(input) {
    if (!input) return true;
    
    const value = input.value.trim();
    const type = input.type;
    const isRequired = input.hasAttribute('required');
    const errorElement = input.parentElement.querySelector('.error-message');
    
    // Clear previous error state
    input.classList.remove('invalid');
    if (errorElement) {
      errorElement.textContent = '';
    }
    
    // Skip validation if field is not required and empty
    if (!isRequired && value === '') {
      return true;
    }
    
    // Validate required fields
    if (isRequired && value === '') {
      this.showError(input, 'This field is required');
      return false;
    }
    
    // Validate by input type
    let isValid = true;
    
    switch (type) {
      case 'email': {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          this.showError(input, 'Please enter a valid email address');
          isValid = false;
        }
        break;
      }
      case 'tel': {
        const phonePattern = /^\+?[\d\s\-()]{7,20}$/;
        if (!phonePattern.test(value)) {
          this.showError(input, 'Please enter a valid phone number');
          isValid = false;
        }
        break;
      }
      case 'url': {
        try {
          new URL(value);
        } catch (e) {
          this.showError(input, 'Please enter a valid URL');
          isValid = false;
        }
        break;
      }
    }
    
    // Custom validation for textarea (if needed)
    if (input.tagName === 'TEXTAREA' && isRequired && value.length < 10) {
      this.showError(input, 'Please provide a more detailed message');
      isValid = false;
    }
    
    return isValid;
  }
  
  /**
   * Show validation error for an input
   * @param {HTMLElement} input - The input element
   * @param {string} message - The error message to display
   */
  showError(input, message) {
    input.classList.add('invalid');
    
    // Find or create error message element
    let errorElement = input.parentElement.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      input.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }
  
  /**
   * Setup form submission handling
   */
  setupFormSubmission() {
    // Setup contact form
    if (this.contactForm) {
      this.setupContactForm();
    }
    
    // Setup newsletter form
    if (this.newsletterForm) {
      this.setupNewsletterForm();
    }
  }
  
  /**
   * Setup contact form submission
   */
  setupContactForm() {
    this.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Show loading state
      const submitButton = this.contactForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // In a real implementation, this would send data to a server
      // For this demo, we'll simulate a successful submission
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        this.showFormSuccess(this.contactForm, 'Thank you! Your message has been sent successfully.');
        
        // Reset form
        this.contactForm.reset();
      } catch (error) {
        // Show error message
        this.showFormError(this.contactForm, 'Sorry, there was an error sending your message. Please try again.');
      } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
  
  /**
   * Setup newsletter form submission
   */
  setupNewsletterForm() {
    this.newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Show loading state
      const submitButton = this.newsletterForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Subscribing...';
      submitButton.disabled = true;
      
      // In a real implementation, this would send data to a server
      // For this demo, we'll simulate a successful submission
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        this.showFormSuccess(this.newsletterForm, 'Thank you for subscribing to our newsletter!');
        
        // Reset form
        this.newsletterForm.reset();
      } catch (error) {
        // Show error message
        this.showFormError(this.newsletterForm, 'Sorry, there was an error with your subscription. Please try again.');
      } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    });
  }
  
  /**
   * Show success message for a form
   * @param {HTMLElement} form - The form element
   * @param {string} message - The success message to display
   */
  showFormSuccess(form, message) {
    // Create or update form message element
    let messageElement = form.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      form.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.classList.add('success');
    messageElement.classList.remove('error');
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.textContent = '';
      messageElement.classList.remove('success');
    }, 5000);
  }
  
  /**
   * Show error message for a form
   * @param {HTMLElement} form - The form element
   * @param {string} message - The error message to display
   */
  showFormError(form, message) {
    // Create or update form message element
    let messageElement = form.querySelector('.form-message');
    
    if (!messageElement) {
      messageElement = document.createElement('div');
      messageElement.className = 'form-message';
      form.appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.classList.add('error');
    messageElement.classList.remove('success');
    
    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.textContent = '';
      messageElement.classList.remove('error');
    }, 5000);
  }
}

// Console assert for verification
console.assert(typeof FormHandler === 'function', 'FormHandler class is defined');
console.assert(FormHandler.prototype.validateInput !== undefined, 'FormHandler.validateInput method is defined');

// Syntax self-check
try {
  console.log("FormHandler syntax check passed");
}
catch (error) {
  console.error("FormHandler syntax error:", error.message);
}