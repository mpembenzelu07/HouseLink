// ================ TOAST COMPONENT ================
const Toast = () => {
  const { toast, hideToast } = React.useContext(window.NotificationContext);

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const getToastColor = (type) => {
    switch (type) {
      case 'success': return 'var(--success-color)';
      case 'error': return 'var(--danger-color)';
      case 'warning': return 'var(--warning-color)';
      case 'info': 
      default: return 'var(--info-color)';
    }
  };

  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      case 'info': 
      default: return 'fas fa-info-circle';
    }
  };

  return (
    <div 
      className="toast"
      style={{ 
        background: getToastColor(toast.type)
      }}
    >
      <div className="toast-icon">
        <i className={getToastIcon(toast.type)}></i>
      </div>
      <div className="toast-content">
        <div className="toast-message">{toast.message}</div>
      </div>
      <button 
        className="toast-close"
        onClick={hideToast}
        aria-label="Close notification"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

// ================ LOADING SKELETON ================
const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const { darkMode } = React.useContext(window.ThemeContext);
  
  const renderCardSkeleton = () => (
    <div className="card skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-line" style={{ width: '70%' }}></div>
      <div className="skeleton skeleton-line-sm"></div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
        <div className="skeleton skeleton-line" style={{ width: '80px' }}></div>
        <div className="skeleton skeleton-line" style={{ width: '60px' }}></div>
      </div>
    </div>
  );
  
  const renderListSkeleton = () => (
    <div className="card" style={{ display: 'flex', gap: '1rem', padding: '1.5rem' }}>
      <div className="skeleton skeleton-image" style={{ width: '150px', height: '150px' }}></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div className="skeleton skeleton-line" style={{ width: '60%' }}></div>
        <div className="skeleton skeleton-line" style={{ width: '40%' }}></div>
        <div className="skeleton skeleton-line" style={{ width: '80%' }}></div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
          <div className="skeleton skeleton-line" style={{ width: '100px' }}></div>
          <div className="skeleton skeleton-line" style={{ width: '100px' }}></div>
        </div>
      </div>
    </div>
  );
  
  const renderSpinner = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
      <p>Loading...</p>
    </div>
  );
  
  if (type === 'spinner') {
    return renderSpinner();
  }
  
  const skeletons = [];
  for (let i = 0; i < count; i++) {
    skeletons.push(
      type === 'list' ? renderListSkeleton() : renderCardSkeleton()
    );
  }
  
  return <>{skeletons}</>;
};

