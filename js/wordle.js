async function isValidWord(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    return response.ok;
  } catch (error) {
    console.error("Error checking word:", error);
    return false;
  }
}

function getWordOfTheDay() {
  const words = [
    "SPEAK",
    "DREAM",
    "CLOUD",
    "LIGHT",
    "BRAIN",
    "GUARD",
    "SHARP",
    "POWER",
    "SHINE",
    "HEART",
  ];
  return words[Math.floor(Math.random() * words.length)];
}

class Wordle {
  constructor() {
    this.initializeStats();
    this.startNewGame();

    // this.initializeBoard();
    this.initializeKeyboard();
  }

  initializeStats() {
    // Load stats from localStorage or set defaults
    const savedStats = JSON.parse(localStorage.getItem("wordleStats")) || {
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      maxStreak: 0,
    };
    this.stats = savedStats;
  }

  saveStats() {
    localStorage.setItem("wordleStats", JSON.stringify(this.stats));
  }

  startNewGame() {
    this.wordOfTheDay = getWordOfTheDay();
    this.currentRow = 0;
    this.currentTile = 0;
    this.gameOver = false;
    this.guesses = [];

    // Clear the grid
    const grid = document.querySelector(".grid");
    grid.innerHTML = "";
    this.initializeBoard();

    // Reset keyboard
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      key.classList.remove("correct", "present", "absent");
    });
  }

  updateStats(won) {
    this.stats.gamesPlayed++;
    if (won) {
      this.stats.gamesWon++;
      this.stats.currentStreak++;
      this.stats.maxStreak = Math.max(
        this.stats.maxStreak,
        this.stats.currentStreak
      );
    } else {
      this.stats.currentStreak = 0;
    }
    this.saveStats();
  }

  showGameEndScreen(won) {
    const gameEndPopup = document.querySelector(".game-end-popup");
    const resultTitle = gameEndPopup.querySelector(".result-title");
    const wordReveal = gameEndPopup.querySelector(".word-reveal");

    // Update title based on game result
    resultTitle.textContent = won ? "Magnificent!" : "Game Over";

    // Show the word
    wordReveal.textContent = `The word was: ${this.wordOfTheDay}`;

    // Update statistics
    this.updateStats(won);

    // Display stats
    gameEndPopup.querySelector(".played").textContent = this.stats.gamesPlayed;
    gameEndPopup.querySelector(".win-percentage").textContent =
      Math.round((this.stats.gamesWon / this.stats.gamesPlayed) * 100) || 0;
    gameEndPopup.querySelector(".current-streak").textContent =
      this.stats.currentStreak;
    gameEndPopup.querySelector(".max-streak").textContent =
      this.stats.maxStreak;

    // Show the popup
    gameEndPopup.style.display = "block";
    document.querySelector(".popup-overlay").style.display = "block";
  }

  initializeBoard() {
    const grid = document.querySelector(".grid");
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("div");
      row.className = "row";
      for (let j = 0; j < 5; j++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        row.appendChild(tile);
      }
      grid.appendChild(row);
    }
  }

  initializeKeyboard() {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      key.addEventListener("click", () => this.handleKeyPress(key.textContent));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.handleSubmit();
      } else if (e.key === "Backspace") {
        this.handleDelete();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        this.handleKeyPress(e.key);
      }
    });
  }

  async handleSubmit() {
    if (this.gameOver) return;
    if (this.currentTile !== 5) {
      this.showMessage("Not enough letters");
      return;
    }

    const row = document.querySelectorAll(".row")[this.currentRow];
    const tiles = row.querySelectorAll(".tile");
    const guess = Array.from(tiles)
      .map((tile) => tile.textContent)
      .join("")
      .toLowerCase();

    const isValid = await isValidWord(guess);
    if (!isValid) {
      this.showMessage("Not a valid word");
      return;
    }

    this.checkGuess(guess, tiles);
    this.guesses.push(guess);
    this.currentRow++;
    this.currentTile = 0;

    if (guess === this.wordOfTheDay.toLowerCase()) {
      this.gameOver = true;
      this.showGameEndScreen(true);
    } else if (this.currentRow === 6) {
      this.gameOver = true;
      this.showGameEndScreen(false);
    }
  }

  handleDelete() {
    if (this.currentTile > 0) {
      this.currentTile--;
      const row = document.querySelectorAll(".row")[this.currentRow];
      const tile = row.querySelectorAll(".tile")[this.currentTile];
      tile.textContent = "";
    }
  }

  handleKeyPress(key) {
    if (this.gameOver) return;
    if (this.currentTile < 5) {
      const row = document.querySelectorAll(".row")[this.currentRow];
      const tile = row.querySelectorAll(".tile")[this.currentTile];
      tile.textContent = key.toUpperCase();
      this.currentTile++;
    }
  }

  checkGuess(guess, tiles) {
    const wordArray = this.wordOfTheDay.toLowerCase().split("");
    const guessArray = guess.split("");
    const keyboardKeys = document.querySelectorAll(".key");

    guessArray.forEach((letter, index) => {
      const tile = tiles[index];
      const keyboardKey = Array.from(keyboardKeys).find(
        (key) => key.textContent.toLowerCase() === letter
      );

      if (letter === wordArray[index]) {
        tile.classList.add("correct");
        keyboardKey?.classList.add("correct");
      } else if (wordArray.includes(letter)) {
        tile.classList.add("present");
        if (!keyboardKey?.classList.contains("correct")) {
          keyboardKey?.classList.add("present");
        }
      } else {
        tile.classList.add("absent");
        keyboardKey?.classList.add("absent");
      }
    });
  }

  showMessage(message) {
    const messageElement = document.querySelector(".message");
    messageElement.textContent = message;
    messageElement.style.display = "block";
    setTimeout(() => {
      messageElement.style.display = "none";
    }, 2000);
  }
}

document.querySelector(".help-button").addEventListener("click", () => {
  document.querySelector(".popup").style.display = "block";
  document.querySelector(".popup-overlay").style.display = "block";
});

document.querySelector(".popup-overlay").addEventListener("click", () => {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".popup-overlay").style.display = "none";
});
document.querySelector(".close-button").addEventListener("click", () => {
  document.querySelector(".popup").style.display = "none";
  document.querySelector(".popup-overlay").style.display = "none";
});
document.querySelector(".play-again").addEventListener("click", () => {
  document.querySelector(".game-end-popup").style.display = "none";
  document.querySelector(".popup-overlay").style.display = "none";
  game.startNewGame();
});

const game = new Wordle();

class ThemeManager {
  constructor() {
    this.initializeTheme();
    this.setupEventListeners();
  }

  initializeTheme() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // Use saved theme if it exists
      this.setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      this.setTheme(prefersDark ? "dark" : "light");
    }
  }

  setupEventListeners() {
    // Listen for theme toggle button clicks
    const themeButton = document.querySelector(".theme-button");
    themeButton.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      this.setTheme(newTheme);
    });

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          // Only auto-switch if user hasn't manually set a theme
          this.setTheme(e.matches ? "dark" : "light");
        }
      });
  }

  setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }
}

new ThemeManager();
