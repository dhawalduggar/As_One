// As One Couples App - JavaScript
console.log('🌸 As One Couples App Loading...');

// Application Data
const appData = {
  profiles: [
    { name: "Nishu", avatar: "👩", color: "#ff6b9d", chatSide: "right" },
    { name: "Dhawal", avatar: "👨", color: "#4ecdc4", chatSide: "right" }
  ],
  sampleConversation: [
    { sender: "Dhawal", message: "Good morning beautiful! Missing you already 💙", time: "9:00 AM" },
    { sender: "Nishu", message: "Aww, good morning love! Can't wait for our movie night tonight 💕", time: "9:15 AM" },
    { sender: "Dhawal", message: "I've prepared some popcorn flavors for us to try!", time: "9:30 AM" },
    { sender: "Nishu", message: "You're the best! I love how creative you are with our dates 🍿", time: "9:45 AM" },
    { sender: "Dhawal", message: "Distance means nothing when you mean everything ❤️", time: "10:00 AM" },
    { sender: "Nishu", message: "Stop making me cry happy tears! I love you so much 😭💕", time: "10:05 AM" }
  ],
  dateIdeas: [
    { title: "Virtual Museum Tour", description: "Explore world museums together", link: "https://artsandculture.google.com", image: "🏛️" },
    { title: "Cooking Date", description: "Make the same recipe together", link: "https://allrecipes.com", image: "👨‍🍳" },
    { title: "Stargazing", description: "Look at stars via live cams", link: "https://stellarium-web.org", image: "⭐" },
    { title: "Online Game Night", description: "Play games together", link: "https://chess.com", image: "🎮" }
  ],
  games: [
    { title: "Chess", description: "Play chess together", link: "https://chess.com", image: "♟️" },
    { title: "Words with Friends", description: "Word puzzle game", link: "https://wordswithfriends.com", image: "📝" },
    { title: "8 Ball Pool", description: "Online pool game", link: "https://miniclip.com/games/8-ball-pool-multiplayer", image: "🎱" }
  ],
  shows: [
    { title: "The Office", description: "Comedy series perfect for couples", link: "https://netflix.com", image: "📺" },
    { title: "Studio Ghibli Movies", description: "Beautiful animated films", link: "https://hbomax.com", image: "🎭" },
    { title: "Friends", description: "Classic sitcom to binge together", link: "https://hbomax.com", image: "👫" }
  ],
  questions: [
    { question: "What's your favorite memory of us together?", category: "memories", image: "💭" },
    { question: "If we could travel anywhere right now, where would we go?", category: "dreams", image: "✈️" },
    { question: "What song reminds you of me?", category: "music", image: "🎵" },
    { question: "What's something new you'd like to try together?", category: "future", image: "🌟" }
  ]
};

// Global Variables
let currentUser = null;
let missYouLevel = 30;
let messages = [];

// Initialize the app
function initApp() {
  console.log('🚀 Initializing As One app...');
  
  // Check for saved profile
  const savedProfile = localStorage.getItem('asOneProfile');
  if (savedProfile) {
    try {
      currentUser = JSON.parse(savedProfile);
      console.log('Loaded saved profile:', currentUser);
      updateUserInterface();
      loadSampleMessages();
      showScreen('home');
    } catch (e) {
      console.error('Error loading saved profile:', e);
      showScreen('profile');
    }
  } else {
    showScreen('profile');
  }
  
  // Initialize all functionality
  initProfileSelection();
  initNavigation();
  initHeartInteraction();
  initMessages();
  initConnection();
  initFeed();
  
  console.log('✅ As One app initialized successfully!');
}

// Profile Selection
function initProfileSelection() {
  const profileButtons = document.querySelectorAll('.profile-btn');
  console.log('Found profile buttons:', profileButtons.length);
  
  profileButtons.forEach(button => {
    // Make sure buttons are clickable
    button.style.cursor = 'pointer';
    button.style.pointerEvents = 'all';
    
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const profileName = this.dataset.profile;
      console.log(`Profile clicked: ${profileName}`);
      
      // Only handle Dhawal and Nishu clicks
      if (profileName === 'Dhawal' || profileName === 'Nishu') {
        const profile = appData.profiles.find(p => p.name === profileName);
        if (profile) {
          currentUser = profile;
          console.log('Current user set to:', currentUser);
          
          // Save to localStorage
          localStorage.setItem('asOneProfile', JSON.stringify(profile));
          
          // Update interface
          updateUserInterface();
          
          // Load conversation messages
          loadSampleMessages();
          
          // Go to home screen
          showScreen('home');
          
          // Add vibration feedback if available
          if (navigator.vibrate) {
            navigator.vibrate(50);
          }
          
          console.log(`✅ Profile ${profileName} selected successfully!`);
        }
      }
    });
    
    // Add keyboard support
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
    
    // Add hover effect
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0px)';
    });
  });
}

