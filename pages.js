// ================ HOME PAGE ================
const HomePage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, getConfigLabel, language } = React.useContext(window.LanguageContext);
  const { getFeaturedProperties, getRecentProperties, isAuthenticated } = React.useContext(window.AuthContext);
  const { openModal } = React.useContext(window.ModalContext);
  
  const [featuredProperties, setFeaturedProperties] = React.useState([]);
  const [recentProperties, setRecentProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      // Simulate API delay
      await window.API.simulateDelay(800);
      
      const featured = window.Storage.get('houselink_properties', []).filter(p => p.featured).slice(0, 6);
      const recent = [...window.Storage.get('houselink_properties', [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
      
      setFeaturedProperties(featured);
      setRecentProperties(recent);
      setLoading(false);
    };
    
    loadProperties();
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              {language === 'sw' ? 'Pata Nyumba Bora Tanzania' : 'Find Your Perfect Home in Tanzania'}
            </h1>
            <p className="hero-description">
              {language === 'sw' 
                ? 'Ungana na wakala wa uhakika, pata nyumba unayotaka, au uweke mali yako kwa urahisi. Zaidi ya mali 10,000 zimepatikana leo!'
                : 'Connect with trusted brokers, find your dream property, or list your property with ease. Over 10,000 properties available today!'
              }
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => window.location.hash = '#listings'}
              >
                <i className="fas fa-search"></i>
                {t('search')}
              </button>
              
              {!isAuthenticated && (
                <button 
                  className="btn btn-outline btn-lg"
                  style={{ borderColor: 'white', color: 'white' }}
                  onClick={() => openModal('signup')}
                >
                  <i className="fas fa-user-plus"></i>
                  {t('signup')}
                </button>
              )}
            </div>
            
            {/* Stats */}
            <div className="hero-stats">
              {window.CONFIG.STATS.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.value}</div>
                  <div className="stat-label">{stat.label[language]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-pattern"></div>
      </section>
      
      {/* Search Bar Section */}
      <section style={{ 
        padding: '2rem 0',
        background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container">
          <SearchBar />
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="section" style={{ background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>{language === 'sw' ? 'Kwa Nini Kuchagua HouseLink?' : 'Why Choose HouseLink?'}</h2>
            <p className="section-subtitle">
              {language === 'sw'
                ? 'Sababu nyingi kwa nini unapaswa kututumia kupata nyumba yako ya ndoto'
                : 'Multiple reasons why you should use us to find your dream home'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            {window.CONFIG.FEATURES.map((feature, i) => (
              <div key={i} className="feature-card card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3 className="feature-title">{feature.title[language]}</h3>
                <p className="feature-description">{feature.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="section" style={{ background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {t('featured')}
              </h2>
              <p style={{ fontSize: '1.125rem', opacity: 0.7 }}>
                {language === 'sw'
                  ? 'Nyumba bora zilizochaguliwa kwa makini na timu yetu'
                  : 'Hand-picked properties carefully selected by our team'
                }
              </p>
            </div>
            <a href="#listings" className="btn btn-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {t('viewAll')}
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3].map(i => <LoadingSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {featuredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onViewDetails={(prop) => openModal('propertyDetail', { property: prop })}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="section" style={{ background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)' }}>
        <div className="container">
          <div className="section-title">
            <h2>{language === 'sw' ? 'Aina za Mali' : 'Property Types'}</h2>
            <p className="section-subtitle">
              {language === 'sw'
                ? 'Chagua aina ya mali inayokufaa kulingana na mahitaji yako'
                : 'Choose the property type that suits your needs'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {window.CONFIG.PROPERTY_TYPES.map(type => {
              const count = window.Storage.get('houselink_properties', []).filter(p => p.type === type.id).length;
              return (
                <a 
                  key={type.id}
                  href={`#listings?type=${type.id}`}
                  className="card feature-card"
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {type.icon}
                  </div>
                  <h3 className="feature-title">{type.label[language]}</h3>
                  <p className="feature-description">{type.description[language]}</p>
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem 1rem', 
                    background: 'rgba(13, 148, 136, 0.1)', 
                    borderRadius: 'var(--border-radius)',
                    display: 'inline-block'
                  }}>
                    {count} {language === 'sw' ? 'Mali' : 'Properties'}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Recent Properties */}
      <section className="section" style={{ background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {t('recent')}
              </h2>
              <p style={{ fontSize: '1.125rem', opacity: 0.7 }}>
                {language === 'sw'
                  ? 'Nyumba mpya zilizowekwa hivi karibuni'
                  : 'Newly listed properties for you'
                }
              </p>
            </div>
            <a href="#listings" className="btn btn-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {t('viewAll')}
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => <LoadingSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {recentProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onViewDetails={(prop) => openModal('propertyDetail', { property: prop })}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="section-title">
            <h2>{language === 'sw' ? 'Maoni ya Wateja' : 'Customer Testimonials'}</h2>
            <p className="section-subtitle">
              {language === 'sw'
                ? 'Angalia wateja wetu walivyopata nyumba bora kupitia HouseLink'
                : 'See how our customers found their perfect homes through HouseLink'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            {window.CONFIG.TESTIMONIALS.map((testimonial, i) => (
              <div key={i} className="testimonial-card card">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.content[language]}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonial.image}
                  </div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role[language]} • {testimonial.location}</p>
                    <div style={{ display: 'flex', marginTop: '0.25rem' }}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <i 
                          key={starIndex}
                          className={`fas fa-star`}
                          style={{ 
                            color: starIndex < testimonial.rating ? 'var(--accent-color)' : 'var(--border-light)',
                            fontSize: '0.875rem'
                          }}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section style={{ 
        padding: '6rem 0',
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            {language === 'sw' ? 'Tayari Kupata Nyumba Yako ya Ndoto?' : 'Ready to Find Your Dream Home?'}
          </h2>
          <p style={{ 
            fontSize: '1.25rem',
            opacity: 0.9,
            marginBottom: '2.5rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            {language === 'sw'
              ? 'Jiunge na maelfu ya wateja walioridhika ambao walipata nyumba bora kupitia HouseLink Tanzania'
              : 'Join thousands of satisfied customers who found their perfect home through HouseLink Tanzania'
            }
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => window.location.hash = '#listings'}
              style={{ background: 'white', color: 'var(--primary-color)' }}
            >
              <i className="fas fa-search"></i>
              {language === 'sw' ? 'Tazama Mali' : 'Browse Properties'}
            </button>
            
            <button 
              className="btn btn-outline btn-lg"
              style={{ borderColor: 'white', color: 'white' }}
              onClick={() => !isAuthenticated ? openModal('signup') : window.location.hash = '#dashboard'}
            >
              <i className="fas fa-user-plus"></i>
              {!isAuthenticated 
                ? (language === 'sw' ? 'Jisajili Bila Malipo' : 'Sign Up Free')
                : (language === 'sw' ? 'Nenda Dashibodi' : 'Go to Dashboard')
              }
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// ================ LISTINGS PAGE ================
const ListingsPage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { t, language } = React.useContext(window.LanguageContext);
  const { getAllProperties, isAuthenticated, saveSearch } = React.useContext(window.AuthContext);
  const { openModal } = React.useContext(window.ModalContext);
  const { 
    searchQuery, 
    setSearchQuery, 
    filters, 
    updateFilters, 
    clearFilters, 
    sortBy, 
    setSortBy, 
    viewMode, 
    setViewMode,
    applyFilters,
    hasActiveFilters
  } = React.useContext(window.SearchContext);
  
  const [properties, setProperties] = React.useState([]);
  const [filteredProperties, setFilteredProperties] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(12);

  React.useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      await window.API.simulateDelay(600);
      const allProperties = getAllProperties();
      setProperties(allProperties);
      setFilteredProperties(applyFilters(allProperties));
      setLoading(false);
    };
    
    loadProperties();
  }, [getAllProperties, applyFilters]);

  // Update filtered properties when filters change
  React.useEffect(() => {
    if (properties.length > 0) {
      setFilteredProperties(applyFilters(properties));
      setCurrentPage(1);
    }
  }, [properties, searchQuery, filters, sortBy]);

  // Handle save search
  const handleSaveSearch = () => {
    if (!isAuthenticated) {
      openModal('login');
      return;
    }
    
    saveSearch({
      query: searchQuery,
      ...filters,
      sortBy,
      resultsCount: filteredProperties.length
    });
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="listings" className="section" style={{ 
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh'
    }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '0.5rem'
          }}>
            {language === 'sw' ? 'Tazama Mali Zote' : 'Browse All Properties'}
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.7 }}>
            {filteredProperties.length} {language === 'sw' ? 'mali zimepatikana' : 'properties found'}
            {hasActiveFilters && ` (${language === 'sw' ? 'mwenye vichujio' : 'with filters applied'})`}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8" style={{ gridTemplateColumns: '280px 1fr' }}>
          {/* Filters Sidebar */}
          <div style={{ position: 'sticky', top: '6rem', height: 'fit-content' }}>
            <div className="card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{t('filter')}</h3>
                {hasActiveFilters && (
                  <button 
                    onClick={clearFilters}
                    className="btn btn-link"
                    style={{ color: 'var(--danger-color)', fontSize: '0.875rem' }}
                  >
                    {t('clearFilters')}
                  </button>
                )}
              </div>
              
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Search */}
                  <div>
                    <label className="form-label">{t('search')}</label>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('searchPlaceholder')}
                      className="form-control"
                    />
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label className="form-label">{t('location')}</label>
                    <select
                      value={filters.location}
                      onChange={(e) => updateFilters({ location: e.target.value })}
                      className="form-control form-select"
                    >
                      <option value="">{language === 'sw' ? 'Eneo Zote' : 'All Locations'}</option>
                      {window.CONFIG.LOCATIONS.map(loc => (
                        <option key={loc.name} value={loc.name}>
                          {loc.name} ({loc.count})
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Property Type */}
                  <div>
                    <label className="form-label">{t('type')}</label>
                    <select
                      value={filters.type}
                      onChange={(e) => updateFilters({ type: e.target.value })}
                      className="form-control form-select"
                    >
                      <option value="">{language === 'sw' ? 'Aina Zote' : 'All Types'}</option>
                      {window.CONFIG.PROPERTY_TYPES.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.icon} {type.label[language]}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <label className="form-label">{t('price')} (TZS)</label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <input
                        type="number"
                        placeholder={language === 'sw' ? 'Chini' : 'Min'}
                        value={filters.minPrice}
                        onChange={(e) => updateFilters({ minPrice: e.target.value })}
                        className="form-control"
                      />
                      <input
                        type="number"
                        placeholder={language === 'sw' ? 'Juu' : 'Max'}
                        value={filters.maxPrice}
                        onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                        className="form-control"
                      />
                    </div>
                  </div>
                  
                  {/* Quick Price Ranges */}
                  <div>
                    <label className="form-label" style={{ marginBottom: '0.5rem' }}>
                      {language === 'sw' ? 'Mipango ya Bei' : 'Price Ranges'}
                    </label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {window.CONFIG.PRICE_RANGES.map((range, i) => (
                        <button
                          key={i}
                          onClick={() => updateFilters({ 
                            minPrice: range.min, 
                            maxPrice: range.max === 999999999 ? '' : range.max 
                          })}
                          style={{
                            background: 'none',
                            border: 'none',
                            textAlign: 'left',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--border-radius)',
                            background: filters.minPrice == range.min && filters.maxPrice == (range.max === 999999999 ? '' : range.max)
                              ? 'rgba(13, 148, 136, 0.1)'
                              : 'transparent',
                            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                          }}
                        >
                          {range.label[language]}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bedrooms & Bathrooms */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label className="form-label">{t('bedrooms')}</label>
                      <select
                        value={filters.bedrooms}
                        onChange={(e) => updateFilters({ bedrooms: e.target.value })}
                        className="form-control form-select"
                      >
                        <option value="">{language === 'sw' ? 'Yoyote' : 'Any'}</option>
                        <option value="Studio">Studio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="form-label">{t('bathrooms')}</label>
                      <select
                        value={filters.bathrooms}
                        onChange={(e) => updateFilters({ bathrooms: e.target.value })}
                        className="form-control form-select"
                      >
                        <option value="">{language === 'sw' ? 'Yoyote' : 'Any'}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                      </select>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSaveSearch}
                    className="btn btn-outline"
                    style={{ marginTop: '1rem' }}
                  >
                    <i className="fas fa-bookmark"></i>
                    {t('saveSearch')}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div>
            {/* Controls */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'}`}
                >
                  <i className="fas fa-th-large"></i>
                  {t('grid')}
                </button>
                
                <button 
                  onClick={() => setViewMode('list')}
                  className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
                >
                  <i className="fas fa-list"></i>
                  {t('list')}
                </button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  {t('sortBy')}:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-control form-select"
                  style={{ width: '200px' }}
                >
                  <option value="newest">{t('newest')}</option>
                  <option value="priceLowHigh">{t('priceLowHigh')}</option>
                  <option value="priceHighLow">{t('priceHighLow')}</option>
                  <option value="featured">{t('featuredFirst')}</option>
                  <option value="popular">{t('popular')}</option>
                </select>
              </div>
            </div>
            
            {/* Properties */}
            {loading ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-8`}>
                <LoadingSkeleton count={6} type={viewMode === 'list' ? 'list' : 'card'} />
              </div>
            ) : filteredProperties.length > 0 ? (
              <>
                <div className={`grid ${viewMode === 'grid' ? 'grid-cols-3' : 'grid-cols-1'} gap-8`}>
                  {paginatedProperties.map(property => (
                    <PropertyCard 
                      key={property.id} 
                      property={property}
                      onViewDetails={(prop) => openModal('propertyDetail', { property: prop })}
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginTop: '3rem'
                  }}>
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-outline"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <i className="fas fa-chevron-left"></i>
                      {language === 'sw' ? 'Nyuma' : 'Previous'}
                    </button>
                    
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={i}
                            onClick={() => handlePageChange(pageNum)}
                            className={`btn ${currentPage === pageNum ? 'btn-primary' : 'btn-outline'}`}
                            style={{ minWidth: '40px', height: '40px' }}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <>
                          <span style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem' }}>...</span>
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className={`btn ${currentPage === totalPages ? 'btn-primary' : 'btn-outline'}`}
                            style={{ minWidth: '40px', height: '40px' }}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="btn btn-outline"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      {language === 'sw' ? 'Mbele' : 'Next'}
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.5 }}>
                  <i className="fas fa-search"></i>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {language === 'sw' ? 'Hakuna Mali Ilipatikana' : 'No Properties Found'}
                </h3>
                <p style={{ opacity: 0.7, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto' }}>
                  {language === 'sw'
                    ? 'Badilisha vichujio vyako au utafutaji ili kupata unachotafuta.'
                    : 'Try adjusting your filters or search criteria to find what you\'re looking for.'
                  }
                </p>
                <button onClick={clearFilters} className="btn btn-primary">
                  {t('clearFilters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================ ABOUT PAGE ================
const AboutPage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { language } = React.useContext(window.LanguageContext);

  return (
    <section id="about" className="section" style={{ 
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh'
    }}>
      <div className="container">
        <div className="section-title">
          <h1>{language === 'sw' ? 'Kuhusu HouseLink Tanzania' : 'About HouseLink Tanzania'}</h1>
          <p className="section-subtitle">
            {language === 'sw'
              ? 'Tunabadilisha jinsi Watanzania wanavyopata, kukodisha, na kununua mali'
              : 'We\'re revolutionizing how Tanzanians find, rent, and buy properties'
            }
          </p>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-2 gap-8" style={{ marginBottom: '4rem' }}>
          <div className="card">
            <div className="card-header">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--primary-color)', 
                borderRadius: 'var(--border-radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <i className="fas fa-bullseye"></i>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem' }}>
                {language === 'sw' ? 'Dhamira Yetu' : 'Our Mission'}
              </h2>
            </div>
            <div className="card-body">
              <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {language === 'sw'
                  ? 'Kurahisisha utafutaji wa mali Tanzania kwa kuunganisha wapangaji, wamiliki, na wakala kupitia mfumo mmoja unaoaminika, wa ufanisi, na wenye uwazi.'
                  : 'To simplify property finding in Tanzania by connecting tenants, owners, and brokers through one reliable, efficient, and transparent platform.'
                }
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--secondary-color)', 
                borderRadius: 'var(--border-radius)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: '1.5rem'
              }}>
                <i className="fas fa-eye"></i>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem' }}>
                {language === 'sw' ? 'Maono Yetu' : 'Our Vision'}
              </h2>
            </div>
            <div className="card-body">
              <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {language === 'sw'
                  ? 'Kuwa mfumo wa kwanza unaoaminika Tanzania wa mali, ukiwawezesha kila mwananchi kupata nyumba bora au mali ya uwekezaji kwa urahisi.'
                  : 'To become Tanzania\'s most trusted property platform, empowering every citizen to find their ideal home or investment property with ease.'
                }
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="card" style={{ marginBottom: '4rem' }}>
          <div className="card-header">
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem' }}>
              {language === 'sw' ? 'Historia Yetu' : 'Our Story'}
            </h2>
          </div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {language === 'sw'
                    ? 'HouseLink Tanzania ilianzishwa mwaka 2020 kama suluhisho la changamoto zinazokabili watu katika kutafuta na kukodisha nyumba Tanzania. Baada ya kukutana na shida nyingi wenyewe wakati wa kutafuta nyumba, waanzilishi wawili, John Anderson na Sarah Johnson, waliamua kuunda mfumo ambao ungewezesha mchakato wote wa utafutaji wa nyumba kuwa rahisi, salama, na wenye uwazi.'
                    : 'HouseLink Tanzania was founded in 2020 as a solution to the challenges people face in finding and renting properties in Tanzania. After encountering numerous difficulties themselves when searching for housing, the two founders, John Anderson and Sarah Johnson, decided to create a system that would make the entire property search process easy, secure, and transparent.'
                  }
                </p>
                <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {language === 'sw'
                    ? 'Kuanzia wazo ndogo, tumekua na kuwa mfumo mkubwa wa mali nchini Tanzania, na timu ya zaidi ya watu 50 wenye ujuzi na zaidi ya wakala 500 waliosajiliwa. Leo, tumesaidia zaidi ya familia 10,000 kupata makazi na tumekuwa sehemu muhimu ya soko la mali Tanzania.'
                    : 'Starting from a small idea, we have grown to become Tanzania\'s largest property platform, with a team of over 50 skilled professionals and more than 500 registered brokers. Today, we have helped over 10,000 families find housing and have become an integral part of Tanzania\'s property market.'
                  }
                </p>
              </div>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                borderRadius: 'var(--border-radius-lg)',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '1.5rem',
                textAlign: 'center',
                padding: '2rem'
              }}>
                {language === 'sw'
                  ? 'Kuanzia 2020\nWatu 10,000+ Wamesaidika\nWakala 500+'
                  : 'Since 2020\n10,000+ People Helped\n500+ Brokers'
                }
              </div>
            </div>
          </div>
        </div>
        
        {/* Core Values */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-title">
            <h2>{language === 'sw' ? 'Maadili Yetu ya Msingi' : 'Our Core Values'}</h2>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {window.CONFIG.COMPANY.values.map((value, i) => (
              <div key={i} className="card feature-card">
                <div className="feature-icon" style={{ background: window.Generator.color() }}>
                  <i className={['fas fa-shield-alt', 'fas fa-handshake', 'fas fa-star', 'fas fa-users'][i]}></i>
                </div>
                <h3 className="feature-title">{value[language]}</h3>
                <p className="feature-description">
                  {language === 'sw'
                    ? 'Tunazingatia usalama wako na kuhakikisha miamala yote ni salama na ya uwazi.'
                    : 'We prioritize your safety and ensure all transactions are secure and transparent.'
                  }
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-title">
            <h2>{language === 'sw' ? 'Timu Yetu' : 'Our Team'}</h2>
            <p className="section-subtitle">
              {language === 'sw'
                ? 'Watu wenye ujuzi ambao wanafanya HouseLink iwezekane'
                : 'The skilled professionals who make HouseLink possible'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {[
              { name: 'John Anderson', role: { sw: 'Mkurugenzi Mtendaji', en: 'CEO & Founder' }, expertise: { sw: 'Biashara & Teknolojia', en: 'Business & Technology' } },
              { name: 'Sarah Johnson', role: { sw: 'Mkurugenzi wa Utendaji', en: 'Head of Operations' }, expertise: { sw: 'Uendeshaji & Huduma', en: 'Operations & Service' } },
              { name: 'Michael Chen', role: { sw: 'Mkurugenzi wa Teknolojia', en: 'CTO' }, expertise: { sw: 'Teknolojia & Maendeleo', en: 'Technology & Development' } },
              { name: 'Amina Hassan', role: { sw: 'Mkurugenzi wa Masoko', en: 'Marketing Director' }, expertise: { sw: 'Masoko & Mawasiliano', en: 'Marketing & Communications' } }
            ].map((member, i) => (
              <div key={i} className="card feature-card">
                <div className="avatar" style={{
                  width: '100px',
                  height: '100px',
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
                  {window.Generator.avatarInitials(member.name)}
                </div>
                <h3 className="feature-title">{member.name}</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: '500', marginBottom: '0.5rem' }}>
                  {member.role[language]}
                </p>
                <p className="feature-description" style={{ fontSize: '0.875rem' }}>
                  {member.expertise[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
          color: 'white',
          padding: '4rem',
          borderRadius: 'var(--border-radius-lg)',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>
            {language === 'sw' ? 'Jiunge na Dhamira Yetu' : 'Join Our Mission'}
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto' }}>
            {language === 'sw'
              ? 'Kuwa sehemu ya mapinduzi katika tasnia ya mali Tanzania'
              : 'Be part of the revolution in Tanzania\'s property industry'
            }
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => window.location.hash = '#signup'}
              className="btn btn-primary btn-lg"
              style={{ background: 'white', color: 'var(--primary-color)' }}
            >
              {language === 'sw' ? 'Jiunge kama Mtumiaji' : 'Join as User'}
            </button>
            
            <button 
              onClick={() => window.location.hash = '#signup?role=broker'}
              className="btn btn-outline btn-lg"
              style={{ borderColor: 'white', color: 'white' }}
            >
              {language === 'sw' ? 'Jiunge kama Wakala' : 'Join as Broker'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ================ SERVICES PAGE ================
const ServicesPage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { language } = React.useContext(window.LanguageContext);
  const { openModal } = React.useContext(window.ModalContext);

  return (
    <section id="services" className="section" style={{ 
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh'
    }}>
      <div className="container">
        <div className="section-title">
          <h1>{language === 'sw' ? 'Huduma Zetu' : 'Our Services'}</h1>
          <p className="section-subtitle">
            {language === 'sw'
              ? 'Suluhisho kamili la mali kwa wapangaji, wanunuzi, wauzaji, na wakala'
              : 'Complete property solutions for tenants, buyers, sellers, and brokers'
            }
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-2 gap-8" style={{ marginBottom: '4rem' }}>
          {window.CONFIG.SERVICES.map((service, i) => (
            <div key={i} className="card">
              <div className="card-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'var(--primary-color)', 
                  borderRadius: 'var(--border-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.5rem',
                  flexShrink: 0
                }}>
                  <i className={service.icon}></i>
                </div>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                    {service.title[language]}
                  </h2>
                  <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    {language === 'sw' ? 'Suluhisho kamili la mali' : 'Complete property solution'}
                  </p>
                </div>
              </div>
              
              <div className="card-body">
                <p style={{ lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  {service.description[language]}
                </p>
                
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>
                    {language === 'sw' ? 'Vipengele Muhimu:' : 'Key Features:'}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {service.features.map((feature, j) => (
                      <li key={j} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.875rem'
                      }}>
                        <i className="fas fa-check-circle" style={{ color: 'var(--success-color)', flexShrink: 0 }}></i>
                        <span>{feature[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="card-footer">
                <button 
                  onClick={() => openModal('signup')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {language === 'sw' ? 'Anza Sasa' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Process Section */}
        <div className="card" style={{ marginBottom: '4rem' }}>
          <div className="card-header">
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem' }}>
              {language === 'sw' ? 'Mchakato Wetu' : 'Our Process'}
            </h2>
            <p style={{ opacity: 0.7 }}>
              {language === 'sw'
                ? 'Hatua 4 rahisi za kupata nyumba bora'
                : '4 easy steps to find your perfect property'
              }
            </p>
          </div>
          
          <div className="card-body">
            <div className="grid grid-cols-4 gap-6">
              {[
                { 
                  step: '1', 
                  title: { sw: 'Tafuta', en: 'Search' }, 
                  desc: { sw: 'Tumia vichujio vyetu kusaka mali unayotaka', en: 'Use our filters to search for your desired property' },
                  icon: 'fas fa-search'
                },
                { 
                  step: '2', 
                  title: { sw: 'Pata', en: 'Find' }, 
                  desc: { sw: 'Tazama mali na picha zake, na angalia maelezo', en: 'View properties with photos and check details' },
                  icon: 'fas fa-eye'
                },
                { 
                  step: '3', 
                  title: { sw: 'Wasiliana', en: 'Contact' }, 
                  desc: { sw: 'Wasiliana na wakala kupitia mfumo wetu salama', en: 'Contact brokers through our secure system' },
                  icon: 'fas fa-comments'
                },
                { 
                  step: '4', 
                  title: { sw: 'Pata', en: 'Get' }, 
                  desc: { sw: 'Pata nyumba yako na usajili wa mikataba salama', en: 'Get your property with secure contract registration' },
                  icon: 'fas fa-home'
                }
              ].map((step, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1.5rem' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    background: 'var(--primary-color)', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    margin: '0 auto 1.5rem',
                    position: 'relative'
                  }}>
                    {step.step}
                    <div style={{
                      position: 'absolute',
                      top: '-10px',
                      right: '-10px',
                      background: 'var(--accent-color)',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1rem'
                    }}>
                      <i className={step.icon}></i>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {step.title[language]}
                  </h3>
                  <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    {step.desc[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Pricing */}
        <div>
          <div className="section-title">
            <h2>{language === 'sw' ? 'Mipango ya Ada' : 'Pricing Plans'}</h2>
            <p className="section-subtitle">
              {language === 'sw'
                ? 'Chagua mpango unaokufaa kulingana na mahitaji yako'
                : 'Choose the plan that fits your needs'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                name: { sw: 'Msingi', en: 'Basic' },
                price: { sw: 'Bure', en: 'Free' },
                description: { sw: 'Kwa watumiaji binafsi', en: 'For individual users' },
                features: [
                  { sw: 'Mali 5 za kuweka', en: '5 Property Listings' },
                  { sw: 'Utafutaji wa msingi', en: 'Basic Search' },
                  { sw: 'Msaada wa barua pepe', en: 'Email Support' },
                  { sw: 'Historia ya miezi 3', en: '3 Months History' }
                ],
                highlight: false
              },
              {
                name: { sw: 'Premium', en: 'Premium' },
                price: 'TZS 50,000',
                period: { sw: '/mwezi', en: '/month' },
                description: { sw: 'Kwa watumiaji wakubwa na wakala wadogo', en: 'For serious users & small brokers' },
                features: [
                  { sw: 'Mali zisizo na kikomo', en: 'Unlimited Listings' },
                  { sw: 'Utafutaji wa hali ya juu', en: 'Advanced Search' },
                  { sw: 'Msaada wa kipaumbele', en: 'Priority Support' },
                  { sw: 'Historia ya mwaka 1', en: '1 Year History' },
                  { sw: 'Dashibodi ya takwimu', en: 'Analytics Dashboard' }
                ],
                highlight: true
              },
              {
                name: { sw: 'Kampuni', en: 'Enterprise' },
                price: { sw: 'Maalum', en: 'Custom' },
                description: { sw: 'Kwa wakala wakubwa na mashirika', en: 'For large brokers & agencies' },
                features: [
                  { sw: 'Kila kitu kisicho na kikomo', en: 'Unlimited Everything' },
                  { sw: 'Msaada maalum', en: 'Dedicated Support' },
                  { sw: 'Vipengele maalum', en: 'Custom Features' },
                  { sw: 'Ufikiaji wa API', en: 'API Access' },
                  { sw: 'Usimamizi wa timu', en: 'Team Management' },
                  { sw: 'Mafunzo', en: 'Training' }
                ],
                highlight: false
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className="card" 
                style={{ 
                  border: plan.highlight ? '2px solid var(--primary-color)' : undefined,
                  position: 'relative'
                }}
              >
                {plan.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--primary-color)',
                    color: 'white',
                    padding: '0.5rem 1.5rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    {language === 'sw' ? 'Inayopendwa Zaidi' : 'Most Popular'}
                  </div>
                )}
                
                <div className="card-header" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {plan.name[language]}
                  </h3>
                  <div style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '800', color: plan.highlight ? 'var(--primary-color)' : undefined }}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span style={{ fontSize: '1rem', opacity: 0.7 }}>
                        {plan.period[language]}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                    {plan.description[language]}
                  </p>
                </div>
                
                <div className="card-body">
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {plan.features.map((feature, j) => (
                      <li key={j} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem'
                      }}>
                        <i className="fas fa-check" style={{ 
                          color: plan.highlight ? 'var(--primary-color)' : 'var(--success-color)'
                        }}></i>
                        {feature[language]}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="card-footer">
                  <button 
                    onClick={() => openModal('signup')}
                    className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}
                    style={{ width: '100%' }}
                  >
                    {language === 'sw' ? 'Anza Sasa' : 'Get Started'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ================ CONTACT PAGE ================
const ContactPage = () => {
  const { darkMode } = React.useContext(window.ThemeContext);
  const { language } = React.useContext(window.LanguageContext);
  const { addNotification } = React.useContext(window.AuthContext);
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await window.API.simulateDelay(1500);
    
    addNotification({
      title: language === 'sw' ? 'Ujumbe Umetumwa' : 'Message Sent',
      message: language === 'sw' 
        ? 'Asante kwa ujumbe wako. Tutawasiliana nako hivi karibuni.' 
        : 'Thank you for your message. We will get back to you soon.',
      type: 'success',
      icon: 'fas fa-envelope'
    });
    
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section" style={{ 
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh'
    }}>
      <div className="container">
        <div className="section-title">
          <h1>{language === 'sw' ? 'Wasiliana Nasi' : 'Contact Us'}</h1>
          <p className="section-subtitle">
            {language === 'sw'
              ? 'Wasiliana na timu yetu kwa maswali yoyote au msaada'
              : 'Get in touch with our team for any questions or support'
            }
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div className="card-header">
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {language === 'sw' ? 'Pata Taarifa Zetu' : 'Get in Touch'}
                </h2>
              </div>
              
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--primary-color)',
                      borderRadius: 'var(--border-radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {language === 'sw' ? 'Ofisi Kuu' : 'Main Office'}
                      </h4>
                      <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.5' }}>
                        {window.CONFIG.COMPANY.contact.address[language]}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--primary-color)',
                      borderRadius: 'var(--border-radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {language === 'sw' ? 'Nambari za Simu' : 'Phone Numbers'}
                      </h4>
                      <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.5' }}>
                        {window.CONFIG.COMPANY.contact.phone}<br />
                        {language === 'sw' ? '+255 712 345 678 (Msaada)' : '+255 712 345 678 (Support)'}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--primary-color)',
                      borderRadius: 'var(--border-radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {language === 'sw' ? 'Anwani ya Barua Pepe' : 'Email Address'}
                      </h4>
                      <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.5' }}>
                        info@houselink.co.tz<br />
                        support@houselink.co.tz
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: 'var(--primary-color)',
                      borderRadius: 'var(--border-radius)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '1.25rem',
                      flexShrink: 0
                    }}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {language === 'sw' ? 'Masaa ya Biashara' : 'Business Hours'}
                      </h4>
                      <p style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: '1.5' }}>
                        {language === 'sw'
                          ? 'Jumatatu - Ijumaa: 8:00 asubuhi - 6:00 jioni\nJumamosi: 9:00 asubuhi - 4:00 jioni'
                          : 'Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="card">
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {language === 'sw' ? 'Eneo Letu' : 'Our Location'}
                </h3>
              </div>
              <div className="card-body">
                <div style={{ 
                  height: '200px', 
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
                  borderRadius: 'var(--border-radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '1.25rem'
                }}>
                  <i className="fas fa-map-marked-alt" style={{ marginRight: '0.5rem' }}></i>
                  {language === 'sw' ? 'Ramani ya Eneo' : 'Location Map'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <div className="card">
              <div className="card-header">
                <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                  {language === 'sw' ? 'Tuma Ujumbe' : 'Send Message'}
                </h2>
                <p style={{ opacity: 0.7 }}>
                  {language === 'sw'
                    ? 'Tujulishe maswali yako na tutawasiliana nawe haraka iwezekanavyo'
                    : 'Let us know your questions and we\'ll get back to you as soon as possible'
                  }
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="card-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label className="form-label">
                          {language === 'sw' ? 'Jina Lako' : 'Your Name'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder={language === 'sw' ? 'Ingiza jina lako' : 'Enter your name'}
                        />
                      </div>
                      
                      <div>
                        <label className="form-label">
                          {language === 'sw' ? 'Anwani ya Barua Pepe' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder={language === 'sw' ? 'ingiza barua pepe yako' : 'Enter your email'}
                        />
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label className="form-label">
                          {language === 'sw' ? 'Nambari ya Simu' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="form-control"
                          placeholder={language === 'sw' ? '+255 712 345 678' : '+255 712 345 678'}
                        />
                      </div>
                      
                      <div>
                        <label className="form-label">
                          {language === 'sw' ? 'Somo' : 'Subject'}
                        </label>
                        <select
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="form-control form-select"
                        >
                          <option value="">{language === 'sw' ? 'Chagua Somo' : 'Select Subject'}</option>
                          <option value="general">{language === 'sw' ? 'Uulizi wa Jumla' : 'General Inquiry'}</option>
                          <option value="support">{language === 'sw' ? 'Msaada wa Kiufundi' : 'Technical Support'}</option>
                          <option value="broker">{language === 'sw' ? 'Huduma za Wakala' : 'Broker Services'}</option>
                          <option value="feedback">{language === 'sw' ? 'Maoni na Mapendekezo' : 'Feedback & Suggestions'}</option>
                          <option value="business">{language === 'sw' ? 'Ushirikiano wa Biashara' : 'Business Partnership'}</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="form-label">
                        {language === 'sw' ? 'Ujumbe Wako' : 'Your Message'}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="form-control"
                        placeholder={language === 'sw' ? 'Andika ujumbe wako hapa...' : 'Type your message here...'}
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="card-footer">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                        {language === 'sw' ? 'Inatumwa...' : 'Sending...'}
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane" style={{ marginRight: '0.5rem' }}></i>
                        {language === 'sw' ? 'Tuma Ujumbe' : 'Send Message'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            {/* FAQ Section */}
            <div className="card" style={{ marginTop: '2rem' }}>
              <div className="card-header">
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {language === 'sw' ? 'Maswali Yanayoulizwa Mara Kwa Mara' : 'Frequently Asked Questions'}
                </h3>
              </div>
              
              <div className="card-body">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    {
                      q: language === 'sw' 
                        ? 'Ni bei gani ya kutoa tangazo la mali?' 
                        : 'What is the cost of listing a property?',
                      a: language === 'sw'
                        ? 'Kutoa tangazo ni bure kwa watumiaji wote. Kuna chaguo la premium la TZS 50,000/mwezi kwa vipengele vya ziada.'
                        : 'Listing is free for all users. There is a premium option for TZS 50,000/month for additional features.'
                    },
                    {
                      q: language === 'sw'
                        ? 'Je, wakala wote wamedhaminiwa?'
                        : 'Are all brokers verified?',
                      a: language === 'sw'
                        ? 'Ndio, wakala wote wanafanyiwa uchunguzi wa usalama na wanadhaminiwa kabla ya kujiandikisha.'
                        : 'Yes, all brokers undergo security checks and are verified before registration.'
                    },
                    {
                      q: language === 'sw'
                        ? 'Mikataba ya ukodishaji inaweza kusainiwa mtandaoni?'
                        : 'Can rental contracts be signed online?',
                      a: language === 'sw'
                        ? 'Ndio, tunatoa mikataba ya kidijitali inayoweza kusainiwa mtandaoni kwa usalama.'
                        : 'Yes, we provide digital contracts that can be signed online for security.'
                    },
                    {
                      q: language === 'sw'
                        ? 'Msaada unapatikana lini?'
                        : 'When is support available?',
                      a: language === 'sw'
                        ? 'Msaada unapatikana masaa 24 kwa siku 7 kwa wiki kupitia simu, barua pepe, na mazungumzo ya moja kwa moja.'
                        : 'Support is available 24/7 through phone, email, and live chat.'
                    }
                  ].map((faq, i) => (
                    <details key={i} style={{ 
                      border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                      borderRadius: 'var(--border-radius)',
                      padding: '1rem'
                    }}>
                      <summary style={{ 
                        fontWeight: '600', 
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}>
                        {faq.q}
                      </summary>
                      <p style={{ 
                        marginTop: '0.75rem', 
                        fontSize: '0.875rem', 
                        opacity: 0.8,
                        lineHeight: '1.5'
                      }}>
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ================ LOGIN MODAL ================
const LoginModal = () => {
  const { modals, closeModal } = React.useContext(window.ModalContext);
  const { t, language } = React.useContext(window.LanguageContext);
  const { login } = React.useContext(window.AuthContext);
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    remember: false
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    await window.API.simulateDelay(1500);
    
    // Basic validation
    if (!window.Validation.email(formData.email)) {
      setError(language === 'sw' 
        ? 'Tafadhali ingiza anwani ya barua pepe sahihi' 
        : 'Please enter a valid email address');
      setLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError(language === 'sw'
        ? 'Nenosiri lazima liwe na angalau herufi 6'
        : 'Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    // Mock login
    const success = login({
      id: 'user_' + Date.now(),
      name: 'Demo User',
      email: formData.email,
      role: 'tenant',
      phone: '+255712345678',
      createdAt: new Date().toISOString()
    });
    
    if (success) {
      closeModal('login');
      setFormData({ email: '', password: '', remember: false });
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSwitchToSignup = () => {
    closeModal('login');
    window.ModalContextRef?.openModal('signup');
  };

  return (
    <Modal
      isOpen={modals.login}
      onClose={() => closeModal('login')}
      title={t('login')}
      size="sm"
    >
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid var(--danger-color)',
            color: 'var(--danger-color)',
            padding: '0.75rem 1rem',
            borderRadius: 'var(--border-radius)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem'
          }}>
            <i className="fas fa-exclamation-circle" style={{ marginRight: '0.5rem' }}></i>
            {error}
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="form-label">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder={language === 'sw' ? 'example@email.com' : 'example@email.com'}
            />
          </div>
          
          <div>
            <label className="form-label">{t('password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              placeholder={language === 'sw' ? 'Ingiza nenosiri lako' : 'Enter your password'}
            />
            <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
              <button 
                type="button" 
                className="btn btn-link"
                style={{ fontSize: '0.875rem', padding: 0 }}
                onClick={() => {
                  closeModal('login');
                  // Forgot password functionality would go here
                }}
              >
                {t('forgotPassword')}
              </button>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                style={{ width: '16px', height: '16px' }}
              />
              <span style={{ fontSize: '0.875rem' }}>
                {language === 'sw' ? 'Nikumbuke' : 'Remember me'}
              </span>
            </label>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                {language === 'sw' ? 'Inaingia...' : 'Logging in...'}
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt" style={{ marginRight: '0.5rem' }}></i>
                {t('login')}
              </>
            )}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              {t('dontHaveAccount')}{' '}
            </span>
            <button 
              type="button"
              className="btn btn-link"
              onClick={handleSwitchToSignup}
              style={{ fontSize: '0.875rem', padding: 0 }}
            >
              {t('signup')}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

// ================ SIGNUP MODAL ================
const SignupModal = () => {
  const { modals, closeModal } = React.useContext(window.ModalContext);
  const { t, language } = React.useContext(window.LanguageContext);
  const { signup } = React.useContext(window.AuthContext);
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    role: 'tenant',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    
    // Validation
    if (!window.Validation.name(formData.name)) {
      newErrors.name = language === 'sw' 
        ? 'Jina lazima liwe na angalau herufi 2' 
        : 'Name must be at least 2 characters';
    }
    
    if (!window.Validation.email(formData.email)) {
      newErrors.email = language === 'sw'
        ? 'Tafadhali ingiza anwani ya barua pepe sahihi'
        : 'Please enter a valid email address';
    }
    
    if (!window.Validation.phone(formData.phone)) {
      newErrors.phone = language === 'sw'
        ? 'Tafadhali ingiza nambari ya simu sahihi ya Tanzania'
        : 'Please enter a valid Tanzanian phone number';
    }
    
    const passwordValidation = window.Validation.password(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = language === 'sw'
        ? 'Nenosiri lazima liwe na angalau herufi 8, kubwa, ndogo, nambari, na alama maalum'
        : 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = language === 'sw'
        ? 'Nenosiri halifanani'
        : 'Passwords do not match';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = language === 'sw'
        ? 'Lazima ukubali masharti na hali'
        : 'You must agree to the terms and conditions';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    // Simulate API call
    await window.API.simulateDelay(1500);
    
    // Mock signup
    const success = signup({
      id: 'user_' + Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      createdAt: new Date().toISOString()
    });
    
    if (success) {
      closeModal('signup');
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'tenant',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });
      setErrors({});
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSwitchToLogin = () => {
    closeModal('signup');
    window.ModalContextRef?.openModal('login');
  };

  return (
    <Modal
      isOpen={modals.signup}
      onClose={() => closeModal('signup')}
      title={t('signup')}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="form-label">{t('name')}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder={language === 'sw' ? 'Ingiza jina lako kamili' : 'Enter your full name'}
            />
            {errors.name && (
              <div style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                <i className="fas fa-exclamation-circle" style={{ marginRight: '0.25rem' }}></i>
                {errors.name}
              </div>
            )}
          </div>
          
          <div>
            <label className="form-label">{t('email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder={language === 'sw' ? 'example@email.com' : 'example@email.com'}
            />
            {errors.email && (
              <div style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                <i className="fas fa-exclamation-circle" style={{ marginRight: '0.25rem' }}></i>
                {errors.email}
              </div>
            )}
          </div>
          
          <div>
            <label className="form-label">{t('phone')}</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="form-control"
              placeholder={language === 'sw' ? '+255 712 345 678' : '+255 712 345 678'}
            />
            {errors.phone && (
              <div style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                <i className="fas fa-exclamation-circle" style={{ marginRight: '0.25rem' }}></i>
                {errors.phone}
              </div>
            )}
          </div>
          
          <div>
            <label className="form-label">{t('role')}</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {[
                { value: 'tenant', label: { sw: 'Mpangaji', en: 'Tenant' }, icon: 'fas fa-user' },
                { value: 'broker', label: { sw: 'Wakala', en: 'Broker' }, icon: 'fas fa-user-tie' },
                { value: 'owner', label: { sw: 'Mmiliki', en: 'Owner' }, icon: 'fas fa-home' }
              ].map(role => (
                <label 
                  key={role.value}
                  style={{ 
                    flex: 1,
                    minWidth: '100px',
                    border: `2px solid ${formData.role === role.value ? 'var(--primary-color)' : 'var(--border-light)'}`,
                    borderRadius: 'var(--border-radius)',
                    padding: '1rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    background: formData.role === role.value ? 'rgba(13, 148, 136, 0.1)' : 'transparent'
                  }}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={formData.role === role.value}
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: formData.role === role.value ? 'var(--primary-color)' : undefined }}>
                    <i className={role.icon}></i>
                  </div>
                  <div style={{ fontWeight: formData.role === role.value ? '600' : '400' }}>
                    {role.label[language]}
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label className="form-label">{t('password')}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
                placeholder={language === 'sw' ? 'Nenosiri lako' : 'Your password'}
              />
              {errors.password && (
                <div style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  <i className="fas fa-exclamation-circle" style={{ marginRight: '0.25rem' }}></i>
                  {errors.password}
                </div>
              )}
            </div>
            
            <div>
              <label className="form-label">{t('confirmPassword')}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-control"
                placeholder={language === 'sw' ? 'Thibitisha nenosiri' : 'Confirm password'}
              />
              {errors.confirmPassword && (
                <div style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                  <i className="fas fa-exclamation-circle" style={{ marginRight: '0.25rem' }}></i>
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                style={{ width: '16px', height: '16px', marginTop: '0.25rem', flexShrink: 0 }}
              />
              <span style={{ fontSize: '0.875rem', lineHeight: '1.4' }}>
                {language === 'sw' 
                  ? 'Nakubali Masharti ya Huduma na Sera ya Faragha ya HouseLink Tanzania'
                  : 'I agree to HouseLink Tanzania\'s Terms of Service and Privacy Policy'
                }
              </span>
            </label>
            {errors.agreeTerms && (
              <div style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', marginLeft: '1.5rem' }}>
                <i className="fas fa-exclamation-circle" style={{ marginRight: '0.25rem' }}></i>
                {errors.agreeTerms}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin" style={{ marginRight: '0.5rem' }}></i>
                {language === 'sw' ? 'Inasajiliwa...' : 'Registering...'}
              </>
            ) : (
              <>
                <i className="fas fa-user-plus" style={{ marginRight: '0.5rem' }}></i>
                {t('signup')}
              </>
            )}
          </button>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>
              {language === 'sw' ? 'Tayari una akaunti?' : 'Already have an account?'}{' '}
            </span>
            <button 
              type="button"
              className="btn btn-link"
              onClick={handleSwitchToLogin}
              style={{ fontSize: '0.875rem', padding: 0 }}
            >
              {t('login')}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

// ================ EXPORT PAGES ================
window.HomePage = HomePage;
window.ListingsPage = ListingsPage;
window.AboutPage = AboutPage;
window.ServicesPage = ServicesPage;
window.ContactPage = ContactPage;
window.LoginModal = LoginModal;
window.SignupModal = SignupModal;
