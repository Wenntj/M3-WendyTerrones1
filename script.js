const capitalData = [
  {
    country: "Italia",
    capital: "Roma",
    region: "Europa",
    image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Japón",
    capital: "Tokio",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Brasil",
    capital: "Brasilia",
    region: "América",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Egipto",
    capital: "El Cairo",
    region: "África",
    image: "https://i.imgur.com/FmmMmrA.jpg",
  },
  {
    country: "Australia",
    capital: "Canberra",
    region: "Oceanía",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Canadá",
    capital: "Ottawa",
    region: "América",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Corea del Sur",
    capital: "Seúl",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Reino Unido",
    capital: "Londres",
    region: "Europa",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "India",
    capital: "Nueva Delhi",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Argentina",
    capital: "Buenos Aires",
    region: "América",
    image: "https://i.imgur.com/N4sQr5z.jpg",
  },
  {
    country: "Sudáfrica",
    capital: "Pretoria",
    region: "África",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "México",
    capital: "Ciudad de México",
    region: "América",
    image: "https://i.imgur.com/gLkB6W3.jpg",
  },
  {
    country: "Alemania",
    capital: "Berlín",
    region: "Europa",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Tailandia",
    capital: "Bangkok",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "España",
    capital: "Madrid",
    region: "Europa",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Francia",
    capital: "París",
    region: "Europa",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "China",
    capital: "Pekín",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Rusia",
    capital: "Moscú",
    region: "Europa/Asia",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Chile",
    capital: "Santiago",
    region: "América",
    image: "https://i.imgur.com/hAI8fra.jpg",
  },
  {
    country: "Perú",
    capital: "Lima",
    region: "América",
    image: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80",
  },
];

const SCREENS = {
  welcome: document.getElementById("welcome-screen"),
  check: document.getElementById("check-screen"),
  game: document.getElementById("game-screen"),
  result: document.getElementById("result-screen"),
};

const capitalName = document.getElementById("capital-name");
const optionsContainer = document.getElementById("options-container");
const roundIndicator = document.getElementById("round-indicator");
const streakIndicator = document.getElementById("streak-indicator");
const scoreIndicator = document.getElementById("score-indicator");
const timerIndicator = document.getElementById("timer-indicator");
const progressBar = document.getElementById("progress-bar");
const resultTitle = document.getElementById("result-title");
const resultSummary = document.getElementById("result-summary");
const questionCount = document.getElementById("question-count");
const playerNameDisplay = document.getElementById("player-name");
const usernameInput = document.getElementById("username-input");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const leaderboard = document.getElementById("leaderboard");
const leaderboardList = document.getElementById("leaderboard-list");
const leaderboardToggle = document.getElementById("leaderboard-toggle");
const leaderboardClose = document.getElementById("leaderboard-close");
const leaderboardOverlay = document.getElementById("leaderboard-overlay");
const couponCode = document.getElementById("coupon-code");
const couponDiscount = document.getElementById("coupon-discount");
const checkBtn = document.getElementById("check-btn");
const backBtn = document.getElementById("back-btn");
const checkGrid = document.getElementById("check-grid");

const MAX_ROUNDS = 5;
const MAX_TIME = 120;
const POINTS_PER_CORRECT = 100;

let questions = [];
let currentIndex = 0;
let score = 0;
let streak = 0;
let timer = MAX_TIME;
let timerId = null;
let locked = false;
let currentPlayer = "";

function getLeaderboard() {
  const stored = localStorage.getItem("capitalQuestLeaderboard");
  return stored ? JSON.parse(stored) : [];
}

function saveLeaderboard(leaderboardData) {
  localStorage.setItem("capitalQuestLeaderboard", JSON.stringify(leaderboardData));
}

function addToLeaderboard(name, score) {
  const leaderboardData = getLeaderboard();
  leaderboardData.push({ name, score, date: new Date().toISOString() });
  leaderboardData.sort((a, b) => b.score - a.score);
  const top10 = leaderboardData.slice(0, 10);
  saveLeaderboard(top10);
  updateLeaderboardDisplay();
}

