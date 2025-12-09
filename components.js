const Toast = () => {
  const { toast, showToast } = React.useContext(NotificationContext);

  React.useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        showToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const colors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: colors[toast.type] || colors.info,
      color: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
      boxShadow: 'var(--shadow-hover)',
      zIndex: 9999,
      animation: 'slideIn 0.3s ease-out',
      maxWidth: '350px',
      minWidth: '250px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px'
      }}>
        {toast.type === 'success' && '✓'}
        {toast.type === 'error' && '✗'}
        {toast.type === 'warning' && '⚠'}
        {toast.type === 'info' && 'ℹ'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: '600', fontSize: '14px' }}>{toast.message}</div>
      </div>
      <button 
        onClick={() => showToast(null)}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          padding: '4px',
          opacity: 0.7,
          transition: 'opacity 0.2s'
        }}
      >
        ×
      </button>
    </div>
  );
};

const LoadingSkeleton = ({ type = 'card' }) => {
  if (type === 'card') {
    return (
      <div style={{
        background: 'var(--card-bg-light)',
        borderRadius: '16px',
        padding: '1rem',
        animation: 'pulse 1.5s ease-in-out infinite',
        height: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        border: '1px solid var(--border-light)'
      }}>
        <div style={{
          width: '100%',
          height: '180px',
          background: 'var(--border-light)',
          borderRadius: '12px'
        }}></div>
        <div style={{
          width: '70%',
          height: '20px',
          background: 'var(--border-light)',
          borderRadius: '4px'
        }}></div>
        <div style={{
          width: '50%',
          height: '16px',
          background: 'var(--border-light)',
          borderRadius: '4px'
        }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{
            width: '80px',
            height: '24px',
            background: 'var(--border-light)',
            borderRadius: '4px'
          }}></div>
          <div style={{
            width: '60px',
            height: '24px',
            background: 'var(--border-light)',
            borderRadius: '4px'
          }}></div>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
      <p>Loading...</p>
    </div>
  );
};

const SearchBar = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showFilters, setShowFilters] = React.useState(false);
  const [filters, setFilters] = React.useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.hash = `#search?q=${encodeURIComponent(searchQuery)}`;
      if (Object.values(filters).some(f => f)) {
        const filterParams = new URLSearchParams(filters).toString();
        window.location.hash = `#search?q=${encodeURIComponent(searchQuery)}&${filterParams}`;
      }
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: ''
    });
    setSearchQuery('');
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      width: '100%'
    }}>
      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <i className="fas fa-search" style={{
              position: 'absolute',
              left: '16px',
              color: 'var(--primary-color)',
              fontSize: '16px'
            }}></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                border: `2px solid var(--border-light)`,
                borderRadius: '12px',
                fontSize: '16px',
                background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                transition: 'all 0.3s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-color)';
                e.target.style.boxShadow = '0 0 0 3px rgba(13, 148, 136, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--border-light)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>
        
        <button type="submit" style={{
          background: 'var(--primary-color)',
          color: 'white',
          border: 'none',
          padding: '16px 32px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s',
          whiteSpace: 'nowrap'
        }}>
          <i className="fas fa-search"></i>
          {t.search}
        </button>
        
        <button type="button" onClick={() => setShowFilters(!showFilters)} style={{
          background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
          border: `2px solid var(--border-light)`,
          padding: '16px',
          borderRadius: '12px',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.3s'
        }}>
          <i className={`fas fa-${showFilters ? 'times' : 'filter'}`}></i>
          {t.filter}
        </button>
      </form>

      {showFilters && (
        <div style={{
          marginTop: '20px',
          padding: '24px',
          background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
          borderRadius: '16px',
          border: `1px solid var(${darkMode ? '--border-dark' : '--border-light'})`,
          boxShadow: 'var(--shadow)',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
              }}>
                {t.location}
              </label>
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid var(${darkMode ? '--border-dark' : '--border-light'})`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? 'var(--dark-bg)' : 'white',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}
              >
                <option value="">{t.allLocations || 'Eneo Zote'}</option>
                {CONFIG.LOCATIONS.map(loc => (
                  <option key={loc.name} value={loc.name}>{loc.name} ({loc.count})</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
              }}>
                {t.type}
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid var(${darkMode ? '--border-dark' : '--border-light'})`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? 'var(--dark-bg)' : 'white',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}
              >
                <option value="">{t.allTypes || 'Aina Zote'}</option>
                {CONFIG.PROPERTY_TYPES.map(type => (
                  <option key={type.id} value={type.id}>{type.icon} {type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
              }}>
                {t.price} (Min)
              </label>
              <input
                type="number"
                placeholder="TZS 0"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid var(${darkMode ? '--border-dark' : '--border-light'})`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? 'var(--dark-bg)' : 'white',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
              }}>
                {t.price} (Max)
              </label>
              <input
                type="number"
                placeholder="TZS 5,000,000"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: `1px solid var(${darkMode ? '--border-dark' : '--border-light'})`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  background: darkMode ? 'var(--dark-bg)' : 'white',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button onClick={clearFilters} style={{
              background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              border: `1px solid var(${darkMode ? '--border-dark' : '--border-light'})`,
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              <i className="fas fa-times"></i> {t.clearFilters}
            </button>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShowFilters(false)} style={{
                background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                border: `1px solid var(${darkMode ? '--border-dark' : '--border-light'})`,
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                {t.cancel}
              </button>

              <button onClick={handleSearch} style={{
                background: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <i className="fas fa-search"></i> {t.applyFilters}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { darkMode, toggleDarkMode } = React.useContext(ThemeContext);
  const { language, toggleLanguage, t } = React.useContext(LanguageContext);
  const { user, logout, notifications, markAllNotificationsAsRead } = React.useContext(AuthContext);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const unreadNotifications = notifications.filter(n => !n.read).length;

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

  return (
    <nav style={{
      background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
      padding: '0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
      borderBottom: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href="#home" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              <i className="fas fa-home"></i>
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', lineHeight: '1.2' }}>
                {t.appName}
              </h1>
              <p style={{ 
                margin: 0, 
                fontSize: '12px', 
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                opacity: 0.7 
              }}>
                {t.tagline}
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="desktop-only" style={{ 
          display: 'flex', 
          gap: '32px', 
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#home" style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              opacity: 0.8,
              transition: 'all 0.3s'
            }}>
              {t.home}
            </a>
            <a href="#listings" style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              opacity: 0.8,
              transition: 'all 0.3s'
            }}>
              {t.listings}
            </a>
            <a href="#services" style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              opacity: 0.8,
              transition: 'all 0.3s'
            }}>
              {t.services}
            </a>
            <a href="#about" style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              opacity: 0.8,
              transition: 'all 0.3s'
            }}>
              {t.about}
            </a>
            <a href="#contact" style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '14px',
              opacity: 0.8,
              transition: 'all 0.3s'
            }}>
              {t.contactUs}
            </a>
          </div>
          
          {/* Search Bar (Desktop) */}
          <div style={{ width: '300px' }}>
            <SearchBar />
          </div>

          {/* User Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={toggleDarkMode} style={{
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              padding: '8px',
              borderRadius: '8px',
              transition: 'all 0.3s',
              opacity: 0.7
            }}>
              {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            </button>
            
            <button onClick={toggleLanguage} style={{
              background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
              padding: '6px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}>
              {language === 'sw' ? 'EN' : 'SW'}
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <div style={{ position: 'relative' }}>
                  <button 
                    className="notification-button"
                    onClick={() => setShowNotifications(!showNotifications)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '18px',
                      cursor: 'pointer',
                      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                      padding: '8px',
                      borderRadius: '8px',
                      transition: 'all 0.3s',
                      position: 'relative',
                      opacity: 0.7
                    }}
                  >
                    <i className="fas fa-bell"></i>
                    {unreadNotifications > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '2px',
                        right: '2px',
                        background: 'var(--danger-color)',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: 'bold',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {unreadNotifications}
                      </span>
                    )}
                  </button>

                  {showNotifications && (
                    <div className="notification-dropdown" style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                      border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-hover)',
                      width: '320px',
                      maxHeight: '400px',
                      overflowY: 'auto',
                      zIndex: 1001,
                      animation: 'fadeIn 0.2s ease-out'
                    }}>
                      <div style={{
                        padding: '16px',
                        borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <strong style={{ fontSize: '14px' }}>Notifications</strong>
                        {unreadNotifications > 0 && (
                          <button 
                            onClick={markAllNotificationsAsRead}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--primary-color)',
                              fontSize: '12px',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}
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
                              style={{
                                padding: '12px 16px',
                                borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                                background: notif.read ? 'transparent' : (darkMode ? 'rgba(13, 148, 136, 0.1)' : 'rgba(13, 148, 136, 0.05)'),
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                              onClick={() => window.location.hash = '#notifications'}
                            >
                              <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '4px'
                              }}>
                                <strong style={{ fontSize: '13px' }}>{notif.title}</strong>
                                <small style={{ 
                                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                                  opacity: 0.5,
                                  fontSize: '11px'
                                }}>
                                  {formatDate(notif.timestamp)}
                                </small>
                              </div>
                              <p style={{ 
                                fontSize: '12px',
                                margin: 0,
                                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                                opacity: 0.8
                              }}>
                                {notif.message}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div style={{ 
                            padding: '32px 16px', 
                            textAlign: 'center',
                            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                            opacity: 0.5
                          }}>
                            <i className="fas fa-bell-slash" style={{ fontSize: '24px', marginBottom: '8px' }}></i>
                            <p style={{ fontSize: '12px', margin: 0 }}>No notifications</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div style={{ position: 'relative' }}>
                  <button 
                    className="user-button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {showUserMenu && (
                    <div className="user-menu" style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                      border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-hover)',
                      width: '220px',
                      zIndex: 1001,
                      animation: 'fadeIn 0.2s ease-out'
                    }}>
                      <div style={{
                        padding: '16px',
                        borderBottom: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`
                      }}>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>{user.name}</div>
                        <div style={{ 
                          fontSize: '12px',
                          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                          opacity: 0.7
                        }}>
                          {user.email}
                        </div>
                      </div>
                      
                      <div style={{ padding: '8px 0' }}>
                        <a href="#dashboard" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 16px',
                          textDecoration: 'none',
                          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}>
                          <i className="fas fa-tachometer-alt" style={{ width: '20px', opacity: 0.7 }}></i>
                          {t.dashboard}
                        </a>
                        
                        <a href="#profile" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 16px',
                          textDecoration: 'none',
                          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}>
                          <i className="fas fa-user" style={{ width: '20px', opacity: 0.7 }}></i>
                          {t.profile}
                        </a>
                        
                        {user.role === 'broker' && (
                          <a href="#upload" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 16px',
                            textDecoration: 'none',
                            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                            fontSize: '14px',
                            transition: 'all 0.2s'
                          }}>
                            <i className="fas fa-plus-circle" style={{ width: '20px', opacity: 0.7 }}></i>
                            {t.upload}
                          </a>
                        )}
                        
                        <a href="#favorites" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 16px',
                          textDecoration: 'none',
                          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}>
                          <i className="fas fa-heart" style={{ width: '20px', opacity: 0.7 }}></i>
                          {t.favorites}
                        </a>
                        
                        <a href="#settings" style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 16px',
                          textDecoration: 'none',
                          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                          fontSize: '14px',
                          transition: 'all 0.2s'
                        }}>
                          <i className="fas fa-cog" style={{ width: '20px', opacity: 0.7 }}></i>
                          {t.settings}
                        </a>
                        
                        <div style={{
                          padding: '10px 16px',
                          borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                          marginTop: '8px'
                        }}>
                          <button onClick={logout} style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--danger-color)',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            width: '100%',
                            padding: 0
                          }}>
                            <i className="fas fa-sign-out-alt"></i>
                            {t.logout}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a href="#login" style={{
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  opacity: 0.8,
                  transition: 'all 0.3s'
                }}>
                  {t.login}
                </a>
                <a href="#signup" style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s'
                }}>
                  {t.signup}
                </a>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-only"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            padding: '8px'
          }}
        >
          {menuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-only" style={{
          background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
          padding: '20px',
          borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <SearchBar />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#home" onClick={() => setMenuOpen(false)} style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <i className="fas fa-home"></i>
              {t.home}
            </a>
            
            <a href="#listings" onClick={() => setMenuOpen(false)} style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <i className="fas fa-search"></i>
              {t.listings}
            </a>
            
            <a href="#services" onClick={() => setMenuOpen(false)} style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <i className="fas fa-handshake"></i>
              {t.services}
            </a>
            
            <a href="#about" onClick={() => setMenuOpen(false)} style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <i className="fas fa-info-circle"></i>
              {t.about}
            </a>
            
            <a href="#contact" onClick={() => setMenuOpen(false)} style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <i className="fas fa-phone-alt"></i>
              {t.contactUs}
            </a>
            
            {user ? (
              <>
                <a href="#dashboard" onClick={() => setMenuOpen(false)} style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <i className="fas fa-tachometer-alt"></i>
                  {t.dashboard}
                </a>
                
                <a href="#favorites" onClick={() => setMenuOpen(false)} style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <i className="fas fa-heart"></i>
                  {t.favorites}
                </a>
                
                <button onClick={() => { logout(); setMenuOpen(false); }} style={{ 
                  color: 'var(--danger-color)',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  border: 'none',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <i className="fas fa-sign-out-alt"></i>
                  {t.logout}
                </button>
              </>
            ) : (
              <>
                <a href="#login" onClick={() => setMenuOpen(false)} style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  background: 'transparent',
                  fontSize: '14px',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <i className="fas fa-sign-in-alt"></i>
                  {t.login}
                </a>
                
                <a href="#signup" onClick={() => setMenuOpen(false)} style={{ 
                  background: 'var(--primary-color)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px'
                }}>
                  <i className="fas fa-user-plus"></i>
                  {t.signup}
                </a>
              </>
            )}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light')}`,
              marginTop: '8px'
            }}>
              <button onClick={toggleDarkMode} style={{
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                padding: '8px',
                borderRadius: '8px',
                opacity: 0.7
              }}>
                {darkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
              </button>
              
              <button onClick={toggleLanguage} style={{
                background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                {language === 'sw' ? 'EN' : 'SW'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const HeroSection = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);

  return (
    <section style={{
      padding: '80px 24px',
      background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{
          maxWidth: '700px',
          marginBottom: '48px'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            lineHeight: '1.2',
            marginBottom: '20px'
          }}>
            Pata Nyumba Bora <br /> Tanzania
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9,
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Ungana na wakala wa uhakika, pata nyumba unayotaka, au uweke mali yako kwa urahisi. 
            Zaidi ya mali 10,000 zimepatikana leo!
          </p>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="#listings" style={{
              background: 'white',
              color: 'var(--primary-color)',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-search"></i>
              {t.search}
            </a>
            
            <a href="#upload" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-plus-circle"></i>
              {t.upload}
            </a>
          </div>
        </div>
        
        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          marginTop: '60px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              10,000+
            </div>
            <div style={{ opacity: 0.9, fontSize: '14px' }}>
              Nyumba Zilizopatikana
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              500+
            </div>
            <div style={{ opacity: 0.9, fontSize: '14px' }}>
              Wawakala Waaminifu
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              95%
            </div>
            <div style={{ opacity: 0.9, fontSize: '14px' }}>
              Wateja Walioridhika
            </div>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '8px'
            }}>
              24/7
            </div>
            <div style={{ opacity: 0.9, fontSize: '14px' }}>
              Huduma ya Msaada
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '40%',
        background: 'rgba(255,255,255,0.05)',
        clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)'
      }}></div>
    </section>
  );
};

const PropertyCard = React.memo(({ property, onViewDetails }) => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);
  const { user, favorites, toggleFavorite } = React.useContext(AuthContext);
  const isFavorite = favorites.includes(property.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!user) {
      window.location.hash = '#login';
      return;
    }
    toggleFavorite(property.id);
  };

  return (
    <div 
      onClick={() => onViewDetails(property)}
      style={{
        background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.3s ease-out'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow)';
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <img 
          src={property.image || 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop'} 
          alt={property.title}
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            display: 'block'
          }}
          loading="lazy"
        />
        
        {/* Property Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {property.featured && (
            <div style={{
              background: 'var(--accent-color)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <i className="fas fa-star" style={{ fontSize: '10px' }}></i>
              Featured
            </div>
          )}
          
          {property.verified && (
            <div style={{
              background: 'var(--success-color)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <i className="fas fa-check-circle" style={{ fontSize: '10px' }}></i>
              Verified
            </div>
          )}
        </div>
        
        <button 
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s',
            color: isFavorite ? 'var(--danger-color)' : 'inherit'
          }}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <i className={`fas fa-heart${isFavorite ? '' : '-o'}`}></i>
        </button>
      </div>
      
      <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '18px',
          fontWeight: '600',
          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
          lineHeight: '1.4'
        }}>
          {property.title}
        </h3>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          color: 'var(--primary-color)',
          marginBottom: '12px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <i className="fas fa-map-marker-alt" style={{ marginRight: '6px' }}></i>
          {property.location}
        </div>
        
        <p style={{
          color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
          fontSize: '14px',
          marginBottom: '16px',
          flexGrow: 1,
          opacity: 0.8,
          lineHeight: '1.5'
        }}>
          {property.description?.substring(0, 100)}...
        </p>
        
        {/* Property Features */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            opacity: 0.8
          }}>
            <i className="fas fa-bed"></i>
            <span>{property.bedrooms || 'Studio'}</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            opacity: 0.8
          }}>
            <i className="fas fa-bath"></i>
            <span>{property.bathrooms || '1'}</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            opacity: 0.8
          }}>
            <i className="fas fa-arrows-alt"></i>
            <span>{property.size || 'N/A'}</span>
          </div>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
          paddingTop: '16px',
          borderTop: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)'
        }}>
          <div>
            <span style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'var(--primary-color)'
            }}>
              {formatPrice(property.price)}
            </span>
            <span style={{
              fontSize: '12px',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              opacity: 0.7,
              marginLeft: '4px'
            }}>
              /month
            </span>
          </div>
          
          <button style={{
            background: 'transparent',
            color: 'var(--primary-color)',
            border: `1px solid var(--primary-color)`,
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(property);
          }}
          >
            {t.viewDetails}
          </button>
        </div>
      </div>
    </div>
  );
});

