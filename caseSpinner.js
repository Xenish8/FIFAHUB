export function startCaseSpin({
  containerId,
  stripId,
  tileWidth = 156,
  draftCategories,  // <-- ДОБАВИЛИ
  onWin = () => {}
}) {

    const container = document.getElementById(containerId);
    const strip = document.getElementById(stripId);
    const screenWidth = container.offsetWidth;
  
    // Получаем оставшиеся команды прямо здесь
    const remaining = Array.from(document.querySelectorAll(".card"))
      .filter(c => !c.classList.contains("eliminated"))
      .map(c => c.dataset.team);
  
    // Генерация новых плиток каждый раз
    const totalTiles = 150;
    strip.innerHTML = "";
  
    for (let i = 0; i < totalTiles; i++) {
      const teamName = remaining[Math.floor(Math.random() * remaining.length)];
      const tile = document.createElement("div");
      tile.className = "case-tile";
    
      const teamObj = Object.values(draftCategories).flat().find(t => t.name === teamName);
    
      if (teamObj && teamObj.logo) {
        tile.innerHTML = `
          <img src="assets/${teamObj.logo}" alt="${teamObj.name}" class="team-logo">
          <span class="team-name">${teamObj.name}</span>
        `;
        tile.dataset.team = teamObj.name;
      } else {
        tile.textContent = teamName || "❓";
        tile.dataset.team = teamName || "Unknown";
      }
    
      strip.appendChild(tile);
    }
    
  
  // 🎲 Рандомный микросдвиг (сдвиг вперёд до 1 плитки)
  const initialOffset = Math.random() * tileWidth;
  strip.style.transform = `translateX(-${initialOffset}px)`;
    
    let current = initialOffset;
    let velocity = 0;
    let timeElapsed = 0;
    let phase = "acceleration";
    const intervalTime = 16;
  
    const interval = setInterval(() => {
      timeElapsed += intervalTime;
  
      if (phase === "acceleration") {
        velocity += 0.15;
        if (timeElapsed >= 3000) {
          phase = "constant";
          timeElapsed = 0;
        }
      } else if (phase === "constant") {
        if (timeElapsed >= 7000) {
          phase = "deceleration";
          timeElapsed = 0;
        }
      } else if (phase === "deceleration") {
        velocity *= 0.985;
        if (velocity < 0.4) {
            clearInterval(interval);
            strip.style.transform = `translateX(-${current}px)`;
            
            // ⏳ даём 150 мс на отрисовку, потом определяем победителя
            setTimeout(() => {
                // ⏳ ЖДЁМ еще кадр после отрисовки
                requestAnimationFrame(() => {
                  const centerX = container.getBoundingClientRect().left + screenWidth / 2;
              
                  let closestTile = null;
                  let closestDistance = Infinity;
              
                  Array.from(strip.children).forEach(tile => {
                    const rect = tile.getBoundingClientRect();
                    const tileCenter = rect.left + rect.width / 2;
                    const distance = Math.abs(centerX - tileCenter);
              
                    if (distance < closestDistance) {
                      closestDistance = distance;
                      closestTile = tile;
                    }
                  });
              
                  const winnerName = closestTile?.dataset.team || closestTile?.textContent || "Ошибка";
                  onWin(winnerName);

                  // Сброс и подготовка мини-игры к показу
document.getElementById("reroll-game").classList.remove("hidden");
document.getElementById("reroll-final-message").textContent = "";
document.getElementById("reroll-tiles").innerHTML = "";
document.getElementById("reroll-start").disabled = true;
document.getElementById("reroll-shuffle").disabled = false;

                  
                  if (closestTile) {
                    closestTile.classList.add("winner"); 
                  }
                  
                  document.getElementById("reroll-game").classList.remove("hidden");
document.getElementById("reroll-final-message").textContent = "";

const tileContainer = document.getElementById("reroll-tiles");
const startBtn = document.getElementById("reroll-start");
const shuffleBtn = document.getElementById("reroll-shuffle");

let tileValues = [];

function generateTiles() {
  tileValues = ["fail", "fail", "fail", "fail", "fail", "fail", "fail", "fail", "reroll", "reroll-plus"];
  tileValues.sort(() => Math.random() - 0.5);
  tileContainer.innerHTML = "";

  tileValues.forEach(() => {
    const tile = document.createElement("div");
    tile.className = "reroll-tile";
    tileContainer.appendChild(tile);
  });
}

generateTiles();

shuffleBtn.onclick = () => {
  shuffleBtn.disabled = true;
  startBtn.disabled = false;

  tileValues.sort(() => Math.random() - 0.5);

  tileContainer.querySelectorAll(".reroll-tile").forEach((tile, index) => {
    tile.dataset.value = tileValues[index];
    tile.textContent = "❓";
    tile.classList.remove("revealed", "fail", "reroll", "reroll-plus");
    tile.style.cursor = "not-allowed";
  });
};

startBtn.onclick = () => {
  startBtn.disabled = true;

  tileContainer.querySelectorAll(".reroll-tile").forEach(tile => {
    tile.style.cursor = "pointer";
    tile.onclick = () => {
      if (tile.classList.contains("revealed")) return;
    
      const value = tile.dataset.value;
      tile.classList.add("revealed", value);
      tile.textContent =
        value === "fail" ? "FAIL 😢" :
        value === "reroll" ? "REROLL ✅" :
        "REROLL+ 🔥";
    
      // Отключаем все клики
      tileContainer.querySelectorAll(".reroll-tile").forEach(t => (t.onclick = null));
    
      // 💥 ВСКРЫВАЕМ все остальные плитки
      tileContainer.querySelectorAll(".reroll-tile").forEach(t => {
        if (t === tile) return; // уже вскрыта
    
        const val = t.dataset.value;
        t.textContent =
          val === "fail" ? "FAIL 😢" :
          val === "reroll" ? "REROLL ✅" :
          "REROLL+ 🔥";
    
        t.classList.add("revealed", "disabled");
        t.style.opacity = "0.4"; // серый эффект
        t.style.filter = "grayscale(1)";
      });
    
      // сообщение
      if (value === "fail") {
        finalMsg.textContent = "Увы! Второй шанс не выпал.";
        finalMsg.style.color = "#ff4444";
      } else {
        finalMsg.textContent = "🔥 Поздравляем! Ты получил шанс переиграть драфт!";
        finalMsg.style.color = "#00ff88";
        setTimeout(() => {
          document.getElementById("restart-button").click();
        }, 2000);
      }
    };
    
  });
};


                  
                });
              }, 780);
              
            
        }
      }
  
      current += velocity;
      strip.style.transform = `translateX(-${current}px)`;
    }, intervalTime);
  }

  
  