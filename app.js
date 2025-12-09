[file name]: app.js
[file content begin]
// ================ APP.JS ================
// Main application component with routing and layout

// Main App Component
const App = () => {
  const [currentRoute, setCurrentRoute] = React.useState(window.location.hash || '#home');
  const { darkMode } = React.useContext(window.ThemeContext);
  const { language } = React.useContext(window.LanguageContext);

  // Handle hash-based routing
  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#home');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Render current page based on route
  const renderPage = () => {
    switch (currentRoute) {
      case '#home':
        return window.HomePage ? React.createElement(window.HomePage) : null;
      case '#listings':
        return window.ListingsPage ? React.createElement(window.ListingsPage) : null;
      case '#about':
        return window.AboutPage ? React.createElement(window.AboutPage) : null;
      case '#services':
        return window.ServicesPage ? React.createElement(window.ServicesPage) : null;
      case '#contact':
        return window.ContactPage ? React.createElement(window.ContactPage) : null;
      default:
        return window.HomePage ? React.createElement(window.HomePage) : null;
    }
  };

  return React.createElement('div', {
    style: { 
      minHeight: '100vh',
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
      transition: 'background-color 0.3s, color 0.3s'
    }
  },
    // Header (Simplified)
    React.createElement('header', {
      style: { 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
        padding: '1rem 0'
      }
    },
      React.createElement('div', { className: 'container' },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }
        },
          // Logo
          React.createElement('a', {
            href: '#home',
            style: { textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }
          },
            React.createElement('div', {
              style: {
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                borderRadius: 'var(--border-radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.25rem',
                fontWeight: '700'
              }
            }, 'HL'),
            React.createElement('span', {
              style: { 
                fontSize: '1.5rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }
            }, 'HouseLink')
          ),

          // Navigation
          React.createElement('nav', {
            style: { display: 'flex', alignItems: 'center', gap: '1.5rem' }
          },
            [
              { hash: '#home', label: { sw: 'Nyumbani', en: 'Home' }, icon: 'fas fa-home' },
              { hash: '#listings', label: { sw: 'Mali', en: 'Listings' }, icon: 'fas fa-search' },
              { hash: '#services', label: { sw: 'Huduma', en: 'Services' }, icon: 'fas fa-concierge-bell' },
              { hash: '#about', label: { sw: 'Kuhusu', en: 'About' }, icon: 'fas fa-info-circle' },
              { hash: '#contact', label: { sw: 'Mawasiliano', en: 'Contact' }, icon: 'fas fa-envelope' }
            ].map((item, i) =>
              React.createElement('a', {
                key: i,
                href: item.hash,
                style: {
                  textDecoration: 'none',
                  color: currentRoute === item.hash ? 'var(--primary-color)' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                  fontWeight: currentRoute === item.hash ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  transition: 'color 0.2s',
                  padding: '0.5rem 0'
                }
              },
                React.createElement('i', { className: item.icon, style: { fontSize: '0.875rem' } }),
                item.label[language]
              )
            )
          ),

          // User Actions (Simplified)
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }
          },
            React.createElement('button', {
              className: 'btn btn-primary',
              onClick: () => {
                if (window.ModalContextRef) {
                  window.ModalContextRef.openModal('signup');
                }
              }
            },
              language === 'sw' ? 'Jisajili' : 'Sign Up'
            )
          )
        )
      )
    ),

    // Main Content
    React.createElement('main', {
      style: { minHeight: 'calc(100vh - 180px)' }
    }, renderPage()),

    // Footer (Simplified)
    React.createElement('footer', {
      style: { 
        background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
        borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
        padding: '2rem 0'
      }
    },
      React.createElement('div', { className: 'container' },
        React.createElement('div', {
          style: { textAlign: 'center' }
        },
          React.createElement('p', {
            style: { fontSize: '0.875rem', opacity: 0.7 }
          }, `© ${new Date().getFullYear()} HouseLink Tanzania. ${language === 'sw' ? 'Haki zote zimehifadhiwa.' : 'All rights reserved.'}`)
        )
      )
    )
  );
};

