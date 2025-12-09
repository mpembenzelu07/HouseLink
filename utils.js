// ================ STORAGE UTILITIES ================
const Storage = {
  // Set item in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage error:', e);
      // Fallback: Try to remove some items if storage is full
      try {
        // Remove oldest items if storage is full
        const keys = Object.keys(localStorage);
        if (keys.length > 50) {
          for (let i = 0; i < 10; i++) {
            localStorage.removeItem(keys[i]);
          }
          localStorage.setItem(key, JSON.stringify(value));
          return true;
        }
      } catch (fallbackError) {
        console.error('Storage fallback error:', fallbackError);
      }
      return false;
    }
  },
  
  // Get item from localStorage
  get: (key, defaultValue = null) => {
    try {
      const value = localStorage.getItem(key);
      if (value === null || value === undefined) {
        return defaultValue;
      }
      return JSON.parse(value);
    } catch (e) {
      console.error('Storage parse error:', e);
      // Try to recover by removing corrupted data
      try {
        localStorage.removeItem(key);
      } catch (removeError) {
        console.error('Failed to remove corrupted data:', removeError);
      }
      return defaultValue;
    }
  },
  
  // Remove item from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage remove error:', e);
      return false;
    }
  },
  
  // Clear all app-related data
  clearAppData: () => {
    const prefix = 'houselink_';
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith(prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Clear app data error:', e);
      return false;
    }
  },
  
  // Get storage usage
  getUsage: () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return total;
  }
};

// ================ FORMATTING UTILITIES ================
const Format = {
  // Format price in Tanzanian Shillings
  price: (amount, options = {}) => {
    if (amount === null || amount === undefined || amount === '') {
      return options.showZero ? 'TZS 0' : 'N/A';
    }
    
    const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount;
    
    if (isNaN(numAmount)) {
      return 'TZS 0';
    }
    
    const formatter = new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      ...options
    });
    
    return formatter.format(numAmount);
  },
  
  // Format date
  date: (dateString, options = {}) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
  },
  
  // Format date as relative time (e.g., "2 days ago")
  relativeTime: (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    }
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    
    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  },
  
  // Format file size
  fileSize: (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },
  
  // Format phone number
  phone: (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format for Tanzania numbers
    if (cleaned.length === 9) {
      return `+255 ${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6)}`;
    }
    
    if (cleaned.length === 12 && cleaned.startsWith('255')) {
      return `+${cleaned.substring(0, 3)} ${cleaned.substring(3, 6)} ${cleaned.substring(6, 9)} ${cleaned.substring(9)}`;
    }
    
    // Return original if format doesn't match
    return phoneNumber;
  },
  
  // Truncate text with ellipsis
  truncate: (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    
    return text.substring(0, maxLength).trim() + '...';
  },
  
  // Capitalize first letter of each word
  capitalize: (text) => {
    if (!text) return '';
    return text.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  },
  
  // Format number with commas
  number: (num) => {
    if (num === null || num === undefined) return '0';
    return new Intl.NumberFormat().format(num);
  }
};

// ================ VALIDATION UTILITIES ================
const Validation = {
  // Validate email address
  email: (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  },
  
  // Validate phone number (Tanzania format)
  phone: (phone) => {
    const re = /^(\+255|255|0)?[67]\d{8}$/;
    return re.test(phone.replace(/\s/g, ''));
  },
  
  // Validate password strength
  password: (password) => {
    const requirements = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumbers: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    return {
      isValid: Object.values(requirements).every(req => req),
      requirements,
      score: Object.values(requirements).filter(req => req).length
    };
  },
  
  // Validate name
  name: (name) => {
    if (!name || name.trim().length < 2) return false;
    const re = /^[a-zA-Z\s]{2,50}$/;
    return re.test(name.trim());
  },
  
  // Validate property price
  price: (price, min = 0, max = 1000000000) => {
    const num = parseInt(price);
    if (isNaN(num)) return false;
    return num >= min && num <= max;
  },
  
  // Validate URL
  url: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },
  
  // Validate image file
  imageFile: (file) => {
    if (!file) return false;
    
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
  }
};

// ================ GENERATION UTILITIES ================
const Generator = {
  // Generate unique ID
  id: () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },
  
  // Generate random color
  color: () => {
    const colors = [
      '#0d9488', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
      '#ef4444', '#ec4899', '#14b8a6', '#84cc16', '#f97316'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  },
  
  // Generate avatar initials
  avatarInitials: (name) => {
    if (!name) return 'U';
    
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  },
  
  // Generate property code
  propertyCode: (location, type) => {
    const locCode = location ? location.substring(0, 3).toUpperCase() : 'XXX';
    const typeCode = type ? type.substring(0, 3).toUpperCase() : 'XXX';
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    return `HL-${locCode}-${typeCode}-${random}`;
  },
  
  // Generate rating stars
  ratingStars: (rating, max = 5) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('fas fa-star');
    }
    
    if (hasHalfStar) {
      stars.push('fas fa-star-half-alt');
    }
    
    const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push('far fa-star');
    }
    
    return stars;
  }
};