function updateLeaderboardDisplay() {
  if (!leaderboardList) return;
  
  const leaderboardData = getLeaderboard();
  leaderboardList.innerHTML = "";

  if (leaderboardData.length === 0) {
    leaderboardList.innerHTML = '<li class="leaderboard__empty">Aún no hay puntajes</li>';
    return;
  }

  leaderboardData.forEach((entry, index) => {
    const item = document.createElement("li");
    item.className = `leaderboard__item ${index === 0 ? "leaderboard__item--top" : ""}`;
    
    const rank = document.createElement("div");
    rank.className = "leaderboard__rank";
    rank.textContent = `#${index + 1}`;
    
    const name = document.createElement("p");
    name.className = "leaderboard__name";
    name.textContent = entry.name;
    
    const scoreEl = document.createElement("p");
    scoreEl.className = "leaderboard__score";
    scoreEl.textContent = `${entry.score} puntos`;
    
    item.append(rank, name, scoreEl);
    leaderboardList.appendChild(item);
  });
}

function toggleLeaderboard() {
  if (!leaderboard || !leaderboardOverlay) return;
  leaderboard.classList.toggle("leaderboard--visible");
  leaderboardOverlay.classList.toggle("leaderboard-overlay--visible");
}

function closeLeaderboard() {
  if (!leaderboard || !leaderboardOverlay) return;
  leaderboard.classList.remove("leaderboard--visible");
  leaderboardOverlay.classList.remove("leaderboard-overlay--visible");
}

function generateCoupon(playerScore) {
  if (!couponCode || !couponDiscount) return;
  
  const prefix = "BUEMES";
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const code = `${prefix}-${randomCode}`;
  
  let discount;
  const maxPossibleScore = MAX_ROUNDS * POINTS_PER_CORRECT;
  const percentage = (playerScore / maxPossibleScore) * 100;
  
  if (percentage >= 100) {
    discount = 25;
  } else if (percentage >= 80) {
    discount = 20;
  } else if (percentage >= 60) {
    discount = 15;
  } else if (percentage >= 40) {
    discount = 10;
  } else {
    discount = 5;
  }
  
  couponCode.textContent = code;
  couponDiscount.textContent = `${discount}% de descuento`;
  
  return { code, discount };
}

function createConfetti() {
  const container = document.createElement("div");
  container.className = "confetti-container";
  document.body.appendChild(container);

  const colors = ["#dc2626", "#ef4444", "#b91c1c", "#f87171", "#991b1b"];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = Math.random() * 8 + 6 + "px";
    confetti.style.height = confetti.style.width;
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    confetti.style.animationDuration = Math.random() * 2 + 1.5 + "s";
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    container.appendChild(confetti);
  }

  setTimeout(() => {
    container.remove();
  }, 3000);
}