// ================ SIMPLIFIED INITIALIZATION ================
const initializeApp = () => {
  console.log('Initializing HouseLink app...');
  
  const container = document.getElementById('app');
  if (!container) {
    console.error('App container not found!');
    return;
  }
  
  try {
    // Check if all required dependencies are available
    const requiredDeps = ['ThemeProvider', 'LanguageProvider', 'AuthProvider', 'ModalProvider', 'SearchProvider'];
    const missingDeps = requiredDeps.filter(dep => !window[dep]);
    
    if (missingDeps.length > 0) {
      console.error('Missing dependencies:', missingDeps);
      container.innerHTML = `
        <div style="text-align: center; padding: 50px; color: var(--danger-color);">
          <h3>Error loading application</h3>
          <p>Missing: ${missingDeps.join(', ')}</p>
          <button onclick="location.reload()" style="margin-top: 20px;">Retry</button>
        </div>
      `;
      return;
    }
    
    // Render the app
    const appElement = React.createElement(
      window.ThemeProvider,
      null,
      React.createElement(
        window.LanguageProvider,
        null,
        React.createElement(
          window.AuthProvider,
          null,
          React.createElement(
            window.ModalProvider,
            null,
            React.createElement(
              window.SearchProvider,
              null,
              React.createElement(App)
            )
          )
        )
      )
    );
    
    ReactDOM.render(appElement, container);
    
    console.log('App rendered successfully!');
    
    // Hide loading screen after successful render
    setTimeout(() => {
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          container.classList.remove('hidden');
        }, 500);
      }
    }, 100);
    
  } catch (error) {
    console.error('Error rendering app:', error);
    container.innerHTML = `
      <div style="text-align: center; padding: 50px; color: var(--danger-color);">
        <h3>Error loading application</h3>
        <p>${error.message}</p>
        <button onclick="location.reload()" style="margin-top: 20px;">Retry</button>
      </div>
    `;
  }
};

// ================ WAIT FOR DEPENDENCIES ================
let initAttempts = 0;
const maxInitAttempts = 50; // 5 seconds total

function checkDependencies() {
  const required = [
    'React', 'ReactDOM',
    'ThemeContext', 'LanguageContext', 'AuthContext', 'ModalContext', 'SearchContext',
    'ThemeProvider', 'LanguageProvider', 'AuthProvider', 'ModalProvider', 'SearchProvider',
    'HomePage', 'ListingsPage'
  ];
  
  const missing = [];
  for (const dep of required) {
    if (!window[dep]) {
      missing.push(dep);
    }
  }
  
  if (missing.length === 0) {
    return true;
  } else if (initAttempts < maxInitAttempts) {
    console.log('Waiting for dependencies... Missing:', missing);
    initAttempts++;
    setTimeout(checkDependencies, 100);
    return false;
  } else {
    console.error('Failed to load dependencies after maximum attempts');
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 50px;">
          <h3>Failed to load application</h3>
          <p>Please check your internet connection and refresh the page.</p>
          <button onclick="location.reload()" style="margin-top: 20px;">Refresh Page</button>
        </div>
      `;
      container.classList.remove('hidden');
      
      // Hide loading screen
      const loadingScreen = document.querySelector('.loading-screen');
      if (loadingScreen) {
        loadingScreen.style.display = 'none';
      }
    }
    return false;
  }
}

// ================ START INITIALIZATION ================
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, checking dependencies...');
  setTimeout(() => {
    checkDependencies();
  }, 100);
});

// Set a timeout as fallback
setTimeout(() => {
  if (document.querySelector('.loading-screen').style.display !== 'none') {
    console.log('Fallback initialization...');
    initializeApp();
  }
}, 3000); // 3 second fallback

// Export for manual initialization
window.App = App;
window.initializeApp = initializeApp;
[file content end]
