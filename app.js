// ================ APP.JS ================
// Main application component with routing and layout

// Use createRoot for React 18
const { createRoot } = ReactDOM;

// Wait for everything to load
window.addEventListener('load', function() {
  // Check if all dependencies are loaded
  function checkDependencies() {
    const required = [
      'React', 'ReactDOM',
      'ThemeContext', 'LanguageContext', 'AuthContext', 'ModalContext', 'SearchContext',
      'ThemeProvider', 'LanguageProvider', 'AuthProvider', 'ModalProvider', 'SearchProvider',
      'HomePage', 'ListingsPage', 'PropertyCard', 'Modal',
      'LoginModal', 'SignupModal'
    ];
    
    for (const dep of required) {
      if (!window[dep]) {
        console.log('Missing dependency:', dep);
        return false;
      }
    }
    return true;
  }

  // Initialize app when ready
  function initializeWhenReady() {
    if (checkDependencies()) {
      console.log('All dependencies loaded. Initializing app...');
      initializeApp();
    } else {
      console.log('Waiting for dependencies...');
      setTimeout(initializeWhenReady, 100);
    }
  }

  // Start checking
  setTimeout(initializeWhenReady, 100);
});

// Main App Component
const App = () => {
  const [currentRoute, setCurrentRoute] = React.useState(window.location.hash || '#home');
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, language } = React.useContext(window.LanguageContext);
  const { isAuthenticated, user, notifications, clearNotifications } = React.useContext(window.AuthContext);
  const { modals, closeModal } = React.useContext(window.ModalContext);

  // Handle hash-based routing
  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#home');
      // Close any open modals when route changes
      Object.keys(modals).forEach(modal => {
        if (modals[modal]) closeModal(modal);
      });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [modals, closeModal]);

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
      case '#dashboard':
        return window.DashboardPage ? React.createElement(window.DashboardPage) : null;
      default:
        // Handle deep links like #listings?type=apartment
        if (currentRoute.startsWith('#listings')) {
          return window.ListingsPage ? React.createElement(window.ListingsPage) : null;
        }
        return window.HomePage ? React.createElement(window.HomePage) : null;
    }
  };

  // Calculate notification count
  const unreadNotificationCount = notifications ? notifications.filter(n => !n.read).length : 0;

  return React.createElement('div', {
    style: { 
      minHeight: '100vh',
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
      transition: 'background-color 0.3s, color 0.3s'
    }
  },
    // Header
    React.createElement('header', {
      className: 'header',
      style: { 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`
      }
    },
      React.createElement('div', { className: 'container' },
        React.createElement('div', {
          style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }
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
            style: { display: 'flex', alignItems: 'center', gap: '2rem' }
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

          // User Actions
          React.createElement('div', {
            style: { display: 'flex', alignItems: 'center', gap: '1rem' }
          },
            // Language Toggle
            window.LanguageToggle ? React.createElement(window.LanguageToggle) : null,
            
            // Theme Toggle
            window.ThemeToggle ? React.createElement(window.ThemeToggle) : null,
            
            // User Menu
            isAuthenticated ?
              React.createElement('div', { style: { position: 'relative' } },
                React.createElement('button', {
                  className: 'btn btn-icon',
                  onClick: () => window.ModalContextRef?.openModal('userMenu'),
                  style: { position: 'relative' }
                },
                  React.createElement('i', { className: 'fas fa-user-circle', style: { fontSize: '1.25rem' } }),
                  unreadNotificationCount > 0 && React.createElement('span', {
                    style: {
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      background: 'var(--accent-color)',
                      color: 'white',
                      fontSize: '0.625rem',
                      fontWeight: '700',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }, unreadNotificationCount)
                )
              ) :
              React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
                React.createElement('button', {
                  className: 'btn btn-outline',
                  onClick: () => window.ModalContextRef?.openModal('login')
                }, t('login')),
                React.createElement('button', {
                  className: 'btn btn-primary',
                  onClick: () => window.ModalContextRef?.openModal('signup')
                }, t('signup'))
              )
          )
        )
      )
    ),

    // Main Content
    React.createElement('main', {
      style: { minHeight: 'calc(100vh - 180px)' }
    }, renderPage()),

    // Footer
    React.createElement('footer', {
      style: { 
        background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
        borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
        padding: '4rem 0 2rem'
      }
    },
      React.createElement('div', { className: 'container' },
        React.createElement('div', {
          className: 'grid grid-cols-4 gap-8',
          style: { marginBottom: '3rem' }
        },
          // Company Info
          React.createElement('div', null,
            React.createElement('div', {
              style: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }
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
            React.createElement('p', {
              style: { fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '1.5rem' }
            }, language === 'sw'
              ? 'Mfumo wa kwanza unaoaminika Tanzania wa mali, ukiwawezesha kila mwananchi kupata nyumba bora au mali ya uwekezaji kwa urahisi.'
              : 'Tanzania\'s most trusted property platform, empowering every citizen to find their ideal home or investment property with ease.'
            ),
            React.createElement('div', { style: { display: 'flex', gap: '1rem' } },
              React.createElement('a', { href: '#', className: 'btn btn-icon' },
                React.createElement('i', { className: 'fab fa-facebook-f' })
              ),
              React.createElement('a', { href: '#', className: 'btn btn-icon' },
                React.createElement('i', { className: 'fab fa-twitter' })
              ),
              React.createElement('a', { href: '#', className: 'btn btn-icon' },
                React.createElement('i', { className: 'fab fa-instagram' })
              ),
              React.createElement('a', { href: '#', className: 'btn btn-icon' },
                React.createElement('i', { className: 'fab fa-linkedin-in' })
              )
            )
          ),

          // Quick Links
          React.createElement('div', null,
            React.createElement('h4', {
              style: { fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }
            }, language === 'sw' ? 'Viungo vya Haraka' : 'Quick Links'),
            React.createElement('ul', {
              style: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }
            },
              [
                { hash: '#home', label: { sw: 'Nyumbani', en: 'Home' } },
                { hash: '#listings', label: { sw: 'Mali Zote', en: 'All Properties' } },
                { hash: '#services', label: { sw: 'Huduma Zetu', en: 'Our Services' } },
                { hash: '#about', label: { sw: 'Kuhusu Sisi', en: 'About Us' } },
                { hash: '#contact', label: { sw: 'Wasiliana', en: 'Contact' } }
              ].map((link, i) =>
                React.createElement('li', { key: i },
                  React.createElement('a', {
                    href: link.hash,
                    style: {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }
                  },
                    React.createElement('i', { className: 'fas fa-chevron-right', style: { fontSize: '0.625rem' } }),
                    link.label[language]
                  )
                )
              )
            )
          ),

          // Services
          React.createElement('div', null,
            React.createElement('h4', {
              style: { fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }
            }, language === 'sw' ? 'Huduma' : 'Services'),
            React.createElement('ul', {
              style: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }
            },
              [
                { label: { sw: 'Utafutaji wa Mali', en: 'Property Search' } },
                { label: { sw: 'Ukodishaji wa Mali', en: 'Property Rental' } },
                { label: { sw: 'Uuzaji wa Mali', en: 'Property Sale' } },
                { label: { sw: 'Huduma za Wakala', en: 'Broker Services' } },
                { label: { sw: 'Usimamizi wa Mali', en: 'Property Management' } }
              ].map((service, i) =>
                React.createElement('li', { key: i },
                  React.createElement('a', {
                    href: '#services',
                    style: {
                      fontSize: '0.875rem',
                      opacity: 0.8,
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'opacity 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }
                  },
                    React.createElement('i', {
                      className: 'fas fa-check-circle',
                      style: { fontSize: '0.625rem', color: 'var(--success-color)' }
                    }),
                    service.label[language]
                  )
                )
              )
            )
          ),

          // Newsletter
          React.createElement('div', null,
            React.createElement('h4', {
              style: { fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }
            }, language === 'sw' ? 'Jiandikishe kwa Habari' : 'Newsletter'),
            React.createElement('p', {
              style: { fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '1.5rem' }
            }, language === 'sw'
              ? 'Jiandikishe kupata habari za mali mpya na ofa maalum.'
              : 'Subscribe to get updates on new properties and special offers.'
            ),
            React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
              React.createElement('input', {
                type: 'email',
                placeholder: language === 'sw' ? 'Barua pepe yako' : 'Your email',
                className: 'form-control',
                style: { flex: 1 }
              }),
              React.createElement('button', { className: 'btn btn-primary' },
                React.createElement('i', { className: 'fas fa-paper-plane' })
              )
            )
          )
        ),

        // Bottom Bar
        React.createElement('div', {
          style: { 
            paddingTop: '2rem',
            borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }
        },
          React.createElement('div', {
            style: { fontSize: '0.875rem', opacity: 0.7 }
          }, `© ${new Date().getFullYear()} HouseLink Tanzania. ${language === 'sw' ? 'Haki zote zimehifadhiwa.' : 'All rights reserved.'}`),
          React.createElement('div', {
            style: { display: 'flex', gap: '1.5rem', fontSize: '0.875rem', opacity: 0.7 }
          },
            React.createElement('a', { href: '#', style: { color: 'inherit', textDecoration: 'none' } },
              language === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy'
            ),
            React.createElement('a', { href: '#', style: { color: 'inherit', textDecoration: 'none' } },
              language === 'sw' ? 'Masharti ya Matumizi' : 'Terms of Service'
            ),
            React.createElement('a', { href: '#', style: { color: 'inherit', textDecoration: 'none' } },
              language === 'sw' ? 'Mapendekezo ya Udhibiti' : 'Cookie Policy'
            )
          )
        )
      )
    ),

    // Modals (conditionally rendered)
    window.LoginModal && React.createElement(window.LoginModal),
    window.SignupModal && React.createElement(window.SignupModal)
  );
};

// ================ SIMPLIFIED DASHBOARD PAGE ================
const DashboardPage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, language } = React.useContext(window.LanguageContext);
  const { user, savedProperties, savedSearches, notifications } = React.useContext(window.AuthContext);

  return React.createElement('section', {
    id: 'dashboard',
    className: 'section',
    style: { 
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh',
      padding: '2rem 0'
    }
  },
    React.createElement('div', { className: 'container' },
      React.createElement('h1', {
        style: { fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }
      }, language === 'sw' ? 'Dashibodi' : 'Dashboard'),
      
      React.createElement('div', {
        className: 'grid grid-cols-3 gap-6',
        style: { marginBottom: '3rem' }
      },
        React.createElement('div', { className: 'card' },
          React.createElement('h3', {
            style: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }
          }, language === 'sw' ? 'Mali Zilizohifadhiwa' : 'Saved Properties'),
          React.createElement('div', {
            style: { fontSize: '3rem', fontWeight: '800', color: 'var(--primary-color)' }
          }, savedProperties.length)
        ),
        
        React.createElement('div', { className: 'card' },
          React.createElement('h3', {
            style: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }
          }, language === 'sw' ? 'Utafutaji Uliohifadhiwa' : 'Saved Searches'),
          React.createElement('div', {
            style: { fontSize: '3rem', fontWeight: '800', color: 'var(--secondary-color)' }
          }, savedSearches.length)
        ),
        
        React.createElement('div', { className: 'card' },
          React.createElement('h3', {
            style: { fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }
          }, language === 'sw' ? 'Arifa Mpya' : 'New Notifications'),
          React.createElement('div', {
            style: { fontSize: '3rem', fontWeight: '800', color: 'var(--accent-color)' }
          }, notifications.filter(n => !n.read).length)
        )
      ),
      
      React.createElement('div', { className: 'card' },
        React.createElement('h2', {
          style: { fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }
        }, `${language === 'sw' ? 'Karibu, ' : 'Welcome, '}${user?.name || ''}`),
        React.createElement('p', {
          style: { lineHeight: '1.6', opacity: 0.8 }
        }, language === 'sw'
          ? 'Hii ni dashibodi yako ya HouseLink. Unaweza kutazama mali ulizohifadhi, utafutaji uliohifadhi, na kupokea arifa.'
          : 'This is your HouseLink dashboard. You can view saved properties, saved searches, and receive notifications.'
        )
      )
    )
  );
};

// ================ INITIALIZE APP ================
const initializeApp = () => {
  console.log('Initializing HouseLink app...');
  
  // Create root container
  const container = document.getElementById('app');
  if (!container) {
    console.error('App container not found!');
    return;
  }
  
  try {
    const root = createRoot(container);
    root.render(
      React.createElement(window.ThemeProvider,
        null,
        React.createElement(window.LanguageProvider,
          null,
          React.createElement(window.AuthProvider,
            null,
            React.createElement(window.ModalProvider,
              null,
              React.createElement(window.SearchProvider,
                null,
                React.createElement(App)
              )
            )
          )
        )
      )
    );
    
    console.log('App rendered successfully!');
  } catch (error) {
    console.error('Error rendering app:', error);
  }
};

// Export components
window.App = App;
window.DashboardPage = DashboardPage;
window.initializeApp = initializeApp;
