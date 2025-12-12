// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    darkModeToggle.addEventListener('click', function() {
        htmlElement.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (htmlElement.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        htmlElement.classList.add('dark-mode');
        darkModeToggle.querySelector('i').classList.remove('fa-moon');
        darkModeToggle.querySelector('i').classList.add('fa-sun');
    }
    
    // Language Switcher
    const languageSwitcher = document.getElementById('language-switcher');
    languageSwitcher.addEventListener('change', function() {
        const selectedLang = this.value;
        localStorage.setItem('preferredLanguage', selectedLang);
        
        // In a real application, you would redirect or load content
        alert(`Language switched to ${selectedLang === 'sw' ? 'Swahili' : 'English'}. In a real app, content would update.`);
    });
    
    // Set saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'sw';
    languageSwitcher.value = savedLang;
    
    // Favorite Buttons
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                // Save to favorites in localStorage
                const propertyId = this.closest('.property-card').dataset.id;
                if (propertyId) {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    if (!favorites.includes(propertyId)) {
                        favorites.push(propertyId);
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                    }
                }
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                // Remove from favorites
                const propertyId = this.closest('.property-card').dataset.id;
                if (propertyId) {
                    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    favorites = favorites.filter(id => id !== propertyId);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                }
            }
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navAuth = document.querySelector('.nav-auth');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isVisible = navLinks.style.display === 'flex';
        
        if (!isVisible) {
            navLinks.style.display = 'flex';
            navAuth.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navAuth.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = 'var(--shadow)';
            navLinks.style.gap = '20px';
            navLinks.style.zIndex = '1000';
            
            navAuth.style.position = 'absolute';
            navAuth.style.top = 'calc(100% + 180px)';
            navAuth.style.left = '0';
            navAuth.style.right = '0';
            navAuth.style.backgroundColor = 'white';
            navAuth.style.padding = '20px';
            navAuth.style.boxShadow = 'var(--shadow)';
            navAuth.style.gap = '20px';
            navAuth.style.zIndex = '1000';
        } else {
            navLinks.style.display = '';
            navAuth.style.display = '';
        }
    });
    
    // Search Form Submission
    const searchForm = document.querySelector('.search-box');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="text"]');
            const locationSelect = this.querySelectorAll('select')[0];
            const typeSelect = this.querySelectorAll('select')[1];
            const priceSelect = this.querySelectorAll('select')[2];
            
            // In a real app, this would redirect to search results
            alert(`Searching for: ${searchInput.value || 'Any'}, Location: ${locationSelect.value}, Type: ${typeSelect.value}, Price: ${priceSelect.value}`);
        });
    }
    
    // Property Card Hover Effects
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
    
    // Initialize property IDs for favorites
    propertyCards.forEach((card, index) => {
        card.dataset.id = `property-${index + 1}`;
    });
    
    // Load saved favorites
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    propertyCards.forEach(card => {
        if (savedFavorites.includes(card.dataset.id)) {
            const favBtn = card.querySelector('.favorite-btn');
            if (favBtn) {
                favBtn.classList.add('active');
                const icon = favBtn.querySelector('i');
                icon.classList.remove('far');
                icon.classList.add('fas');
            }
        }
    });
});
