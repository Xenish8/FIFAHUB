import { startCaseSpin } from './caseSpinner.js';
function resetRerollGame() {
  const game = document.getElementById("reroll-game");
  const tiles = document.getElementById("reroll-tiles");
  const final = document.getElementById("reroll-final-message");
  const start = document.getElementById("reroll-start");
  const shuffle = document.getElementById("reroll-shuffle");

  if (game) game.classList.add("hidden");
  if (tiles) tiles.innerHTML = "";
  if (final) final.textContent = "";
  if (start) start.disabled = true;
  if (shuffle) shuffle.disabled = false;

  // ⬇️ ДОБАВЛЯЕМ ЭТО
  const rerollTiles = document.querySelectorAll(".reroll-tile");
  rerollTiles.forEach(tile => {
    tile.onclick = null;
  });
}


document.addEventListener("DOMContentLoaded", () => {
  // Важные элементы
  const draftTab = document.getElementById("draftTab");
  const draftContainer = document.getElementById("draft-container");
  const trophyTab = document.getElementById("trophyTab");
  const statTab = document.getElementById("statTab");
  const trophyContainer = document.getElementById("trophy-container");
  const statsContainer = document.getElementById("statistics-container");
  const andreyStats = document.getElementById("andrey-stats");
  const maksStats = document.getElementById("maks-stats");

  const accordionHeaders = document.querySelectorAll(".accordion-header");
  const playerButtons = document.querySelectorAll(".player-button");
  const bodies = document.querySelectorAll(".accordion-body");
  
  // Аккордеоны
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const next = header.nextElementSibling;
      const isOpen = next.classList.contains("open");

      if (isOpen) {
        next.classList.remove("open");
        next.style.maxHeight = null;
      } else {
        next.classList.add("open");
        next.style.maxHeight = next.scrollHeight + "px";
      }
    });
  });

  // Кнопки игроков
  playerButtons.forEach(button => {
    button.addEventListener("click", () => {
      playerButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
  
      const player = button.id === "andreyBtn" ? "andrey" : "maks";
  
      // Проверим какая вкладка активна
      if (trophyTab.classList.contains("active")) {
        // Показываем только аккордеоны выбранного игрока
        bodies.forEach(body => {
          if (body.dataset.player === player) {
            body.parentElement.style.display = "block";
          } else {
            body.parentElement.style.display = "none";
          }
        });
  
        // Скрываем статистику
        andreyStats.style.display = "none";
        maksStats.style.display = "none";
      } else {
        // Показываем только нужную статистику
        trophyContainer.style.display = "none";
        statsContainer.style.display = "block";
  
        if (player === "andrey") {
          andreyStats.style.display = "block";
          maksStats.style.display = "none";
        } else {
          andreyStats.style.display = "none";
          maksStats.style.display = "block";
        }
  
        // ❗️ ДОБАВЬ ВОТ ЭТО ЧТОБЫ АККОРДЕОНЫ СКРЫВАЛИСЬ ПРИ ВКЛАДКЕ СТАТИСТИКИ:
        bodies.forEach(body => {
          body.parentElement.style.display = "none";
        });
        if (!draftTab.classList.contains("active")) {
          draftContainer.style.display = "none";
        }

        // ❗️ Если активен раздел DRAFT, скрываем его при переключении игрока
if (draftTab.classList.contains("active")) {
  draftTab.classList.remove("active");
  draftContainer.style.display = "none";

  // Можно также переключить на статистику по умолчанию:
  statTab.classList.add("active");
  statsContainer.style.display = "block";

  if (player === "andrey") {
    andreyStats.style.display = "block";
    maksStats.style.display = "none";
  } else {
    andreyStats.style.display = "none";
    maksStats.style.display = "block";
  }
}

      }
    });
  });
  

  // Вкладка STATISTICS
  statTab.addEventListener("click", () => {
    statTab.classList.add("active");
    trophyTab.classList.remove("active");
    draftTab.classList.remove("active");
  
    trophyContainer.style.display = "none";
    statsContainer.style.display = "block";
    draftContainer.style.display = "none";
  
    const activePlayer = document.querySelector(".player-button.active").id;
    if (activePlayer === "andreyBtn") {
      andreyStats.style.display = "block";
      maksStats.style.display = "none";
    } else {
      andreyStats.style.display = "none";
      maksStats.style.display = "block";
    }
  
    // ❗️ ВАЖНО: скрываем аккордеоны при статистике
    bodies.forEach(body => {
      body.parentElement.style.display = "none";
    });
  });
  

  // Вкладка TROPHY
  trophyTab.addEventListener("click", () => {
    trophyTab.classList.add("active");
    statTab.classList.remove("active");
    draftTab.classList.remove("active");

    trophyContainer.style.display = "block";
    statsContainer.style.display = "none";
    draftContainer.style.display = "none";

    const activePlayer = document.querySelector(".player-button.active").id;
    const player = activePlayer === "andreyBtn" ? "andrey" : "maks";

    bodies.forEach(body => {
      if (body.dataset.player === player) {
        body.parentElement.style.display = "block";
      } else {
        body.parentElement.style.display = "none";
      }
    });

    andreyStats.style.display = "none";
    maksStats.style.display = "none";
  });

  draftTab.addEventListener("click", () => {
    
    draftTab.classList.add("active");
    trophyTab.classList.remove("active");
    statTab.classList.remove("active");
  
    draftContainer.style.display = "block";  // ✅ ПОКАЗЫВАЕМ
    trophyContainer.style.display = "none";
    statsContainer.style.display = "none";
  
    andreyStats.style.display = "none";
    maksStats.style.display = "none";

      // Скрыть аккордеоны обоих игроков
  bodies.forEach(body => {
    body.parentElement.style.display = "none";
  });

  });
  
  

  // По умолчанию — Андрей + Trophy
  bodies.forEach(body => {
    if (body.dataset.player !== "andrey") {
      body.parentElement.style.display = "none";
    }
  });

  andreyStats.style.display = "none";
  maksStats.style.display = "none";
});

