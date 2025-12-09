// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = darkModeToggle.querySelector('i');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeIcon.classList.remove('fa-moon');
    darkModeIcon.classList.add('fa-sun');
}

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Language Switcher
const languageSwitcher = document.getElementById('language-switcher');
languageSwitcher.addEventListener('change', (e) => {
    // In a real app, this would reload the page with the selected language
    alert(`Language changed to ${e.target.value === 'sw' ? 'Swahili' : 'English'}. This feature would reload the page with translations in a real application.`);
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navAuth = document.querySelector('.nav-auth');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    navAuth.style.display = navAuth.style.display === 'flex' ? 'none' : 'flex';
    
    if (window.innerWidth <= 768) {
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'white';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
            
            navAuth.style.flexDirection = 'column';
            navAuth.style.position = 'absolute';
            navAuth.style.top = 'calc(100% + 200px)';
            navAuth.style.left = '0';
            navAuth.style.right = '0';
            navAuth.style.background = 'white';
            navAuth.style.padding = '20px';
            navAuth.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
        }
    }
});

// Update on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navAuth.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navAuth.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navAuth.style.position = 'static';
        navLinks.style.background = 'transparent';
        navAuth.style.background = 'transparent';
        navLinks.style.padding = '0';
        navAuth.style.padding = '0';
        navLinks.style.boxShadow = 'none';
        navAuth.style.boxShadow = 'none';
    }
});

// Favorite Button Toggle
document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = button.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            button.style.backgroundColor = '#ef4444';
            button.style.color = 'white';
            alert('Added to favorites!');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.style.backgroundColor = 'white';
            button.style.color = 'inherit';
            alert('Removed from favorites!');
        }
    });
});

// Property Card Click Handler
document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', () => {
        // In a real app, this would navigate to the property detail page
        window.location.href = 'property-detail.html';
    });
});