function shuffle(array) {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

function buildQuestions() {
  const shuffled = shuffle(capitalData);
  const selected = shuffled.slice(0, MAX_ROUNDS);
  
  return selected.map((entry) => {
    if (!entry.image) {
      entry.image = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
    }
    
    const decoys = shuffle(
      capitalData
        .filter((item) => item.country !== entry.country && item.image)
        .slice(0, 6)
    )
      .slice(0, 2)
      .map((item) => ({
        country: item.country,
        region: item.region,
        image: item.image,
        correct: false,
      }));

    while (decoys.length < 2) {
      const fallbackItem = capitalData.find(
        (item) => item.country !== entry.country && !decoys.some(d => d.country === item.country)
      );
      if (fallbackItem) {
        decoys.push({
          country: fallbackItem.country,
          region: fallbackItem.region,
          image: fallbackItem.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
          correct: false,
        });
      } else {
        break;
      }
    }

    const options = shuffle([
      {
        country: entry.country,
        region: entry.region,
        image: entry.image,
        correct: true,
      },
      ...decoys,
    ]);

    return {
      capital: entry.capital,
      answer: entry.country,
      options,
    };
  });
}

function setScreen(activeScreen) {
  if (!activeScreen) return;
  
  Object.values(SCREENS).forEach((screen) => {
    if (screen) {
      screen.classList.toggle("screen--active", screen === activeScreen);
    }
  });
  
  if (activeScreen === SCREENS.game && leaderboard) {
    if (window.innerWidth > 768) {
      leaderboard.style.display = "block";
    } else {
      closeLeaderboard();
    }
  } else {
    if (window.innerWidth <= 768) {
      closeLeaderboard();
    }
  }
}

function updateHud() {
  if (roundIndicator) {
    roundIndicator.textContent = `${Math.min(currentIndex + 1, MAX_ROUNDS)} / ${MAX_ROUNDS}`;
  }
  if (streakIndicator) {
    streakIndicator.textContent = streak;
  }
  if (scoreIndicator) {
    scoreIndicator.textContent = score;
  }
  if (playerNameDisplay) {
    playerNameDisplay.textContent = currentPlayer || "—";
  }
}

function updateProgress() {
  if (!progressBar) return;
  const progress = MAX_ROUNDS ? ((currentIndex + 1) / MAX_ROUNDS) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

function updateTimerDisplay() {
  if (!timerIndicator) return;
  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  timerIndicator.textContent = `${minutes}:${seconds}`;
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function startTimer() {
  stopTimer();
  timer = MAX_TIME;
  updateTimerDisplay();
  timerId = setInterval(() => {
    timer -= 1;
    updateTimerDisplay();
    if (timer <= 0) {
      stopTimer();
      endGame(true);
    }
  }, 1000);
}

function createOptionCard(option, index) {
  const button = document.createElement("button");
  button.className = "option-card";
  
  let imageUrl = option.image;
  if (!imageUrl) {
    const countryData = capitalData.find(item => item.country === option.country);
    imageUrl = countryData ? countryData.image : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
  }
  
  button.style.setProperty("--image", `url("${imageUrl}")`);
  button.style.backgroundImage = `url("${imageUrl}")`;

  const img = new Image();
  img.onload = () => {
    button.style.setProperty("--image", `url("${imageUrl}")`);
    button.style.backgroundImage = `url("${imageUrl}")`;
  };
  img.onerror = () => {
    const countryData = capitalData.find(item => item.country === option.country);
    const fallbackUrl = countryData && countryData.image 
      ? countryData.image 
      : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
    button.style.setProperty("--image", `url("${fallbackUrl}")`);
    button.style.backgroundImage = `url("${fallbackUrl}")`;
  };
  img.src = imageUrl;

  const country = document.createElement("p");
  country.className = "option-card__country";
  country.textContent = option.country;

  button.append(country);
  
  button.addEventListener("click", (e) => {
    if (locked || button.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    handleSelection(option, button);
  });

  button.disabled = false;
  button.dataset.correct = option.correct ? "true" : "false";
  return button;
}

function handleSelection(option, element) {
  if (locked || element.disabled) return;
  locked = true;
  
  const isCorrect = option.correct;
  
  if (isCorrect) {
    score += POINTS_PER_CORRECT;
    streak += 1;
    element.classList.add("correct");
    createSuccessEffect(element);
  } else {
    streak = 0;
    element.classList.add("incorrect");
  }

  updateHud();

  optionsContainer.querySelectorAll(".option-card").forEach((card) => {
    card.dataset.state = "disabled";
    card.disabled = true;
    card.style.pointerEvents = "none";
    
    if (card.dataset.correct === "true" && !card.classList.contains("correct")) {
      card.classList.add("correct");
    }
  });

  setTimeout(() => {
    currentIndex += 1;
    if (currentIndex >= MAX_ROUNDS) {
      endGame(false);
    } else {
      renderQuestion();
      locked = false;
    }
  }, 1500);
}

function createSuccessEffect(element) {
  const effect = document.createElement("div");
  effect.className = "success-effect";
  effect.textContent = "✓";
  element.style.position = "relative";
  element.appendChild(effect);
  
  setTimeout(() => effect.remove(), 600);
}

function renderQuestion() {
  if (!questions[currentIndex] || !capitalName || !optionsContainer) return;
  
  const question = questions[currentIndex];
  capitalName.textContent = question.capital;
  
  optionsContainer.innerHTML = "";
  
  question.options.forEach((option, index) => {
    if (!option.image) {
      const countryData = capitalData.find(item => item.country === option.country);
      if (countryData && countryData.image) {
        option.image = countryData.image;
      } else {
        option.image = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
      }
    }
    
    const card = createOptionCard(option, index);
    if (card && optionsContainer) {
      optionsContainer.appendChild(card);
    }
  });
  
  updateHud();
  updateProgress();
}

function endGame(timeOver) {
  stopTimer();
  setScreen(SCREENS.result);

  const accuracy = MAX_ROUNDS
    ? Math.round((score / (MAX_ROUNDS * POINTS_PER_CORRECT)) * 100)
    : 0;
  
  let message = "";
  if (timeOver) {
    message = "¡Se acabó el tiempo!";
  } else if (accuracy === 100) {
    message = "¡Perfecto!";
  } else if (accuracy >= 80) {
    message = "¡Excelente trabajo!";
  } else if (accuracy >= 60) {
    message = "¡Bien hecho!";
  } else {
    message = "Sigue practicando";
  }

  if (resultTitle) {
    if (message === "¡Bien hecho!" && currentPlayer) {
      resultTitle.textContent = `¡Bien hecho ${currentPlayer}!`;
    } else {
      resultTitle.textContent = message;
    }
  }
  if (resultSummary) {
    resultSummary.textContent = `Puntaje total: ${score} pts · Precisión: ${accuracy}%`;
  }

  if (score >= 300) {
    setTimeout(() => {
      createConfetti();
    }, 300);
  }

  if (currentPlayer && score > 0) {
    addToLeaderboard(currentPlayer, score);
  }

  generateCoupon(score);
}

function resetGame() {
  score = 0;
  streak = 0;
  currentIndex = 0;
  locked = false;
  questions = buildQuestions();
  if (questionCount) {
    questionCount.textContent = `${MAX_ROUNDS} rondas`;
  }
  updateHud();
  updateTimerDisplay();
  if (progressBar) {
    progressBar.style.width = "0%";
  }
}

function startGame() {
  if (!usernameInput) return;
  
  const username = usernameInput.value.trim();
  if (!username) {
    usernameInput.focus();
    return;
  }
  
  currentPlayer = username;
  resetGame();
  setScreen(SCREENS.game);
  renderQuestion();
  updateProgress();
  startTimer();
}

if (usernameInput) {
  usernameInput.addEventListener("input", (e) => {
    const value = e.target.value.trim();
    if (startBtn) {
      startBtn.disabled = !value;
    }
  });

  usernameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && usernameInput.value.trim()) {
      e.preventDefault();
      startGame();
    }
  });
}

if (startBtn) {
  startBtn.addEventListener("click", startGame);
}

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    setScreen(SCREENS.welcome);
    stopTimer();
    if (usernameInput) {
      usernameInput.value = "";
      usernameInput.focus();
    }
    if (startBtn) {
      startBtn.disabled = true;
    }
  });
}

