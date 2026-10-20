// ==========================================================================
// Google Startpage - Core Application Script
// Weather [Seoul, Jeju] + Google Search + Quotes of the Day + Shortcuts & Theme
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initClock();
  initWeather();
  initSearch();
  initQuotes();
  initShortcuts();
  initGoogleAppsMenu();
  initShortcutsGuide();
});

/* ==========================================================================
   1. Theme Management (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const iconSun = document.getElementById('themeIconSun');
  const iconMoon = document.getElementById('themeIconMoon');
  
  // Detect saved theme or system preference
  const savedTheme = localStorage.getItem('google_start_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('google_start_theme', nextTheme);
    showToast(nextTheme === 'dark' ? '다크 모드가 적용되었습니다.' : '라이트 모드가 적용되었습니다.');
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    } else {
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    }
  }
}

/* ==========================================================================
   2. Real-time Live Clock & Date Display
   ========================================================================== */
function initClock() {
  const clockTimeEl = document.getElementById('clockTime');
  const clockDateEl = document.getElementById('clockDate');
  
  const dayNamesKorean = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

  function updateClock() {
    const now = new Date();
    
    // Time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockTimeEl.textContent = `${hours}:${minutes}:${seconds}`;

    // Date
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = dayNamesKorean[now.getDay()];
    clockDateEl.textContent = `${year}년 ${month}월 ${date}일 (${day})`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* ==========================================================================
   3. Real-time Weather Service [Seoul, Jeju] via Open-Meteo API
   ========================================================================== */
const CITIES = {
  seoul: {
    name: '서울',
    lat: 37.5665,
    lon: 126.9780,
    cardId: 'seoulWeatherCard',
    tempId: 'seoulTemp',
    conditionId: 'seoulCondition',
    rangeId: 'seoulRange',
    feelId: 'seoulFeel',
    humidityId: 'seoulHumidity',
    windId: 'seoulWind',
    iconId: 'seoulIcon'
  },
  jeju: {
    name: '제주',
    lat: 33.4996,
    lon: 126.5312,
    cardId: 'jejuWeatherCard',
    tempId: 'jejuTemp',
    conditionId: 'jejuCondition',
    rangeId: 'jejuRange',
    feelId: 'jejuFeel',
    humidityId: 'jejuHumidity',
    windId: 'jejuWind',
    iconId: 'jejuIcon'
  }
};

// Weather Code Interpretation (WMO Codes)
function getWeatherDescription(code, isDay = 1) {
  switch (code) {
    case 0:
      return { text: '맑음', type: isDay ? 'sunny' : 'clear-night' };
    case 1:
      return { text: '대체로 맑음', type: isDay ? 'mostly-sunny' : 'partly-cloudy-night' };
    case 2:
      return { text: '구름 조금', type: isDay ? 'partly-cloudy' : 'partly-cloudy-night' };
    case 3:
      return { text: '흐림', type: 'cloudy' };
    case 45:
    case 48:
      return { text: '안개', type: 'fog' };
    case 51:
    case 53:
    case 55:
      return { text: '이슬비', type: 'drizzle' };
    case 61:
    case 63:
    case 65:
      return { text: '비', type: 'rain' };
    case 71:
    case 73:
    case 75:
      return { text: '눈', type: 'snow' };
    case 77:
      return { text: '싸락눈', type: 'snow' };
    case 80:
    case 81:
    case 82:
      return { text: '소나기', type: 'heavy-rain' };
    case 85:
    case 86:
      return { text: '눈 소나기', type: 'heavy-snow' };
    case 95:
    case 96:
    case 99:
      return { text: '뇌우', type: 'thunderstorm' };
    default:
      return { text: '구름 다소', type: 'partly-cloudy' };
  }
}

// Generate animated Google-style Weather SVG
function getWeatherSVG(type) {
  switch (type) {
    case 'sunny':
      return `
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="11" fill="#FBBC05" />
          <g stroke="#FBBC05" stroke-width="3" stroke-linecap="round">
            <line x1="24" y1="4" x2="24" y2="8" />
            <line x1="24" y1="40" x2="24" y2="44" />
            <line x1="4" y1="24" x2="8" y2="24" />
            <line x1="40" y1="24" x2="44" y2="24" />
            <line x1="9.86" y1="9.86" x2="12.69" y2="12.69" />
            <line x1="35.31" y1="35.31" x2="38.14" y2="38.14" />
            <line x1="9.86" y1="38.14" x2="12.69" y2="35.31" />
            <line x1="35.31" y1="12.69" x2="38.14" y2="9.86" />
          </g>
        </svg>
      `;
    case 'clear-night':
      return `
        <svg viewBox="0 0 48 48">
          <path d="M34 26A14 14 0 1 1 20 10a12 12 0 0 0 14 16z" fill="#FBBC05" />
          <circle cx="36" cy="12" r="2" fill="#4285F4" opacity="0.8" />
          <circle cx="40" cy="20" r="1.5" fill="#4285F4" opacity="0.6" />
        </svg>
      `;
    case 'mostly-sunny':
    case 'partly-cloudy':
      return `
        <svg viewBox="0 0 48 48">
          <circle cx="18" cy="18" r="8" fill="#FBBC05" />
          <path d="M37 36H16a8 8 0 0 1-1.3-15.9A10.5 10.5 0 0 1 35 18a8 8 0 0 1 2 18z" fill="#90CAF9" opacity="0.9" />
          <path d="M38 36H18a7 7 0 0 1-1-13.9A9.5 9.5 0 0 1 36 20a7 7 0 0 1 2 16z" fill="#E1F5FE" />
        </svg>
      `;
    case 'partly-cloudy-night':
      return `
        <svg viewBox="0 0 48 48">
          <path d="M26 18A8 8 0 1 1 18 10a7 7 0 0 0 8 8z" fill="#FBBC05" />
          <path d="M37 36H16a8 8 0 0 1-1.3-15.9A10.5 10.5 0 0 1 35 18a8 8 0 0 1 2 18z" fill="#78909C" />
          <path d="M38 36H18a7 7 0 0 1-1-13.9A9.5 9.5 0 0 1 36 20a7 7 0 0 1 2 16z" fill="#B0BEC5" />
        </svg>
      `;
    case 'cloudy':
      return `
        <svg viewBox="0 0 48 48">
          <path d="M32 30H14a7 7 0 0 1-1-13.9A9 9 0 0 1 30 14a7 7 0 0 1 2 16z" fill="#90A4AE" />
          <path d="M38 36H18a7 7 0 0 1-1-13.9A9.5 9.5 0 0 1 36 20a7 7 0 0 1 2 16z" fill="#CFD8DC" />
        </svg>
      `;
    case 'rain':
    case 'drizzle':
      return `
        <svg viewBox="0 0 48 48">
          <path d="M38 28H18a7 7 0 0 1-1-13.9A9.5 9.5 0 0 1 36 12a7 7 0 0 1 2 16z" fill="#90CAF9" />
          <line x1="18" y1="32" x2="15" y2="40" stroke="#4285F4" stroke-width="2.5" stroke-linecap="round" />
          <line x1="26" y1="32" x2="23" y2="40" stroke="#4285F4" stroke-width="2.5" stroke-linecap="round" />
          <line x1="34" y1="32" x2="31" y2="40" stroke="#4285F4" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      `;
    case 'heavy-rain':
    case 'thunderstorm':
      return `
        <svg viewBox="0 0 48 48">
          <path d="M38 26H18a7 7 0 0 1-1-13.9A9.5 9.5 0 0 1 36 10a7 7 0 0 1 2 16z" fill="#607D8B" />
          <polygon points="26,24 21,34 26,34 23,44 31,31 26,31" fill="#FBBC05" />
          <line x1="15" y1="32" x2="12" y2="40" stroke="#4285F4" stroke-width="2.5" stroke-linecap="round" />
          <line x1="36" y1="32" x2="33" y2="40" stroke="#4285F4" stroke-width="2.5" stroke-linecap="round" />
        </svg>
      `;
    case 'snow':
    case 'heavy-snow':
      return `
        <svg viewBox="0 0 48 48">
          <path d="M38 28H18a7 7 0 0 1-1-13.9A9.5 9.5 0 0 1 36 12a7 7 0 0 1 2 16z" fill="#B0BEC5" />
          <circle cx="18" cy="35" r="2" fill="#90CAF9" />
          <circle cx="26" cy="38" r="2" fill="#90CAF9" />
          <circle cx="34" cy="35" r="2" fill="#90CAF9" />
        </svg>
      `;
    case 'fog':
      return `
        <svg viewBox="0 0 48 48">
          <path d="M36 22H18a6 6 0 0 1-1-11.9A8 8 0 0 1 34 8a6 6 0 0 1 2 14z" fill="#CFD8DC" />
          <line x1="12" y1="28" x2="36" y2="28" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round" />
          <line x1="16" y1="34" x2="40" y2="34" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round" />
          <line x1="10" y1="40" x2="32" y2="40" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round" />
        </svg>
      `;
    default:
      return `
        <svg viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="10" fill="#FBBC05" />
        </svg>
      `;
  }
}

async function fetchCityWeather(cityKey) {
  const city = CITIES[cityKey];
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FSeoul`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return { success: true, cityKey, data };
  } catch (error) {
    console.warn(`Weather fetch failed for ${city.name}:`, error);
    return { success: false, cityKey, error };
  }
}

function updateWeatherUI(cityKey, weatherData) {
  const city = CITIES[cityKey];
  const card = document.getElementById(city.cardId);
  if (!card || !weatherData) return;

  const current = weatherData.current;
  const daily = weatherData.daily;

  const currentTemp = Math.round(current.temperature_2m);
  const apparentTemp = Math.round(current.apparent_temperature);
  const humidity = current.relative_humidity_2m;
  const windSpeed = Math.round(current.wind_speed_10m * 10) / 10;
  const condition = getWeatherDescription(current.weather_code, current.is_day);

  const maxTemp = (daily && daily.temperature_2m_max) ? Math.round(daily.temperature_2m_max[0]) : '--';
  const minTemp = (daily && daily.temperature_2m_min) ? Math.round(daily.temperature_2m_min[0]) : '--';

  document.getElementById(city.tempId).textContent = currentTemp;
  document.getElementById(city.conditionId).textContent = condition.text;
  document.getElementById(city.rangeId).textContent = `최고 ${maxTemp}° · 최저 ${minTemp}°`;
  document.getElementById(city.feelId).textContent = `${apparentTemp}°`;
  document.getElementById(city.humidityId).textContent = `${humidity}%`;
  document.getElementById(city.windId).textContent = `${windSpeed}km/h`;
  document.getElementById(city.iconId).innerHTML = getWeatherSVG(condition.type);

  card.classList.remove('loading');
}

// Fallback Mock Data in case of offline/network block
function applyFallbackWeather() {
  const mockSeoul = {
    current: { temperature_2m: 16.2, apparent_temperature: 15.8, relative_humidity_2m: 62, is_day: 1, weather_code: 2, wind_speed_10m: 4.1 },
    daily: { temperature_2m_max: [20.5], temperature_2m_min: [11.0] }
  };
  const mockJeju = {
    current: { temperature_2m: 21.4, apparent_temperature: 21.0, relative_humidity_2m: 78, is_day: 1, weather_code: 1, wind_speed_10m: 8.5 },
    daily: { temperature_2m_max: [23.1], temperature_2m_min: [16.8] }
  };
  updateWeatherUI('seoul', mockSeoul);
  updateWeatherUI('jeju', mockJeju);
}

async function refreshAllWeather() {
  const refreshBtn = document.getElementById('weatherRefreshBtn');
  const updatedTimeEl = document.getElementById('weatherUpdatedTime');
  
  refreshBtn.classList.add('spinning');
  updatedTimeEl.textContent = '업데이트 중...';

  try {
    const results = await Promise.all([
      fetchCityWeather('seoul'),
      fetchCityWeather('jeju')
    ]);

    let anySuccess = false;
    results.forEach(res => {
      if (res.success) {
        anySuccess = true;
        updateWeatherUI(res.cityKey, res.data);
        // Cache in localStorage
        localStorage.setItem(`google_weather_${res.cityKey}`, JSON.stringify({
          data: res.data,
          time: Date.now()
        }));
      }
    });

    if (!anySuccess) {
      // Check cache first
      const cachedSeoul = localStorage.getItem('google_weather_seoul');
      const cachedJeju = localStorage.getItem('google_weather_jeju');
      if (cachedSeoul && cachedJeju) {
        updateWeatherUI('seoul', JSON.parse(cachedSeoul).data);
        updateWeatherUI('jeju', JSON.parse(cachedJeju).data);
      } else {
        applyFallbackWeather();
      }
    }

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} 기준`;
    updatedTimeEl.textContent = timeStr;
  } catch (err) {
    applyFallbackWeather();
    updatedTimeEl.textContent = '오프라인';
  } finally {
    setTimeout(() => {
      refreshBtn.classList.remove('spinning');
    }, 600);
  }
}

function initWeather() {
  // Load cached weather instantly for zero layout shift
  try {
    const cachedSeoul = localStorage.getItem('google_weather_seoul');
    const cachedJeju = localStorage.getItem('google_weather_jeju');
    if (cachedSeoul) updateWeatherUI('seoul', JSON.parse(cachedSeoul).data);
    if (cachedJeju) updateWeatherUI('jeju', JSON.parse(cachedJeju).data);
  } catch (e) {}

  // Fetch real-time data
  refreshAllWeather();

  // Refresh button listener
  document.getElementById('weatherRefreshBtn').addEventListener('click', () => {
    refreshAllWeather();
    showToast('날씨 정보를 최신 상태로 새로고침했습니다.');
  });

  // Auto-refresh every 15 minutes
  setInterval(refreshAllWeather, 15 * 60 * 1000);
}

/* ==========================================================================
   4. Google Search Engine Functionality
   ========================================================================== */
function initSearch() {
  const form = document.getElementById('googleSearchForm');
  const input = document.getElementById('searchInput');
  const inputWrapper = document.getElementById('searchInputWrapper');
  const clearBtn = document.getElementById('clearSearchBtn');
  const dropdown = document.getElementById('searchDropdown');
  const recentList = document.getElementById('recentSearchesList');
  const clearRecentBtn = document.getElementById('clearRecentSearchesBtn');
  const feelingLuckyBtn = document.getElementById('feelingLuckyBtn');
  const voiceSearchBtn = document.getElementById('voiceSearchBtn');

  const RECENT_KEY = 'google_recent_queries';

  function getRecentSearches() {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveRecentSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) return;
    let list = getRecentSearches();
    list = list.filter(item => item !== trimmed);
    list.unshift(trimmed);
    if (list.length > 8) list.pop();
    localStorage.setItem(RECENT_KEY, JSON.stringify(list));
  }

  function renderRecentSearches() {
    const list = getRecentSearches();
    if (list.length === 0) {
      dropdown.classList.remove('active');
      return;
    }

    recentList.innerHTML = list.map(item => `
      <div class="suggestion-item" data-query="${escapeHtml(item)}">
        <div class="suggestion-left">
          <div class="suggestion-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
          <span>${escapeHtml(item)}</span>
        </div>
        <button type="button" class="suggestion-delete-btn" title="삭제" data-delete="${escapeHtml(item)}">✕</button>
      </div>
    `).join('');

    dropdown.classList.add('active');
  }

  // Input event listeners
  input.addEventListener('focus', () => {
    inputWrapper.classList.add('focused');
    if (!input.value.trim()) {
      renderRecentSearches();
    }
  });

  input.addEventListener('blur', () => {
    inputWrapper.classList.remove('focused');
    // Allow click events on dropdown items before closing
    setTimeout(() => {
      dropdown.classList.remove('active');
    }, 200);
  });

  input.addEventListener('input', () => {
    if (input.value.length > 0) {
      clearBtn.classList.add('visible');
      dropdown.classList.remove('active');
    } else {
      clearBtn.classList.remove('visible');
      renderRecentSearches();
    }
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.classList.remove('visible');
    input.focus();
    renderRecentSearches();
  });

  // Handle click on suggestions
  recentList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('[data-delete]');
    if (deleteBtn) {
      e.stopPropagation();
      const targetQuery = deleteBtn.getAttribute('data-delete');
      let list = getRecentSearches().filter(q => q !== targetQuery);
      localStorage.setItem(RECENT_KEY, JSON.stringify(list));
      renderRecentSearches();
      return;
    }

    const item = e.target.closest('.suggestion-item');
    if (item) {
      const query = item.getAttribute('data-query');
      input.value = query;
      executeSearch(query);
    }
  });

  clearRecentBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    localStorage.removeItem(RECENT_KEY);
    dropdown.classList.remove('active');
    showToast('검색 기록이 모두 삭제되었습니다.');
  });

  // Execute Search: handles direct URLs or Google queries
  function executeSearch(query) {
    const trimmed = query.trim();
    if (!trimmed) return;

    saveRecentSearch(trimmed);

    // Check if input is a direct URL (e.g., github.com or https://...)
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
    if (urlPattern.test(trimmed)) {
      let targetUrl = trimmed;
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'https://' + targetUrl;
      }
      window.location.href = targetUrl;
      return;
    }

    // Google Search
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
    window.location.href = searchUrl;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    executeSearch(input.value);
  });

  // "I'm Feeling Lucky" button
  feelingLuckyBtn.addEventListener('click', () => {
    const val = input.value.trim();
    if (val) {
      // Direct lucky search
      window.location.href = `https://www.google.com/search?q=${encodeURIComponent(val)}&btnI=1`;
    } else {
      // Open Google Doodles or show lucky message
      window.location.href = 'https://doodles.google/';
    }
  });

  // Voice Search (Web Speech API)
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;

    let isListening = false;

    voiceSearchBtn.addEventListener('click', () => {
      if (isListening) {
        recognition.stop();
        return;
      }
      try {
        recognition.start();
        isListening = true;
        voiceSearchBtn.classList.add('voice-active');
        showToast('음성을 듣고 있습니다... 말씀해 주세요.');
      } catch (err) {
        console.warn('Speech recognition error:', err);
      }
    });

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      input.value = speechResult;
      clearBtn.classList.add('visible');
      showToast(`인식됨: "${speechResult}"`);
      setTimeout(() => {
        executeSearch(speechResult);
      }, 500);
    };

    recognition.onend = () => {
      isListening = false;
      voiceSearchBtn.classList.remove('voice-active');
    };

    recognition.onerror = (event) => {
      isListening = false;
      voiceSearchBtn.classList.remove('voice-active');
      showToast('음성을 인식하지 못했습니다. 다시 시도해 주세요.');
    };
  } else {
    voiceSearchBtn.addEventListener('click', () => {
      showToast('이 브라우저에서는 음성 인식을 지원하지 않습니다.');
    });
  }

  // Global Keyboard shortcut: '/' or 'Cmd+K' / 'Ctrl+K' to focus search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      input.focus();
    } else if (e.key === 'Escape') {
      input.blur();
      dropdown.classList.remove('active');
      closeAllModals();
    }
  });
}

