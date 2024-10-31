const WORDS = [
  "APPLE",
  "BEACH",
  "BRAIN",
  "CLOUD",
  "DANCE",
  "EAGLE",
  "FLAME",
  "GHOST",
  "HEART",
  "JUICE",
  "LIGHT",
  "MUSIC",
  "PAINT",
  "QUICK",
  "RIVER",
  "SOUND",
  "STONE",
  "TIGER",
  "WATER",
  "WORLD",
  "CHAIR",
  "GRAPE",
  "PLANT",
  "HOUSE",
  "FLOOR",
  "CLOCK",
  "SHINE",
  "STORM",
  "PLANE",
  "TRACK",
  "GREEN",
  "FROST",
  "FIELD",
  "POWER",
  "BREAD",
  "WHITE",
  "BLACK",
  "NIGHT",
  "SHORE",
  "MOUSE",
  "LEMON",
  "PEACH",
  "SUGAR",
  "HONEY",
  "BERRY",
  "FAITH",
  "CRANE",
  "DRIVE",
  "BRAVE",
  "PEACE",
  "HUMOR",
  "GIANT",
  "CROWN",
  "BRUSH",
  "EARTH",
  "FIGHT",
  "LOVER",
  "GRASS",
  "CANDY",
  "BLAST",
  "SHAPE",
  "SIGHT",
  "BLISS",
  "SMILE",
  "JOLLY",
  "PEARL",
  "SHARK",
  "QUEEN",
  "ROBOT",
  "YOUTH",
  "CHESS",
  "KNIFE",
  "STAGE",
  "GLORY",
  "TASTE",
  "MOIST",
  "CREAM",
  "CHAOS",
  "CLEAN",
  "SHINY",
  "WINDY",
  "STEEL",
  "FRUIT",
  "PRIDE",
  "DEMON",
  "BLINK",
  "DRILL",
  "CABLE",
  "FIERY",
  "PULSE",
  "BLEND",
  "SILLY",
  "FRESH",
  "BRICK",
  "COAST",
  "VOICE",
  "ANGEL",
  "ALONE",
  "BLOOM",
  "WORRY",
  "DAISY",
  "CHILL",
  "CRISP",
  "GLARE",
  "MARCH",
  "TRACE",
  "PRIME",
  "FLOAT",
  "BEAST",
  "GRACE",
  "TOAST",
  "SHIFT",
  "ALERT",
  "BRISK",
  "CRAFT",
  "COZY",
  "SPARE",
  "RAPID",
  "FABLE",
  "BLAZE",
  "THINK",
  "PLAIN",
  "SPICE",
  "FLASH",
  "SWIFT",
  "SKILL",
  "SMALL",
  "QUIET",
  "HASTE",
  "SHADE",
  "CHAIR",
  "FINAL",
  "UNITY",
  "GROVE",
  "GRANT",
  "LIGHT",
  "NOBLE",
  "MIRTH",
  "TREND",
  "THORN",
  "FLOOD",
  "UNITY",
  "CLEAR",
  "BLEND",
  "SPLIT",
  "TRACE",
  "BRAVE",
  "GLINT",
  "CRAVE",
  "STEAD",
  "SHADE",
  "GLADE",
  "WORTH",
  "SHIFT",
  "CRUST",
  "GRAND",
  "STORM",
  "ALERT",
  "CLOVE",
  "SLICE",
  "GAUGE",
  "SHALE",
  "SPIKE",
  "CIDER",
  "CRISP",
  "SHAPE",
  "NORTH",
  "SOUTH",
  "VALUE",
  "PRIME",
  "SHOCK",
  "KNACK",
  "GLOSS",
  "GAZEY",
  "FANCY",
  "FLUTE",
  "CHALK",
  "BLOCK",
  "FRAME",
  "GLIDE",
  "CHAMP",
  "GLOOM",
  "GREET",
  "HONOR",
  "BRAVE",
  "SHINE",
  "CHURN",
  "TWIST",
  "CHARM",
  "CLOAK",
  "CRAFT",
  "BLINK",
  "RANCH",
  "BLURB",
  "GRIND",
  "PRIDE",
  "SPURT",
  "FLOUR",
  "FOCUS",
  "FORGE",
  "GRADE",
  "HEDGE",
  "LAYER",
  "LOVER",
  "MERGE",
  "MOVER",
  "NERVE",
  "PIVOT",
  "SCOUT",
  "SCOOP",
  "STAGE",
  "STAIR",
  "THROB",
  "WIDEN",
  "YEARN",
  "REACT",
  "SHAPE",
  "GLORY",
  "MOUNT",
  "PLANK",
  "SCOPE",
  "PRIZE",
  "TWEET",
  "VAPOR",
  "PRISM",
  "ALPHA",
  "AXIOM",
  "BEFIT",
  "CHIME",
  "CHASE",
  "FETCH",
  "FEAST",
  "GLARE",
  "GRAIN",
  "MERIT",
  "MORAL",
  "NOBLE",
  "ONSET",
  "SCENE",
  "SLEET",
  "TWINE",
  "WRING",
  "PRUNE",
  "GAZER",
  "FLICK",
  "SAVOR",
  "REACT",
  "CHASE",
  "PRONE",
  "BRISK",
  "DWELL",
  "FAITH",
  "FROTH",
  "JOVIA",
  "VIVID",
  "GLEAM",
  "GLEAM",
  "REACT",
  "SPLIT",
  "BRAND",
  "BLINK",
  "SPOIL",
  "THROB",
  "THUMB",
  "KNAVE",
  "RIVET",
  "SHIFT",
  "CLASP",
  "GLOVE",
  "TREAT",
  "THROW",
  "WATCH",
  "ZONAL",
  "REIGN",
  "SHONE",
  "CHUCK",
  "CHASE",
  "CURVE",
  "EXCEL",
  "DAILY",
  "GREET",
  "SHOUT",
  "GROWN",
  "SHOVE",
  "ROOST",
  "PRONE",
  "FLING",
  "SHOOT",
  "CLING",
  "SHOCK",
  "THINK",
  "CRISP",
  "SHAPE",
  "QUOTA",
  "FROWN",
  "WORST",
  "VIVID",
  "STAKE",
  "SHINE",
  "CRISP",
  "FLICK",
  "STARK",
  "PLUSH",
  "SHIFT",
  "STRAW",
  "STALL",
  "TWINE",
  "YACHT",
  "SHRUB",
  "THROB",
  "SPINE",
  "SPIKE",
  "SHAPE",
  "SPARK",
  "CHURN",
  "TWIST",
  "SMILE",
  "SHOUT",
  "PRONE",
  "BRISK",
  "BLEND",
  "CRISP",
  "SCOOP",
  "STINT",
  "FLASH",
  "STOMP",
  "SPLIT",
  "QUART",
  "GRASP",
  "TWICE",
  "SMALL",
  "STORM",
  "SHORE",
  "CLAMP",
  "ALIVE",
  "THORN",
  "CRISP",
  "SHIFT",
  "SPACE",
  "CRANK",
  "SCENE",
  "SHAPE",
  "GLIDE",
  "CLEAR",
  "UNITY",
  "BLISS",
  "THROB",
  "GLOBE",
  "STARE",
  "TREND",
  "FLAIR",
  "BLAZE",
  "BRINK",
  "PRIDE",
  "SCENT",
  "FROWN",
  "RUSTY",
  "CHAIR",
  "ALERT",
  "GLORY",
  "EAGER",
  "CLEAR",
  "FLARE",
  "RIVAL",
  "SPICE",
  "GLIMP",
  "CLONE",
  "VAULT",
  "GROVE",
  "TALLY",
  "STAGE",
  "CRISP",
  "SHAKE",
  "PLUSH",
  "THINK",
  "BIRTH",
  "VIVID",
  "BLOOM",
  "PLANT",
  "SCOPE",
  "TWIST",
  "FLOUR",
  "SHIFT",
  "MERIT",
  "STAND",
  "CHAOS",
  "CLEAR",
  "PIVOT",
  "SWOON",
  "YEARN",
  "CRACK",
  "PLUSH",
  "CLOVE",
  "STAIR",
  "SHORE",
  "GLADE",
  "CRISP",
  "SHALE",
  "TWIRL",
  "LOVER",
  "GLEAM",
  "SMILE",
  "BLUSH",
  "SLANT",
  "STILT",
  "CHIME",
  "CRUMB",
  "FRAIL",
  "BRAVE",
  "FRAME",
  "SHIFT",
  "GLOOM",
  "TWICE",
  "STORK",
  "SHAKE",
  "SLOPE",
  "STOUT",
  "CRANK",
  "SHAPE",
  "CRISP",
  "STARE",
  "GLOBE",
  "ALPHA",
  "SPACE",

  // New pluralized 5-letter words for 4-letter singular nouns
  "CHAIRS",
  "BLUES",
  "TREES",
  "FACES",
  "ROCKS",
  "PAGES",
  "LAMPS",
  "SHIPS",
  "PLANS",
  "BOATS",
  "DOORS",
  "FLAGS",
  "WAVES",
  "SEEDS",
  "HILLS",
  "PLAYS",
  "VIEWS",
  "WANDS",
  "CUBES",
  "MAPS",
  "FILMS",
  "WHEELS",
  "GATES",
  "JOKES",
  "GAMES",
  "YARDS",
  "TOWNS",
  "DRUMS",
  "BELLS",
  "SHOES",
  "PLANS",
  "RINGS",
  "BOONS",
  "ROLLS",
  "COINS",
  "WANDS",
  "SLOTS",
  "PUMPS",
  "CHAINS",
  "LAMBS",
  "ROSES",
  "FISTS",
  "FIRES",
  "CROWS",
  "SWANS",
  "GROWS",
  "PONDS",
  "BONDS",
  "TRAILS",
  "JOLTS",
  "GIRLS",
  "TWIGS",
  "TRIMS",
  "BILLS",
  "FOOLS",
  "JUMPS",
  "WAVES",
  "GRIPS",
  "GIRLS",
  "SIGHS",
  "LOOPS",
  "FLAGS",
  "CHOPS",
  "CLOAKS",
  "TUNES",
  "GLIMPS",
  "TRICKS",
  "BRUSH",
  "CASTS",
  "TUNES",
  "WHIRLS",
];

