// ================ APPLICATION CONFIGURATION ================
const CONFIG = {
  APP_NAME: {
    sw: "HouseLink Tanzania",
    en: "HouseLink Tanzania"
  },
  TAGLINE: {
    sw: "Nyumba Bora, Makazi Bora",
    en: "Better Homes, Better Living"
  },
  
  // Property Types Configuration
  PROPERTY_TYPES: [
    { 
      id: "bedsitter", 
      label: { sw: "Bedsitter", en: "Bedsitter" }, 
      icon: "🛌",
      description: {
        sw: "Chumba kimoja chenye jiko na bafu ndani. Inafaa kwa mtu mmoja au wanandoa.",
        en: "Single room with kitchen and bathroom inside. Suitable for one person or couples."
      }
    },
    { 
      id: "single", 
      label: { sw: "Chumba Kimoja", en: "Single Room" }, 
      icon: "🚪",
      description: {
        sw: "Chumba kimoja pekee, jiko na bafu za kushiriki. Bei nafuu na inafaa kwa mwanafunzi.",
        en: "Single room only, shared kitchen and bathroom. Affordable and suitable for students."
      }
    },
    { 
      id: "apartment", 
      label: { sw: "Apartment", en: "Apartment" }, 
      icon: "🏢",
      description: {
        sw: "Nyumba ndogo yenye vyumba vingi, jiko na bafu. Inafaa kwa familia ndogo.",
        en: "Small house with multiple rooms, kitchen and bathroom. Suitable for small families."
      }
    },
    { 
      id: "studio", 
      label: { sw: "Studio", en: "Studio" }, 
      icon: "🎨",
      description: {
        sw: "Chumba kimoja chenye jiko, sehemu ya kulala na bafu. Kwa wafanyabiashara.",
        en: "Single room with kitchen, sleeping area and bathroom. For young professionals."
      }
    },
    { 
      id: "duplex", 
      label: { sw: "Duplex", en: "Duplex" }, 
      icon: "🏘️",
      description: {
        sw: "Nyumba yenye ghorofa mbili zenye vyumba vingi. Inafaa kwa familia kubwa.",
        en: "Two-story house with multiple rooms. Suitable for large families."
      }
    },
    { 
      id: "house", 
      label: { sw: "Nyumba", en: "House" }, 
      icon: "🏠",
      description: {
        sw: "Nyumba kamili yenye vyumba vingi, bustani na parking. Kwa familia au biashara.",
        en: "Complete house with multiple rooms, garden and parking. For families or business."
      }
    },
    { 
      id: "commercial", 
      label: { sw: "Biashara", en: "Commercial" }, 
      icon: "🏬",
      description: {
        sw: "Maeneo ya biashara kama ofisi, duka, au ghala. Kwa wafanyabiashara.",
        en: "Business spaces like offices, shops, or warehouses. For entrepreneurs."
      }
    },
    { 
      id: "land", 
      label: { sw: "Kiwanja", en: "Land" }, 
      icon: "📐",
      description: {
        sw: "Viwanja vya ujenzi wa nyumba, biashara au kilimo. Kwa wainvesta.",
        en: "Land for building houses, business or agriculture. For investors."
      }
    }
  ],
  
  // Locations Configuration
  LOCATIONS: [
    { 
      name: "Sinza", 
      count: 42,
      description: {
        sw: "Karibu na Chuo Kikuu cha Dar es Salaam, mitaa yenye usalama na huduma nyingi.",
        en: "Near University of Dar es Salaam, safe neighborhoods with many amenities."
      }
    },
    { 
      name: "Ubungo", 
      count: 28,
      description: {
        sw: "Eneo la biashara na makazi, karibu na kituo cha mabasi na treni.",
        en: "Business and residential area, close to bus and train stations."
      }
    },
    { 
      name: "Mbezi", 
      count: 35,
      description: {
        sw: "Eneo lenye utulivu, nyumba nzuri na mazingira mazuri. Inafaa kwa familia.",
        en: "Quiet area, nice houses and good environment. Suitable for families."
      }
    },
    { 
      name: "Tegeta", 
      count: 19,
      description: {
        sw: "Eneo la biashara na viwanda, karibu na barabara kuu za jiji.",
        en: "Business and industrial area, close to main city roads."
      }
    },
    { 
      name: "Masaki", 
      count: 15,
      description: {
        sw: "Eneo la matajiri, nyumba za kifahari na huduma za juu zaidi.",
        en: "Upscale area, luxurious houses and premium services."
      }
    },
    { 
      name: "Upanga", 
      count: 12,
      description: {
        sw: "Eneo la kihistoria lenye majengo ya zamani na mazingira mazuri.",
        en: "Historical area with old buildings and beautiful surroundings."
      }
    },
    { 
      name: "Kariakoo", 
      count: 56,
      description: {
        sw: "Soko kuu la Dar es Salaam, maeneo mengi ya kukodisha kwa bei nafuu.",
        en: "Main market of Dar es Salaam, many rental spaces at affordable prices."
      }
    },
    { 
      name: "Kinondoni", 
      count: 47,
      description: {
        sw: "Eneo kubwa lenye mitaa mbalimbali, vyuo vikuu na huduma nyingi.",
        en: "Large area with various neighborhoods, universities and many services."
      }
    },
    { 
      name: "Mwenge", 
      count: 38,
      description: {
        sw: "Karibu na Chuo Kikuu cha Sayansi na Teknolojia, wengi ni wanafunzi.",
        en: "Near University of Science and Technology, mostly students."
      }
    },
    { 
      name: "Tabata", 
      count: 24,
      description: {
        sw: "Eneo lenye watu wengi, nyumba za kawaida na bei nafuu.",
        en: "Populous area, standard houses and affordable prices."
      }
    },
    { 
      name: "Ilala", 
      count: 31,
      description: {
        sw: "Katikati ya jiji, karibu na hospitali kuu na vituo vya usafiri.",
        en: "City center, close to main hospital and transport hubs."
      }
    },
    { 
      name: "Buguruni", 
      count: 43,
      description: {
        sw: "Eneo lenye watu wengi, nyumba nyingi na bei nafuu.",
        en: "Highly populated area, many houses and affordable prices."
      }
    }
  ],
  
  // Amenities Configuration
  AMENITIES: [
    { 
      id: "water", 
      label: { sw: "Maji 24/7", en: "24/7 Water" }, 
      icon: "💧" 
    },
    { 
      id: "security", 
      label: { sw: "Ulinzi 24/7", en: "24/7 Security" }, 
      icon: "👮" 
    },
    { 
      id: "parking", 
      label: { sw: "Parking", en: "Parking" }, 
      icon: "🚗" 
    },
    { 
      id: "wifi", 
      label: { sw: "Wi-Fi High Speed", en: "High Speed Wi-Fi" }, 
      icon: "📶" 
    },
    { 
      id: "generator", 
      label: { sw: "Jenereta", en: "Generator" }, 
      icon: "⚡" 
    },
    { 
      id: "furnished", 
      label: { sw: "Samani Kamili", en: "Fully Furnished" }, 
      icon: "🛋️" 
    },
    { 
      id: "ac", 
      label: { sw: "Air Conditioning", en: "Air Conditioning" }, 
      icon: "❄️" 
    },
    { 
      id: "pool", 
      label: { sw: "Bwawa", en: "Swimming Pool" }, 
      icon: "🏊" 
    },
    { 
      id: "gym", 
      label: { sw: "Gym", en: "Gym" }, 
      icon: "💪" 
    },
    { 
      id: "garden", 
      label: { sw: "Bustani", en: "Garden" }, 
      icon: "🌳" 
    },
    { 
      id: "cctv", 
      label: { sw: "CCTV", en: "CCTV" }, 
      icon: "📹" 
    },
    { 
      id: "elevator", 
      label: { sw: "Elevator", en: "Elevator" }, 
      icon: "🔼" 
    }
  ],
  
  // Price Ranges
  PRICE_RANGES: [
    { 
      label: { 
        sw: "Chini ya TZS 100,000", 
        en: "Below TZS 100,000" 
      }, 
      min: 0, 
      max: 100000 
    },
    { 
      label: { 
        sw: "TZS 100,000 - 300,000", 
        en: "TZS 100,000 - 300,000" 
      }, 
      min: 100000, 
      max: 300000 
    },
    { 
      label: { 
        sw: "TZS 300,000 - 500,000", 
        en: "TZS 300,000 - 500,000" 
      }, 
      min: 300000, 
      max: 500000 
    },
    { 
      label: { 
        sw: "TZS 500,000 - 1,000,000", 
        en: "TZS 500,000 - 1,000,000" 
      }, 
      min: 500000, 
      max: 1000000 
    },
    { 
      label: { 
        sw: "Zaidi ya TZS 1,000,000", 
        en: "Above TZS 1,000,000" 
      }, 
      min: 1000000, 
      max: 999999999 
    }
  ],
  
  // Services Offered
  SERVICES: [
    {
      id: "property_search",
      icon: "fas fa-search",
      title: { sw: "Utafutaji wa Nyumba", en: "Property Search" },
      description: {
        sw: "Tunakupa uwezo wa kutafuta nyumba kwa urahisi kwa kutumia vichujio mbalimbali. Tuna mali zaidi ya 10,000 zilizosajiliwa kwenye mfumo wetu.",
        en: "We provide easy property search with various filters. We have over 10,000 properties registered in our system."
      },
      features: [
        { sw: "Utafutaji wa kina", en: "Advanced search" },
        { sw: "Vichujio mbalimbali", en: "Multiple filters" },
        { sw: "Hifadhi utaftutaji", en: "Save searches" },
        { sw: "Maoni halisi", en: "Real reviews" }
      ]
    },
    {
      id: "broker_services",
      icon: "fas fa-handshake",
      title: { sw: "Huduma za Wakala", en: "Broker Services" },
      description: {
        sw: "Wakala wetu waliodhaminiwa wana uzoefu wa kukusaidia kupata nyumba bora. Wote wamefanyiwa uchunguzi wa usalama.",
        en: "Our verified brokers have experience to help you find the best property. All have undergone security checks."
      },
      features: [
        { sw: "Wakala waliodhaminiwa", en: "Verified brokers" },
        { sw: "Ushauri wa kitaalam", en: "Professional advice" },
        { sw: "Usalama wa malipo", en: "Payment security" },
        { sw: "Mikataba salama", en: "Secure contracts" }
      ]
    },
    {
      id: "legal_assistance",
      icon: "fas fa-balance-scale",
      title: { sw: "Usaidizi wa Kisheria", en: "Legal Assistance" },
      description: {
        sw: "Tunakupa msaada wa kisheria katika michakato yote ya ukodishaji na ununuzi wa mali. Tuna mawakili wenye uzoefu.",
        en: "We provide legal assistance in all rental and purchase processes. We have experienced lawyers."
      },
      features: [
        { sw: "Ukaguzi wa mikataba", en: "Contract review" },
        { sw: "Ushauri wa kisheria", en: "Legal advice" },
        { sw: "Usajili wa mali", en: "Property registration" },
        { sw: "Utatuzi wa migogoro", en: "Dispute resolution" }
      ]
    },
    {
      id: "property_valuation",
      icon: "fas fa-chart-line",
      title: { sw: "Tathmini ya Mali", en: "Property Valuation" },
      description: {
        sw: "Tunakupa tathmini sahihi ya bei ya mali kulingana na eneo, hali ya jengo na soko la nyumba.",
        en: "We provide accurate property valuation based on location, building condition and housing market."
      },
      features: [
        { sw: "Tathmini sahihi", en: "Accurate valuation" },
        { sw: "Uchambuzi wa soko", en: "Market analysis" },
        { sw: "Ripoti ya kina", en: "Detailed report" },
        { sw: "Ushauri wa uwekezaji", en: "Investment advice" }
      ]
    }
  ],
  
  // Testimonials
  TESTIMONIALS: [
    {
      id: 1,
      name: "John Anderson",
      role: { sw: "Mpangaji", en: "Tenant" },
      location: "Sinza",
      rating: 5,
      content: {
        sw: "HouseLink ilinisaidia kupata bedsitter nzuri Sinza kwa bei nafuu. Wakala walikuwa waaminifu na mchakato ulikuwa wa haraka.",
        en: "HouseLink helped me find a nice bedsitter in Sinza at affordable price. The brokers were trustworthy and the process was quick."
      },
      image: "JA"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: { sw: "Mmiliki wa Nyumba", en: "Property Owner" },
      location: "Mbezi",
      rating: 5,
      content: {
        sw: "Nimekuwa nikipanga nyumba zangu kwenye HouseLink kwa miezi 6. Nimepata wakodi wazuri na malipo yanafika kwa wakati.",
        en: "I have been listing my properties on HouseLink for 6 months. I have gotten good tenants and payments arrive on time."
      },
      image: "SJ"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: { sw: "Wakala", en: "Broker" },
      location: "Dar es Salaam",
      rating: 4,
      content: {
        sw: "Kama wakala, HouseLink imenisaidia kuunganisha na wateja wengi. Mfumo wao ni rahisi na unaaminika.",
        en: "As a broker, HouseLink has helped me connect with many clients. Their system is easy and reliable."
      },
      image: "MC"
    },
    {
      id: 4,
      name: "Amina Hassan",
      role: { sw: "Mnunuzi", en: "Buyer" },
      location: "Masaki",
      rating: 5,
      content: {
        sw: "Nilipata nyumba yangu ya kwanza kupitia HouseLink. Waliyonisaidia kwenye mchakato wote mpaka usajili.",
        en: "I found my first house through HouseLink. They helped me through the entire process up to registration."
      },
      image: "AH"
    }
  ],
  
  // Company Information
  COMPANY: {
    name: "HouseLink Tanzania Limited",
    founded: "2020",
    mission: {
      sw: "Kurahisisha utaftutaji wa nyumba Tanzania kwa kuunganisha wapangaji, wamiliki na wakala kupia mfumo mmoja unaoaminika.",
      en: "To simplify house hunting in Tanzania by connecting tenants, owners and brokers through one reliable system."
    },
    vision: {
      sw: "Kuwa mfumo wa kwanza unaokumbukwa Tanzania kwa huduma bora za nyumba na makazi.",
      en: "To be the first remembered system in Tanzania for excellent housing and accommodation services."
    },
    values: [
      {
        sw: "Uaminifu",
        en: "Trustworthiness"
      },
      {
        sw: "Uwazi",
        en: "Transparency"
      },
      {
        sw: "Ubora",
        en: "Quality"
      },
      {
        sw: "Ushirikiano",
        en: "Collaboration"
      }
    ],
    contact: {
      address: {
        sw: "HouseLink Towers, Mlimani City, Dar es Salaam",
        en: "HouseLink Towers, Mlimani City, Dar es Salaam"
      },
      phone: "+255 22 123 4567",
      email: "info@houselink.co.tz",
      hours: {
        sw: "Jumatatu - Ijumaa: 8:00 asubuhi - 6:00 jioni\nJumamosi: 9:00 asubuhi - 4:00 jioni",
        en: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 4:00 PM"
      }
    },
    social: {
      facebook: "https://facebook.com/houselinktz",
      twitter: "https://twitter.com/houselinktz",
      instagram: "https://instagram.com/houselinktz",
      linkedin: "https://linkedin.com/company/houselinktz",
      youtube: "https://youtube.com/houselinktz"
    }
  },
  
  // Features Highlight
  FEATURES: [
    {
      icon: "fas fa-shield-alt",
      title: { sw: "Usalama na Uaminifu", en: "Safety & Trust" },
      description: {
        sw: "Wakala wote wanafanyiwa uchunguzi wa usalama na mali zote zinathibitishwa.",
        en: "All brokers undergo security checks and all properties are verified."
      }
    },
    {
      icon: "fas fa-bolt",
      title: { sw: "Haraka na Rahisi", en: "Fast & Easy" },
      description: {
        sw: "Tafuta nyumba kwa sekunde chache kwa kutumia vichujio vyetu vya kisasa.",
        en: "Find properties in seconds using our modern filters."
      }
    },
    {
      icon: "fas fa-users",
      title: { sw: "Jumuiya Kubwa", en: "Large Community" },
      description: {
        sw: "Jiunge na jumuiya ya wapangaji 50,000+ na wamiliki 5,000+ nchini Tanzania.",
        en: "Join a community of 50,000+ tenants and 5,000+ owners across Tanzania."
      }
    },
    {
      icon: "fas fa-headset",
      title: { sw: "Msaada 24/7", en: "24/7 Support" },
      description: {
        sw: "Timu yetu ya msaada inafanya kazi masaa 24 kukusaidia popote ulipo.",
        en: "Our support team works 24 hours to help you wherever you are."
      }
    }
  ],
  
  // Statistics
  STATS: [
    {
      value: "10,000+",
      label: { sw: "Nyumba Zilizopatikana", en: "Properties Found" }
    },
    {
      value: "500+",
      label: { sw: "Wawakala Waaminifu", en: "Trusted Brokers" }
    },
    {
      value: "95%",
      label: { sw: "Wateja Walioridhika", en: "Satisfied Customers" }
    },
    {
      value: "24/7",
      label: { sw: "Huduma ya Msaada", en: "Support Service" }
    }
  ]
};

