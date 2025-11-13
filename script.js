const capitalData = [
    {
      country: "Italia",
      capital: "Roma",
      region: "Europa",
      image:
        "https://images.unsplash.com/photo-1526481280695-3c4699625883?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Japón",
      capital: "Tokio",
      region: "Asia",
      image:
        "https://images.unsplash.com/photo-1587560699334-cc63d3d1ccb9?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Brasil",
      capital: "Brasilia",
      region: "América",
      image:
        "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Egipto",
      capital: "El Cairo",
      region: "África",
      image:
        "https://images.unsplash.com/photo-1544983074-0f4a2d238b0d?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Australia",
      capital: "Canberra",
      region: "Oceanía",
      image:
        "https://images.unsplash.com/photo-1510740694250-6b98fb27c287?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Canadá",
      capital: "Ottawa",
      region: "América",
      image:
        "https://images.unsplash.com/photo-1517934205344-781ce5b4220c?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Corea del Sur",
      capital: "Seúl",
      region: "Asia",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Reino Unido",
      capital: "Londres",
      region: "Europa",
      image:
        "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "India",
      capital: "Nueva Delhi",
      region: "Asia",
      image:
        "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Argentina",
      capital: "Buenos Aires",
      region: "América",
      image:
        "https://images.unsplash.com/photo-1580843490734-2f9b92afb378?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Sudáfrica",
      capital: "Pretoria",
      region: "África",
      image:
        "https://images.unsplash.com/photo-1519059530651-4ebe3cff63b2?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "México",
      capital: "Ciudad de México",
      region: "América",
      image:
        "https://images.unsplash.com/photo-1526402465762-c2f94db4ccb1?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Alemania",
      capital: "Berlín",
      region: "Europa",
      image:
        "https://images.unsplash.com/photo-1526481280695-3c4699625883?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "Tailandia",
      capital: "Bangkok",
      region: "Asia",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    },
    {
      country: "España",
      capital: "Madrid",
      region: "Europa",
      image:
        "https://images.unsplash.com/photo-1495344517868-8ebaf0a2044a?auto=format&fit=crop&w=800&q=80",
    },
  ];
  
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
  
  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");
  
  const MAX_TIME = 120;
  const POINTS_PER_CORRECT = 100;
  
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let streak = 0;
  let timer = MAX_TIME;
  let timerId = null;
  let locked = false;
  
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
    return shuffled.map((entry) => {
      const decoys = shuffle(
        capitalData
          .filter((item) => item.country !== entry.country)
          .slice(0, 6)
      )
        .slice(0, 2)
        .map((item) => ({
          country: item.country,
          region: item.region,
          image: item.image,
          correct: false,
        }));
  
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
    Object.values(SCREENS).forEach((screen) => {
      screen.classList.toggle("screen--active", screen === activeScreen);
    });
  }
  
  function updateHud() {
    roundIndicator.textContent = `${Math.min(currentIndex + 1, questions.length)} / ${
      questions.length
    }`;
    streakIndicator.textContent = streak;
    scoreIndicator.textContent = score;
  }
  
  function updateProgress() {
    const progress = questions.length
      ? ((currentIndex + 1) / questions.length) * 100
      : 0;
    progressBar.style.width = `${progress}%`;
  }
  
  function updateTimerDisplay() {
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
    button.dataset.state = index === 1 ? "active" : "inactive";
    button.style.setProperty("--image", `url("${option.image}")`);
  
    const country = document.createElement("p");
    country.className = "option-card__country";
    country.textContent = option.country;
  
    const region = document.createElement("span");
    region.className = "option-card__region";
    region.textContent = option.region;
  
    button.append(country, region);
    button.addEventListener("pointerenter", () => {
      if (locked) return;
      setActiveCard(button);
    });
    button.addEventListener("click", () => handleSelection(option, button));
  
    button.disabled = false;
    button.dataset.correct = option.correct ? "true" : "false";
    return button;
  }
  
  function setActiveCard(activeButton) {
    optionsContainer.querySelectorAll(".option-card").forEach((card) => {
      const state = card === activeButton ? "active" : "inactive";
      if (!card.classList.contains("correct") && !card.classList.contains("incorrect")) {
        card.dataset.state = state;
      }
    });
  }
  
  function handleSelection(option, element) {
    if (locked) return;
    locked = true;
    const isCorrect = option.correct;
    if (isCorrect) {
      score += POINTS_PER_CORRECT;
      streak += 1;
      element.classList.add("correct");
    } else {
      streak = 0;
      element.classList.add("incorrect");
    }
  
    updateHud();
  
    optionsContainer.querySelectorAll(".option-card").forEach((card) => {
      card.dataset.state = "disabled";
      card.disabled = true;
      if (card.dataset.correct === "true") {
        card.classList.add("correct");
      }
    });
  
    setTimeout(() => {
      currentIndex += 1;
      if (currentIndex >= questions.length) {
        endGame(false);
      } else {
        renderQuestion();
        locked = false;
      }
    }, 1200);
  }
  
  function renderQuestion() {
    const question = questions[currentIndex];
    capitalName.textContent = question.capital;
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
      const card = createOptionCard(option, index);
      optionsContainer.appendChild(card);
    });
    updateHud();
    updateProgress();
  }
  
  function endGame(timeOver) {
    stopTimer();
    setScreen(SCREENS.result);
  
    const accuracy = questions.length
      ? Math.round((score / (questions.length * POINTS_PER_CORRECT)) * 100)
      : 0;
    const message = timeOver
      ? "¡Se acabó el tiempo!"
      : accuracy >= 70
      ? "¡Excelente dominio geográfico!"
      : "Sigue practicando, vas por buen camino.";
  
    resultTitle.textContent = message;
    resultSummary.textContent = `Puntaje total: ${score} pts · Respuestas correctas: ${accuracy}%`;
  }
  
  function resetGame() {
    score = 0;
    streak = 0;
    currentIndex = 0;
    locked = false;
    questions = buildQuestions();
    questionCount.textContent = `${questions.length} preguntas`;
    updateHud();
    updateTimerDisplay();
  }
  
  function startGame() {
    resetGame();
    setScreen(SCREENS.game);
    renderQuestion();
    updateProgress();
    startTimer();
  }
  
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", () => {
    setScreen(SCREENS.welcome);
    stopTimer();
  });
  
  setScreen(SCREENS.welcome);
  questionCount.textContent = `${capitalData.length} preguntas base`;
