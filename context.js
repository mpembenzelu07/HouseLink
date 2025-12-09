const ThemeContext = React.createContext();
const LanguageContext = React.createContext();
const AuthContext = React.createContext();
const NotificationContext = React.createContext();

const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(
    Storage.get('darkMode', false)
  );

  React.useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    Storage.set('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = React.useState(
    Storage.get('language', 'sw')
  );

  const toggleLanguage = () => {
    const newLang = language === 'sw' ? 'en' : 'sw';
    setLanguage(newLang);
    Storage.set('language', newLang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      toggleLanguage,
      t: translations[language] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(() => {
    const storedUser = Storage.get('user');
    if (storedUser && storedUser.password) {
      delete storedUser.password;
      delete storedUser.confirmPassword;
    }
    return storedUser;
  });
  
  const [favorites, setFavorites] = React.useState(Storage.get('favorites', []));
  const [messages, setMessages] = React.useState(Storage.get('messages', []));
  const [notifications, setNotifications] = React.useState(Storage.get('notifications', []));
  const [savedSearches, setSavedSearches] = React.useState(Storage.get('savedSearches', []));

  const login = (userData) => {
    const safeUserData = { ...userData };
    delete safeUserData.password;
    delete safeUserData.confirmPassword;
    
    setUser(safeUserData);
    Storage.set('user', safeUserData);
    
    // Add welcome notification
    addNotification({
      id: generateId(),
      title: 'Welcome to HouseLink!',
      message: 'Thank you for joining HouseLink Tanzania. Start exploring properties now!',
      type: 'info',
      read: false,
      timestamp: new Date().toISOString()
    });
  };

  const logout = () => {
    setUser(null);
    Storage.remove('user');
  };

  const signup = (userData) => {
    const safeUserData = { ...userData };
    delete safeUserData.password;
    delete safeUserData.confirmPassword;
    
    setUser(safeUserData);
    Storage.set('user', safeUserData);
    
    addNotification({
      id: generateId(),
      title: 'Account Created Successfully!',
      message: `Welcome ${userData.name}! Your account has been created successfully.`,
      type: 'success',
      read: false,
      timestamp: new Date().toISOString()
    });
  };

  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    Storage.set('user', updatedUser);
  };

  const toggleFavorite = (propertyId) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(newFavorites);
    Storage.set('favorites', newFavorites);
    
    // Add notification
    addNotification({
      id: generateId(),
      title: favorites.includes(propertyId) ? 'Removed from Favorites' : 'Added to Favorites',
      message: `Property ${favorites.includes(propertyId) ? 'removed from' : 'added to'} your favorites`,
      type: 'info',
      read: false,
      timestamp: new Date().toISOString()
    });
  };

  const sendMessage = (message) => {
    const newMessage = { 
      ...message, 
      id: generateId(), 
      timestamp: new Date().toISOString(),
      read: false 
    };
    const newMessages = [newMessage, ...messages];
    setMessages(newMessages);
    Storage.set('messages', newMessages);
  };

  const markMessageAsRead = (messageId) => {
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    setMessages(updatedMessages);
    Storage.set('messages', updatedMessages);
  };

  const addNotification = (notification) => {
    const newNotifications = [notification, ...notifications];
    setNotifications(newNotifications.slice(0, 50));
    Storage.set('notifications', newNotifications);
  };

  const markNotificationAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    Storage.set('notifications', updatedNotifications);
  };

  const markAllNotificationsAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    Storage.set('notifications', updatedNotifications);
  };

  const saveSearch = (searchParams) => {
    const newSearch = {
      id: generateId(),
      ...searchParams,
      timestamp: new Date().toISOString()
    };
    const newSearches = [newSearch, ...savedSearches];
    setSavedSearches(newSearches.slice(0, 10));
    Storage.set('savedSearches', newSearches);
  };

  const deleteSearch = (searchId) => {
    const newSearches = savedSearches.filter(s => s.id !== searchId);
    setSavedSearches(newSearches);
    Storage.set('savedSearches', newSearches);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      updateProfile,
      favorites,
      toggleFavorite,
      messages,
      sendMessage,
      markMessageAsRead,
      notifications,
      addNotification,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      savedSearches,
      saveSearch,
      deleteSearch
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const NotificationProvider = ({ children }) => {
  const [toast, setToast] = React.useState(null);

  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ showToast, toast }}>
      {children}
    </NotificationContext.Provider>
  );
};