// ================ TRANSLATIONS ================
const TRANSLATIONS = {
  // Navigation
  home: { sw: "Nyumbani", en: "Home" },
  listings: { sw: "Nyumba", en: "Properties" },
  about: { sw: "Kuhusu Sisi", en: "About Us" },
  services: { sw: "Huduma", en: "Services" },
  contact: { sw: "Wasiliana", en: "Contact" },
  upload: { sw: "Weka Tangazo", en: "Post Listing" },
  favorites: { sw: "Vipendwa", en: "Favorites" },
  login: { sw: "Ingia", en: "Login" },
  logout: { sw: "Toka", en: "Logout" },
  signup: { sw: "Jisajili Sasa", en: "Sign Up Now" },
  dashboard: { sw: "Dashibodi", en: "Dashboard" },
  profile: { sw: "Wasifu", en: "Profile" },
  settings: { sw: "Mipangilio", en: "Settings" },
  
  // Common Actions
  search: { sw: "Tafuta", en: "Search" },
  filter: { sw: "Chuja", en: "Filter" },
  viewAll: { sw: "Angalia Zote", en: "View All" },
  viewDetails: { sw: "Angalia Maelezo", en: "View Details" },
  bookNow: { sw: "Bokisha Sasa", en: "Book Now" },
  applyNow: { sw: "Omba Sasa", en: "Apply Now" },
  send: { sw: "Tuma", en: "Send" },
  cancel: { sw: "Ghairi", en: "Cancel" },
  save: { sw: "Hifadhi", en: "Save" },
  edit: { sw: "Hariri", en: "Edit" },
  delete: { sw: "Futa", en: "Delete" },
  share: { sw: "Shiriki", en: "Share" },
  confirm: { sw: "Thibitisha", en: "Confirm" },
  
  // Property Details
  price: { sw: "Bei", en: "Price" },
  location: { sw: "Eneo", en: "Location" },
  type: { sw: "Aina", en: "Type" },
  bedrooms: { sw: "Vyumba", en: "Bedrooms" },
  bathrooms: { sw: "Bafu", en: "Bathrooms" },
  size: { sw: "Ukubwa", en: "Size" },
  amenities: { sw: "Vifaa", en: "Amenities" },
  description: { sw: "Maelezo", en: "Description" },
  contact: { sw: "Wasiliana", en: "Contact" },
  schedule: { sw: "Panga Uangalizi", en: "Schedule Viewing" },
  message: { sw: "Tuma Ujumbe", en: "Send Message" },
  yourMessage: { sw: "Andika ujumbe wako hapa...", en: "Type your message here..." },
  bookViewing: { sw: "Panga Uangalizi", en: "Book Viewing" },
  sendMessage: { sw: "Tuma Ujumbe kwa Wakala", en: "Send Message to Broker" },
  
  // User Roles
  broker: { sw: "Wakala", en: "Broker" },
  buyer: { sw: "Mnunuzi", en: "Buyer" },
  tenant: { sw: "Mpangaji", en: "Tenant" },
  owner: { sw: "Mmiliki", en: "Owner" },
  role: { sw: "Chagua Jukumu", en: "Choose Role" },
  
  // Forms
  name: { sw: "Jina", en: "Name" },
  email: { sw: "Barua Pepe", en: "Email" },
  phone: { sw: "Namba ya Simu", en: "Phone Number" },
  password: { sw: "Nenosiri", en: "Password" },
  confirmPassword: { sw: "Thibitisha Nenosiri", en: "Confirm Password" },
  searchPlaceholder: { 
    sw: "Tafuta nyumba, mtaa, au eneo...", 
    en: "Search properties, neighborhood, or area..." 
  },
  
  // Status
  available: { sw: "Inapatikana", en: "Available" },
  notAvailable: { sw: "Haipatikani", en: "Not Available" },
  featured: { sw: "Zilizoangaziwa", en: "Featured" },
  recent: { sw: "Hivi Karibuni", en: "Recent" },
  popular: { sw: "Maarufu", en: "Popular" },
  recommended: { sw: "Ilipendekezwa", en: "Recommended" },
  verified: { sw: "Imethibitishwa", en: "Verified" },
  premium: { sw: "Premium", en: "Premium" },
  
  // Messages
  success: { sw: "Imefanikiwa", en: "Success" },
  error: { sw: "Hitilafu", en: "Error" },
  loading: { sw: "Inapakia...", en: "Loading..." },
  saved: { sw: "Imehifadhiwa", en: "Saved" },
  removed: { sw: "Imeondolewa", en: "Removed" },
  
  // Authentication
  dontHaveAccount: { sw: "Huna akaunti?", en: "Don't have an account?" },
  forgotPassword: { sw: "Umesahau nenosiri?", en: "Forgot Password?" },
  resetPassword: { sw: "Weka Upya Nenosiri", en: "Reset Password" },
  
  // Filters
  clearFilters: { sw: "Futa Vichujio", en: "Clear Filters" },
  sortBy: { sw: "Panga Kwa", en: "Sort By" },
  newest: { sw: "Mpya Zaidi", en: "Newest" },
  priceLowHigh: { sw: "Bei: Chini - Juu", en: "Price: Low - High" },
  priceHighLow: { sw: "Bei: Juu - Chini", en: "Price: High - Low" },
  featuredFirst: { sw: "Zilizoangaziwa Kwanza", en: "Featured First" },
  
  // View Modes
  mapView: { sw: "Angalia Ramani", en: "Map View" },
  listView: { sw: "Angalia Orodha", en: "List View" },
  
  // Search
  saveSearch: { sw: "Hifadhi Utafutaji", en: "Save Search" },
  savedSearches: { sw: "Utafutaji Uliohifadhiwa", en: "Saved Searches" },
  
  // Notifications
  notifications: { sw: "Arifa", en: "Notifications" },
  markRead: { sw: "Weka Imesomwa", en: "Mark as Read" },
  deleteAll: { sw: "Futa Zote", en: "Delete All" },
  
  // Help
  help: { sw: "Usaidizi", en: "Help" },
  faq: { sw: "Maswali Yanayoulizwa", en: "FAQ" },
  howItWorks: { sw: "Inafanya Kazi Vipi?", en: "How It Works" },
  forBrokers: { sw: "Kwa Wawakala", en: "For Brokers" },
  forOwners: { sw: "Kwa Wenyewe Nyumba", en: "For Owners" },
  forTenants: { sw: "Kwa Wapangaji", en: "For Tenants" },
  
  // Tools
  mortgageCalc: { sw: "Kikokotoo cha Mikopo", en: "Mortgage Calculator" },
  areaGuide: { sw: "Mwongozo wa Maeneo", en: "Area Guide" },
  marketTrends: { sw: "Mienendo ya Soko", en: "Market Trends" },
  
  // Management
  postAd: { sw: "Weka Tangazo", en: "Post Ad" },
  manageProperties: { sw: "Dhibiti Mali", en: "Manage Properties" },
  analytics: { sw: "Takwimu", en: "Analytics" },
  
  // Messages/Inbox
  inbox: { sw: "Kikasha", en: "Inbox" },
  compose: { sw: "Andika", en: "Compose" },
  reply: { sw: "Jibu", en: "Reply" },
  forward: { sw: "Peleka", en: "Forward" },
  archive: { sw: "Hifadhi", en: "Archive" },
  
  // Trust & Safety
  trustSafety: { sw: "Imara na Salama", en: "Trust & Safety" },
  
  // Payments
  payment: { sw: "Malipo", en: "Payment" },
  invoice: { sw: "Anuarisha", en: "Invoice" },
  receipt: { sw: "Risiti", en: "Receipt" },
  deposit: { sw: "Amana", en: "Deposit" },
  rent: { sw: "Kodi", en: "Rent" },
  sale: { sw: "Uuzaji", en: "Sale" },
  
  // Documents
  download: { sw: "Pakua", en: "Download" },
  print: { sw: "Print", en: "Print" },
  export: { sw: "Toa Nje", en: "Export" },
  import: { sw: "Ingiza", en: "Import" },
  
  // Feedback
  feedback: { sw: "Maoni", en: "Feedback" },
  rate: { sw: "Kadiria", en: "Rate" },
  review: { sw: "Tathmini", en: "Review" },
  report: { sw: "Ripoti", en: "Report" },
  
  // Social
  follow: { sw: "Fuata", en: "Follow" },
  share: { sw: "Shiriki", en: "Share" },
  subscribe: { sw: "Jiandikishe", en: "Subscribe" },
  
  // Footer
  copyright: { sw: "© 2024 HouseLink Tanzania. Haki zote zimehifadhiwa.", en: "© 2024 HouseLink Tanzania. All rights reserved." },
  privacy: { sw: "Faragha", en: "Privacy" },
  terms: { sw: "Masharti", en: "Terms" },
  blog: { sw: "Blog", en: "Blog" },
  testimonials: { sw: "Maoni ya Wateja", en: "Testimonials" },
  
  // Confirmation
  confirmDelete: { sw: "Thibitisha Kufuta", en: "Confirm Delete" },
  deleteConfirm: { sw: "Una uhakika unataka kufuta tangazo hili?", en: "Are you sure you want to delete this listing?" },
  yes: { sw: "Ndio", en: "Yes" },
  no: { sw: "Hapana", en: "No" },
  
  // Welcome Messages
  welcome: { sw: "Karibu", en: "Welcome" },
  myListings: { sw: "Tangazo Zangu", en: "My Listings" },
  myMessages: { sw: "Ujumbe Wangu", en: "My Messages" },
  
  // Property Status
  vacant: { sw: "Wazi", en: "Vacant" },
  occupied: { sw: "Imezaliwa", en: "Occupied" },
  underConstruction: { sw: "Inajengwa", en: "Under Construction" },
  readyToMove: { sw: "Tayari Kukaa", en: "Ready to Move" },
  furnished: { sw: "Samani", en: "Furnished" },
  semiFurnished: { sw: "Samani Kidogo", en: "Semi-Furnished" },
  unfurnished: { sw: "Hakuna Samani", en: "Unfurnished" },
  
  // Additional Features
  petFriendly: { sw: "Inakubali Wanyama", en: "Pet Friendly" },
  smokeFree: { sw: "Hakuna Sigara", en: "Smoke Free" },
  wheelchair: { sw: "Inafaa Kwa Wenye Vitanda", en: "Wheelchair Accessible" },
  gardenView: { sw: "Mtazamo wa Bustani", en: "Garden View" },
  seaView: { sw: "Mtazamo wa Bahari", en: "Sea View" },
  cityView: { sw: "Mtazamo wa Jiji", en: "City View" },
  mountainView: { sw: "Mtazamo wa Mlima", en: "Mountain View" }
};

// ================ HELPER FUNCTIONS ================
const getTranslation = (key, language) => {
  if (!TRANSLATIONS[key]) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }
  
  if (!TRANSLATIONS[key][language]) {
    console.warn(`Translation not found for key: ${key}, language: ${language}`);
    return TRANSLATIONS[key]['en'] || key;
  }
  
  return TRANSLATIONS[key][language];
};

const getConfigLabel = (configArray, id, key, language) => {
  const item = configArray.find(item => item.id === id);
  if (!item) return id;
  
  if (item[key] && typeof item[key] === 'object' && item[key][language]) {
    return item[key][language];
  }
  
  return item[key] || id;
};

// Export for use in other files
window.CONFIG = CONFIG;
window.TRANSLATIONS = TRANSLATIONS;
window.getTranslation = getTranslation;
window.getConfigLabel = getConfigLabel;