/* ==========================================================================
   5. Quotes of the Day System (명언 모듈)
   ========================================================================== */
function initQuotes() {
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const quoteOriginalAuthor = document.getElementById('quoteOriginalAuthor');
  const quoteCategory = document.getElementById('quoteCategory');
  const copyBtn = document.getElementById('copyQuoteBtn');
  const likeBtn = document.getElementById('likeQuoteBtn');
  const nextBtn = document.getElementById('nextQuoteBtn');

  let currentQuote = null;

  function renderQuote(quoteObj) {
    currentQuote = quoteObj;
    quoteText.classList.add('fade');
    
    setTimeout(() => {
      quoteText.textContent = `“${quoteObj.quote}”`;
      quoteAuthor.textContent = `- ${quoteObj.author}`;
      quoteOriginalAuthor.textContent = quoteObj.originalAuthor ? `(${quoteObj.originalAuthor})` : '';
      quoteCategory.textContent = `#${quoteObj.category}`;
      
      const isFav = QuoteManager.isFavorite(quoteObj.quote);
      likeBtn.classList.toggle('liked', isFav);

      quoteText.classList.remove('fade');
    }, 200);
  }

  // Initial load: Daily quote
  const dailyQuote = QuoteManager.getDailyQuote();
  renderQuote(dailyQuote);

  // Next / Shuffle Quote
  nextBtn.addEventListener('click', () => {
    const nextQuote = QuoteManager.getRandomQuote(currentQuote ? currentQuote.index : -1);
    renderQuote(nextQuote);
  });

  // Copy Quote to Clipboard
  copyBtn.addEventListener('click', async () => {
    if (!currentQuote) return;
    const textToCopy = `“${currentQuote.quote}”\n- ${currentQuote.author} (${currentQuote.originalAuthor || ''})`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      showToast('명언이 클립보드에 복사되었습니다! 📋');
    } catch (err) {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      showToast('명언이 복사되었습니다!');
    }
  });

  // Like / Bookmark Quote
  likeBtn.addEventListener('click', () => {
    if (!currentQuote) return;
    const isNowFav = QuoteManager.toggleFavorite(currentQuote);
    likeBtn.classList.toggle('liked', isNowFav);
    showToast(isNowFav ? '명언이 즐겨찾기에 저장되었습니다. ❤️' : '즐겨찾기에서 해제되었습니다.');
  });
}