// ================ DOM UTILITIES ================
const DOM = {
  // Scroll to element
  scrollTo: (elementId, options = {}) => {
    const element = document.getElementById(elementId);
    if (!element) return false;
    
    const defaultOptions = {
      behavior: 'smooth',
      block: 'start'
    };
    
    element.scrollIntoView({ ...defaultOptions, ...options });
    return true;
  },
  
  // Toggle class
  toggleClass: (element, className) => {
    if (!element) return;
    
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  },
  
  // Check if element is in viewport
  isInViewport: (element) => {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  // Debounce function
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Throttle function
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// ================ ARRAY UTILITIES ================
const ArrayUtils = {
  // Shuffle array
  shuffle: (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },
  
  // Remove duplicates
  unique: (array, key = null) => {
    if (!key) {
      return [...new Set(array)];
    }
    
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  },
  
  // Group by property
  groupBy: (array, key) => {
    return array.reduce((groups, item) => {
      const groupKey = item[key];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    }, {});
  },
  
  // Sort by property
  sortBy: (array, key, order = 'asc') => {
    return [...array].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];
      
      // Handle dates
      if (key.includes('date') || key.includes('Date')) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  },
  
  // Paginate array
  paginate: (array, page = 1, perPage = 10) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return {
      data: array.slice(start, end),
      page,
      perPage,
      total: array.length,
      totalPages: Math.ceil(array.length / perPage)
    };
  }
};

// ================ OBJECT UTILITIES ================
const ObjectUtils = {
  // Deep clone object
  deepClone: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  
  // Merge objects deeply
  deepMerge: (target, source) => {
    const output = Object.assign({}, target);
    
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    
    return output;
  },
  
  // Check if value is object
  isObject: (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
  },
  
  // Remove null/undefined values
  clean: (obj) => {
    const cleaned = {};
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value) && value.length === 0) {
          // Skip empty arrays
        } else if (this.isObject(value) && Object.keys(value).length === 0) {
          // Skip empty objects
        } else {
          cleaned[key] = value;
        }
      }
    });
    
    return cleaned;
  },
  
  // Get nested property value
  get: (obj, path, defaultValue = undefined) => {
    const travel = regexp =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
  }
};

// ================ API UTILITIES ================
const API = {
  // Simulate API delay
  simulateDelay: (ms = 1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
  
  // Handle API errors
  handleError: (error) => {
    console.error('API Error:', error);
    
    const errorMessages = {
      network: { sw: "Hitilafu ya mtandao. Tafadhali angalia muunganisho wako wa intaneti.", en: "Network error. Please check your internet connection." },
      server: { sw: "Hitilafu ya seva. Tafadhali jaribu tena baadae.", en: "Server error. Please try again later." },
      timeout: { sw: "Muda umekwisha. Tafadhali jaribu tena.", en: "Request timeout. Please try again." },
      default: { sw: "Hitilafu imetokea. Tafadhali jaribu tena.", en: "An error occurred. Please try again." }
    };
    
    let message = errorMessages.default;
    
    if (!navigator.onLine) {
      message = errorMessages.network;
    } else if (error.message && error.message.includes('timeout')) {
      message = errorMessages.timeout;
    } else if (error.status && error.status >= 500) {
      message = errorMessages.server;
    }
    
    return message;
  },
  
  // Validate API response
  validateResponse: (response) => {
    if (!response) {
      throw new Error('No response received');
    }
    
    if (response.error) {
      throw new Error(response.error);
    }
    
    return response;
  }
};

// ================ GEOLOCATION UTILITIES ================
const Geolocation = {
  // Get user's current location
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = { sw: "Idhini ya eneo imekataliwa.", en: "Location permission denied." };
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = { sw: "Taarifa za eneo hazipatikani.", en: "Location information unavailable." };
              break;
            case error.TIMEOUT:
              errorMessage = { sw: "Muda wa kupata eneo umekwisha.", en: "Location request timed out." };
              break;
            default:
              errorMessage = { sw: "Hitilafu ya kupata eneo.", en: "Error getting location." };
          }
          reject(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    });
  },
  
  // Calculate distance between two coordinates (in km)
  calculateDistance: (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  },
  
  toRad: (degrees) => {
    return degrees * (Math.PI / 180);
  }
};

// ================ EXPORT ALL UTILITIES ================
window.Storage = Storage;
window.Format = Format;
window.Validation = Validation;
window.Generator = Generator;
window.DOM = DOM;
window.ArrayUtils = ArrayUtils;
window.ObjectUtils = ObjectUtils;
window.API = API;
window.Geolocation = Geolocation;

// ================ INITIALIZATION ================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize any DOM-related utilities here
  console.log('Utilities initialized');
});
