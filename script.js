const capitalData = [
  {
    country: "Italia",
    capital: "Roma",
    region: "Europa",
    image: "https://images.unsplash.com/photo-1526481280695-3c4699625883?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Japón",
    capital: "Tokio",
    region: "Asia",
    image: "https://images.unsplash.com/photo-1587560699334-cc63d3d1ccb9?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Brasil",
    capital: "Brasilia",
    region: "América",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Egipto",
    capital: "El Cairo",
    region: "África",
    image: "https://images.unsplash.com/photo-1544983074-0f4a2d238b0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Australia",
    capital: "Canberra",
    region: "Oceanía",
    image: "https://images.unsplash.com/photo-1510740694250-6b98fb27c287?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Canadá",
    capital: "Ottawa",
    region: "América",
    image: "https://images.unsplash.com/photo-1517934205344-781ce5b4220c?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1580843490734-2f9b92afb378?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Sudáfrica",
    capital: "Pretoria",
    region: "África",
    image: "https://images.unsplash.com/photo-1519059530651-4ebe3cff63b2?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "México",
    capital: "Ciudad de México",
    region: "América",
    image: "https://images.unsplash.com/photo-1526402465762-c2f94db4ccb1?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Alemania",
    capital: "Berlín",
    region: "Europa",
    image: "https://images.unsplash.com/photo-1526481280695-3c4699625883?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80",
  },
  {
    country: "Perú",
    capital: "Lima",
    region: "América",
    image: "https://images.unsplash.com/photo-1531961463838-b2d4c1e1b0a2?auto=format&fit=crop&w=800&q=80",
  },
];

// Esperar a que el DOM esté listo
const SCREENS = {
  welcome: document.getElementById("welcome-screen"),
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

// Verificar que los elementos existan
if (!SCREENS.welcome || !SCREENS.game || !SCREENS.result) {
  console.error("Error: No se encontraron las pantallas del juego");
}

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

// Leaderboard desde localStorage
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

// Toggle leaderboard en mobile
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

// Generar cupón aleatorio
function generateCoupon() {
  if (!couponCode || !couponDiscount) return;
  
  const discounts = [5, 10, 15, 20, 25];
  const discount = discounts[Math.floor(Math.random() * discounts.length)];
  
  const prefix = "BUEMES";
  const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  const code = `${prefix}-${randomCode}`;
  
  couponCode.textContent = code;
  couponDiscount.textContent = `${discount}% de descuento`;
  
  return { code, discount };
}

// Efecto confetti rojo
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
    // Asegurar que la entrada tenga imagen
    if (!entry.image) {
      entry.image = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
    }
    
    // Crear decoys asegurando que tengan imágenes
    const decoys = shuffle(
      capitalData
        .filter((item) => item.country !== entry.country && item.image)
        .slice(0, 6)
    )
      .slice(0, 2)
      .map((item) => ({
        country: item.country,
        region: item.region,
        image: item.image, // Usar la imagen del país correspondiente
        correct: false,
      }));

    // Si no hay suficientes decoys con imagen, usar fallback
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
        image: entry.image, // Siempre usar la imagen del país correcto
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
  
  // Mostrar leaderboard en pantalla de juego (solo desktop)
  if (activeScreen === SCREENS.game && leaderboard) {
    if (window.innerWidth > 768) {
      // En desktop, el leaderboard está siempre visible en el grid
      leaderboard.style.display = "block";
    } else {
      // En mobile, ocultar por defecto
      closeLeaderboard();
    }
  } else {
    // En otras pantallas, ocultar en mobile
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
  
  // Asegurar que siempre haya una imagen válida del país correspondiente
  const imageUrl = option.image || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80";
  button.style.setProperty("--image", `url("${imageUrl}")`);
  
  // Preload de imagen para evitar tarjetas grises
  const img = new Image();
  img.src = imageUrl;
  img.onerror = () => {
    // Si la imagen falla, usar fallback
    button.style.setProperty("--image", `url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80")`);
  };

  const country = document.createElement("p");
  country.className = "option-card__country";
  country.textContent = option.country;

  const region = document.createElement("span");
  region.className = "option-card__region";
  region.textContent = option.region;

  button.append(country, region);
  
  // Solo agregar hover en desktop
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    button.addEventListener("pointerenter", () => {
      if (locked || button.disabled) return;
      highlightCard(button);
    });
    
    button.addEventListener("pointerleave", () => {
      if (locked || button.disabled) return;
      resetCardPositions();
    });
  }
  
  button.addEventListener("click", (e) => {
    if (locked || button.disabled) {
      e.preventDefault();
      return;
    }
    handleSelection(option, button);
  });

  button.disabled = false;
  button.dataset.correct = option.correct ? "true" : "false";
  return button;
}

function highlightCard(activeButton) {
  optionsContainer.querySelectorAll(".option-card").forEach((card) => {
    if (!card.classList.contains("correct") && !card.classList.contains("incorrect") && !card.disabled) {
      if (card === activeButton) {
        card.style.transform = "translateX(0) translateZ(50px) rotateY(0deg) scale(1.03)";
        card.style.opacity = "1";
        card.style.zIndex = "20";
      }
    }
  });
}

