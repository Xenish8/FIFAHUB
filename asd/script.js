document.addEventListener("DOMContentLoaded", () => {
  // Важные элементы
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
      }
    });
  });
  

  // Вкладка STATISTICS
  statTab.addEventListener("click", () => {
    statTab.classList.add("active");
    trophyTab.classList.remove("active");
  
    trophyContainer.style.display = "none";
    statsContainer.style.display = "block";
  
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

    trophyContainer.style.display = "block";
    statsContainer.style.display = "none";

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