// ================ NAVBAR COMPONENT ================
const Navbar = () => {
  const { darkMode, toggleDarkMode } = React.useContext(window.ThemeContext);
  const { language, toggleLanguage, t } = React.useContext(window.LanguageContext);
  const { 
    user, 
    logout, 
    notifications, 
    markAllNotificationsAsRead,
    unreadNotifications 
  } = React.useContext(window.AuthContext);
  const { openModal } = React.useContext(window.ModalContext);
  
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.notification-dropdown') && !e.target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (!e.target.closest('.user-menu') && !e.target.closest('.user-button')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close mobile menu when clicking a link
  const handleNavLinkClick = () => {
    setMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        {/* Logo */}
        <a href="#home" className="navbar-brand" onClick={handleNavLinkClick}>
          <div className="brand-logo">
            <i className="fas fa-home"></i>
          </div>
          <div className="brand-text">
            <h1>{t('appName')}</h1>
            <p>{t('tagline')}</p>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="desktop-only nav-menu">
          <a 
            href="#home" 
            className="nav-link active"
            onClick={handleNavLinkClick}
          >
            {t('home')}
          </a>
          <a 
            href="#listings" 
            className="nav-link"
            onClick={handleNavLinkClick}
          >
            {t('listings')}
          </a>
          <a 
            href="#services" 
            className="nav-link"
            onClick={handleNavLinkClick}
          >
            {t('services')}
          </a>
          <a 
            href="#about" 
            className="nav-link"
            onClick={handleNavLinkClick}
          >
            {t('about')}
          </a>
          <a 
            href="#contact" 
            className="nav-link"
            onClick={handleNavLinkClick}
          >
            {t('contact')}
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="desktop-only nav-actions">
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="btn btn-outline"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            aria-label={language === 'sw' ? 'Switch to English' : 'Badilisha lugha Kiswahili'}
          >
            {language === 'sw' ? 'EN' : 'SW'}
          </button>
          
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode}
            className="btn btn-icon"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>
          
          {user ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="notification-button btn btn-icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="Notifications"
                >
                  <i className="fas fa-bell"></i>
                  {unreadNotifications > 0 && (
                    <span className="badge" style={{ 
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'var(--danger-color)',
                      color: 'white',
                      fontSize: '0.75rem',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-dropdown">
                    <div className="card" style={{ width: '320px', maxHeight: '400px' }}>
                      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Notifications</strong>
                        {unreadNotifications > 0 && (
                          <button 
                            onClick={markAllNotificationsAsRead}
                            className="btn btn-link"
                            style={{ fontSize: '0.75rem', padding: 0 }}
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {notifications.length > 0 ? (
                          notifications.slice(0, 10).map(notif => (
                            <div 
                              key={notif.id}
                              className="card-body"
                              style={{ 
                                padding: '0.75rem 1rem',
                                borderBottom: '1px solid var(--border-light)',
                                background: notif.read ? 'transparent' : 'rgba(13, 148, 136, 0.05)',
                                cursor: 'pointer'
                              }}
                              onClick={() => {
                                setShowNotifications(false);
                                window.location.hash = '#dashboard';
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <i className={notif.icon || 'fas fa-bell'} style={{ color: 'var(--primary-color)' }}></i>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '0.875rem' }}>{notif.title}</strong>
                                    <small style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                                      {window.Format.relativeTime(notif.timestamp)}
                                    </small>
                                  </div>
                                  <p style={{ fontSize: '0.75rem', margin: '0.25rem 0 0', opacity: 0.8 }}>
                                    {notif.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="card-body text-center" style={{ padding: '2rem' }}>
                            <i className="fas fa-bell-slash" style={{ fontSize: '2rem', opacity: 0.5, marginBottom: '0.5rem' }}></i>
                            <p style={{ fontSize: '0.875rem', opacity: 0.7, margin: 0 }}>No notifications</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button 
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                >
                  <div className="avatar" style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}>
                    {window.Generator.avatarInitials(user.name)}
                  </div>
                </button>

                {showUserMenu && (
                  <div className="user-menu">
                    <div className="card" style={{ width: '220px' }}>
                      <div className="card-header">
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>{user.name}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{user.email}</div>
                      </div>
                      <div className="card-body" style={{ padding: '0.5rem 0' }}>
                        <a 
                          href="#dashboard" 
                          className="nav-link"
                          onClick={() => {
                            setShowUserMenu(false);
                            handleNavLinkClick();
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                        >
                          <i className="fas fa-tachometer-alt"></i>
                          {t('dashboard')}
                        </a>
                        <a 
                          href="#profile" 
                          className="nav-link"
                          onClick={() => {
                            setShowUserMenu(false);
                            handleNavLinkClick();
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                        >
                          <i className="fas fa-user"></i>
                          {t('profile')}
                        </a>
                        {user.role === 'broker' && (
                          <a 
                            href="#upload" 
                            className="nav-link"
                            onClick={() => {
                              setShowUserMenu(false);
                              handleNavLinkClick();
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                          >
                            <i className="fas fa-plus-circle"></i>
                            {t('upload')}
                          </a>
                        )}
                        <a 
                          href="#favorites" 
                          className="nav-link"
                          onClick={() => {
                            setShowUserMenu(false);
                            handleNavLinkClick();
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                        >
                          <i className="fas fa-heart"></i>
                          {t('favorites')}
                        </a>
                        <a 
                          href="#settings" 
                          className="nav-link"
                          onClick={() => {
                            setShowUserMenu(false);
                            handleNavLinkClick();
                          }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                        >
                          <i className="fas fa-cog"></i>
                          {t('settings')}
                        </a>
                      </div>
                      <div className="card-footer">
                        <button 
                          onClick={handleLogout}
                          className="btn btn-link"
                          style={{ color: 'var(--danger-color)', width: '100%', justifyContent: 'flex-start' }}
                        >
                          <i className="fas fa-sign-out-alt"></i>
                          {t('logout')}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={() => openModal('login')}
                className="btn btn-outline"
              >
                {t('login')}
              </button>
              <button 
                onClick={() => openModal('signup')}
                className="btn btn-primary"
              >
                {t('signup')}
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-only btn btn-icon"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-only" style={{ 
          background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
          padding: '1rem',
          borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a 
              href="#home" 
              className="nav-link"
              onClick={handleNavLinkClick}
              style={{ padding: '0.75rem 1rem' }}
            >
              <i className="fas fa-home" style={{ marginRight: '0.5rem' }}></i>
              {t('home')}
            </a>
            <a 
              href="#listings" 
              className="nav-link"
              onClick={handleNavLinkClick}
              style={{ padding: '0.75rem 1rem' }}
            >
              <i className="fas fa-search" style={{ marginRight: '0.5rem' }}></i>
              {t('listings')}
            </a>
            <a 
              href="#services" 
              className="nav-link"
              onClick={handleNavLinkClick}
              style={{ padding: '0.75rem 1rem' }}
            >
              <i className="fas fa-handshake" style={{ marginRight: '0.5rem' }}></i>
              {t('services')}
            </a>
            <a 
              href="#about" 
              className="nav-link"
              onClick={handleNavLinkClick}
              style={{ padding: '0.75rem 1rem' }}
            >
              <i className="fas fa-info-circle" style={{ marginRight: '0.5rem' }}></i>
              {t('about')}
            </a>
            <a 
              href="#contact" 
              className="nav-link"
              onClick={handleNavLinkClick}
              style={{ padding: '0.75rem 1rem' }}
            >
              <i className="fas fa-phone-alt" style={{ marginRight: '0.5rem' }}></i>
              {t('contact')}
            </a>
            
            {user ? (
              <>
                <a 
                  href="#dashboard" 
                  className="nav-link"
                  onClick={handleNavLinkClick}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <i className="fas fa-tachometer-alt" style={{ marginRight: '0.5rem' }}></i>
                  {t('dashboard')}
                </a>
                <a 
                  href="#favorites" 
                  className="nav-link"
                  onClick={handleNavLinkClick}
                  style={{ padding: '0.75rem 1rem' }}
                >
                  <i className="fas fa-heart" style={{ marginRight: '0.5rem' }}></i>
                  {t('favorites')}
                </a>
                <button 
                  onClick={handleLogout}
                  className="nav-link"
                  style={{ 
                    textAlign: 'left',
                    padding: '0.75rem 1rem',
                    color: 'var(--danger-color)'
                  }}
                >
                  <i className="fas fa-sign-out-alt" style={{ marginRight: '0.5rem' }}></i>
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setMenuOpen(false);
                    openModal('login');
                  }}
                  className="nav-link"
                  style={{ textAlign: 'left', padding: '0.75rem 1rem' }}
                >
                  <i className="fas fa-sign-in-alt" style={{ marginRight: '0.5rem' }}></i>
                  {t('login')}
                </button>
                <button 
                  onClick={() => {
                    setMenuOpen(false);
                    openModal('signup');
                  }}
                  className="btn btn-primary"
                  style={{ margin: '0.5rem 1rem' }}
                >
                  <i className="fas fa-user-plus" style={{ marginRight: '0.5rem' }}></i>
                  {t('signup')}
                </button>
              </>
            )}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
              marginTop: '0.5rem'
            }}>
              <button 
                onClick={toggleDarkMode}
                className="btn btn-icon"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <i className={darkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
              </button>
              <button 
                onClick={toggleLanguage}
                className="btn btn-outline"
                style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}
              >
                {language === 'sw' ? 'EN' : 'SW'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// ================ SEARCH BAR COMPONENT ================
const SearchBar = ({ compact = false }) => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t } = React.useContext(window.LanguageContext);
  const { searchQuery, setSearchQuery, filters, updateFilters, clearFilters } = React.useContext(window.SearchContext);
  const { openModal } = React.useContext(window.ModalContext);
  
  const [showFilters, setShowFilters] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.hash = `#listings?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value });
  };

  const handleClearFilters = () => {
    clearFilters();
    setShowFilters(false);
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} style={{ width: '100%' }}>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="form-control"
            style={{ paddingLeft: '3rem' }}
          />
          <i className="fas fa-search" style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--primary-color)'
          }}></i>
          <button 
            type="submit"
            className="btn btn-primary"
            style={{
              position: 'absolute',
              right: '0.5rem',
              top: '50%',
              transform: 'translateY(-50%)',
              padding: '0.5rem 1rem'
            }}
          >
            {t('search')}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <form onSubmit={handleSearch}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--primary-color)'
              }}></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="form-control"
                style={{ paddingLeft: '3rem' }}
              />
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-search"></i>
              {t('search')}
            </button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className={`fas fa-${showFilters ? 'times' : 'filter'}`}></i>
              {t('filter')}
            </button>
          </div>
        </div>

        {showFilters && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}` }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div>
                <label className="form-label">{t('location')}</label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="form-control form-select"
                >
                  <option value="">All Locations</option>
                  {window.CONFIG.LOCATIONS.map(loc => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name} ({loc.count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">{t('type')}</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="form-control form-select"
                >
                  <option value="">All Types</option>
                  {window.CONFIG.PROPERTY_TYPES.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.icon} {t(type.label)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="form-label">{t('price')} (Min)</label>
                <input
                  type="number"
                  placeholder="TZS 0"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  className="form-control"
                />
              </div>

              <div>
                <label className="form-label">{t('price')} (Max)</label>
                <input
                  type="number"
                  placeholder="TZS 5,000,000"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  className="form-control"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button 
                type="button" 
                onClick={handleClearFilters}
                className="btn btn-link"
                style={{ color: 'var(--danger-color)' }}
              >
                <i className="fas fa-times"></i>
                {t('clearFilters')}
              </button>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowFilters(false)}
                  className="btn btn-outline"
                >
                  {t('cancel')}
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                >
                  {t('applyFilters')}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

// ================ PROPERTY CARD COMPONENT ================
const PropertyCard = React.memo(({ property, onViewDetails }) => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, getConfigLabel } = React.useContext(window.LanguageContext);
  const { user, toggleFavorite, isFavorite, addRecentView } = React.useContext(window.AuthContext);
  
  const isFav = isFavorite(property.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      // Open login modal
      if (window.ModalContextRef) {
        window.ModalContextRef.openModal('login');
      }
      return;
    }
    toggleFavorite(property.id);
  };

  const handleCardClick = () => {
    addRecentView(property);
    if (onViewDetails) {
      onViewDetails(property);
    }
  };

  return (
    <div 
      className="card property-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
          e.preventDefault();
        }
      }}
    >
      <div className="property-image">
        <img 
          src={property.images?.[0] || property.image || 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop'} 
          alt={property.title}
          loading="lazy"
        />
        
        <div className="property-badges">
          {property.featured && (
            <div className="badge badge-featured">
              <i className="fas fa-star"></i>
              {t('featured')}
            </div>
          )}
          
          {property.verified && (
            <div className="badge badge-verified">
              <i className="fas fa-check-circle"></i>
              {t('verified')}
            </div>
          )}
        </div>
        
        <div className="property-actions">
          <button 
            className={`favorite-btn ${isFav ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <i className={`fas fa-heart${isFav ? '' : '-o'}`}></i>
          </button>
        </div>
      </div>
      
      <div className="property-info">
        <h3 className="property-title">{property.title}</h3>
        
        <div className="property-location">
          <i className="fas fa-map-marker-alt"></i>
          {property.location}
        </div>
        
        <p className="property-description">
          {window.Format.truncate(property.description, 100)}
        </p>
        
        <div className="property-features">
          <div className="property-feature">
            <i className="fas fa-bed"></i>
            <span>{property.bedrooms || 'Studio'}</span>
          </div>
          
          <div className="property-feature">
            <i className="fas fa-bath"></i>
            <span>{property.bathrooms || '1'}</span>
          </div>
          
          <div className="property-feature">
            <i className="fas fa-arrows-alt"></i>
            <span>{property.size || 'N/A'}</span>
          </div>
        </div>
        
        <div className="property-footer">
          <div>
            <div className="property-price">
              {window.Format.price(property.price)}
            </div>
            <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
              {property.type === 'land' ? 'Sale' : '/month'}
            </div>
          </div>
          
          <button 
            className="btn btn-outline btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            style={{ padding: '0.5rem 1rem' }}
          >
            {t('viewDetails')}
          </button>
        </div>
      </div>
    </div>
  );
});

// ================ FOOTER COMPONENT ================
const Footer = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t } = React.useContext(window.LanguageContext);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-logo">
                <i className="fas fa-home"></i>
              </div>
              <div className="footer-text">
                <h3>{t('appName')}</h3>
                <p>{t('tagline')}</p>
              </div>
            </div>
            <p>
              Your trusted partner in finding the perfect home. 
              We connect tenants, buyers, and property owners across Tanzania.
            </p>
          </div>
          
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">{t('home')}</a></li>
              <li><a href="#listings">{t('listings')}</a></li>
              <li><a href="#services">{t('services')}</a></li>
              <li><a href="#about">{t('about')}</a></li>
              <li><a href="#contact">{t('contact')}</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>{t('services')}</h4>
            <ul>
              <li><a href="#services">{t('property_search')}</a></li>
              <li><a href="#services">{t('broker_services')}</a></li>
              <li><a href="#services">{t('legal_assistance')}</a></li>
              <li><a href="#services">{t('property_valuation')}</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>{t('contact')} Info</h4>
            <ul>
              <li>
                <i className="fas fa-map-marker-alt"></i>
                <span>HouseLink Towers, Mlimani City, Dar es Salaam</span>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <span>+255 22 123 4567</span>
              </li>
              <li>
                <i className="fas fa-envelope"></i>
                <span>info@houselink.co.tz</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Mon-Fri: 8AM-6PM, Sat: 9AM-4PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            {t('copyright')}
          </div>
          <div className="footer-legal">
            <a href="#privacy">{t('privacy')}</a>
            <a href="#terms">{t('terms')}</a>
            <a href="#cookies">Cookies</a>
            <a href="#sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ================ MODAL COMPONENT ================
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showClose = true 
}) => {
  const modalRef = React.useRef();

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-width-400',
    md: 'max-width-600',
    lg: 'max-width-800',
    xl: 'max-width-1000',
    full: 'max-width-90vw'
  };

  return (
    <div className="modal-overlay">
      <div 
        ref={modalRef}
        className={`modal ${sizeClasses[size]}`}
        style={{ maxWidth: sizeClasses[size] }}
      >
        {showClose && (
          <button 
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
        
        {title && (
          <div className="card-header">
            <h3>{title}</h3>
          </div>
        )}
        
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// ================ PROPERTY DETAIL MODAL ================
const PropertyDetailModal = () => {
  const { modals, closeModal, getModalData } = React.useContext(window.ModalContext);
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, getConfigLabel } = React.useContext(window.LanguageContext);
  const { user, sendMessage, addNotification } = React.useContext(window.AuthContext);
  
  const property = getModalData('propertyDetail');
  const [activeTab, setActiveTab] = React.useState('details');
  const [message, setMessage] = React.useState('');
  const [scheduleDate, setScheduleDate] = React.useState('');
  const [scheduleTime, setScheduleTime] = React.useState('');

  if (!property) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!user) {
      closeModal('propertyDetail');
      window.ModalContextRef?.openModal('login');
      return;
    }
    
    if (!message.trim()) {
      addNotification({
        title: 'Message Required',
        message: 'Please enter a message',
        type: 'warning'
      });
      return;
    }
    
    sendMessage({
      propertyId: property.id,
      propertyTitle: property.title,
      to: property.brokerName,
      toEmail: property.brokerEmail,
      subject: `Inquiry about ${property.title}`,
      message: message.trim(),
    });
    
    setMessage('');
    addNotification({
      title: 'Message Sent',
      message: 'Your message has been sent to the broker.',
      type: 'success'
    });
  };

  const handleScheduleViewing = (e) => {
    e.preventDefault();
    if (!user) {
      closeModal('propertyDetail');
      window.ModalContextRef?.openModal('login');
      return;
    }
    
    if (!scheduleDate || !scheduleTime) {
      addNotification({
        title: 'Date and Time Required',
        message: 'Please select both date and time',
        type: 'warning'
      });
      return;
    }
    
    sendMessage({
      propertyId: property.id,
      propertyTitle: property.title,
      to: property.brokerName,
      toEmail: property.brokerEmail,
      subject: `Viewing Request: ${property.title}`,
      message: `I would like to schedule a viewing on ${scheduleDate} at ${scheduleTime}. Please confirm availability.`,
    });
    
    setScheduleDate('');
    setScheduleTime('');
    addNotification({
      title: 'Viewing Scheduled',
      message: 'Your viewing request has been sent to the broker.',
      type: 'success'
    });
  };

  const tabs = [
    { id: 'details', label: t('description'), icon: 'fas fa-info-circle' },
    { id: 'amenities', label: t('amenities'), icon: 'fas fa-list' },
    { id: 'location', label: t('location'), icon: 'fas fa-map-marker-alt' },
    { id: 'broker', label: t('broker'), icon: 'fas fa-user-tie' }
  ];

  return (
    <Modal
      isOpen={modals.propertyDetail}
      onClose={() => closeModal('propertyDetail')}
      title={property.title}
      size="lg"
    >
      <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Property Images */}
        <div style={{ marginBottom: '1.5rem' }}>
          <img 
            src={property.images?.[0] || property.image} 
            alt={property.title}
            style={{ 
              width: '100%', 
              height: '300px', 
              objectFit: 'cover', 
              borderRadius: 'var(--border-radius)'
            }}
          />
        </div>
        
        {/* Property Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h4 style={{ marginBottom: '0.5rem' }}>{property.location}</h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-bed"></i>
                <span>{property.bedrooms}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-bath"></i>
                <span>{property.bathrooms}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fas fa-arrows-alt"></i>
                <span>{property.size}</span>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
              {window.Format.price(property.price)}
            </div>
            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              {property.type === 'land' ? 'Sale' : '/month'}
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
          marginBottom: '1.5rem'
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderBottom: activeTab === tab.id ? '2px solid var(--primary-color)' : 'none',
                color: activeTab === tab.id ? 'var(--primary-color)' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                fontWeight: activeTab === tab.id ? '600' : '400',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab Content */}
        <div style={{ marginBottom: '2rem' }}>
          {activeTab === 'details' && (
            <div>
              <p style={{ marginBottom: '1rem' }}>{property.description}</p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '1rem',
                marginTop: '1rem'
              }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Property Type</strong>
                  <span>{getConfigLabel(window.CONFIG.PROPERTY_TYPES, property.type, 'label')}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Available From</strong>
                  <span>{window.Format.date(property.availableFrom, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Minimum Stay</strong>
                  <span>{property.minStay || 'Flexible'}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Deposit</strong>
                  <span>{window.Format.price(property.deposit || property.price * 2)}</span>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'amenities' && (
            <div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                gap: '1rem'
              }}>
                {window.CONFIG.AMENITIES.map(amenity => (
                  <div 
                    key={amenity.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      background: property.amenities?.includes(amenity.id) 
                        ? 'rgba(13, 148, 136, 0.1)' 
                        : 'rgba(0,0,0,0.05)',
                      borderRadius: 'var(--border-radius)',
                      opacity: property.amenities?.includes(amenity.id) ? 1 : 0.5
                    }}
                  >
                    <span style={{ fontSize: '1.25rem' }}>{amenity.icon}</span>
                    <span>{getConfigLabel(window.CONFIG.AMENITIES, amenity.id, 'label')}</span>
                    {property.amenities?.includes(amenity.id) && (
                      <i className="fas fa-check" style={{ marginLeft: 'auto', color: 'var(--success-color)' }}></i>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'location' && (
            <div>
              <p style={{ marginBottom: '1rem' }}>
                Located in {property.location}. This area is known for its excellent amenities and convenient access to public transportation.
              </p>
              <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: 'var(--border-radius)' }}>
                <h5 style={{ marginBottom: '0.5rem' }}>Nearby Facilities</h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
                  {['Schools', 'Hospitals', 'Supermarkets', 'Banks', 'Restaurants', 'Parks', 'Public Transport', 'Shopping Malls'].map(facility => (
                    <div key={facility} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <i className="fas fa-check" style={{ color: 'var(--success-color)' }}></i>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'broker' && (
            <div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div className="avatar" style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  {window.Generator.avatarInitials(property.brokerName)}
                </div>
                <div>
                  <h4 style={{ marginBottom: '0.25rem' }}>{property.brokerName}</h4>
                  <p style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>Verified Broker</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {window.Generator.ratingStars(property.brokerRating || 4.5).map((starClass, i) => (
                        <i key={i} className={starClass} style={{ color: 'var(--accent-color)' }}></i>
                      ))}
                    </div>
                    <span>({property.brokerRating || 4.5})</span>
                  </div>
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Email</strong>
                  <span>{property.brokerEmail}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>Phone</strong>
                  <span>{window.Format.phone(property.brokerPhone)}</span>
                </div>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>License</strong>
                  <span>TRBA-{property.brokerId?.replace('broker_', '').padStart(4, '0')}</span>
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
                gap: '1rem'
              }}>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--border-radius)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>50+</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Properties</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--border-radius)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>3+</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Years Exp</div>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,0,0,0.05)', borderRadius: 'var(--border-radius)' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>98%</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Satisfaction</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          paddingTop: '1.5rem',
          borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`
        }}>
          <button 
            className="btn btn-primary"
            onClick={() => {
              closeModal('propertyDetail');
              window.ModalContextRef?.openModal('sendMessage', { property });
            }}
            style={{ flex: 1 }}
          >
            <i className="fas fa-envelope"></i>
            {t('sendMessage')}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              closeModal('propertyDetail');
              window.ModalContextRef?.openModal('scheduleViewing', { property });
            }}
            style={{ flex: 1 }}
          >
            <i className="fas fa-calendar-alt"></i>
            {t('schedule')}
          </button>
          <a 
            href={`tel:${property.brokerPhone}`}
            className="btn btn-success"
            style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}
          >
            <i className="fas fa-phone-alt"></i>
            {t('contact')}
          </a>
        </div>
      </div>
    </Modal>
  );
};

// ================ EXPORT COMPONENTS ================
window.Toast = Toast;
window.LoadingSkeleton = LoadingSkeleton;
window.Navbar = Navbar;
window.SearchBar = SearchBar;
window.PropertyCard = PropertyCard;
window.Footer = Footer;
window.Modal = Modal;
window.PropertyDetailModal = PropertyDetailModal;