/* ==========================================================================
   6. Chrome New Tab Shortcuts Grid Manager
   ========================================================================== */
function initShortcuts() {
  const grid = document.getElementById('shortcutsGrid');
  const modal = document.getElementById('addShortcutModal');
  const form = document.getElementById('addShortcutForm');
  const nameInput = document.getElementById('shortcutNameInput');
  const urlInput = document.getElementById('shortcutUrlInput');
  const cancelModalBtn = document.getElementById('cancelShortcutModalBtn');

  const SHORTCUTS_KEY = 'google_start_shortcuts_v1';

  // Default shortcuts matching Chrome / Google start page
  const defaultShortcuts = [
    {
      id: 'sc-1',
      name: 'YouTube',
      url: 'https://www.youtube.com',
      iconSvg: '<svg viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
    },
    {
      id: 'sc-2',
      name: 'Gmail',
      url: 'https://mail.google.com',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#EA4335" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>'
    },
    {
      id: 'sc-3',
      name: '네이버',
      url: 'https://www.naver.com',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#03C75A" d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/></svg>'
    },
    {
      id: 'sc-4',
      name: 'Google 지도',
      url: 'https://maps.google.com',
      iconSvg: '<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EA4335"/></svg>'
    },
    {
      id: 'sc-5',
      name: 'GitHub',
      url: 'https://github.com',
      iconSvg: '<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>'
    },
    {
      id: 'sc-6',
      name: 'ChatGPT',
      url: 'https://chatgpt.com',
      iconSvg: '<svg viewBox="0 0 24 24" fill="#10A37F"><path d="M22.28 9.87a6.2 6.2 0 0 0-.52-4.97 6.13 6.13 0 0 0-4.32-3.1 6.2 6.2 0 0 0-5.74 1.75 6.2 6.2 0 0 0-6.19 3.02 6.13 6.13 0 0 0-.75 5.08 6.2 6.2 0 0 0 .52 4.97 6.13 6.13 0 0 0 4.32 3.1 6.2 6.2 0 0 0 5.74-1.75 6.2 6.2 0 0 0 6.19-3.02 6.13 6.13 0 0 0 .75-5.08zm-9.08 9.57a4.67 4.67 0 0 1-2.92-1.02l.14-.08 4.86-2.8a.78.78 0 0 0 .39-.68v-6.9l2.07 1.2a.1.1 0 0 1 .05.08v5.52a4.7 4.7 0 0 1-4.59 4.68z"/></svg>'
    },
    {
      id: 'sc-7',
      name: 'Gemini',
      url: 'https://gemini.google.com',
      iconSvg: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-5h2zm0-7h-2V7h2z"/></svg>'
    },
    {
      id: 'sc-8',
      name: '기상청 날씨',
      url: 'https://www.weather.go.kr',
      iconSvg: '<svg viewBox="0 0 24 24" fill="#4285F4"><circle cx="12" cy="12" r="5"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    },
    {
      id: 'sc-9',
      name: '구글 번역',
      url: 'https://translate.google.co.kr',
      iconSvg: '<svg viewBox="0 0 24 24" fill="#4285F4"><path d="M12.87 15.07l-2.54-2.51.03-.08c1.74-1.94 2.98-4.17 3.71-6.49H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/></svg>'
    }
  ];

  function getShortcuts() {
    try {
      const stored = localStorage.getItem(SHORTCUTS_KEY);
      return stored ? JSON.parse(stored) : defaultShortcuts;
    } catch (e) {
      return defaultShortcuts;
    }
  }

  function saveShortcuts(list) {
    localStorage.setItem(SHORTCUTS_KEY, JSON.stringify(list));
  }

  function renderGrid() {
    const list = getShortcuts();
    
    let html = list.map(item => `
      <a href="${escapeHtml(item.url)}" target="_self" class="shortcut-tile" data-id="${item.id}" title="${escapeHtml(item.name)}">
        <div class="shortcut-icon-circle">
          ${item.iconSvg || '<span style="font-weight:700; font-size:16px;">' + escapeHtml(item.name.charAt(0)) + '</span>'}
        </div>
        <span class="shortcut-title">${escapeHtml(item.name)}</span>
        <button type="button" class="shortcut-delete-btn" data-delete-id="${item.id}" title="바로가기 삭제">✕</button>
      </a>
    `).join('');

    // Add Shortcut Button tile
    html += `
      <div class="shortcut-tile" id="openAddShortcutBtn" role="button" tabindex="0" title="바로가기 추가">
        <div class="shortcut-icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </div>
        <span class="shortcut-title">바로가기 추가</span>
      </div>
    `;

    grid.innerHTML = html;
  }

  // Handle tile actions (delete or add)
  grid.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('[data-delete-id]');
    if (deleteBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = deleteBtn.getAttribute('data-delete-id');
      const filtered = getShortcuts().filter(item => item.id !== id);
      saveShortcuts(filtered);
      renderGrid();
      showToast('바로가기가 삭제되었습니다.');
      return;
    }

    const addBtn = e.target.closest('#openAddShortcutBtn');
    if (addBtn) {
      e.preventDefault();
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      nameInput.focus();
    }
  });

  // Modal actions
  cancelModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    form.reset();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      form.reset();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    let url = urlInput.value.trim();
    if (!name || !url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const newShortcut = {
      id: 'custom-' + Date.now(),
      name: name,
      url: url,
      iconSvg: `<span style="font-weight:700; font-size:16px; color:var(--g-blue);">${escapeHtml(name.charAt(0).toUpperCase())}</span>`
    };

    const list = getShortcuts();
    list.push(newShortcut);
    saveShortcuts(list);
    renderGrid();

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    form.reset();
    showToast(`"${name}" 바로가기가 추가되었습니다.`);
  });

  renderGrid();
}

/* ==========================================================================
   7. Google Apps 9-Dot Launcher Popover
   ========================================================================== */
function initGoogleAppsMenu() {
  const btn = document.getElementById('appsMenuBtn');
  const dropdown = document.getElementById('appsDropdown');

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== btn) {
      dropdown.classList.remove('active');
    }
  });
}

/* ==========================================================================
   8. Shortcuts Guide Modal / Link
   ========================================================================== */
function initShortcutsGuide() {
  const helpLink = document.getElementById('shortcutHelpLink');
  helpLink.addEventListener('click', () => {
    showToast('단축키 안내: "/" 키 또는 Cmd+K로 검색창 포커스, Esc로 닫기');
  });
}

function closeAllModals() {
  const modal = document.getElementById('addShortcutModal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
}

/* ==========================================================================
   9. Lightweight Toast Notification Utility
   ========================================================================== */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('active');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 2800);
}

// Utility: HTML Escaping
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