// Update user interface with current profile
function updateUserInterface() {
  if (!currentUser) return;
  
  console.log('Updating UI for user:', currentUser.name);
  
  const userAvatar = document.getElementById('user-avatar');
  const userName = document.getElementById('user-name');
  const chatWith = document.getElementById('chat-with');
  
  if (userAvatar) {
    userAvatar.textContent = currentUser.avatar;
  }
  
  if (userName) {
    userName.textContent = currentUser.name;
  }
  
  if (chatWith) {
    const partnerName = currentUser.name === 'Nishu' ? 'Dhawal' : 'Nishu';
    chatWith.textContent = `Chat with ${partnerName}`;
  }
}

// Screen Navigation
function showScreen(screenName) {
  console.log(`Navigating to: ${screenName}`);
  
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show target screen
  const targetScreen = document.getElementById(`${screenName}-screen`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    console.log(`✅ Screen ${screenName} is now active`);
  } else {
    console.error(`Screen ${screenName}-screen not found`);
  }
}

// Initialize navigation
function initNavigation() {
  // Bottom navigation buttons
  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const screenName = this.dataset.screen;
      showScreen(screenName);
      
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    });
  });
  
  // Floating home button
  const homeBtn = document.querySelector('.home-btn');
  if (homeBtn) {
    homeBtn.addEventListener('click', function() {
      showScreen('home');
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    });
  }
  
  // Floating connection button
  const connectionBtn = document.querySelector('.connection-btn');
  if (connectionBtn) {
    connectionBtn.addEventListener('click', function() {
      showScreen('connection');
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    });
  }
}

// Heart interaction
function initHeartInteraction() {
  const heartIcon = document.getElementById('heart-icon');
  
  if (heartIcon) {
    heartIcon.addEventListener('click', function() {
      this.classList.add('spinning');
      
      // Remove spinning class after animation
      setTimeout(() => {
        this.classList.remove('spinning');
      }, 800);
      
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }
    });
  }
}

// Messages functionality
function initMessages() {
  const messageInput = document.getElementById('message-input');
  const sendBtn = document.getElementById('send-btn');
  const emojiBtn = document.getElementById('emoji-btn');
  
  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }
  
  if (messageInput) {
    messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
  
  if (emojiBtn) {
    emojiBtn.addEventListener('click', function() {
      const emojis = ['😊', '😍', '😘', '💕', '🌸', '✨', '🥰', '💋', '🌹', '💖'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      if (messageInput) {
        messageInput.value += randomEmoji;
        messageInput.focus();
      }
    });
  }
}

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const text = messageInput.value.trim();
  
  if (!text || !currentUser) return;
  
  // Add user message
  addMessage(text, 'user');
  messageInput.value = '';
  messageInput.focus();
  
  // Simulate partner response
  setTimeout(() => {
    const responses = [
      '❤️ Love you too!',
      'Missing you so much 🥰',
      'Can\'t wait to see you again 💕',
      'You always make me smile 😊',
      'Thinking of you always 🌸',
      'You\'re the best! 💖',
      'Same here! 😍',
      'Aww, that\'s so sweet 💋'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addMessage(randomResponse, 'partner');
  }, 1000 + Math.random() * 2000);
}

function addMessage(text, sender) {
  const messagesList = document.getElementById('messages-list');
  if (!messagesList || !currentUser) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messageDiv.innerHTML = `
    <div class="message-text">${text}</div>
    <div class="message-time">${time}</div>
  `;
  
  messagesList.appendChild(messageDiv);
  
  // Scroll to bottom
  setTimeout(() => {
    messagesList.scrollTop = messagesList.scrollHeight;
  }, 100);
  
  // Save messages
  messages.push({ text, sender, time, user: currentUser.name });
  localStorage.setItem('asOneMessages', JSON.stringify(messages));
}

function loadSampleMessages() {
  const messagesList = document.getElementById('messages-list');
  if (!messagesList || !currentUser) {
    console.log('Cannot load messages - missing messagesList or currentUser');
    return;
  }
  
  // Clear existing messages
  messagesList.innerHTML = '';
  
  console.log('Loading sample messages for:', currentUser.name);
  
  // Load sample conversation based on current user
  appData.sampleConversation.forEach(msg => {
    let senderType;
    if (msg.sender === currentUser.name) {
      // Current user's messages go on the right
      senderType = 'user';
    } else {
      // Partner's messages go on the left
      senderType = 'partner';
    }
    
    addMessageToDOM(msg.message, senderType, msg.time);
  });
  
  console.log(`✅ Loaded ${appData.sampleConversation.length} sample messages`);
}

function addMessageToDOM(text, sender, time) {
  const messagesList = document.getElementById('messages-list');
  if (!messagesList) return;
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `
    <div class="message-text">${text}</div>
    <div class="message-time">${time}</div>
  `;
  
  messagesList.appendChild(messageDiv);
}

// Connection Hub functionality
function initConnection() {
  initMissYouMeter();
  initThumbKisses();
}

function initMissYouMeter() {
  const meterTrack = document.getElementById('meter-track');
  const meterFill = document.getElementById('meter-fill');
  const meterHeart = document.getElementById('meter-heart');
  const sendBtn = document.getElementById('send-miss-btn');
  
  if (!meterTrack || !meterFill || !meterHeart) return;
  
  let isDragging = false;
  
  function updateMeter(percentage) {
    percentage = Math.max(0, Math.min(100, percentage));
    meterFill.style.width = percentage + '%';
    meterHeart.style.left = percentage + '%';
    missYouLevel = percentage;
    
    // Vibration feedback
    if (navigator.vibrate && isDragging) {
      const intensity = Math.floor(percentage / 20);
      navigator.vibrate(intensity * 10);
    }
  }
  
  function handleStart(e) {
    isDragging = true;
    updateMeterFromEvent(e);
    e.preventDefault();
  }
  
  function handleMove(e) {
    if (!isDragging) return;
    updateMeterFromEvent(e);
    e.preventDefault();
  }
  
  function handleEnd() {
    isDragging = false;
  }
  
  function updateMeterFromEvent(e) {
    const rect = meterTrack.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    updateMeter(percentage);
  }
  
  // Mouse events
  meterTrack.addEventListener('mousedown', handleStart);
  document.addEventListener('mousemove', handleMove);
  document.addEventListener('mouseup', handleEnd);
  
  // Touch events
  meterTrack.addEventListener('touchstart', handleStart);
  document.addEventListener('touchmove', handleMove);
  document.addEventListener('touchend', handleEnd);
  
  // Send button
  if (sendBtn) {
    sendBtn.addEventListener('click', function() {
      const partnerName = currentUser && currentUser.name === 'Nishu' ? 'Dhawal' : 'Nishu';
      
      // Show feedback
      this.textContent = `Sent to ${partnerName}! 💕`;
      this.style.background = '#4CAF50';
      
      setTimeout(() => {
        this.textContent = 'Send to Partner';
        this.style.background = '';
      }, 2000);
      
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100]);
      }
    });
  }
}

