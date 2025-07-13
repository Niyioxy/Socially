/**
 * Animations Module
 * 
 * Handles all animation-related functionality:
 * - Scroll animations
 * - Hover effects
 * - Transitions
 */

export class Animations {
  /**
   * Constructor
   */
  constructor() {
    this.animatedElements = document.querySelectorAll('.animate-on-scroll');
    this.counters = document.querySelectorAll('.counter');
  }
  
  /**
   * Initialize animations
   */
  init() {
    this.setupScrollAnimations();
    this.setupCounters();
  }
  
  /**
   * Setup scroll-based animations
   */
  setupScrollAnimations() {
    if (!this.animatedElements || this.animatedElements.length === 0) return;
    
    // Create IntersectionObserver to detect when elements come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation class when element is visible
          entry.target.classList.add('animate');
          
          // Unobserve the element after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animated elements
    this.animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  /**
   * Setup animated counters
   */
  setupCounters() {
    if (!this.counters || this.counters.length === 0) return;
    
    // Create IntersectionObserver for counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const targetValue = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 2000; // 2 seconds
          const stepTime = 20; // Update every 20ms
          
          // Calculate increment value
          const totalSteps = duration / stepTime;
          const incrementValue = targetValue / totalSteps;
          
          let currentValue = 0;
          
          // Animate the counter
          const counterAnimation = setInterval(() => {
            currentValue += incrementValue;
            
            if (currentValue >= targetValue) {
              counter.textContent = targetValue;
              clearInterval(counterAnimation);
            } else {
              counter.textContent = Math.floor(currentValue);
            }
          }, stepTime);
          
          // Unobserve the counter after animation starts
          counterObserver.unobserve(counter);
        }
      });
    }, {
      threshold: 0.5
    });
    
    // Observe all counters
    this.counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
}

// Run a syntax check
try {
  console.assert(typeof Animations === 'function', 'Animations class is defined');
} catch (error) {
  console.error("Syntax error:", error.message);
}