const AboutPage = () => {
  const { darkMode } = React.useContext(ThemeContext);
  const { t } = React.useContext(LanguageContext);

  return (
    <section id="about" style={{ 
      padding: '80px 24px',
      background: darkMode ? 'var(--dark-bg)' : 'var(--light-bg)',
      minHeight: '80vh'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h1 style={{ 
            fontSize: '48px',
            fontWeight: '800',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            marginBottom: '16px'
          }}>
            About HouseLink Tanzania
          </h1>
          <p style={{ 
            fontSize: '20px',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            opacity: 0.7,
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            We're revolutionizing the way Tanzanians find, rent, and buy properties
          </p>
        </div>
        
        {/* Mission & Vision */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '80px'
        }}>
          <div style={{
            background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
            padding: '40px',
            borderRadius: '16px',
            border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
            boxShadow: 'var(--shadow)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'var(--primary-color)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              marginBottom: '24px'
            }}>
              <i className="fas fa-bullseye"></i>
            </div>
            <h3 style={{ 
              fontSize: '24px',
              fontWeight: '700',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              marginBottom: '16px'
            }}>
              Our Mission
            </h3>
            <p style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              opacity: 0.8,
              lineHeight: '1.6'
            }}>
              To simplify property finding in Tanzania by connecting tenants, buyers, and property owners through a transparent, efficient, and trustworthy platform.
            </p>
          </div>
          
          <div style={{
            background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
            padding: '40px',
            borderRadius: '16px',
            border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
            boxShadow: 'var(--shadow)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'var(--secondary-color)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              marginBottom: '24px'
            }}>
              <i className="fas fa-eye"></i>
            </div>
            <h3 style={{ 
              fontSize: '24px',
              fontWeight: '700',
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              marginBottom: '16px'
            }}>
              Our Vision
            </h3>
            <p style={{ 
              color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
              opacity: 0.8,
              lineHeight: '1.6'
            }}>
              To become Tanzania's most trusted real estate platform, empowering every citizen to find their ideal home or investment property with ease.
            </p>
          </div>
        </div>
        
        {/* Values */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '36px',
            fontWeight: '700',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            marginBottom: '48px'
          }}>
            Our Core Values
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[
              { icon: 'fas fa-shield-alt', title: 'Trust & Security', color: '#10b981' },
              { icon: 'fas fa-handshake', title: 'Transparency', color: '#3b82f6' },
              { icon: 'fas fa-users', title: 'Community', color: '#f59e0b' },
              { icon: 'fas fa-lightbulb', title: 'Innovation', color: '#8b5cf6' }
            ].map((value, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '32px 24px',
                background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                borderRadius: '16px',
                border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: value.color,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '32px',
                  margin: '0 auto 24px'
                }}>
                  <i className={value.icon}></i>
                </div>
                <h3 style={{ 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  marginBottom: '12px'
                }}>
                  {value.title}
                </h3>
                <p style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  opacity: 0.7,
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  We prioritize your safety and ensure all transactions are secure and transparent.
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            textAlign: 'center',
            fontSize: '36px',
            fontWeight: '700',
            color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
            marginBottom: '48px'
          }}>
            Meet Our Team
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[
              { name: 'John Anderson', role: 'CEO & Founder', image: 'JA' },
              { name: 'Sarah Johnson', role: 'Head of Operations', image: 'SJ' },
              { name: 'Michael Chen', role: 'CTO', image: 'MC' },
              { name: 'Amina Hassan', role: 'Marketing Director', image: 'AH' }
            ].map((member, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '32px 24px',
                background: darkMode ? 'var(--card-bg-dark)' : 'var(--card-bg-light)',
                borderRadius: '16px',
                border: darkMode ? '1px solid var(--border-dark)' : '1px solid var(--border-light)',
                transition: 'all 0.3s'
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
                  fontSize: '32px',
                  fontWeight: '600',
                  margin: '0 auto 24px'
                }}>
                  {member.image}
                </div>
                <h3 style={{ 
                  fontSize: '20px',
                  fontWeight: '600',
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  marginBottom: '8px'
                }}>
                  {member.name}
                </h3>
                <p style={{ 
                  color: 'var(--primary-color)',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '16px'
                }}>
                  {member.role}
                </p>
                <p style={{ 
                  color: darkMode ? 'var(--dark-text)' : 'var(--light-text)',
                  opacity: 0.7,
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}>
                  Passionate about transforming Tanzania's real estate landscape through technology and innovation.
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div style={{
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
          color: 'white',
          padding: '64px 48px',
          borderRadius: '24px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '36px',
            fontWeight: '800',
            marginBottom: '24px'
          }}>
            Join Our Mission
          </h2>
          <p style={{ 
            fontSize: '20px',
            opacity: 0.9,
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            Be part of the revolution in Tanzania's real estate industry
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#signup" style={{
              background: 'white',
              color: 'var(--primary-color)',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s'
            }}>
              Join as User
            </a>
            
            <a href="#signup?role=broker" style={{
              background: 'rgba(255,255,255,0.1)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s'
            }}>
              Join as Broker
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
