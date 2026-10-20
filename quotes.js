// 엄선된 국내외 명언 데이터베이스 (50개)
const QUOTES_DATABASE = [
  {
    quote: "그대의 하루하루를 그대의 마지막 날이라고 생각하라.",
    author: "호라티우스",
    originalAuthor: "Horace",
    category: "인생"
  },
  {
    quote: "가장 큰 위험은 아무런 위험도 감수하지 않는 것이다.",
    author: "마크 저커버그",
    originalAuthor: "Mark Zuckerberg",
    category: "도전"
  },
  {
    quote: "승리는 가장 끈기 있는 자에게 돌아간다.",
    author: "나폴레옹 보나파르트",
    originalAuthor: "Napoleon Bonaparte",
    category: "성공"
  },
  {
    quote: "우리가 두려워해야 할 유일한 것은 두려움 그 자체이다.",
    author: "프랭클린 D. 루스벨트",
    originalAuthor: "Franklin D. Roosevelt",
    category: "용기"
  },
  {
    quote: "단순함이 궁극의 정교함이다.",
    author: "레오나르도 다 빈치",
    originalAuthor: "Leonardo da Vinci",
    category: "철학"
  },
  {
    quote: "오늘 누군가가 그늘에 앉아 쉴 수 있는 이유는 오래전에 누군가가 나무를 심었기 때문이다.",
    author: "워런 버핏",
    originalAuthor: "Warren Buffett",
    category: "지혜"
  },
  {
    quote: "지혜로운 자는 행동으로 말을 증명하고, 어리석은 자는 말로 행동을 대신한다.",
    author: "공자",
    originalAuthor: "Confucius",
    category: "지혜"
  },
  {
    quote: "혁신은 리더와 추종자를 구분하는 잣대입니다.",
    author: "스티브 잡스",
    originalAuthor: "Steve Jobs",
    category: "혁신"
  },
  {
    quote: "인생은 폭풍이 지나가길 기다리는 것이 아니라, 빗속에서 춤추는 법을 배우는 것이다.",
    author: "비비안 그린",
    originalAuthor: "Vivian Greene",
    category: "인생"
  },
  {
    quote: "천 리 길도 한 걸음부터 시작된다.",
    author: "노자",
    originalAuthor: "Laozi",
    category: "동기부여"
  },
  {
    quote: "당신이 할 수 있다고 믿든 할 수 없다고 믿든, 당신이 옳다.",
    author: "헨리 포드",
    originalAuthor: "Henry Ford",
    category: "신념"
  },
  {
    quote: "어제와 똑같이 살면서 다른 미래를 기대하는 것은 정신병 초기증세이다.",
    author: "알베르트 아인슈타인",
    originalAuthor: "Albert Einstein",
    category: "변화"
  },
  {
    quote: "어둠을 탓하기보다 한 자루의 촛불을 켜는 편이 낫다.",
    author: "엘리너 루스벨트",
    originalAuthor: "Eleanor Roosevelt",
    category: "희망"
  },
  {
    quote: "행복은 이미 만들어진 것이 아니다. 그것은 당신 자신의 행동에서 비롯된다.",
    author: "달라이 라마",
    originalAuthor: "Dalai Lama",
    category: "행복"
  },
  {
    quote: "길을 잃는다는 것은 곧 새로운 길을 발견하는 기회이다.",
    author: "아프리카 속담",
    originalAuthor: "African Proverb",
    category: "도전"
  },
  {
    quote: "꿈을 날짜와 함께 적어놓으면 목표가 되고, 목표를 잘게 나누면 계획이 되며, 그 계획을 실행에 옮기면 꿈은 실현된다.",
    author: "그레그 S. 레이드",
    originalAuthor: "Greg S. Reid",
    category: "목표"
  },
  {
    quote: "실패란 보다 현명하게 다시 시작할 수 있는 유일한 기회이다.",
    author: "헨리 포드",
    originalAuthor: "Henry Ford",
    category: "성공"
  },
  {
    quote: "시간은 인간이 쓸 수 있는 가장 값진 자산이다.",
    author: "테오프라스토스",
    originalAuthor: "Theophrastus",
    category: "시간"
  },
  {
    quote: "배움에 끝이 없듯, 호기심에는 나이가 없다.",
    author: "세네카",
    originalAuthor: "Seneca",
    category: "성장"
  },
  {
    quote: "너 자신이 되어라. 다른 사람의 자리는 이미 다 찼다.",
    author: "오스카 와일드",
    originalAuthor: "Oscar Wilde",
    category: "자아"
  },
  {
    quote: "한 번 포기하면 습관이 된다. 절대 포기하지 마라.",
    author: "마이클 조던",
    originalAuthor: "Michael Jordan",
    category: "끈기"
  },
  {
    quote: "모든 성취의 출발점은 열망이다.",
    author: "나폴레온 힐",
    originalAuthor: "Napoleon Hill",
    category: "열정"
  },
  {
    quote: "바람이 불지 않을 때 바람개비를 돌리는 방법은 앞으로 달려가는 것이다.",
    author: "데일 카네기",
    originalAuthor: "Dale Carnegie",
    category: "도전"
  },
  {
    quote: "가장 위대한 영광은 한 번도 실패하지 않는 것이 아니라, 쓰러질 때마다 일어나는 데 있다.",
    author: "공자",
    originalAuthor: "Confucius",
    category: "용기"
  },
  {
    quote: "작은 기회로부터 종종 위대한 업적이 시작된다.",
    author: "데모스테네스",
    originalAuthor: "Demosthenes",
    category: "기회"
  },
  {
    quote: "미래를 예측하는 가장 좋은 방법은 미래를 창조하는 것이다.",
    author: "피터 드러커",
    originalAuthor: "Peter Drucker",
    category: "미래"
  },
  {
    quote: "스스로를 신뢰하면 다른 사람들도 당신을 신뢰하게 된다.",
    author: "괴테",
    originalAuthor: "Johann Wolfgang von Goethe",
    category: "신념"
  },
  {
    quote: "비장의 무기는 아직 나의 손안에 있다. 그것은 바로 희망이다.",
    author: "나폴레옹 보나파르트",
    originalAuthor: "Napoleon Bonaparte",
    category: "희망"
  },
  {
    quote: "우리가 할 수 있는 최선의 일은 현재의 시간에 충실한 것이다.",
    author: "마르쿠스 아우렐리우스",
    originalAuthor: "Marcus Aurelius",
    category: "현재"
  },
  {
    quote: "어려움 한가운데에 기회가 숨어 있다.",
    author: "알베르트 아인슈타인",
    originalAuthor: "Albert Einstein",
    category: "기회"
  },
  {
    quote: "오늘 할 수 있는 일을 내일로 미루지 마라.",
    author: "벤저민 프랭클린",
    originalAuthor: "Benjamin Franklin",
    category: "실행"
  },
  {
    quote: "진정한 발견의 여정은 새로운 풍경을 찾는 것이 아니라, 새로운 눈을 갖는 것이다.",
    author: "마르셀 프루스트",
    originalAuthor: "Marcel Proust",
    category: "통찰"
  },
  {
    quote: "남의 시선에 얽매여 자신의 삶을 낭비하지 마라.",
    author: "스티브 잡스",
    originalAuthor: "Steve Jobs",
    category: "인생"
  },
  {
    quote: "세상은 고통으로 가득하지만, 그것을 극복하는 일로도 가득하다.",
    author: "헬렌 켈러",
    originalAuthor: "Helen Keller",
    category: "희망"
  },
  {
    quote: "시작이 반이다.",
    author: "아리스토텔레스",
    originalAuthor: "Aristotle",
    category: "시작"
  },
  {
    quote: "지식에 투자하는 것이 가장 높은 이자를 지급한다.",
    author: "벤저민 프랭클린",
    originalAuthor: "Benjamin Franklin",
    category: "배움"
  },
  {
    quote: "매일 1%씩 성장하면 1년 뒤에는 37배 더 성장해 있을 것이다.",
    author: "제임스 클리어",
    originalAuthor: "James Clear",
    category: "성장"
  },
  {
    quote: "별을 바라보고 발밑을 보지 마라. 당신이 보는 것에 의미를 찾고 우주가 존재하는 이유를 궁금해하라.",
    author: "스티븐 호킹",
    originalAuthor: "Stephen Hawking",
    category: "꿈"
  },
  {
    quote: "스스로 알을 깨면 한 마리 새가 되지만, 남이 깨주면 프라이가 된다.",
    author: "지중해 속담",
    originalAuthor: "Proverb",
    category: "주도성"
  },
  {
    quote: "친절함은 귀먹은 사람도 들을 수 있고 눈먼 사람도 볼 수 있는 언어이다.",
    author: "마크 트웨인",
    originalAuthor: "Mark Twain",
    category: "친절"
  },
  {
    quote: "생각하는 대로 살지 않으면 사는 대로 생각하게 된다.",
    author: "폴 부르제",
    originalAuthor: "Paul Bourget",
    category: "인생"
  },
  {
    quote: "살아있는 물고기만이 물결을 거슬러 헤엄친다.",
    author: "포스트 프로버브",
    originalAuthor: "Proverb",
    category: "도전"
  },
  {
    quote: "해야 할 일은 두려워하지 말고, 두려운 일은 서둘러 피하지 마라.",
    author: "세종대왕",
    originalAuthor: "King Sejong",
    category: "용기"
  },
  {
    quote: "필사즉생 필생즉사 (반드시 죽고자 하면 살고, 살고자 하면 죽는다).",
    author: "이순신 장군",
    originalAuthor: "Admiral Yi Sun-sin",
    category: "결단"
  },
  {
    quote: "호기심을 잃지 마라. 배움에는 끝이 없다.",
    author: "리처드 파인만",
    originalAuthor: "Richard Feynman",
    category: "배움"
  },
  {
    quote: "태도는 사소한 것이지만 거대한 차이를 만든다.",
    author: "윈스턴 처칠",
    originalAuthor: "Winston Churchill",
    category: "태도"
  },
  {
    quote: "인생에서 가장 큰 영광은 넘어지지 않는 것이 아니라, 넘어질 때마다 다시 일어나는 것이다.",
    author: "넬슨 만델라",
    originalAuthor: "Nelson Mandela",
    category: "회복력"
  },
  {
    quote: "남을 행복하게 해주는 것은 스스로에게 행복의 향기를 뿌리는 것과 같다.",
    author: "랄프 왈도 에머슨",
    originalAuthor: "Ralph Waldo Emerson",
    category: "행복"
  },
  {
    quote: "오늘이라는 날은 두 번 다시 오지 않는다.",
    author: "단테 알리기에리",
    originalAuthor: "Dante Alighieri",
    category: "시간"
  },
  {
    quote: "그대의 열정이 곧 그대의 운명을 결정짓는다.",
    author: "오프라 윈프리",
    originalAuthor: "Oprah Winfrey",
    category: "열정"
  }
];

