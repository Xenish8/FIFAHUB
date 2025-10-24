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


  const infoAccordions = document.querySelectorAll(".info-accordion-header");

  infoAccordions.forEach(header => {
    header.addEventListener("click", () => {
      const body = header.nextElementSibling;

      // Сначала закрываем все
      document.querySelectorAll(".info-accordion-body").forEach(b => {
        if (b !== body) {
          b.style.maxHeight = null;
        }
      });

      // Открываем или закрываем выбранный
      if (body.style.maxHeight) {
        body.style.maxHeight = null;
      } else {
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  // 🔥 Заполняем списки
  const fillTeamList = (id, teams) => {
    const container = document.getElementById(id);
    teams.forEach(team => {
      const tile = document.createElement("div");
      tile.className = "team-tile-info";
  
      const logo = document.createElement("img");
      logo.src = `assets/${team.logo}`;
      logo.alt = team.name;
  
      const name = document.createElement("span");
      name.textContent = team.name;
  
      tile.appendChild(logo);
      tile.appendChild(name);
      container.appendChild(tile);
    });
  };
  

  fillTeamList("random-list", draftCategories.random);
  fillTeamList("middle-list", draftCategories.middle);
  fillTeamList("high-list", draftCategories.high);
  fillTeamList("top-list", draftCategories.top);
  fillTeamList("legendary-list", draftCategories.legendary);

  
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

  const infoTab = document.getElementById("infoTab");
const infoContainer = document.getElementById("info-container");

infoTab.addEventListener("click", () => {
  infoTab.classList.add("active");
  draftTab.classList.remove("active");
  trophyTab.classList.remove("active");
  statTab.classList.remove("active");

  draftContainer.style.display = "none";
  trophyContainer.style.display = "none";
  statsContainer.style.display = "none";
  infoContainer.style.display = "block";

  andreyStats.style.display = "none";
  maksStats.style.display = "none";

  // Скрываем аккордеоны
  bodies.forEach(body => {
    body.parentElement.style.display = "none";
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
        infoContainer.style.display = "none";

  
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
    infoContainer.style.display = "none";

  
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
    infoContainer.style.display = "none";


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
    infoContainer.style.display = "none";


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
  atbilbao: [
    { fifa: "FIFA 25", tournament: "Champions League" }
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
  nottingham: [
    { fifa: "FIFA 25", tournament: "Champions League" }
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
  'FIFA 24': '#EF6C00',
  'FIFA 25': '#D814A7'
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
  random: [
    { name: "Southampton", logo: "southampton.png" },
    { name: "Udinese", logo: "udinese.png" },
    { name: "Venezia", logo: "venezia.png" },
    { name: "Rangers", logo: "rangers.png" },
    { name: "Dynamo Zagreb", logo: "dynamo-zagreb.png" },
    { name: "Dynamo Kiev", logo: "dynamo-kiev.png" },
    { name: "Ferencvárosi", logo: "ferencvarosh.png" },
    { name: "Panathinaikos", logo: "panathinaikos.png" },
    { name: "PAOK", logo: "paok.png" },
    { name: "Shahtar", logo: "shahtar.png" },
    { name: "Sparta Praga", logo: "sparta-praga.png" },
    { name: "Slavia Praga", logo: "slavia-praga.png" },
    { name: "Victoria Plzen", logo: "victoria-plzen.png" },
    { name: "Salzburg", logo: "salzburg.png" },
    { name: "Brugge", logo: "brugge.png" },
    { name: "Antwerp", logo: "antwerp.png" },
    { name: "Anderlecht", logo: "anderlecht.png" },
    { name: "Copenhagen", logo: "copenhagen.png" },
    { name: "Braga", logo: "braga.png" },
    { name: "Steaua B.", logo: "steaua-b.png" }
  ],
  middle: [
    { name: "Monaco", logo: "monaco.png" },
    { name: "Lille", logo: "lille.png" },
    { name: "OGC Nice", logo: "nice.png" },
    { name: "Lyon", logo: "lion.png" },
    { name: "O. Marselle", logo: "o-marselle.png" },
    { name: "Bournemouth", logo: "bournemouth.png" },
    { name: "Brentford", logo: "brentford.png" },
    { name: "Brighton", logo: "brighton.png" },
    { name: "Crystal Palace", logo: "crystal-palace.png" },
    { name: "Everton", logo: "everton.png" },
    { name: "Fulham", logo: "fulham.png" },
    { name: "Leicester", logo: "leicester.png" },
    { name: "Nottingham F.", logo: "nottingham-f.png" },
    { name: "Westham Utd.", logo: "westham-utd.png" },
    { name: "Wolwes", logo: "wolwes.png" },
    { name: "Frankfurt", logo: "frankfurt.png" },
    { name: "Gladbach", logo: "gladbach.png" },
    { name: "Werder", logo: "werder.png" },
    { name: "Stuttgart", logo: "stuttgart.png" },
    { name: "Hoffenheim", logo: "hoffenheim.png" },
    { name: "Lens", logo: "lens.png" }
  ],
  high: [
    { name: "Wolfsburg", logo: "wolfsburg.png" },
    { name: "Bologna", logo: "bologna.png" },
    { name: "Fiorentina", logo: "fiorentina.png" },
    { name: "Torino", logo: "torino.png" },
    { name: "Ajax", logo: "ajax.png" },
    { name: "Feyenoord", logo: "feyenoord.png" },
    { name: "PSV", logo: "psv.png" },
    { name: "Porto", logo: "porto.png" },
    { name: "Celtic", logo: "celtic.png" },
    { name: "Osasuna", logo: "osasuna.png" },
    { name: "Celta", logo: "celta.png" },
    { name: "Girona", logo: "girona.png" },
    { name: "Betis", logo: "betis.png" },
    { name: "Real Sociedad", logo: "real-sociedad.png" },
    { name: "Mallorca", logo: "mallorca.png" },
    { name: "Valencia", logo: "valencia.png" },
    { name: "Villareal", logo: "villareal.png" },
    { name: "Sevilla", logo: "sevilla.png" },
    { name: "Trabzonspor", logo: "trabzonspor.png" },
    { name: "AEK", logo: "aek.png" },
    { name: "Besiktas", logo: "besiktas.png" },
    { name: "Olympiacos", logo: "olympiacos.png" }
  ],
  top: [
    { name: "SPURS", logo: "spurs.png" },
    { name: "Aston Villa", logo: "aston-villa.png" },
    { name: "Chelsea", logo: "chelsea.png" },
    { name: "Man. Utd", logo: "man-utd.png" },
    { name: "Newcastle", logo: "newcastle.png" },
    { name: "BVB", logo: "bvb.png" },
    { name: "Leipzig", logo: "leipzig.png" },
    { name: "Atalanta", logo: "atalanta.png" },
    { name: "Juventus", logo: "juventus.png" },
    { name: "Lazio", logo: "lazio.png" },
    { name: "Milan", logo: "milan.png" },
    { name: "Napoli", logo: "napoli.png" },
    { name: "Roma", logo: "roma.png" },
    { name: "Benfica", logo: "benfica.png" },
    { name: "AT. Bilbao", logo: "at-bilbao.png" },
    { name: "Sporting", logo: "sporting.png" },
    { name: "ATM", logo: "atm.png" },
    { name: "Fenerbahce", logo: "fenerbahce.png" },
    { name: "Galatasaray", logo: "galatasaray.png" }
  ],
  legendary: [
    { name: "Liverpool", logo: "liverpool.png" },
    { name: "Man. City", logo: "man-city.png" },
    { name: "Arsenal", logo: "arsenal.png" },
    { name: "PSG", logo: "psg.png" },
    { name: "Bayern", logo: "bayern.png" },
    { name: "Inter", logo: "inter.png" },
    { name: "Bayer", logo: "bayer.png" },
    { name: "Barca", logo: "barca.png" },
    { name: "Real Madrid", logo: "real-madrid.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" },
    { name: "Empty 😔", logo: "none.png" }
  ]
};


document.getElementById("spin-button").addEventListener("click", async () => {

  const spinButton = document.getElementById("spin-button");
  spinButton.disabled = true;



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

  // 🔥 ВАЖНО: один слот за другим!
  for (let i = 0; i < slots.length; i++) {
    const slot = slots[i];
    const category = slot.dataset.category;

    let availableTeams = [...draftCategories[category]];
    availableTeams = availableTeams.filter(team => !usedTeams.includes(team.name));

    if (availableTeams.length === 0) {
      slot.textContent = "⚠️ No teams";
      continue;
    }

    // Запускаем красивый обратный отсчёт
    await startCountdown(slot);

    // После обратного отсчета выбираем команду
    const team = availableTeams[Math.floor(Math.random() * availableTeams.length)];

    slot.innerHTML = `
    <img src="assets/${team.logo}" alt="${team.name}" class="team-logo team-logo-appear">
    <span class="team-name team-name-appear">${team.name}</span>
  `;
  
  

    usedTeams.push(team.name);
  }

  document.getElementById("draft-round-label").textContent = "Round 1 - Slots";
  createRound2Button();
});

// Функция обратного отсчёта
async function startCountdown(slot) {
  let countdown = 3;
  while (countdown > 0) {
    slot.innerHTML = `<span class="countdown-number countdown-${countdown}">${countdown}</span>`;
    await new Promise(resolve => setTimeout(resolve, 1000));
    countdown--;
  }
}




function createRound2Button() {
  if (document.getElementById("to-round-2")) return;

  const round2Btn = document.createElement("button");
  round2Btn.id = "to-round-2";
  document.getElementById("spin-button").style.display = "none";

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
      

      const selectedTeams = Array.from(document.querySelectorAll(".slot")).map(slot => {
        const teamName = slot.querySelector(".team-name")?.textContent || slot.textContent;
        return Object.values(draftCategories).flat().find(t => t.name === teamName);
      });
      
      shuffleArray(selectedTeams);

      const container = document.getElementById("card-container");
      container.innerHTML = "";

      selectedTeams.forEach(team => {
        const card = document.createElement("div");
        card.className = "card card-appear";
        
        card.dataset.team = team.name;
        card.innerHTML = `<span class="hidden-team">❓</span>`;
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
    const teamName = c.dataset.team;
    const teamData = Object.values(draftCategories).flat().find(t => t.name === teamName);
  
    if (teamData) {
      c.innerHTML = `
        <img src="assets/${teamData.logo}" alt="${teamData.name}" class="team-logo">
        <span class="team-name">${teamData.name}</span>
      `;
    } else {
      c.textContent = teamName;
    }
  
    if (!c.classList.contains("selected")) {
      c.classList.add("eliminated");
    }
  
    c.style.pointerEvents = "none";
  });
  

  // показываем кнопку 3 раунда
  document.getElementById("to-round-3").style.display = "inline-block";
        
            // отключаем все клики по карточкам
            document.querySelectorAll(".card").forEach(c => {
              c.style.pointerEvents = "none";
            });
          }
        });
        

        container.appendChild(card);
      });

      setTimeout(() => {
        document.querySelectorAll(".card").forEach(card => {
          card.classList.add("card-shuffle");
        });
      }, 500);

    }, 2000);
  });
}

document.getElementById("to-round-3").addEventListener("click", () => {

  document.getElementById("restart-button").disabled = true;


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
    const teamData = Object.values(draftCategories).flat().find(t => t.name === team) || { name: team, logo: "default.png" };

    tile.innerHTML = `
      <img src="assets/${teamData.logo}" alt="${teamData.name}" class="team-logo">
      <span class="team-name">${teamData.name}</span>
    `;
    
    tile.dataset.team = teamData.name;
    
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

  const openCaseButton = document.getElementById("open-case-button");
  openCaseButton.disabled = true;
  

  startCaseSpin({
    containerId: "case-container",
    stripId: "case-strip",
    tileWidth: 156,
    draftCategories, // <-- ДОБАВИЛИ
    onWin: (winnerName) => {
      const chance = dropChances[winnerName];
      const chanceText = chance ? ` (Drop Chance: ${chance["Drop Chance %"].toFixed(2)}%)` : "";
      document.getElementById("case-winner-name").textContent = `${winnerName}${chanceText}`;
      document.getElementById("case-winner").classList.remove("hidden");

      document.getElementById("restart-button").disabled = false;

    }
  });
  
});

document.getElementById("restart-button").addEventListener("click", () => {


  document.getElementById("open-case-button").disabled = false;

  document.getElementById("spin-button").disabled = false;


  // 1. Вернуть кнопку SPIN на нормальное место
const spinBtn = document.getElementById("spin-button");
const spinButtonContainer = document.querySelector(".slot-machine-container");
spinButtonContainer.appendChild(spinBtn);

spinBtn.style.display = "block"; // показываем кнопку красиво по центру
spinBtn.style.margin = "30px auto 0"; // центрируем её нормально



// 2. Удалить кнопку перехода ко 2-му раунду если она есть
const round2Btn = document.getElementById("to-round-2");
if (round2Btn) {
  round2Btn.remove();
}

  // Скрываем все этапы
  document.getElementById("draft-stage-1").classList.remove("hidden");
  document.getElementById("draft-stage-2").classList.add("hidden");
  document.getElementById("draft-stage-3").classList.add("hidden");

  document.getElementById("spin-button").style.display = "inline-block";


  document.getElementById("draft-round-label").textContent = "Round 1 - Draft";

  document.querySelectorAll(".slot").forEach(slot => {
    slot.textContent = "—";
  });

  document.getElementById("case-strip").innerHTML = "";
  document.getElementById("case-winner").classList.add("hidden");

  document.getElementById("to-round-3").style.display = "none";


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

let dropChances = {};

fetch("team_drop_chances.json")
  .then(res => res.json())
  .then(data => {
    dropChances = data;
  });













