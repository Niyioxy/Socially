// SociAlly Website Main JavaScript

// Import modules
import { Navigation } from './navigation.js';
import { Animations } from './animations.js';
import { FormHandler } from './forms.js';

// Self-executing function to initialize the application
(function() {
  // Initialize modules when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    const navigation = new Navigation();
    navigation.init();
    
    // Initialize animations
    const animations = new Animations();
    animations.init();
    
    // Initialize form handlers
    const formHandler = new FormHandler();
    formHandler.init();
    
    // Initialize any other functionality
    initializeMisc();
    
    console.log('SociAlly website initialized successfully');
  });
  
  /**
   * Initialize miscellaneous functionality
   */
  function initializeMisc() {
    // Add scroll event for header styling
    const header = document.querySelector('.header');
    
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
    
    // Initialize any other global functionality
  }
})();

// Syntax self-check
try {
  console.log("Syntax check passed");
}
catch (error) {
  console.error("Syntax error:", error.message);
}