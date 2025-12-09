const HomePage = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);
  const [properties, setProperties] = React.useState([]);
  const [selectedProperty, setSelectedProperty] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Load sample properties
    const sampleProperties = [
      {
        id: 1,
        title: "Bedsitter Sinza Karibu na Chuo Kikuu",
        location: "Sinza, Dar es Salaam",
        price: 135000,
        type: "bedsitter",
        bedrooms: "Studio",
        bathrooms: "1",
        size: "25 sqm",
        description: "Bedsitter nzuri Sinza, maji 24/7, karibu na chuo kikuu, umeme wa kudumu, usalama mzuri. Inafaa kwa mwanafunzi au mtu binafsi. Samani zote zipo.",
        featured: true,
        verified: true,
        brokerId: 1,
        brokerName: "James Anderson",
        brokerEmail: "james@houselink.co.tz",
        brokerPhone: "+255712345678",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop"
      },
      {
        id: 2,
        title: "Chumba Kizuri Mbezi Beach",
        location: "Mbezi Beach, Dar es Salaam",
        price: 98000,
        type: "single",
        bedrooms: "1",
        bathrooms: "1",
        size: "18 sqm",
        description: "Chumba kizuri Mbezi Beach, tiles zote, dirisha zuri, jiko la kisasa, bafu binafsi. Eneo tulia na usalama mzuri. Karibu na barabara kuu.",
        featured: true,
        verified: true,
        brokerId: 2,
        brokerName: "Sarah Johnson",
        brokerEmail: "sarah@houselink.co.tz",
        brokerPhone: "+255765432109",
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop"
      },
      {
        id: 3,
        title: "Apartment Modern Masaki",
        location: "Masaki, Dar es Salaam",
        price: 950000,
        type: "apartment",
        bedrooms: "2",
        bathrooms: "2",
        size: "85 sqm",
        description: "Apartment ya kisasa Masaki, mtazamo wa bahari, gym, bwawa, ukumbi wa mikutano. Inafaa kwa familia au wafanyabiashara. Samani kamili.",
        featured: false,
        verified: true,
        brokerId: 3,
        brokerName: "Michael Chen",
        brokerEmail: "michael@houselink.co.tz",
        brokerPhone: "+255788888888",
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop"
      },
      {
        id: 4,
        title: "Studio Apartment Upanga",
        location: "Upanga, Dar es Salaam",
        price: 450000,
        type: "studio",
        bedrooms: "Studio",
        bathrooms: "1",
        size: "35 sqm",
        description: "Studio apartment nzuri Upanga, karibu na mitaa ya biashara, usalama 24/7, maji na umeme wa kudumu. Inafaa kwa wafanyabiashara.",
        featured: true,
        verified: false,
        brokerId: 4,
        brokerName: "Amina Hassan",
        brokerEmail: "amina@houselink.co.tz",
        brokerPhone: "+255712998877",
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
      },
      {
        id: 5,
        title: "Duplex Tegeta",
        location: "Tegeta, Dar es Salaam",
        price: 1200000,
        type: "duplex",
        bedrooms: "3",
        bathrooms: "3",
        size: "150 sqm",
        description: "Duplex kubwa Tegeta, bustani binafsi, parking 2 magari, usalama kamili. Inafaa kwa familia kubwa au kukodisha biashara.",
        featured: false,
        verified: true,
        brokerId: 5,
        brokerName: "David Wilson",
        brokerEmail: "david@houselink.co.tz",
        brokerPhone: "+255713334444",
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop"
      },
      {
        id: 6,
        title: "Family House Kinondoni",
        location: "Kinondoni, Dar es Salaam",
        price: 750000,
        type: "house",
        bedrooms: "4",
        bathrooms: "3",
        size: "200 sqm",
        description: "Nyumba ya familia Kinondoni, shamba kubwa, chumba cha mgeni, jikoni kubwa. Eneo lenye usalama na utulivu.",
        featured: true,
        verified: true,
        brokerId: 6,
        brokerName: "Fatima Mohammed",
        brokerEmail: "fatima@houselink.co.tz",
        brokerPhone: "+255715556666",
        createdAt: new Date(Date.now() - 518400000).toISOString(),
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop"
      }
    ];

    const storedProperties = Storage.get('properties', []);
    if (storedProperties.length === 0) {
      Storage.set('properties', sampleProperties);
      setProperties(sampleProperties);
    } else {
      setProperties(storedProperties);
    }
    
    setLoading(false);
  }, []);

  const featuredProperties = properties.filter(p => p.featured);
  const recentProperties = [...properties].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, 6);

  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
      <HeroSection />
      
      {/* Search Bar Section */}
      <section style={{ 
        padding: '40px 24px',
        background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
        marginTop: '-40px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          width: '100%'
        }}>
          <SearchBar />
        </div>
      </section>
      
      {/* Categories Section */}
      <section style={{ 
        padding: '80px 24px',
        background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '48px'
          }}>
            <h2 style={{ 
              fontSize: '36px',
              fontWeight: '700',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              marginBottom: '16px'
            }}>
              Browse by Category
            </h2>
            <p style={{ 
              fontSize: '18px',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              opacity: 0.7,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Find the perfect property type that suits your needs
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            {CONFIG.PROPERTY_TYPES.map(type => {
              const count = properties.filter(p => p.type === type.id).length;
              return (
                <a 
                  key={type.id}
                  href={`#listings?type=${type.id}`}
                  style={{
                    background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                    borderRadius: '16px',
                    padding: '32px 24px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    boxShadow: 'var(--shadow)',
                    transition: 'all 0.3s',
                    border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)'
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
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                    {type.icon}
                  </div>
                  <h3 style={{ 
                    fontSize: '18px',
                    fontWeight: '600',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    marginBottom: '8px'
                  }}>
                    {type.label}
                  </h3>
                  <p style={{ 
                    fontSize: '14px',
                    color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                    opacity: 0.7
                  }}>
                    {count} Properties
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section style={{ 
        padding: '80px 24px',
        background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '36px',
                fontWeight: '700',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                marginBottom: '8px'
              }}>
                {t.featured}
              </h2>
              <p style={{ 
                fontSize: '18px',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                opacity: 0.7
              }}>
                Hand-picked properties with premium features
              </p>
            </div>
            <a href="#listings" style={{
              color: 'var(--primary-color)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {t.viewAll}
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          
          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {[1, 2, 3].map(i => <LoadingSkeleton key={i} />)}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {featuredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onViewDetails={setSelectedProperty}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Recent Properties */}
      <section style={{ 
        padding: '80px 24px',
        background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '36px',
                fontWeight: '700',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                marginBottom: '8px'
              }}>
                {t.recent}
              </h2>
              <p style={{ 
                fontSize: '18px',
                color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                opacity: 0.7
              }}>
                Newly listed properties for you
              </p>
            </div>
            <a href="#listings" style={{
              color: 'var(--primary-color)',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {t.viewAll}
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
          
          {loading ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {[1, 2, 3, 4, 5, 6].map(i => <LoadingSkeleton key={i} />)}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {recentProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property}
                  onViewDetails={setSelectedProperty}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Call to Action */}
      <section style={{ 
        padding: '80px 24px',
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          width: '100%'
        }}>
          <h2 style={{ 
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>
            Ready to Find Your Dream Home?
          </h2>
          <p style={{ 
            fontSize: '20px',
            opacity: 0.9,
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Join thousands of satisfied customers who found their perfect home through HouseLink Tanzania
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#listings" style={{
              background: 'white',
              color: 'var(--primary-color)',
              padding: '18px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '18px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-search"></i>
              Browse Properties
            </a>
            
            <a href="#signup" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              padding: '18px 36px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '18px',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-user-plus"></i>
              Sign Up Free
            </a>
          </div>
        </div>
      </section>
      
      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetail 
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
};
