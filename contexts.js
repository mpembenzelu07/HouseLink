// ================ THEME CONTEXT ================
const ThemeContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(() => {
    const saved = window.Storage.get('houselink_darkMode', false);
    // Also check user's system preference
    if (saved === null) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return saved;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      document.documentElement.setAttribute('data-theme', 'light');
    }
    window.Storage.set('houselink_darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      // Show toast notification
      if (window.NotificationContextRef) {
        window.NotificationContextRef.showToast(
          newMode ? 'Dark mode enabled' : 'Light mode enabled',
          'success'
        );
      }
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ================ LANGUAGE CONTEXT ================
const LanguageContext = React.createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState(() => {
    // Get saved language or detect from browser
    const saved = window.Storage.get('houselink_language');
    if (saved) return saved;
    
    // Detect browser language
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('sw') ? 'sw' : 'en';
  });

  React.useEffect(() => {
    document.documentElement.lang = language;
    window.Storage.set('houselink_language', language);
  }, [language]);

  const toggleLanguage = () => {
    const newLang = language === 'sw' ? 'en' : 'sw';
    setLanguage(newLang);
    
    // Show toast notification
    if (window.NotificationContextRef) {
      window.NotificationContextRef.showToast(
        newLang === 'sw' ? 'Lugha imebadilishwa kuwa Kiswahili' : 'Language changed to English',
        'info'
      );
    }
  };

  const t = (key) => {
    return window.getTranslation(key, language);
  };

  const getConfigLabel = (configArray, id, key) => {
    return window.getConfigLabel(configArray, id, key, language);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage,
      t,
      getConfigLabel
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ================ AUTH CONTEXT ================
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    const savedUser = window.Storage.get('houselink_user');
    if (savedUser) {
      // Remove sensitive data
      delete savedUser.password;
      delete savedUser.confirmPassword;
      return savedUser;
    }
    return null;
  });
  
  const [favorites, setFavorites] = React.useState(() => 
    window.Storage.get('houselink_favorites', [])
  );
  
  const [messages, setMessages] = React.useState(() => 
    window.Storage.get('houselink_messages', [])
  );
  
  const [notifications, setNotifications] = React.useState(() => {
    const saved = window.Storage.get('houselink_notifications', []);
    // Add welcome notification if none
    if (saved.length === 0) {
      const welcomeNotif = {
        id: window.Generator.id(),
        title: 'Welcome to HouseLink Tanzania',
        message: 'Start exploring properties and find your dream home today!',
        type: 'info',
        read: false,
        timestamp: new Date().toISOString(),
        icon: 'fas fa-home'
      };
      return [welcomeNotif];
    }
    return saved;
  });
  
  const [savedSearches, setSavedSearches] = React.useState(() => 
    window.Storage.get('houselink_savedSearches', [])
  );
  
  const [recentViews, setRecentViews] = React.useState(() => 
    window.Storage.get('houselink_recentViews', [])
  );

  // Add notification
  const addNotification = React.useCallback((notification) => {
    const newNotification = {
      id: window.Generator.id(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => {
      const newNotifications = [newNotification, ...prev].slice(0, 50); // Keep last 50
      window.Storage.set('houselink_notifications', newNotifications);
      return newNotifications;
    });
  }, []);

  // Login function
  const login = React.useCallback((userData) => {
    const safeUserData = { ...userData };
    delete safeUserData.password;
    delete safeUserData.confirmPassword;
    
    setUser(safeUserData);
    window.Storage.set('houselink_user', safeUserData);
    
    addNotification({
      title: 'Login Successful',
      message: `Welcome back, ${safeUserData.name}!`,
      type: 'success',
      icon: 'fas fa-sign-in-alt'
    });
    
    return true;
  }, [addNotification]);

  // Signup function
  const signup = React.useCallback((userData) => {
    const safeUserData = { ...userData };
    delete safeUserData.password;
    delete safeUserData.confirmPassword;
    
    setUser(safeUserData);
    window.Storage.set('houselink_user', safeUserData);
    
    addNotification({
      title: 'Account Created',
      message: `Welcome to HouseLink, ${safeUserData.name}! Your account has been created successfully.`,
      type: 'success',
      icon: 'fas fa-user-plus'
    });
    
    // Add sample data for new users
    if (window.Storage.get('houselink_samplePropertiesLoaded') !== true) {
      loadSampleProperties();
      window.Storage.set('houselink_samplePropertiesLoaded', true);
    }
    
    return true;
  }, [addNotification]);

  // Logout function
  const logout = React.useCallback(() => {
    const userName = user?.name || 'User';
    setUser(null);
    window.Storage.remove('houselink_user');
    
    addNotification({
      title: 'Logged Out',
      message: `You have been logged out successfully.`,
      type: 'info',
      icon: 'fas fa-sign-out-alt'
    });
    
    return true;
  }, [user, addNotification]);

  // Update profile
  const updateProfile = React.useCallback((updates) => {
    if (!user) return false;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
    setUser(updatedUser);
    window.Storage.set('houselink_user', updatedUser);
    
    addNotification({
      title: 'Profile Updated',
      message: 'Your profile has been updated successfully.',
      type: 'success',
      icon: 'fas fa-user-edit'
    });
    
    return true;
  }, [user, addNotification]);

  // Toggle favorite
  const toggleFavorite = React.useCallback((propertyId) => {
    const isFavorite = favorites.includes(propertyId);
    const newFavorites = isFavorite
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    
    setFavorites(newFavorites);
    window.Storage.set('houselink_favorites', newFavorites);
    
    addNotification({
      title: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
      message: `Property ${isFavorite ? 'removed from' : 'added to'} your favorites list.`,
      type: isFavorite ? 'info' : 'success',
      icon: isFavorite ? 'fas fa-heart-broken' : 'fas fa-heart'
    });
    
    return !isFavorite;
  }, [favorites, addNotification]);

  // Send message
  const sendMessage = React.useCallback((message) => {
    const newMessage = {
      id: window.Generator.id(),
      timestamp: new Date().toISOString(),
      read: false,
      ...message
    };
    
    setMessages(prev => {
      const newMessages = [newMessage, ...prev];
      window.Storage.set('houselink_messages', newMessages);
      return newMessages;
    });
    
    addNotification({
      title: 'Message Sent',
      message: 'Your message has been sent successfully.',
      type: 'success',
      icon: 'fas fa-paper-plane'
    });
    
    return newMessage.id;
  }, [addNotification]);

  // Mark message as read
  const markMessageAsRead = React.useCallback((messageId) => {
    setMessages(prev => {
      const updatedMessages = prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      );
      window.Storage.set('houselink_messages', updatedMessages);
      return updatedMessages;
    });
  }, []);

  // Mark notification as read
  const markNotificationAsRead = React.useCallback((notificationId) => {
    setNotifications(prev => {
      const updatedNotifications = prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      window.Storage.set('houselink_notifications', updatedNotifications);
      return updatedNotifications;
    });
  }, []);

  // Mark all notifications as read
  const markAllNotificationsAsRead = React.useCallback(() => {
    setNotifications(prev => {
      const updatedNotifications = prev.map(notif => ({ ...notif, read: true }));
      window.Storage.set('houselink_notifications', updatedNotifications);
      return updatedNotifications;
    });
    
    addNotification({
      title: 'Notifications Cleared',
      message: 'All notifications have been marked as read.',
      type: 'info',
      icon: 'fas fa-check-double'
    });
  }, [addNotification]);

  // Save search
  const saveSearch = React.useCallback((searchParams) => {
    const newSearch = {
      id: window.Generator.id(),
      ...searchParams,
      timestamp: new Date().toISOString()
    };
    
    setSavedSearches(prev => {
      const newSearches = [newSearch, ...prev].slice(0, 10); // Keep last 10
      window.Storage.set('houselink_savedSearches', newSearches);
      return newSearches;
    });
    
    addNotification({
      title: 'Search Saved',
      message: 'Your search criteria has been saved for future use.',
      type: 'success',
      icon: 'fas fa-bookmark'
    });
    
    return newSearch.id;
  }, [addNotification]);

  // Delete saved search
  const deleteSavedSearch = React.useCallback((searchId) => {
    setSavedSearches(prev => {
      const newSearches = prev.filter(s => s.id !== searchId);
      window.Storage.set('houselink_savedSearches', newSearches);
      return newSearches;
    });
  }, []);

  // Add recent view
  const addRecentView = React.useCallback((property) => {
    const view = {
      id: window.Generator.id(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.image,
      propertyLocation: property.location,
      propertyPrice: property.price,
      timestamp: new Date().toISOString()
    };
    
    setRecentViews(prev => {
      // Remove if already exists
      const filtered = prev.filter(v => v.propertyId !== property.id);
      const newViews = [view, ...filtered].slice(0, 20); // Keep last 20
      window.Storage.set('houselink_recentViews', newViews);
      return newViews;
    });
  }, []);

  // Clear recent views
  const clearRecentViews = React.useCallback(() => {
    setRecentViews([]);
    window.Storage.set('houselink_recentViews', []);
  }, []);

  // Load sample properties
  const loadSampleProperties = React.useCallback(() => {
    const sampleProperties = [
      {
        id: 'prop_001',
        title: 'Modern Bedsitter Sinza',
        location: 'Sinza, Dar es Salaam',
        price: 135000,
        type: 'bedsitter',
        bedrooms: 'Studio',
        bathrooms: '1',
        size: '25 sqm',
        description: 'A fully furnished bedsitter in Sinza with 24/7 water and electricity. Perfect for students or young professionals. Close to university and shopping centers.',
        featured: true,
        verified: true,
        brokerId: 'broker_001',
        brokerName: 'James Anderson',
        brokerEmail: 'james@houselink.co.tz',
        brokerPhone: '+255712345678',
        brokerRating: 4.8,
        amenities: ['water', 'security', 'wifi', 'furnished'],
        images: [
          'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop'
        ],
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        availableFrom: new Date(Date.now() + 86400000).toISOString(),
        minStay: '6 months',
        deposit: 270000
      },
      {
        id: 'prop_002',
        title: 'Luxury Apartment Masaki',
        location: 'Masaki, Dar es Salaam',
        price: 950000,
        type: 'apartment',
        bedrooms: '2',
        bathrooms: '2',
        size: '85 sqm',
        description: 'Luxury apartment in Masaki with sea view, gym, swimming pool, and 24/7 security. Fully furnished with modern amenities. Perfect for expats or high-income professionals.',
        featured: true,
        verified: true,
        brokerId: 'broker_002',
        brokerName: 'Sarah Johnson',
        brokerEmail: 'sarah@houselink.co.tz',
        brokerPhone: '+255765432109',
        brokerRating: 4.9,
        amenities: ['water', 'security', 'parking', 'wifi', 'generator', 'furnished', 'ac', 'pool', 'gym', 'cctv'],
        images: [
          'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
        ],
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        availableFrom: new Date(Date.now() + 172800000).toISOString(),
        minStay: '1 year',
        deposit: 1900000
      },
      {
        id: 'prop_003',
        title: 'Family House Kinondoni',
        location: 'Kinondoni, Dar es Salaam',
        price: 750000,
        type: 'house',
        bedrooms: '4',
        bathrooms: '3',
        size: '200 sqm',
        description: 'Spacious family house in Kinondoni with large garden, parking for 2 cars, and 24/7 security. Quiet neighborhood close to schools and hospitals.',
        featured: true,
        verified: true,
        brokerId: 'broker_003',
        brokerName: 'Michael Chen',
        brokerEmail: 'michael@houselink.co.tz',
        brokerPhone: '+255788888888',
        brokerRating: 4.7,
        amenities: ['water', 'security', 'parking', 'generator', 'garden', 'cctv'],
        images: [
          'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop'
        ],
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        availableFrom: new Date(Date.now() + 259200000).toISOString(),
        minStay: '2 years',
        deposit: 1500000
      },
      {
        id: 'prop_004',
        title: 'Studio Upanga CBD',
        location: 'Upanga, Dar es Salaam',
        price: 450000,
        type: 'studio',
        bedrooms: 'Studio',
        bathrooms: '1',
        size: '35 sqm',
        description: 'Modern studio apartment in Upanga CBD. Fully furnished with kitchenette and private bathroom. Perfect for young professionals working in the city center.',
        featured: false,
        verified: true,
        brokerId: 'broker_004',
        brokerName: 'Amina Hassan',
        brokerEmail: 'amina@houselink.co.tz',
        brokerPhone: '+255712998877',
        brokerRating: 4.6,
        amenities: ['water', 'security', 'wifi', 'furnished', 'ac', 'cctv'],
        images: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
        ],
        createdAt: new Date(Date.now() - 345600000).toISOString(),
        availableFrom: new Date(Date.now() + 345600000).toISOString(),
        minStay: '1 year',
        deposit: 900000
      },
      {
        id: 'prop_005',
        title: 'Commercial Space Kariakoo',
        location: 'Kariakoo, Dar es Salaam',
        price: 1200000,
        type: 'commercial',
        bedrooms: 'N/A',
        bathrooms: '2',
        size: '150 sqm',
        description: 'Prime commercial space in Kariakoo market area. Suitable for retail shop, office, or warehouse. High foot traffic and business potential.',
        featured: false,
        verified: true,
        brokerId: 'broker_005',
        brokerName: 'David Wilson',
        brokerEmail: 'david@houselink.co.tz',
        brokerPhone: '+255713334444',
        brokerRating: 4.5,
        amenities: ['water', 'security', 'parking', 'generator', 'cctv'],
        images: [
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop'
        ],
        createdAt: new Date(Date.now() - 432000000).toISOString(),
        availableFrom: new Date(Date.now() + 432000000).toISOString(),
        minStay: '3 years',
        deposit: 2400000
      },
      {
        id: 'prop_006',
        title: 'Vacant Plot Mbezi',
        location: 'Mbezi, Dar es Salaam',
        price: 25000000,
        type: 'land',
        bedrooms: 'N/A',
        bathrooms: 'N/A',
        size: '500 sqm',
        description: 'Prime residential plot in Mbezi. Fully surveyed with title deed. Suitable for building residential houses. Quiet neighborhood with good infrastructure.',
        featured: false,
        verified: true,
        brokerId: 'broker_006',
        brokerName: 'Fatima Mohammed',
        brokerEmail: 'fatima@houselink.co.tz',
        brokerPhone: '+255715556666',
        brokerRating: 4.8,
        amenities: [],
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'
        ],
        createdAt: new Date(Date.now() - 518400000).toISOString(),
        availableFrom: new Date(Date.now() + 518400000).toISOString(),
        minStay: 'N/A',
        deposit: 0
      }
    ];

    // Save to storage
    window.Storage.set('houselink_properties', sampleProperties);
    return sampleProperties;
  }, []);

  // Get user properties
  const getUserProperties = React.useCallback(() => {
    if (!user) return [];
    const allProperties = window.Storage.get('houselink_properties', []);
    return allProperties.filter(prop => prop.brokerId === user.id);
  }, [user]);

  // Add new property
  const addProperty = React.useCallback((propertyData) => {
    if (!user) return null;
    
    const newProperty = {
      id: `prop_${window.Generator.id()}`,
      brokerId: user.id,
      brokerName: user.name,
      brokerEmail: user.email,
      brokerPhone: user.phone,
      brokerRating: 4.5,
      featured: false,
      verified: false,
      createdAt: new Date().toISOString(),
      ...propertyData
    };
    
    const allProperties = window.Storage.get('houselink_properties', []);
    const updatedProperties = [newProperty, ...allProperties];
    window.Storage.set('houselink_properties', updatedProperties);
    
    addNotification({
      title: 'Property Listed',
      message: 'Your property has been listed successfully. It will be reviewed by our team.',
      type: 'success',
      icon: 'fas fa-home'
    });
    
    return newProperty.id;
  }, [user, addNotification]);

  // Update property
  const updateProperty = React.useCallback((propertyId, updates) => {
    const allProperties = window.Storage.get('houselink_properties', []);
    const propertyIndex = allProperties.findIndex(p => p.id === propertyId);
    
    if (propertyIndex === -1) return false;
    
    allProperties[propertyIndex] = {
      ...allProperties[propertyIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    window.Storage.set('houselink_properties', allProperties);
    
    addNotification({
      title: 'Property Updated',
      message: 'Property information has been updated successfully.',
      type: 'success',
      icon: 'fas fa-edit'
    });
    
    return true;
  }, [addNotification]);

  // Delete property
  const deleteProperty = React.useCallback((propertyId) => {
    const allProperties = window.Storage.get('houselink_properties', []);
    const updatedProperties = allProperties.filter(p => p.id !== propertyId);
    
    window.Storage.set('houselink_properties', updatedProperties);
    
    addNotification({
      title: 'Property Deleted',
      message: 'Property has been deleted successfully.',
      type: 'info',
      icon: 'fas fa-trash'
    });
    
    return true;
  }, [addNotification]);

  // Get all properties
  const getAllProperties = React.useCallback(() => {
    return window.Storage.get('houselink_properties', []);
  }, []);

  // Get featured properties
  const getFeaturedProperties = React.useCallback(() => {
    const allProperties = window.Storage.get('houselink_properties', []);
    return allProperties.filter(p => p.featured).slice(0, 6);
  }, []);

  // Get recent properties
  const getRecentProperties = React.useCallback(() => {
    const allProperties = window.Storage.get('houselink_properties', []);
    return [...allProperties]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
  }, []);

  // Get property by ID
  const getPropertyById = React.useCallback((propertyId) => {
    const allProperties = window.Storage.get('houselink_properties', []);
    return allProperties.find(p => p.id === propertyId);
  }, []);

  // Value object
  const value = React.useMemo(() => ({
    // User state
    user,
    isAuthenticated: !!user,
    isBroker: user?.role === 'broker',
    isTenant: user?.role === 'tenant',
    isOwner: user?.role === 'owner',
    
    // Authentication methods
    login,
    logout,
    signup,
    updateProfile,
    
    // Favorites
    favorites,
    toggleFavorite,
    isFavorite: (propertyId) => favorites.includes(propertyId),
    
    // Messages
    messages,
    sendMessage,
    markMessageAsRead,
    unreadMessages: messages.filter(m => !m.read).length,
    
    // Notifications
    notifications,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    unreadNotifications: notifications.filter(n => !n.read).length,
    
    // Saved searches
    savedSearches,
    saveSearch,
    deleteSavedSearch,
    
    // Recent views
    recentViews,
    addRecentView,
    clearRecentViews,
    
    // Property management
    getUserProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getFeaturedProperties,
    getRecentProperties,
    getPropertyById,
    
    // Utility
    loadSampleProperties
  }), [
    user,
    favorites,
    messages,
    notifications,
    savedSearches,
    recentViews,
    login,
    logout,
    signup,
    updateProfile,
    toggleFavorite,
    sendMessage,
    markMessageAsRead,
    addNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    saveSearch,
    deleteSavedSearch,
    addRecentView,
    clearRecentViews,
    getUserProperties,
    addProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getFeaturedProperties,
    getRecentProperties,
    getPropertyById,
    loadSampleProperties
  ]);

  // Load sample properties on first render if none exist
  React.useEffect(() => {
    const properties = window.Storage.get('houselink_properties', []);
    if (properties.length === 0) {
      loadSampleProperties();
    }
  }, [loadSampleProperties]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// ================ NOTIFICATION CONTEXT ================
const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
  const [toast, setToast] = React.useState(null);
  const toastRef = React.useRef();

  // Store reference for use in other contexts
  React.useEffect(() => {
    window.NotificationContextRef = {
      showToast: (message, type = 'info', duration = 3000) => {
        setToast({ message, type, id: Date.now() });
        if (toastRef.current) {
          clearTimeout(toastRef.current);
        }
        toastRef.current = setTimeout(() => {
          setToast(null);
        }, duration);
      }
    };
    
    return () => {
      window.NotificationContextRef = null;
      if (toastRef.current) {
        clearTimeout(toastRef.current);
      }
    };
  }, []);

  const showToast = React.useCallback((message, type = 'info', duration = 3000) => {
    setToast({ message, type, id: Date.now() });
    
    if (toastRef.current) {
      clearTimeout(toastRef.current);
    }
    
    toastRef.current = setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  const hideToast = React.useCallback(() => {
    setToast(null);
    if (toastRef.current) {
      clearTimeout(toastRef.current);
    }
  }, []);

  const value = React.useMemo(() => ({
    toast,
    showToast,
    hideToast
  }), [toast, showToast, hideToast]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// ================ SEARCH CONTEXT ================
const SearchContext = React.createContext();

const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
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

  const updateFilters = React.useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = React.useCallback(() => {
    setFilters({
      location: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      amenities: []
    });
    setSearchQuery('');
  }, []);

  const applyFilters = React.useCallback((properties) => {
    let filtered = [...properties];
    
    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query)
      );
    }
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.includes(filters.location)
      );
    }
    
    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(property =>
        property.type === filters.type
      );
    }
    
    // Apply price filters
    if (filters.minPrice) {
      filtered = filtered.filter(property =>
        property.price >= parseInt(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      filtered = filtered.filter(property =>
        property.price <= parseInt(filters.maxPrice)
      );
    }
    
    // Apply bedrooms filter
    if (filters.bedrooms) {
      filtered = filtered.filter(property => {
        if (filters.bedrooms === '4+') {
          const bedNum = parseInt(property.bedrooms);
          return bedNum >= 4 || property.bedrooms.includes('4+');
        }
        if (filters.bedrooms === 'Studio') {
          return property.bedrooms === 'Studio';
        }
        return property.bedrooms === filters.bedrooms;
      });
    }
    
    // Apply bathrooms filter
    if (filters.bathrooms) {
      filtered = filtered.filter(property => {
        if (filters.bathrooms === '4+') {
          const bathNum = parseInt(property.bathrooms);
          return bathNum >= 4;
        }
        return property.bathrooms === filters.bathrooms;
      });
    }
    
    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property => {
        return filters.amenities.every(amenity =>
          property.amenities?.includes(amenity)
        );
      });
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
      case 'popular':
        // Sort by views (simulated)
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return filtered;
  }, [searchQuery, filters, sortBy]);

  const value = React.useMemo(() => ({
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
    hasActiveFilters: Object.values(filters).some(f => 
      Array.isArray(f) ? f.length > 0 : f !== ''
    ) || searchQuery.trim() !== ''
  }), [searchQuery, filters, sortBy, viewMode, applyFilters, clearFilters, updateFilters]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// ================ MODAL CONTEXT ================
const ModalContext = React.createContext();

const ModalProvider = ({ children }) => {
  const [modals, setModals] = React.useState({
    login: false,
    signup: false,
    propertyDetail: false,
    scheduleViewing: false,
    sendMessage: false,
    confirmation: false,
    filter: false
  });
  const [modalData, setModalData] = React.useState({});

  const openModal = React.useCallback((modalName, data = {}) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
    setModalData(prev => ({ ...prev, [modalName]: data }));
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = React.useCallback((modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    
    // Check if any modal is still open
    const anyOpen = Object.values(modals).some(isOpen => isOpen);
    if (!anyOpen) {
      document.body.style.overflow = '';
    }
  }, [modals]);

  const closeAllModals = React.useCallback(() => {
    setModals({
      login: false,
      signup: false,
      propertyDetail: false,
      scheduleViewing: false,
      sendMessage: false,
      confirmation: false,
      filter: false
    });
    document.body.style.overflow = '';
  }, []);

  const getModalData = React.useCallback((modalName) => {
    return modalData[modalName] || {};
  }, [modalData]);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeAllModals]);

  const value = React.useMemo(() => ({
    modals,
    openModal,
    closeModal,
    closeAllModals,
    getModalData
  }), [modals, openModal, closeModal, closeAllModals, getModalData]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

// ================ EXPORT CONTEXTS ================
window.ThemeContext = ThemeContext;
window.LanguageContext = LanguageContext;
window.AuthContext = AuthContext;
window.NotificationContext = NotificationContext;
window.SearchContext = SearchContext;
window.ModalContext = ModalContext;

window.ThemeProvider = ThemeProvider;
window.LanguageProvider = LanguageProvider;
window.AuthProvider = AuthProvider;
window.NotificationProvider = NotificationProvider;
window.SearchProvider = SearchProvider;
window.ModalProvider = ModalProvider;