// 명언 관리 헬퍼 모듈
const QuoteManager = {
  // 오늘 날짜 기반 데일리 명언 가져오기
  getDailyQuote() {
    const today = new Date();
    // 날짜 기반 고유 인덱스 계산 (연-월-일)
    const daySeed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 31 + today.getDate();
    const index = Math.abs(daySeed) % QUOTES_DATABASE.length;
    return QUOTES_DATABASE[index];
  },

  // 랜덤 명언 가져오기 (현재 명언 제외 옵션)
  getRandomQuote(excludeIndex = -1) {
    if (QUOTES_DATABASE.length <= 1) return QUOTES_DATABASE[0];
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * QUOTES_DATABASE.length);
    } while (nextIndex === excludeIndex);
    return { ...QUOTES_DATABASE[nextIndex], index: nextIndex };
  },

  // 즐겨찾기 로컬스토리지 키
  FAVORITES_KEY: 'google_start_liked_quotes',

  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(this.FAVORITES_KEY) || '[]');
    } catch (e) {
      return [];
    }
  },

  toggleFavorite(quoteObj) {
    const favs = this.getFavorites();
    const existingIdx = favs.findIndex(item => item.quote === quoteObj.quote);
    let isFav = false;
    if (existingIdx >= 0) {
      favs.splice(existingIdx, 1);
      isFav = false;
    } else {
      favs.push({ quote: quoteObj.quote, author: quoteObj.author, date: new Date().toISOString() });
      isFav = true;
    }
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favs));
    return isFav;
  },

  isFavorite(quoteText) {
    const favs = this.getFavorites();
    return favs.some(item => item.quote === quoteText);
  }
};
