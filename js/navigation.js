/**
 * Navigation Module
 * 
 * Handles all navigation-related functionality:
 * - Mobile menu toggle
 * - Smooth scrolling to sections
 * - Active navigation highlighting
 */

export class Navigation {
  /**
   * Constructor
   */
  constructor() {
    // Navigation elements
    this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.mobileMenuClose = document.querySelector('.mobile-menu-close');
    this.navLinks = document.querySelectorAll('.nav-item a, .mobile-nav-item a');
    this.header = document.querySelector('.header');
    
    // State
    this.isMobileMenuOpen = false;
  }
  
  /**
   * Initialize navigation functionality
   */
  init() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
    this.setupActiveNavHighlighting();
  }
  
  /**
   * Setup mobile menu toggle functionality
   */
  setupMobileMenu() {
    if (!this.mobileMenuToggle || !this.mobileMenu || !this.mobileMenuClose) return;
    
    // Toggle mobile menu
    this.mobileMenuToggle.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    // Close mobile menu
    this.mobileMenuClose.addEventListener('click', () => {
      this.closeMobileMenu();
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isMobileMenuOpen && 
          !this.mobileMenu.contains(e.target) && 
          e.target !== this.mobileMenuToggle) {
        this.closeMobileMenu();
      }
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && this.isMobileMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }
  
  /**
   * Toggle the mobile menu
   */
  toggleMobileMenu() {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  /**
   * Open the mobile menu
   */
  openMobileMenu() {
    this.mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.isMobileMenuOpen = true;
  }
  
  /**
   * Close the mobile menu
   */
  closeMobileMenu() {
    this.mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
    this.isMobileMenuOpen = false;
  }
  
  /**
   * Setup smooth scrolling for navigation links
   */
  setupSmoothScrolling() {
    if (!this.navLinks) return;
    
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Check if the link is a hash link
        const href = link.getAttribute('href');
        
        if (href.startsWith('#') && href !== '#') {
          e.preventDefault();
          
          const targetId = href.replace('#', '');
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            // Get the header height for offset
            const headerHeight = this.header ? this.header.offsetHeight : 0;
            
            // Calculate the target position
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Scroll to the target position
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }
  
  /**
   * Setup active navigation highlighting based on scroll position
   */
  setupActiveNavHighlighting() {
    if (!this.navLinks) return;
    
    // Get all sections
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    if (sections.length === 0) return;
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + (this.header ? this.header.offsetHeight : 0) + 50;
      
      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (scrollPosition >= sectionTop) {
          // Remove active class from all links
          this.navLinks.forEach(link => {
            link.classList.remove('active');
          });
          
          // Add active class to corresponding links
          const sectionId = section.getAttribute('id');
          const activeLinks = document.querySelectorAll(`a[href="#${sectionId}"]`);
          
          activeLinks.forEach(link => {
            link.classList.add('active');
          });
          
          break;
        }
      }
    });
  }
}

// Run a syntax check
try {
  console.assert(typeof Navigation === 'function', 'Navigation class is defined');
} catch (error) {
  console.error("Syntax error:", error.message);
}