function initThumbKisses() {
  const kissCircles = document.querySelectorAll('.kiss-circle');
  const connectionStatus = document.getElementById('connection-status');
  
  kissCircles.forEach((circle, index) => {
    circle.addEventListener('click', function() {
      const ripple = this.querySelector('.kiss-ripple');
      
      if (ripple) {
        ripple.classList.add('active');
        
        setTimeout(() => {
          ripple.classList.remove('active');
        }, 500);
      }
      
      // Change connection status
      if (connectionStatus) {
        connectionStatus.textContent = '💕 Connected! Kiss received!';
        connectionStatus.style.color = '#4CAF50';
        
        setTimeout(() => {
          connectionStatus.textContent = 'Waiting for connection...';
          connectionStatus.style.color = '';
        }, 3000);
      }
      
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
      }
    });
  });
}

// Feed functionality
function initFeed() {
  initFeedTabs();
  populateFeedContent();
}

function initFeedTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      
      // Update active tab
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update active content
      document.querySelectorAll('.feed-tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      const targetContent = document.getElementById(`${tabName}-tab`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
      
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    });
  });
}

function populateFeedContent() {
  populateGrid('dates-grid', appData.dateIdeas);
  populateGrid('games-grid', appData.games);
  populateGrid('shows-grid', appData.shows);
  populateQuestionsGrid();
}

function populateGrid(gridId, items) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  
  grid.innerHTML = '';
  
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'feed-card';
    card.innerHTML = `
      <div class="card-emoji">${item.image}</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    `;
    
    card.addEventListener('click', function() {
      window.open(item.link, '_blank');
      
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });
    
    grid.appendChild(card);
  });
}

function populateQuestionsGrid() {
  const grid = document.getElementById('questions-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  appData.questions.forEach(question => {
    const card = document.createElement('div');
    card.className = 'feed-card';
    card.innerHTML = `
      <div class="card-emoji">${question.image}</div>
      <h4>${question.question}</h4>
      <p>Category: ${question.category}</p>
    `;
    
    card.addEventListener('click', function() {
      // Create a simple interaction
      const response = prompt(question.question);
      if (response) {
        alert(`Your answer: "${response}" 💕`);
      }
      
      // Vibration feedback
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });
    
    grid.appendChild(card);
  });
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('📱 DOM loaded, initializing app...');
  
  // Small delay to ensure everything is ready
  setTimeout(() => {
    initApp();
  }, 100);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
  if (!document.hidden && currentUser) {
    console.log(`${currentUser.name} is back! 💖`);
  }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    console.log('🔧 Service Worker API available');
  });
}

// Export for debugging
window.asOneApp = {
  currentUser,
  showScreen,
  appData,
  messages
};

console.log('💕 As One Couples App Ready!');