const PropertyDetail = ({ property, onClose }) => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);
  const { user, sendMessage } = React.useContext(AuthContext);
  const [activeTab, setActiveTab] = React.useState('details');
  const [message, setMessage] = React.useState('');
  const [showMessageForm, setShowMessageForm] = React.useState(false);
  const [showScheduleForm, setShowScheduleForm] = React.useState(false);
  const [scheduleDate, setScheduleDate] = React.useState('');
  const [scheduleTime, setScheduleTime] = React.useState('');

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!user) {
      window.location.hash = '#login';
      return;
    }
    
    if (!message.trim()) {
      alert('Please enter a message');
      return;
    }
    
    sendMessage({
      propertyId: property.id,
      propertyTitle: property.title,
      from: user.name,
      fromEmail: user.email,
      to: property.brokerName || 'Broker',
      message: message.trim(),
    });
    
    setMessage('');
    setShowMessageForm(false);
  };

  const handleScheduleViewing = (e) => {
    e.preventDefault();
    if (!user) {
      window.location.hash = '#login';
      return;
    }
    
    if (!scheduleDate || !scheduleTime) {
      alert('Please select date and time');
      return;
    }
    
    // In a real app, this would send to backend
    alert(`Viewing scheduled for ${scheduleDate} at ${scheduleTime}`);
    setShowScheduleForm(false);
    setScheduleDate('');
    setScheduleTime('');
  };

  return (
    <div 
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9998,
        padding: '20px',
        overflow: 'auto'
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
          borderRadius: '20px',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          position: 'relative',
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.5)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Close"
        >
          ×
        </button>
        
        {/* Property Images */}
        <div style={{ position: 'relative', height: '400px' }}>
          <img 
            src={property.image || 'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop'} 
            alt={property.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
        
        {/* Property Info */}
        <div style={{ padding: '32px', overflow: 'auto', maxHeight: 'calc(90vh - 400px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
              <h2 style={{ 
                margin: '0 0 12px 0',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                fontSize: '28px',
                fontWeight: '700',
                lineHeight: '1.3'
              }}>
                {property.title}
              </h2>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                color: 'var(--primary-color)',
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '16px'
              }}>
                <i className="fas fa-map-marker-alt" style={{ marginRight: '8px' }}></i>
                {property.location}
                <span style={{ 
                  margin: '0 16px',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  opacity: 0.5
                }}>•</span>
                <span style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  opacity: 0.8
                }}>
                  Listed {formatDate(property.createdAt || new Date().toISOString())}
                </span>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: darkMode ? 'var(--dark-bg)' : 'rgba(13, 148, 136, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}>
                  <i className="fas fa-bed"></i>
                  <span>{property.bedrooms || 'Studio'} Bedrooms</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: darkMode ? 'var(--dark-bg)' : 'rgba(13, 148, 136, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}>
                  <i className="fas fa-bath"></i>
                  <span>{property.bathrooms || '1'} Bathrooms</span>
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: darkMode ? 'var(--dark-bg)' : 'rgba(13, 148, 136, 0.1)',
                  padding: '8px 16px',
                  borderRadius: '8px'
                }}>
                  <i className="fas fa-arrows-alt"></i>
                  <span>{property.size || 'N/A'} sqft</span>
                </div>
              </div>
            </div>
            
            <div style={{ textAlign: 'right', minWidth: '200px' }}>
              <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-color)' }}>
                {formatPrice(property.price)}
              </div>
              <div style={{ 
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                opacity: 0.7,
                fontSize: '14px',
                marginBottom: '16px'
              }}>
                /month
              </div>
              <div style={{ 
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                fontSize: '14px',
                opacity: 0.8
              }}>
                Deposit: {formatPrice(property.deposit || property.price * 2)}
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div style={{ 
            display: 'flex', 
            borderBottom: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
            marginBottom: '24px',
            overflowX: 'auto'
          }}>
            {['details', 'amenities', 'location', 'broker'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '12px 24px',
                  color: activeTab === tab ? 'var(--primary-color)' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                  borderBottom: activeTab === tab ? '2px solid var(--primary-color)' : 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  opacity: activeTab === tab ? 1 : 0.7,
                  transition: 'all 0.3s'
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div style={{ marginBottom: '32px' }}>
            {activeTab === 'details' && (
              <div>
                <h3 style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  marginBottom: '16px',
                  fontSize: '20px'
                }}>
                  Description
                </h3>
                <p style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  opacity: 0.9
                }}>
                  {property.description || 'No description provided.'}
                </p>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginTop: '24px'
                }}>
                  <div>
                    <h4 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>Property Type</h4>
                    <p style={{ fontWeight: '500' }}>{property.type || 'N/A'}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>Available From</h4>
                    <p style={{ fontWeight: '500' }}>{formatDate(property.availableFrom || new Date().toISOString())}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>Minimum Stay</h4>
                    <p style={{ fontWeight: '500' }}>{property.minStay || '1 month'}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', opacity: 0.7, marginBottom: '8px' }}>Property Age</h4>
                    <p style={{ fontWeight: '500' }}>{property.age || 'N/A'} years</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'amenities' && (
              <div>
                <h3 style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  marginBottom: '24px',
                  fontSize: '20px'
                }}>
                  Amenities & Features
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {CONFIG.AMENITIES.map(amenity => (
                    <div key={amenity.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                      padding: '12px 16px',
                      borderRadius: '8px'
                    }}>
                      <span style={{ fontSize: '20px' }}>{amenity.icon}</span>
                      <span style={{ 
                        color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                        fontSize: '14px'
                      }}>
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'location' && (
              <div>
                <h3 style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  marginBottom: '16px',
                  fontSize: '20px'
                }}>
                  Location Details
                </h3>
                <p style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  opacity: 0.9
                }}>
                  Prime location in {property.location}. Close to schools, hospitals, shopping centers, and public transportation.
                </p>
                
                <div style={{
                  background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                  padding: '20px',
                  borderRadius: '12px',
                  marginTop: '20px'
                }}>
                  <h4 style={{ marginBottom: '12px', fontSize: '16px' }}>Nearby Facilities</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
                    {['Schools', 'Hospitals', 'Supermarkets', 'Banks', 'Restaurants', 'Parks'].map(facility => (
                      <div key={facility} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px'
                      }}>
                        <i className="fas fa-check" style={{ color: 'var(--success-color)' }}></i>
                        {facility}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'broker' && (
              <div>
                <h3 style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  marginBottom: '16px',
                  fontSize: '20px'
                }}>
                  Broker Information
                </h3>
                
                <div style={{
                  display: 'flex',
                  gap: '24px',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap'
                }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '36px',
                    fontWeight: '600'
                  }}>
                    {property.brokerName?.charAt(0).toUpperCase() || 'B'}
                  </div>
                  
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <h4 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
                      {property.brokerName || 'John Doe'}
                    </h4>
                    
                    <div style={{ 
                      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                      padding: '20px',
                      borderRadius: '12px',
                      marginTop: '16px'
                    }}>
                      <div style={{ marginBottom: '12px' }}>
                        <strong style={{ display: 'block', marginBottom: '4px' }}>Email</strong>
                        <span>{property.brokerEmail || 'john@houselink.co.tz'}</span>
                      </div>
                      
                      <div style={{ marginBottom: '12px' }}>
                        <strong style={{ display: 'block', marginBottom: '4px' }}>Phone</strong>
                        <span>{property.brokerPhone || '+255 712 345 678'}</span>
                      </div>
                      
                      <div>
                        <strong style={{ display: 'block', marginBottom: '4px' }}>License</strong>
                        <span>TRBA-2024-{property.brokerId || '001'}</span>
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginTop: '20px',
                      flexWrap: 'wrap'
                    }}>
                      <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                        borderRadius: '8px',
                        flex: 1,
                        minWidth: '100px'
                      }}>
                        <div style={{ fontSize: '20px', fontWeight: '700' }}>50+</div>
                        <div style={{ fontSize: '12px', opacity: 0.7 }}>Properties</div>
                      </div>
                      
                      <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                        borderRadius: '8px',
                        flex: 1,
                        minWidth: '100px'
                      }}>
                        <div style={{ fontSize: '20px', fontWeight: '700' }}>4.8</div>
                        <div style={{ fontSize: '12px', opacity: 0.7 }}>Rating</div>
                      </div>
                      
                      <div style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                        borderRadius: '8px',
                        flex: 1,
                        minWidth: '100px'
                      }}>
                        <div style={{ fontSize: '20px', fontWeight: '700' }}>3y</div>
                        <div style={{ fontSize: '12px', opacity: 0.7 }}>Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
            flexWrap: 'wrap'
          }}>
            <button onClick={() => setShowMessageForm(true)} style={{
              flex: 1,
              minWidth: '200px',
              background: 'var(--primary-color)',
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-envelope"></i>
              {t.sendMessage}
            </button>
            
            <button onClick={() => setShowScheduleForm(true)} style={{
              flex: 1,
              minWidth: '200px',
              background: 'var(--secondary-color)',
              color: 'white',
              border: 'none',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-calendar-alt"></i>
              {t.schedule}
            </button>
            
            <a 
              href={`tel:${property.brokerPhone || '+255712345678'}`}
              style={{
                flex: 1,
                minWidth: '200px',
                background: 'var(--success-color)',
                color: 'white',
                border: 'none',
                padding: '16px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <i className="fas fa-phone-alt"></i>
              {t.contact}
            </a>
          </div>
        </div>
      </div>
      
      {/* Message Form Modal */}
      {showMessageForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              fontSize: '24px',
              fontWeight: '700'
            }}>
              {t.sendMessage}
            </h3>
            
            <form onSubmit={handleSendMessage}>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.yourMessage}
                rows="6"
                required
                style={{
                  width: '100%',
                  padding: '16px',
                  border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                  borderRadius: '8px',
                  fontSize: '14px',
                  marginBottom: '20px',
                  background: darkMode ? 'var(--dark-bg)' : 'white',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  resize: 'vertical'
                }}
              />
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button type="submit" style={{
                  flex: 1,
                  minWidth: '120px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  {t.send}
                </button>
                
                <button type="button" onClick={() => setShowMessageForm(false)} style={{
                  flex: 1,
                  minWidth: '120px',
                  background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Schedule Viewing Modal */}
      {showScheduleForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h3 style={{ 
              margin: '0 0 16px 0', 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              fontSize: '24px',
              fontWeight: '700'
            }}>
              Schedule Viewing
            </h3>
            
            <form onSubmit={handleScheduleViewing}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}>
                  Select Date
                </label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: darkMode ? 'var(--dark-bg)' : 'white',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}>
                  Select Time
                </label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: darkMode ? 'var(--dark-bg)' : 'white',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button type="submit" style={{
                  flex: 1,
                  minWidth: '120px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  Confirm Booking
                </button>
                
                <button type="button" onClick={() => setShowScheduleForm(false)} style={{
                  flex: 1,
                  minWidth: '120px',
                  background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                  padding: '16px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const Footer = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);

  return (
    <footer style={{
      background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
      padding: '80px 24px 40px',
      borderTop: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '48px',
          marginBottom: '48px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>
                <i className="fas fa-home"></i>
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>HouseLink</h3>
                <p style={{ fontSize: '12px', opacity: 0.7, margin: 0 }}>Tanzania</p>
              </div>
            </div>
            <p style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              opacity: 0.8,
              lineHeight: '1.6',
              fontSize: '14px'
            }}>
              Your trusted partner in finding the perfect home. We connect tenants, buyers, and property owners across Tanzania.
            </p>
          </div>
          
          <div>
            <h4 style={{ 
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '24px',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Home', 'Properties', 'Services', 'About', 'Contact'].map((link, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <a href={`#${link.toLowerCase()}`} style={{
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    opacity: 0.8,
                    transition: 'all 0.3s'
                  }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 style={{ 
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '24px',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
            }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Property Search', 'Broker Services', 'Legal Assistance', 'Market Analysis', 'Premium Listings'].map((service, i) => (
                <li key={i} style={{ marginBottom: '12px' }}>
                  <a href="#services" style={{
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    opacity: 0.8,
                    transition: 'all 0.3s'
                  }}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 style={{ 
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '24px',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
            }}>
              Contact Info
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--primary-color)', fontSize: '14px', marginTop: '2px' }}></i>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>HouseLink Towers, Dar es Salaam</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-phone-alt" style={{ color: 'var(--primary-color)', fontSize: '14px' }}></i>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>+255 22 123 4567</span>
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-envelope" style={{ color: 'var(--primary-color)', fontSize: '14px' }}></i>
                <span style={{ fontSize: '14px', opacity: 0.8 }}>info@houselink.co.tz</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          borderTop: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`, 
          paddingTop: '32px',
          textAlign: 'center'
        }}>
          <p style={{ 
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            opacity: 0.7,
            fontSize: '14px',
            marginBottom: '24px'
          }}>
            {t.copyright}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <a href="#privacy" style={{
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontSize: '14px',
              opacity: 0.8
            }}>
              Privacy Policy
            </a>
            <a href="#terms" style={{
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontSize: '14px',
              opacity: 0.8
            }}>
              Terms of Service
            </a>
            <a href="#cookies" style={{
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              textDecoration: 'none',
              fontSize: '14px',
              opacity: 0.8
            }}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