function resetCardPositions() {
  optionsContainer.querySelectorAll(".option-card").forEach((card, index) => {
    if (!card.classList.contains("correct") && !card.classList.contains("incorrect") && !card.disabled) {
      const transforms = [
        "translateX(-60px) translateZ(-100px) rotateY(15deg) scale(0.85)",
        "translateX(-30px) translateZ(-50px) rotateY(8deg) scale(0.92)",
        "translateX(0) translateZ(0) rotateY(0deg) scale(1)",
        "translateX(30px) translateZ(-50px) rotateY(-8deg) scale(0.92)",
        "translateX(60px) translateZ(-100px) rotateY(-15deg) scale(0.85)",
      ];
      if (transforms[index]) {
        card.style.transform = transforms[index];
      }
      card.style.opacity = index === 2 ? "1" : index === 1 || index === 3 ? "0.85" : "0.7";
      card.style.zIndex = index === 2 ? "10" : "1";
    }
  });
}

function handleSelection(option, element) {
  if (locked || element.disabled) return;
  locked = true;
  
  const isCorrect = option.correct;
  
  // Efecto de respuesta
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

  // Mostrar respuesta correcta y deshabilitar todas
  optionsContainer.querySelectorAll(".option-card").forEach((card) => {
    card.dataset.state = "disabled";
    card.disabled = true;
    card.style.pointerEvents = "none";
    
    // Mostrar la respuesta correcta si no fue seleccionada
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
  
  // Animación de entrada para la capital
  capitalName.style.animation = "none";
  setTimeout(() => {
    if (capitalName) {
      capitalName.style.animation = "pulse 2s ease-in-out infinite";
    }
  }, 10);
  
  optionsContainer.innerHTML = "";
  
  // Asegurar que todas las opciones tengan sus imágenes correctas
  question.options.forEach((option, index) => {
    // Verificar que la opción tenga imagen
    if (!option.image) {
      // Buscar la imagen en capitalData
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
  
  // Resetear posiciones después de crear las tarjetas
  setTimeout(() => {
    resetCardPositions();
  }, 100);
  
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
    message = "¡Perfecto! 🎉";
  } else if (accuracy >= 80) {
    message = "¡Excelente trabajo! 🌟";
  } else if (accuracy >= 60) {
    message = "¡Bien hecho! 👍";
  } else {
    message = "Sigue practicando 💪";
  }

  if (resultTitle) {
    resultTitle.textContent = message;
  }
  if (resultSummary) {
    resultSummary.textContent = `Puntaje total: ${score} pts · Precisión: ${accuracy}%`;
  }

  // Efecto confetti si dice "Bien hecho" (exactamente)
  if (message === "¡Bien hecho! 👍") {
    setTimeout(() => {
      createConfetti();
    }, 300);
  }

  // Agregar al leaderboard
  if (currentPlayer && score > 0) {
    addToLeaderboard(currentPlayer, score);
  }

  // Generar cupón
  generateCoupon();
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

// Event listeners
usernameInput.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  startBtn.disabled = !value;
});

usernameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && usernameInput.value.trim()) {
    e.preventDefault();
    startGame();
  }
});

startBtn.addEventListener("click", startGame);

restartBtn.addEventListener("click", () => {
  setScreen(SCREENS.welcome);
  stopTimer();
  usernameInput.value = "";
  startBtn.disabled = true;
  usernameInput.focus();
});

// Leaderboard toggle - verificar que los elementos existan
if (leaderboardToggle) {
  leaderboardToggle.addEventListener("click", toggleLeaderboard);
}

if (leaderboardClose) {
  leaderboardClose.addEventListener("click", closeLeaderboard);
}

if (leaderboardOverlay) {
  leaderboardOverlay.addEventListener("click", closeLeaderboard);
}

// Verificar elementos críticos antes de inicializar
if (!capitalName || !optionsContainer || !usernameInput || !startBtn) {
  console.error("Error: Faltan elementos críticos del DOM");
}

// Manejar resize para ajustar leaderboard
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (!leaderboard || !leaderboardOverlay) return;
    
    if (window.innerWidth > 768) {
      // Desktop: mostrar siempre en grid
      leaderboard.style.display = "block";
      leaderboard.classList.remove("leaderboard--visible");
      leaderboardOverlay.classList.remove("leaderboard-overlay--visible");
    } else {
      // Mobile: ocultar si no está en pantalla de juego
      if (SCREENS.game && !SCREENS.game.classList.contains("screen--active")) {
        closeLeaderboard();
      }
    }
  }, 100);
});

// Inicialización - solo si los elementos existen
if (SCREENS.welcome && questionCount && usernameInput) {
  setScreen(SCREENS.welcome);
  questionCount.textContent = `${MAX_ROUNDS} rondas`;
  if (leaderboardList) {
    updateLeaderboardDisplay();
  }
  usernameInput.focus();
}
