// ================ APP.JS ================
// Main application component with routing and layout

// Wait for DOM and all dependencies to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Additional check for React and all required components
  function checkDependencies() {
    return (
      typeof React !== 'undefined' &&
      typeof ReactDOM !== 'undefined' &&
      window.ThemeContext &&
      window.LanguageContext &&
      window.AuthContext &&
      window.ModalContext &&
      window.SearchContext &&
      window.HomePage &&
      window.ListingsPage &&
      window.PropertyCard &&
      window.Modal
    );
  }

  // Try to initialize, retry if dependencies aren't ready
  function tryInitialize() {
    if (checkDependencies()) {
      console.log('All dependencies loaded, initializing app...');
      initializeApp();
    } else {
      console.log('Waiting for dependencies...');
      setTimeout(tryInitialize, 100);
    }
  }

  // Start trying to initialize
  setTimeout(tryInitialize, 100);
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
        return <window.HomePage />;
      case '#listings':
        return <window.ListingsPage />;
      case '#about':
        return <window.AboutPage />;
      case '#services':
        return <window.ServicesPage />;
      case '#contact':
        return <window.ContactPage />;
      case '#dashboard':
        return <window.DashboardPage />;
      default:
        // Handle deep links like #listings?type=apartment
        if (currentRoute.startsWith('#listings')) {
          return <window.ListingsPage />;
        }
        return <window.HomePage />;
    }
  };

  // Calculate notification count
  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ 
      minHeight: '100vh',
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
      transition: 'background-color 0.3s, color 0.3s'
    }}>
      {/* Header */}
      <header className="header" style={{ 
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: darkMode ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
            {/* Logo */}
            <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
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
              }}>
                HL
              </div>
              <span style={{ 
                fontSize: '1.5rem', 
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}>
                HouseLink
              </span>
            </a>

            {/* Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {[
                { hash: '#home', label: { sw: 'Nyumbani', en: 'Home' }, icon: 'fas fa-home' },
                { hash: '#listings', label: { sw: 'Mali', en: 'Listings' }, icon: 'fas fa-search' },
                { hash: '#services', label: { sw: 'Huduma', en: 'Services' }, icon: 'fas fa-concierge-bell' },
                { hash: '#about', label: { sw: 'Kuhusu', en: 'About' }, icon: 'fas fa-info-circle' },
                { hash: '#contact', label: { sw: 'Mawasiliano', en: 'Contact' }, icon: 'fas fa-envelope' }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.hash}
                  style={{
                    textDecoration: 'none',
                    color: currentRoute === item.hash ? 'var(--primary-color)' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                    fontWeight: currentRoute === item.hash ? '600' : '400',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem',
                    transition: 'color 0.2s',
                    padding: '0.5rem 0'
                  }}
                >
                  <i className={item.icon} style={{ fontSize: '0.875rem' }}></i>
                  {item.label[language]}
                </a>
              ))}
            </nav>

            {/* User Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Language Toggle */}
              <window.LanguageToggle />

              {/* Theme Toggle */}
              <window.ThemeToggle />

              {/* User Menu */}
              {isAuthenticated ? (
                <div style={{ position: 'relative' }}>
                  <button
                    className="btn btn-icon"
                    onClick={() => window.ModalContextRef?.openModal('userMenu')}
                    style={{ position: 'relative' }}
                  >
                    <i className="fas fa-user-circle" style={{ fontSize: '1.25rem' }}></i>
                    {unreadNotificationCount > 0 && (
                      <span style={{
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
                      }}>
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    className="btn btn-outline"
                    onClick={() => window.ModalContextRef?.openModal('login')}
                  >
                    {t('login')}
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.ModalContextRef?.openModal('signup')}
                  >
                    {t('signup')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ minHeight: 'calc(100vh - 180px)' }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{ 
        background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
        borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
        padding: '4rem 0 2rem'
      }}>
        <div className="container">
          <div className="grid grid-cols-4 gap-8" style={{ marginBottom: '3rem' }}>
            {/* Company Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{
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
                }}>
                  HL
                </div>
                <span style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent'
                }}>
                  HouseLink
                </span>
              </div>
              <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {language === 'sw'
                  ? 'Mfumo wa kwanza unaoaminika Tanzania wa mali, ukiwawezesha kila mwananchi kupata nyumba bora au mali ya uwekezaji kwa urahisi.'
                  : 'Tanzania\'s most trusted property platform, empowering every citizen to find their ideal home or investment property with ease.'
                }
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" className="btn btn-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="btn btn-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="btn btn-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="btn btn-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                {language === 'sw' ? 'Viungo vya Haraka' : 'Quick Links'}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { hash: '#home', label: { sw: 'Nyumbani', en: 'Home' } },
                  { hash: '#listings', label: { sw: 'Mali Zote', en: 'All Properties' } },
                  { hash: '#services', label: { sw: 'Huduma Zetu', en: 'Our Services' } },
                  { hash: '#about', label: { sw: 'Kuhusu Sisi', en: 'About Us' } },
                  { hash: '#contact', label: { sw: 'Wasiliana', en: 'Contact' } }
                ].map((link, i) => (
                  <li key={i}>
                    <a 
                      href={link.hash}
                      style={{
                        fontSize: '0.875rem',
                        opacity: 0.8,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'opacity 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <i className="fas fa-chevron-right" style={{ fontSize: '0.625rem' }}></i>
                      {link.label[language]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                {language === 'sw' ? 'Huduma' : 'Services'}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { label: { sw: 'Utafutaji wa Mali', en: 'Property Search' } },
                  { label: { sw: 'Ukodishaji wa Mali', en: 'Property Rental' } },
                  { label: { sw: 'Uuzaji wa Mali', en: 'Property Sale' } },
                  { label: { sw: 'Huduma za Wakala', en: 'Broker Services' } },
                  { label: { sw: 'Usimamizi wa Mali', en: 'Property Management' } }
                ].map((service, i) => (
                  <li key={i}>
                    <a 
                      href="#services"
                      style={{
                        fontSize: '0.875rem',
                        opacity: 0.8,
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'opacity 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <i className="fas fa-check-circle" style={{ fontSize: '0.625rem', color: 'var(--success-color)' }}></i>
                      {service.label[language]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                {language === 'sw' ? 'Jiandikishe kwa Habari' : 'Newsletter'}
              </h4>
              <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {language === 'sw'
                  ? 'Jiandikishe kupata habari za mali mpya na ofa maalum.'
                  : 'Subscribe to get updates on new properties and special offers.'
                }
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  placeholder={language === 'sw' ? 'Barua pepe yako' : 'Your email'}
                  className="form-control"
                  style={{ flex: 1 }}
                />
                <button className="btn btn-primary">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ 
            paddingTop: '2rem',
            borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              © {new Date().getFullYear()} HouseLink Tanzania. {language === 'sw' ? 'Haki zote zimehifadhiwa.' : 'All rights reserved.'}
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', opacity: 0.7 }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                {language === 'sw' ? 'Sera ya Faragha' : 'Privacy Policy'}
              </a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                {language === 'sw' ? 'Masharti ya Matumizi' : 'Terms of Service'}
              </a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
                {language === 'sw' ? 'Mapendekezo ya Udhibiti' : 'Cookie Policy'}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {window.LoginModal && <window.LoginModal />}
      {window.SignupModal && <window.SignupModal />}
      {window.PropertyDetailModal && <window.PropertyDetailModal />}
      
      {/* Loading Overlay */}
      {window.API && window.API.isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: darkMode ? 'var(--card-bg-dark)' : 'white',
            padding: '2rem',
            borderRadius: 'var(--border-radius-lg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '3px solid var(--border-light)', 
              borderTop: '3px solid var(--primary-color)', 
              borderRadius: '50%', 
              animation: 'spin 1s linear infinite' 
            }}></div>
            <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
              {language === 'sw' ? 'Inapakia...' : 'Loading...'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ================ SIMPLIFIED DASHBOARD PAGE ================
const DashboardPage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, language } = React.useContext(window.LanguageContext);
  const { user, savedProperties, savedSearches, notifications } = React.useContext(window.AuthContext);

  return (
    <section id="dashboard" className="section" style={{ 
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh',
      padding: '2rem 0'
    }}>
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '2rem' }}>
          {language === 'sw' ? 'Dashibodi' : 'Dashboard'}
        </h1>
        
        <div className="grid grid-cols-3 gap-6" style={{ marginBottom: '3rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              {language === 'sw' ? 'Mali Zilizohifadhiwa' : 'Saved Properties'}
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary-color)' }}>
              {savedProperties.length}
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              {language === 'sw' ? 'Utafutaji Uliohifadhiwa' : 'Saved Searches'}
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--secondary-color)' }}>
              {savedSearches.length}
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              {language === 'sw' ? 'Arifa Mpya' : 'New Notifications'}
            </h3>
            <div style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-color)' }}>
              {notifications.filter(n => !n.read).length}
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
            {language === 'sw' ? 'Karibu, ' : 'Welcome, '}{user?.name}
          </h2>
          <p style={{ lineHeight: '1.6', opacity: 0.8 }}>
            {language === 'sw'
              ? 'Hii ni dashibodi yako ya HouseLink. Unaweza kutazama mali ulizohifadhi, utafutaji uliohifadhi, na kupokea arifa.'
              : 'This is your HouseLink dashboard. You can view saved properties, saved searches, and receive notifications.'
            }
          </p>
        </div>
      </div>
    </section>
  );
};

// ================ INITIALIZE APP ================
const initializeApp = () => {
  // Create root container
  const container = document.createElement('div');
  container.id = 'houselink-root';
  document.body.appendChild(container);

  // Render app with all providers
  ReactDOM.render(
    <window.ThemeProvider>
      <window.LanguageProvider>
        <window.AuthProvider>
          <window.ModalProvider>
            <window.SearchProvider>
              <App />
            </window.SearchProvider>
          </window.ModalProvider>
        </window.AuthProvider>
      </window.LanguageProvider>
    </window.ThemeProvider>,
    container
  );
  
  console.log('App initialized successfully!');
};

// Export components
window.App = App;
window.DashboardPage = DashboardPage;
window.initializeApp = initializeApp;