if (leaderboardToggle) {
  leaderboardToggle.addEventListener("click", toggleLeaderboard);
}

if (leaderboardClose) {
  leaderboardClose.addEventListener("click", closeLeaderboard);
}

if (leaderboardOverlay) {
  leaderboardOverlay.addEventListener("click", closeLeaderboard);
}

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (!leaderboard || !leaderboardOverlay) return;
    
    if (window.innerWidth > 768) {
      leaderboard.style.display = "block";
      leaderboard.classList.remove("leaderboard--visible");
      leaderboardOverlay.classList.remove("leaderboard-overlay--visible");
    } else {
      if (SCREENS.game && !SCREENS.game.classList.contains("screen--active")) {
        closeLeaderboard();
      }
    }
  }, 100);
});

function renderCheckScreen() {
  if (!checkGrid) return;
  
  checkGrid.innerHTML = "";
  
  capitalData.forEach((country) => {
    const card = document.createElement("div");
    card.className = "check-card";
    
    const image = document.createElement("div");
    image.className = "check-card__image";
    image.style.setProperty("--image", `url("${country.image}")`);
    image.style.backgroundImage = `url("${country.image}")`;
    
    const info = document.createElement("div");
    info.className = "check-card__info";
    
    const countryName = document.createElement("h3");
    countryName.className = "check-card__country";
    countryName.textContent = country.country;
    
    const capital = document.createElement("p");
    capital.className = "check-card__capital";
    capital.textContent = country.capital;
    
    const region = document.createElement("span");
    region.className = "check-card__region";
    region.textContent = country.region;
    
    info.append(countryName, capital, region);
    card.append(image, info);
    checkGrid.appendChild(card);
  });
}

if (checkBtn) {
  checkBtn.addEventListener("click", () => {
    renderCheckScreen();
    setScreen(SCREENS.check);
  });
}

if (backBtn) {
  backBtn.addEventListener("click", () => {
    setScreen(SCREENS.welcome);
  });
}

if (SCREENS.welcome && questionCount && usernameInput) {
  setScreen(SCREENS.welcome);
  questionCount.textContent = `${MAX_ROUNDS} rondas`;
  if (leaderboardList) {
    updateLeaderboardDisplay();
  }
  usernameInput.focus();
}