const teamDataAndrey = {
  lokomotiv: [
    { fifa: "FIFA 19", tournament: "Champions League" },
    { fifa: "FIFA 19", tournament: "Champions League" }
  ],
  leipzig: [
    { fifa: "FIFA 20", tournament: "Champions League" },
    { fifa: "FIFA 20", tournament: "Champions League" },
    { fifa: "FIFA 20", tournament: "Champions League" },
    { fifa: "FIFA 20", tournament: "Champions League" },
    { fifa: "FIFA 23", tournament: "SuperCup" }
  ],
  atletico: [
    { fifa: "FIFA 21", tournament: "Champions League" },
    { fifa: "FIFA 22", tournament: "Champions League" }
  ],
  inter: [
    { fifa: "FIFA 21", tournament: "Champions League" },
    { fifa: "FIFA 21", tournament: "Champions League" }
  ],
  bayern: [
    { fifa: "FIFA 21", tournament: "Champions League" },
    { fifa: "FIFA 21", tournament: "Champions League" },
    { fifa: "FIFA 21", tournament: "Champions League" },
    { fifa: "FIFA 21", tournament: "Champions League" },
    { fifa: "FIFA 22", tournament: "Champions League" },
    { fifa: "FIFA 22", tournament: "Champions League" }
  ],
  mancity: [
    { fifa: "FIFA 21", tournament: "Champions League" }
  ],
  real: [
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "SuperCup" }
  ],
  switzerland: [
    { fifa: "FIFA 21", tournament: "World Cup" },
    { fifa: "FIFA 21", tournament: "World Cup" },
    { fifa: "FIFA 21", tournament: "EURO" }
  ],
  portugal: [
    { fifa: "FIFA 21", tournament: "World Cup" },
    { fifa: "FIFA 24", tournament: "EURO" },
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  wales: [
    { fifa: "FIFA 22", tournament: "World Cup" },
    { fifa: "FIFA 22", tournament: "EURO" }
  ],
  japan: [
    { fifa: "FIFA 23", tournament: "World Cup" }
  ],
  england: [
    { fifa: "FIFA 23", tournament: "World Cup" },
    { fifa: "FIFA 23", tournament: "EURO" },
    { fifa: "FIFA 24", tournament: "EURO" },
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  spain: [
    { fifa: "FIFA 21", tournament: "EURO" },
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  netherlands: [
    { fifa: "FIFA 22", tournament: "EURO" }
  ],
  norway: [
    { fifa: "FIFA 24", tournament: "EURO" },
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  belgium: [
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  italy: [
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  france: [
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  croatia: [
    { fifa: "FIFA 24", tournament: "EURO" }
  ],
  austria: [
    { fifa: "FIFA 24", tournament: "EURO" }
  ]
};

const teamDataMaks = {
  valencia: [
    { fifa: "FIFA 20", tournament: "Champions League" },
    { fifa: "FIFA 20", tournament: "Champions League" }
  ],
  milan: [
    { fifa: "FIFA 22", tournament: "Champions League" },
    { fifa: "FIFA 22", tournament: "Champions League" }
  ],
  psg: [
    { fifa: "FIFA 22", tournament: "Champions League" },
    { fifa: "FIFA 22", tournament: "Champions League" }
  ],
  ajax: [
    { fifa: "FIFA 22", tournament: "Champions League" }
  ],
  barcelona: [
    { fifa: "FIFA 22", tournament: "Champions League" }
  ],
  real: [
    { fifa: "FIFA 21", tournament: "Champions League" },
    { fifa: "FIFA 24", tournament: "Champions League" }
  ],
  liverpool: [
    { fifa: "FIFA 21", tournament: "Champions League" }
  ],
  benfica: [
    { fifa: "FIFA 20", tournament: "Champions League" }
  ],
  bayern: [
    { fifa: "FIFA 22", tournament: "Champions League" }
  ],
  galatasaray: [
    { fifa: "FIFA 23", tournament: "Champions League" }
  ],
  scotland: [
    { fifa: "FIFA 23", tournament: "World Cup" }
  ],
  france: [
    { fifa: "FIFA 21", tournament: "World Cup" }
  ],
  netherlands: [
    { fifa: "FIFA 21", tournament: "EURO" },
    { fifa: "FIFA 24", tournament: "EURO" },
    { fifa: "FIFA 24", tournament: "EURO" }
  ]
};



const teamTiles = document.querySelectorAll(".team-tile");
const detailView = document.getElementById("team-detail-view");
const teamName = document.getElementById("team-name");
const teamHistory = document.getElementById("team-history");
const backButton = document.querySelector(".back-button");

// Показ статистики при клике на плитку
teamTiles.forEach(tile => {
  tile.addEventListener("click", () => {
    const team = tile.dataset.team;

    // 1. Определяем активного игрока
    const activePlayerId = document.querySelector(".player-button.active").id;
    const playerKey = activePlayerId === "andreyBtn" ? "andrey" : "maks";

    // 2. Выбираем нужный объект данных
    const data = playerKey === "andrey" ? teamDataAndrey[team] : teamDataMaks[team];

    if (!data) return;

    teamName.textContent = tile.querySelector("p").textContent;

    // Удаляем предыдущую эмблему, если есть
    const existingLogo = document.querySelector("#team-detail-view img.team-logo");
    if (existingLogo) existingLogo.remove();

    // Клонируем и настраиваем новую эмблему
    const logoImg = tile.querySelector("img").cloneNode();
    logoImg.style.width = "100px";
    logoImg.style.margin = "20px auto";
    logoImg.style.filter = "drop-shadow(0 0 15px rgba(0,255,255,0.6))";
    logoImg.style.display = "block";
    logoImg.classList.add("team-logo");

    // Вставляем логотип перед историей
    teamHistory.parentElement.insertBefore(logoImg, teamHistory);

    // 3. Чистим и заполняем историю команды
    teamHistory.innerHTML = "";
    teamHistory.innerHTML = ""; // очищаем перед вставкой новых

// ОЧИЩАЕМ
teamHistory.innerHTML = "";

// СОЗДАЕМ КОНТЕЙНЕР С ПЛИТКАМИ
const entryContainer = document.createElement("div");
entryContainer.className = "team-history-container";

// КОНФИГ ЦВЕТОВ И СОКРАЩЕНИЙ
const fifaColors = {
  'FIFA 19': '#6D4C41',
  'FIFA 20': '#2E7D32',
  'FIFA 21': '#7B1FA2',
  'FIFA 22': '#0288D1',
  'FIFA 23': '#C62828',
  'FIFA 24': '#EF6C00'
};

const tournamentColors = {
  'Champions League': '#6a1b9a',
  'EURO': '#d32f2f',
  'World Cup': '#fbc02d',
  'SuperCup': '#9e9e9e'
};

const tournamentAbbreviations = {
  'Champions League': 'UCL',
  'EURO': 'EURO',
  'World Cup': 'WC',
  'SuperCup': 'SC'
};

// РЕНДЕР КАЖДОГО ТРОФЕЯ
data.forEach(entry => {
  const badge = document.createElement("div");
  badge.className = "badge";

  const fifaSpan = document.createElement("span");
  fifaSpan.className = "fifa-badge";
  fifaSpan.style.backgroundColor = fifaColors[entry.fifa] || "#444";
  fifaSpan.textContent = entry.fifa;

  const tournamentSpan = document.createElement("span");
  tournamentSpan.className = "tournament-badge";
  tournamentSpan.style.backgroundColor = tournamentColors[entry.tournament] || "#666";
  tournamentSpan.textContent = tournamentAbbreviations[entry.tournament] || entry.tournament;

  badge.appendChild(fifaSpan);
  badge.appendChild(tournamentSpan);
  entryContainer.appendChild(badge);
});

// ДОБАВЛЯЕМ В БЛОК
teamHistory.appendChild(entryContainer);

    
    

    // Скрываем оба блока статистики
    document.getElementById("andrey-stats").style.display = "none";
    document.getElementById("maks-stats").style.display = "none";

    // Показываем страницу команды
    detailView.style.display = "block";
  });
});



// Кнопка Назад
backButton.addEventListener("click", () => {
  detailView.style.display = "none";

  const activePlayerBtn = document.querySelector(".player-button.active");
  const activePlayer = activePlayerBtn ? activePlayerBtn.id : null;

  if (activePlayer === "maksBtn") {
    document.getElementById("maks-stats").style.display = "block";
  } else {
    document.getElementById("andrey-stats").style.display = "block";
  }
});

const facts = [
  "Уникальных команд: 20",
  "Уникальных стран: 13",
  "Сезонов FIFA: 6",
  "Команд с 1 трофеем: 6",
  "Команд с 3+ трофеями: 6",
  "Трофеев за клубы: 32"
];

let factIndex = 0;
const quoteEl = document.getElementById("quote-text");

function showNextFact() {
  quoteEl.style.opacity = 0;

  setTimeout(() => {
    quoteEl.textContent = facts[factIndex];
    quoteEl.style.opacity = 1;
    factIndex = (factIndex + 1) % facts.length;
  }, 500);
}

setInterval(showNextFact, 4000); // каждые 4 сек

showNextFact(); // запуск сразу

const factsMaks = [
  "Уникальных команд: 13",
  "Уникальных стран: 8",
  "Сезонов FIFA: 5",
  "Команд с 1 трофеем: 10",
  "Команд с 3+ трофеями: 1",
  "Трофеев за клубы: 16"
];


let factIndexMaks = 0;
const quoteMaks = document.getElementById("quote-text-maks");

function showNextFactMaks() {
  quoteMaks.style.opacity = 0;
  setTimeout(() => {
    quoteMaks.textContent = factsMaks[factIndexMaks];
    quoteMaks.style.opacity = 1;
    factIndexMaks = (factIndexMaks + 1) % factsMaks.length;
  }, 600);
}

setInterval(showNextFactMaks, 3500);
showNextFactMaks();

const draftCategories = {
  random: ["Real Madrid", "Barcelona", "PSG", "Japan", "Norway", "Benfica", "Lokomotiv", "Liverpool", "Galatasaray"],
  middle: ["Japan", "Norway", "Belgium", "Switzerland", "Galatasaray"],
  high: ["Liverpool", "Inter", "Ajax", "Benfica", "Atletico", "Leipzig"],
  top: ["PSG", "Chelsea", "Barcelona", "Arsenal", "Napoli"],
  legendary: ["Real Madrid", "Bayern", "AC Milan", "Manchester United", "Brazil", "France"]
};

document.getElementById("spin-button").addEventListener("click", async () => {

  const spinAudio = document.getElementById("spin-sound");
if (spinAudio) {
  try {
    spinAudio.currentTime = 0;
    await spinAudio.play();
  } catch (err) {
    console.warn("Звук не воспроизвёлся:", err);
  }
}

  
  
  const slots = document.querySelectorAll(".slot");

  // Обнуляем все слоты
  slots.forEach(slot => {
    slot.textContent = "—";
    slot.classList.remove("spin");
  });

  let usedTeams = [];

  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const category = slot.dataset.category;
  
    // Копируем список команд этой категории
    let availableTeams = [...draftCategories[category]];
  
    // Исключаем уже выпавшие команды
    availableTeams = availableTeams.filter(team => !usedTeams.includes(team));
  
    // Специально: если это НЕ random — удалим команду, выпавшую в random позже
    if (i === 0 && category === "random") {
      // Просто крутим Random пока
    } else {
      // Если вдруг после фильтра ничего не осталось
      if (availableTeams.length === 0) {
        slot.textContent = "⚠️ No teams";
        continue;
      }
    }
  
    // Анимация
    slot.classList.add("spin");
    slot.textContent = "⏳";
  
    await new Promise(resolve => setTimeout(resolve, 3000));
  
    // Остановка
    slot.classList.remove("spin");
  
    const team = availableTeams[Math.floor(Math.random() * availableTeams.length)];
    slot.textContent = team;
  
    // Добавляем в список использованных
    usedTeams.push(team);
  
    // Если это random — удаляем её из всех остальных категорий
    if (category === "random") {
      Object.keys(draftCategories).forEach(cat => {
        if (cat !== "random") {
          draftCategories[cat] = draftCategories[cat].filter(t => t !== team);
        }
      });
    }
  }
  document.getElementById("draft-round-label").textContent = "Round 1";

  createRound2Button();

});


function createRound2Button() {
  if (document.getElementById("to-round-2")) return;

  const round2Btn = document.createElement("button");
  round2Btn.id = "to-round-2";
  round2Btn.textContent = "➡️ 2 Round";
  round2Btn.style.marginTop = "30px";
  round2Btn.className = "action-button";


  document.getElementById("draft-stage-1").appendChild(round2Btn);

  round2Btn.addEventListener("click", () => {
    document.getElementById("draft-stage-1").classList.add("hidden");
    const stage2 = document.getElementById("draft-stage-2");
    stage2.classList.remove("hidden");

    const effect = document.getElementById("generation-effect");
    const cards = document.getElementById("card-choice");
    cards.classList.add("hidden");
    document.getElementById("draft-round-label").textContent = "Round 2 - Cards";


    setTimeout(() => {
      effect.classList.add("hidden");
      cards.classList.remove("hidden");
      document.getElementById("card-container").classList.add("visible");


      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      

      const selectedTeams = Array.from(document.querySelectorAll(".slot")).map(slot => slot.textContent);
      shuffleArray(selectedTeams);

      const container = document.getElementById("card-container");
      container.innerHTML = "";

      selectedTeams.forEach(team => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.team = team;
        card.textContent = "❓";


        card.addEventListener("click", () => {
          // если уже выбрали 3, не даём больше кликать
  // если уже выбрали 2 — не даём больше выбирать
const selected = document.querySelectorAll(".card.selected");
if (selected.length >= 2 || card.classList.contains("selected")) return;

// отмечаем карту как выбранную
card.classList.add("selected");

// если выбрано 2 — показываем остальных как выбывших
const updatedSelected = document.querySelectorAll(".card.selected");
if (updatedSelected.length === 2) {
  // раскрываем ВСЕ карточки
  document.querySelectorAll(".card").forEach(c => {
    c.textContent = c.dataset.team;
    if (!c.classList.contains("selected")) {
      c.classList.add("eliminated");
    }
    c.style.pointerEvents = "none"; // отключаем клик
  });

  // показываем кнопку 3 раунда
  document.getElementById("to-round-3").classList.remove("hidden");
        
            // отключаем все клики по карточкам
            document.querySelectorAll(".card").forEach(c => {
              c.style.pointerEvents = "none";
            });
          }
        });
        

        container.appendChild(card);
      });
    }, 5000);
  });
}

document.getElementById("to-round-3").addEventListener("click", () => {
  document.getElementById("draft-round-label").textContent = "Round 3 - Case";

  document.getElementById("draft-stage-2").classList.add("hidden");
  document.getElementById("draft-stage-3").classList.remove("hidden");

  const tileWidth = 156;
  const totalTiles = 500;
  
  const remaining = Array.from(document.querySelectorAll(".card"))
    .filter(c => !c.classList.contains("eliminated"))
    .map(c => c.dataset.team);
  
  const caseStrip = document.getElementById("case-strip");
  caseStrip.innerHTML = "";
  
  // 1. Генерация массива из 50 случайных команд
  const tiles = [];
  for (let i = 0; i < totalTiles; i++) {
    const team = remaining[Math.floor(Math.random() * remaining.length)];
    const tile = document.createElement("div");
    tile.className = "case-tile";
    tile.textContent = team;
    tile.dataset.team = team;
    tiles.push(tile);
    caseStrip.appendChild(tile);
  }
  
  // 2. Стартуем с 0, едем на расстояние всей ленты
  const totalDistance = tileWidth * totalTiles;
  caseStrip.style.transform = `translateX(0px)`;
  window.caseStartOffset = 0;
  window.caseFinalOffset = totalDistance;
  

});

document.getElementById("open-case-button").addEventListener("click", () => {
  startCaseSpin({
    containerId: "case-container",
    stripId: "case-strip",
    tileWidth: 156,
    onWin: (winnerName) => {
      document.getElementById("case-winner-name").textContent = winnerName;
      document.getElementById("case-winner").classList.remove("hidden");
    }
  });
});

document.getElementById("restart-button").addEventListener("click", () => {
  // Скрываем все этапы
  document.getElementById("draft-stage-1").classList.remove("hidden");
  document.getElementById("draft-stage-2").classList.add("hidden");
  document.getElementById("draft-stage-3").classList.add("hidden");

  document.getElementById("draft-round-label").textContent = "Round 1 - Draft";

  document.querySelectorAll(".slot").forEach(slot => {
    slot.textContent = "—";
  });

  document.getElementById("case-strip").innerHTML = "";
  document.getElementById("case-winner").classList.add("hidden");
  document.getElementById("to-round-3").classList.add("hidden");

  document.getElementById("card-container").innerHTML = "";
  document.getElementById("generation-effect").classList.remove("hidden");

  // ⛔️ Принудительно скрываем мини-игру!
  document.getElementById("reroll-game").classList.add("hidden");

  // ⛔️ Сбросим все клики с плиток mini-игры
  const rerollTiles = document.querySelectorAll(".reroll-tile");
  rerollTiles.forEach(tile => tile.onclick = null);

  // Общий ресет
  resetRerollGame();
});