class WordleGame {
  constructor() {
    this.word = WORDS[Math.floor(Math.random() * WORDS.length)];
    this.currentRow = 0;
    this.currentTile = 0;
    this.gameOver = false;
    this.setupGrid();
    this.setupKeyboard();
  }

  setupGrid() {
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

  setupKeyboard() {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      key.addEventListener("click", () => this.handleKeyPress(key.textContent));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        this.handleKeyPress("enter");
      } else if (e.key === "Backspace") {
        this.handleKeyPress("⌫");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        this.handleKeyPress(e.key);
      }
    });
  }

  handleKeyPress(key) {
    if (this.gameOver) return;

    key = key.toLowerCase();

    if (key === "enter") {
      this.checkWord();
    } else if (key === "⌫") {
      this.deleteLetter();
    } else if (/^[a-z]$/.test(key) && this.currentTile < 5) {
      this.addLetter(key.toUpperCase());
    }
  }

  addLetter(letter) {
    if (this.currentTile < 5) {
      const row = document.querySelectorAll(".row")[this.currentRow];
      const tile = row.children[this.currentTile];
      tile.textContent = letter;
      tile.classList.add("filled");
      tile.classList.add("pop");
      setTimeout(() => {
        tile.classList.remove("pop");
      }, 100);
      this.currentTile++;
    }
  }

  deleteLetter() {
    if (this.currentTile > 0) {
      this.currentTile--;
      const row = document.querySelectorAll(".row")[this.currentRow];
      const tile = row.children[this.currentTile];
      tile.textContent = "";
      tile.classList.remove("filled");
    }
  }

  checkWord() {
    if (this.currentTile !== 5) {
      this.showMessage("Not enough letters");
      this.shakeRow();
      return;
    }

    const row = document.querySelectorAll(".row")[this.currentRow];
    const tiles = Array.from(row.children);
    const guess = tiles.map((tile) => tile.textContent).join("");

    if (!WORDS.includes(guess)) {
      this.showMessage("Not in word list");
      this.shakeRow();
      return;
    }

    // Check letters
    const letterStates = {};
    const remainingLetters = {};

    [...this.word].forEach((letter) => {
      remainingLetters[letter] = (remainingLetters[letter] || 0) + 1;
    });

    // First pass: Check for correct positions
    tiles.forEach((tile, index) => {
      const letter = tile.textContent;
      if (letter === this.word[index]) {
        tile.classList.add("correct");
        remainingLetters[letter]--;
        letterStates[letter] = "correct";
      }
    });

    // Second pass: Check for present letters
    tiles.forEach((tile, index) => {
      const letter = tile.textContent;
      if (!tile.classList.contains("correct")) {
        if (remainingLetters[letter] > 0) {
          tile.classList.add("present");
          remainingLetters[letter]--;
          if (!letterStates[letter] || letterStates[letter] !== "correct") {
            letterStates[letter] = "present";
          }
        } else {
          tile.classList.add("absent");
          if (!letterStates[letter]) {
            letterStates[letter] = "absent";
          }
        }
      }
    });

    // Update keyboard
    Object.entries(letterStates).forEach(([letter, state]) => {
      const key = Array.from(document.querySelectorAll(".key:not(.wide)")).find(
        (k) => k.textContent.toUpperCase() === letter
      );
      if (key && (!key.classList.contains("correct") || state === "correct")) {
        key.className = `key ${state}`;
      }
    });

    if (guess === this.word) {
      this.showMessage("Correct!");
      this.gameOver = true;
    } else if (this.currentRow === 5) {
      this.showMessage(`Game Over! The word was ${this.word}`);
      this.gameOver = true;
    } else {
      this.currentRow++;
      this.currentTile = 0;
    }
  }

  showMessage(text) {
    const message = document.querySelector(".message");
    message.textContent = text;
    message.style.display = "block";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  }

  shakeRow() {
    const row = document.querySelectorAll(".row")[this.currentRow];
    row.classList.add("shake");
    setTimeout(() => {
      row.classList.remove("shake");
    }, 500);
  }
}

// Start the game
const game = new WordleGame();
