const ListingsPage = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);
  const [properties, setProperties] = React.useState([]);
  const [filteredProperties, setFilteredProperties] = React.useState([]);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [filters, setFilters] = React.useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    amenities: []
  });
  const [sortBy, setSortBy] = React.useState('newest');
  const [viewMode, setViewMode] = React.useState('grid');

  React.useEffect(() => {
    const storedProperties = Storage.get('properties', []);
    setProperties(storedProperties);
    setFilteredProperties(storedProperties);
    setLoading(false);
  }, []);

  React.useEffect(() => {
    let filtered = [...properties];
    
    // Apply filters
    if (filters.location) {
      filtered = filtered.filter(p => p.location.includes(filters.location));
    }
    
    if (filters.type) {
      filtered = filtered.filter(p => p.type === filters.type);
    }
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(filters.maxPrice));
    }
    
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms === filters.bedrooms);
    }
    
    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms === filters.bathrooms);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'priceLowHigh':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
    
    setFilteredProperties(filtered);
  }, [filters, sortBy, properties]);

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
      bathrooms: '',
      amenities: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(f => 
    Array.isArray(f) ? f.length > 0 : f !== ''
  );

  return (
    <section id="listings" style={{ 
      padding: '40px 24px',
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '48px',
            fontWeight: '800',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            marginBottom: '16px'
          }}>
            Browse Properties
          </h1>
          <p style={{ 
            fontSize: '18px',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            opacity: 0.7
          }}>
            {filteredProperties.length} properties found
            {hasActiveFilters && ' (with filters applied)'}
          </p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '300px 1fr',
          gap: '40px'
        }}>
          {/* Filters Sidebar */}
          <div style={{
            background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
            padding: '24px',
            borderRadius: '16px',
            border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
            boxShadow: 'var(--shadow)',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
              }}>
                Filters
              </h3>
              {hasActiveFilters && (
                <button onClick={clearFilters} style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--danger-color)',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Clear All
                </button>
              )}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Location Filter */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '500',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}>
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: darkMode ? 'var(--dark-bg)' : 'white',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                  }}
                >
                  <option value="">All Locations</option>
                  {CONFIG.LOCATIONS.map(loc => (
                    <option key={loc.name} value={loc.name}>{loc.name} ({loc.count})</option>
                  ))}
                </select>
              </div>
              
              {/* Property Type Filter */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '500',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}>
                  Property Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: darkMode ? 'var(--dark-bg)' : 'white',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                  }}
                >
                  <option value="">All Types</option>
                  {CONFIG.PROPERTY_TYPES.map(type => (
                    <option key={type.id} value={type.id}>{type.icon} {type.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '12px',
                  fontWeight: '500',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                }}>
                  Price Range (TZS)
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
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
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
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
              </div>
              
              {/* Bedrooms & Bathrooms */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    opacity: 0.8
                  }}>
                    Bedrooms
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: darkMode ? 'var(--dark-bg)' : 'white',
                      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="Studio">Studio</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '14px',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    opacity: 0.8
                  }}>
                    Bathrooms
                  </label>
                  <select
                    value={filters.bathrooms}
                    onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      background: darkMode ? 'var(--dark-bg)' : 'white',
                      color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                    }}
                  >
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
              </div>
              
              <button onClick={() => {
                // Apply filters
                const filterParams = new URLSearchParams();
                Object.entries(filters).forEach(([key, value]) => {
                  if (value && value !== '') {
                    filterParams.set(key, value);
                  }
                });
                window.location.hash = `#listings?${filterParams.toString()}`;
              }} style={{
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
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Properties List */}
          <div>
            {/* Controls */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => setViewMode('grid')}
                  style={{
                    background: viewMode === 'grid' ? 'var(--primary-color)' : 'transparent',
                    color: viewMode === 'grid' ? 'white' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                    border: `1px solid ${viewMode === 'grid' ? 'var(--primary-color)' : (darkMode ? 'var(--border-dark)' : 'var(--border-light)')}`,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fas fa-th-large"></i>
                  Grid
                </button>
                
                <button 
                  onClick={() => setViewMode('list')}
                  style={{
                    background: viewMode === 'list' ? 'var(--primary-color)' : 'transparent',
                    color: viewMode === 'list' ? 'white' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                    border: `1px solid ${viewMode === 'list' ? 'var(--primary-color)' : (darkMode ? 'var(--border-dark)' : 'var(--border-light)')}`,
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fas fa-list"></i>
                  List
                </button>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  fontSize: '14px',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  opacity: 0.7
                }}>
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 16px',
                    border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                    borderRadius: '8px',
                    fontSize: '14px',
                    background: darkMode ? 'var(--card-bg-dark)' : 'white',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)'
                  }}
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="featured">Featured First</option>
                </select>
              </div>
            </div>
            
            {/* Properties Grid/List */}
            {loading ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
                gap: '32px'
              }}>
                {[1, 2, 3, 4, 5, 6].map(i => <LoadingSkeleton key={i} />)}
              </div>
            ) : filteredProperties.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
                gap: '32px'
              }}>
                {filteredProperties.map(property => (
                  <PropertyCard 
                    key={property.id} 
                    property={property}
                    onViewDetails={setSelectedProperty}
                  />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '80px 24px',
                background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                borderRadius: '16px',
                border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)'
              }}>
                <div style={{ fontSize: '64px', marginBottom: '24px', opacity: 0.5 }}>
                  <i className="fas fa-search"></i>
                </div>
                <h3 style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  marginBottom: '16px',
                  fontSize: '24px',
                  fontWeight: '600'
                }}>
                  No Properties Found
                </h3>
                <p style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  opacity: 0.7,
                  marginBottom: '32px',
                  maxWidth: '400px',
                  margin: '0 auto 32px'
                }}>
                  Try adjusting your filters or search criteria to find what you're looking for.
                </p>
                <button onClick={clearFilters} style={{
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}>
                  Clear All Filters
                </button>
              </div>
            )}
            
            {/* Pagination */}
            {filteredProperties.length > 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px',
                marginTop: '48px'
              }}>
                <button style={{
                  background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <i className="fas fa-chevron-left"></i>
                  Previous
                </button>
                
                <div style={{ display: 'flex', gap: '4px' }}>
                  {[1, 2, 3, '...', 10].map((page, i) => (
                    <button
                      key={i}
                      style={{
                        background: page === 1 ? 'var(--primary-color)' : 'transparent',
                        color: page === 1 ? 'white' : (darkMode ? 'var(--dark-text)' : 'var(--light-text)'),
                        border: `1px solid ${page === 1 ? 'var(--primary-color)' : (darkMode ? 'var(--border-dark)' : 'var(--border-light)')}`,
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button style={{
                  background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  border: `1px solid ${darkMode ? 'var(--border-dark)' : 'var(--border-light)'}`,
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Next
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
};
