// ================ APP.JS ================
// Main application component with routing and layout

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
              {/* Search Button (Mobile) */}
              <button
                className="btn btn-icon"
                onClick={() => window.ModalContextRef?.openModal('quickSearch')}
                style={{ display: 'none' }}
              >
                <i className="fas fa-search"></i>
              </button>

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

              {/* Mobile Menu Toggle */}
              <button
                className="btn btn-icon"
                onClick={() => window.ModalContextRef?.openModal('mobileMenu')}
                style={{ display: 'none' }}
              >
                <i className="fas fa-bars"></i>
              </button>
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
      <window.LoginModal />
      <window.SignupModal />
      <window.PropertyDetailModal />
      <window.UserMenuModal />
      <window.MobileMenuModal />
      <window.QuickSearchModal />
      <window.SaveSearchModal />
      <window.SharePropertyModal />
      <window.BookViewingModal />
      <window.ContactBrokerModal />

      {/* Notifications */}
      <div style={{
        position: 'fixed',
        top: '6rem',
        right: '1rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxWidth: '400px'
      }}>
        {notifications.slice(0, 3).map((notification, i) => (
          <div
            key={notification.id}
            style={{
              background: darkMode ? 'var(--card-bg-dark)' : 'white',
              borderLeft: `4px solid ${notification.type === 'success' ? 'var(--success-color)' : 
                          notification.type === 'error' ? 'var(--danger-color)' : 
                          notification.type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'}`,
              padding: '1rem',
              borderRadius: 'var(--border-radius)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              animation: 'slideInRight 0.3s ease-out',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              maxWidth: '400px'
            }}
          >
            <div style={{ 
              width: '36px', 
              height: '36px', 
              background: notification.type === 'success' ? 'var(--success-color)' : 
                         notification.type === 'error' ? 'var(--danger-color)' : 
                         notification.type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0
            }}>
              <i className={notification.icon || 'fas fa-bell'}></i>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                {notification.title}
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>
                {notification.message}
              </div>
            </div>
            <button
              onClick={() => clearNotifications([notification.id])}
              className="btn btn-icon"
              style={{ fontSize: '0.75rem', padding: '0.25rem' }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>

      {/* Loading Overlay */}
      {window.API.isLoading && (
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

// ================ DASHBOARD PAGE ================
const DashboardPage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, language } = React.useContext(window.LanguageContext);
  const { user, savedProperties, savedSearches, notifications, markNotificationAsRead } = React.useContext(window.AuthContext);
  const { openModal } = React.useContext(window.ModalContext);

  const [activeTab, setActiveTab] = React.useState('overview');

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  // Calculate stats
  const stats = {
    totalProperties: savedProperties.length,
    activeSearches: savedSearches.length,
    unreadNotifications: unreadNotificationCount,
    lastLogin: new Date().toLocaleDateString(language === 'sw' ? 'sw-TZ' : 'en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };

  return (
    <section id="dashboard" className="section" style={{ 
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh'
    }}>
      <div className="container">
        {/* Dashboard Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                {language === 'sw' ? 'Dashibodi' : 'Dashboard'}
              </h1>
              <p style={{ fontSize: '1.125rem', opacity: 0.7 }}>
                {language === 'sw' 
                  ? `Karibu tena, ${user?.name || 'Mgeni'}!` 
                  : `Welcome back, ${user?.name || 'Guest'}!`
                }
              </p>
            </div>
            <button 
              onClick={() => window.location.hash = '#listings'}
              className="btn btn-primary"
            >
              <i className="fas fa-plus" style={{ marginRight: '0.5rem' }}></i>
              {language === 'sw' ? 'Tafuta Mali Mpya' : 'Find New Properties'}
            </button>
          </div>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 gap-8" style={{ gridTemplateColumns: '250px 1fr' }}>
          {/* Sidebar */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '6rem' }}>
              {/* User Profile */}
              <div style={{ textAlign: 'center', padding: '2rem 1.5rem', borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}` }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: '600',
                  margin: '0 auto 1.5rem'
                }}>
                  {window.Generator.avatarInitials(user?.name || 'User')}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {user?.name || 'User'}
                </h3>
                <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
                  {user?.email || 'user@example.com'}
                </p>
                <div style={{ 
                  display: 'inline-block', 
                  background: 'rgba(13, 148, 136, 0.1)', 
                  color: 'var(--primary-color)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {user?.role === 'tenant' ? (language === 'sw' ? 'Mpangaji' : 'Tenant') :
                   user?.role === 'broker' ? (language === 'sw' ? 'Wakala' : 'Broker') :
                   (language === 'sw' ? 'Mmiliki' : 'Owner')}
                </div>
              </div>

              {/* Navigation */}
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { id: 'overview', icon: 'fas fa-chart-line', label: { sw: 'Maelezo', en: 'Overview' } },
                    { id: 'properties', icon: 'fas fa-home', label: { sw: 'Mali Zangu', en: 'My Properties' } },
                    { id: 'searches', icon: 'fas fa-search', label: { sw: 'Utafutaji', en: 'Saved Searches' } },
                    { id: 'notifications', icon: 'fas fa-bell', label: { sw: 'Arifa', en: 'Notifications' }, badge: unreadNotificationCount },
                    { id: 'profile', icon: 'fas fa-user-cog', label: { sw: 'Wasifu', en: 'Profile' } },
                    { id: 'settings', icon: 'fas fa-cog', label: { sw: 'Mipangilio', en: 'Settings' } }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        background: activeTab === item.id ? 'rgba(13, 148, 136, 0.1)' : 'transparent',
                        border: 'none',
                        borderRadius: 'var(--border-radius)',
                        color: activeTab === item.id ? 'var(--primary-color)' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                        fontSize: '0.875rem',
                        fontWeight: activeTab === item.id ? '600' : '400',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        position: 'relative'
                      }}
                    >
                      <i className={item.icon} style={{ fontSize: '1rem', width: '20px' }}></i>
                      <span style={{ flex: 1 }}>{item.label[language]}</span>
                      {item.badge > 0 && (
                        <span style={{
                          background: 'var(--accent-color)',
                          color: 'white',
                          fontSize: '0.625rem',
                          fontWeight: '700',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                {/* Stats Cards */}
                <div className="grid grid-cols-4 gap-6" style={{ marginBottom: '3rem' }}>
                  {[
                    { 
                      label: { sw: 'Mali Zilizohifadhiwa', en: 'Saved Properties' }, 
                      value: stats.totalProperties,
                      icon: 'fas fa-home',
                      color: 'var(--primary-color)'
                    },
                    { 
                      label: { sw: 'Utafutaji Unaoendelea', en: 'Active Searches' }, 
                      value: stats.activeSearches,
                      icon: 'fas fa-search',
                      color: 'var(--secondary-color)'
                    },
                    { 
                      label: { sw: 'Arifa Zisizosomwa', en: 'Unread Notifications' }, 
                      value: stats.unreadNotifications,
                      icon: 'fas fa-bell',
                      color: 'var(--accent-color)'
                    },
                    { 
                      label: { sw: 'Tarehe ya Mwisho ya Kuingia', en: 'Last Login' }, 
                      value: '✓',
                      icon: 'fas fa-calendar-check',
                      color: 'var(--success-color)'
                    }
                  ].map((stat, i) => (
                    <div key={i} className="card">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: `${stat.color}20`,
                          borderRadius: 'var(--border-radius)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: stat.color,
                          fontSize: '1.5rem'
                        }}>
                          <i className={stat.icon}></i>
                        </div>
                        <div>
                          <div style={{ fontSize: '2rem', fontWeight: '800', lineHeight: '1' }}>
                            {stat.value}
                          </div>
                          <div style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '0.25rem' }}>
                            {stat.label[language]}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                      {language === 'sw' ? 'Shughuli za Hivi Karibuni' : 'Recent Activity'}
                    </h3>
                    <a href="#" className="btn btn-link" style={{ fontSize: '0.875rem' }}>
                      {language === 'sw' ? 'Tazama Zote' : 'View All'}
                    </a>
                  </div>
                  <div className="card-body">
                    {notifications.slice(0, 5).map((notification, i) => (
                      <div 
                        key={notification.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'flex-start', 
                          gap: '1rem', 
                          padding: '1rem 0',
                          borderBottom: i < 4 ? `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}` : 'none',
                          cursor: notification.read ? 'default' : 'pointer'
                        }}
                        onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                      >
                        <div style={{ 
                          width: '40px', 
                          height: '40px', 
                          background: notification.read ? 'var(--border-light)' : `${notification.type === 'success' ? 'var(--success-color)' : 
                                  notification.type === 'error' ? 'var(--danger-color)' : 
                                  notification.type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'}20`,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: notification.read ? 'var(--text-light)' : (notification.type === 'success' ? 'var(--success-color)' : 
                                  notification.type === 'error' ? 'var(--danger-color)' : 
                                  notification.type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'),
                          flexShrink: 0
                        }}>
                          <i className={notification.icon || 'fas fa-bell'}></i>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ 
                            fontWeight: notification.read ? '400' : '600', 
                            marginBottom: '0.25rem',
                            fontSize: '0.875rem'
                          }}>
                            {notification.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.8, lineHeight: '1.4' }}>
                            {notification.message}
                          </div>
                          <div style={{ fontSize: '0.625rem', opacity: 0.6, marginTop: '0.25rem' }}>
                            {new Date(notification.timestamp).toLocaleString(language === 'sw' ? 'sw-TZ' : 'en-US')}
                          </div>
                        </div>
                        {!notification.read && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            background: 'var(--accent-color)',
                            borderRadius: '50%',
                            flexShrink: 0,
                            marginTop: '0.5rem'
                          }}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Properties Tab */}
            {activeTab === 'properties' && (
              <div>
                <div className="card">
                  <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                      {language === 'sw' ? 'Mali Zilizohifadhiwa' : 'Saved Properties'}
                    </h3>
                    <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                      {savedProperties.length} {language === 'sw' ? 'mali' : 'properties'}
                    </span>
                  </div>
                  <div className="card-body">
                    {savedProperties.length > 0 ? (
                      <div className="grid grid-cols-2 gap-6">
                        {savedProperties.slice(0, 4).map(property => (
                          <window.PropertyCard 
                            key={property.id}
                            property={property}
                            onViewDetails={(prop) => openModal('propertyDetail', { property: prop })}
                          />
                        ))}
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.5 }}>
                          <i className="fas fa-home"></i>
                        </div>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                          {language === 'sw' ? 'Hakuna Mali Zilizohifadhiwa' : 'No Saved Properties'}
                        </h4>
                        <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
                          {language === 'sw'
                            ? 'Anza kuhifadhi mali unazozipenda kutoka kwenye ukurasa wa mali'
                            : 'Start saving properties you like from the listings page'
                          }
                        </p>
                        <button 
                          onClick={() => window.location.hash = '#listings'}
                          className="btn btn-primary"
                        >
                          <i className="fas fa-search" style={{ marginRight: '0.5rem' }}></i>
                          {language === 'sw' ? 'Tafuta Mali' : 'Browse Properties'}
                        </button>
                      </div>
                    )}
                  </div>
                  {savedProperties.length > 4 && (
                    <div className="card-footer" style={{ textAlign: 'center' }}>
                      <button 
                        onClick={() => setActiveTab('properties')}
                        className="btn btn-link"
                      >
                        {language === 'sw' ? 'Tazama Mali Zote' : 'View All Properties'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Searches Tab */}
            {activeTab === 'searches' && (
              <div className="card">
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    {language === 'sw' ? 'Utafutaji Uliohifadhiwa' : 'Saved Searches'}
                  </h3>
                  <button 
                    onClick={() => openModal('saveSearch')}
                    className="btn btn-primary btn-sm"
                  >
                    <i className="fas fa-plus" style={{ marginRight: '0.5rem' }}></i>
                    {language === 'sw' ? 'Utafutaji Mpya' : 'New Search'}
                  </button>
                </div>
                <div className="card-body">
                  {savedSearches.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {savedSearches.map((search, i) => (
                        <div 
                          key={i}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            padding: '1rem',
                            border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                            borderRadius: 'var(--border-radius)'
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                              {search.query || language === 'sw' ? 'Utafutaji bila Jina' : 'Unnamed Search'}
                            </div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.7, display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              {search.location && (
                                <span>
                                  <i className="fas fa-map-marker-alt" style={{ marginRight: '0.25rem' }}></i>
                                  {search.location}
                                </span>
                              )}
                              {search.type && (
                                <span>
                                  <i className="fas fa-home" style={{ marginRight: '0.25rem' }}></i>
                                  {window.CONFIG.PROPERTY_TYPES.find(t => t.id === search.type)?.label[language] || search.type}
                                </span>
                              )}
                              {(search.minPrice || search.maxPrice) && (
                                <span>
                                  <i className="fas fa-tag" style={{ marginRight: '0.25rem' }}></i>
                                  {search.minPrice ? `TZS ${search.minPrice.toLocaleString()}` : ''}
                                  {search.minPrice && search.maxPrice ? ' - ' : ''}
                                  {search.maxPrice ? `TZS ${search.maxPrice.toLocaleString()}` : ''}
                                </span>
                              )}
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                              onClick={() => {
                                window.location.hash = '#listings';
                                // Apply search filters
                                window.SearchContextRef?.applySearch(search);
                              }}
                              className="btn btn-primary btn-sm"
                            >
                              <i className="fas fa-play" style={{ marginRight: '0.25rem' }}></i>
                              {language === 'sw' ? 'Anza' : 'Run'}
                            </button>
                            <button className="btn btn-outline btn-sm">
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.5 }}>
                        <i className="fas fa-search"></i>
                      </div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        {language === 'sw' ? 'Hakuna Utafutaji Uliohifadhiwa' : 'No Saved Searches'}
                      </h4>
                      <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
                        {language === 'sw'
                          ? 'Hifadhi utafutaji wako wa mara kwa mara ili kuokoa wakati baadaye'
                          : 'Save your frequent searches to save time later'
                        }
                      </p>
                      <button 
                        onClick={() => openModal('saveSearch')}
                        className="btn btn-primary"
                      >
                        <i className="fas fa-plus" style={{ marginRight: '0.5rem' }}></i>
                        {language === 'sw' ? 'Hifadhi Utafutaji' : 'Save Search'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
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

  // Initialize contexts
  window.ThemeContextRef = React.createRef();
  window.LanguageContextRef = React.createRef();
  window.AuthContextRef = React.createRef();
  window.ModalContextRef = React.createRef();
  window.SearchContextRef = React.createRef();

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
};

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export
window.App = App;
window.DashboardPage = DashboardPage;
window.initializeApp = initializeApp;
