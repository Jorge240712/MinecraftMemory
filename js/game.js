// ============================================================
//  Minecraft Memory — game.js
//  M5L1 · ES6+ Edition | LevelUp Code Bootcamp
// ============================================================
//  INSTRUCCIONES:
//  → Este es el motor del juego. Ya viene casi completo.
//  → Solo completa los bloques marcados con TODO.
//  → No modifiques nada fuera de esos bloques.
// ============================================================

(() => {

    // Estado global del juego — no tocar
    let gameState = {
        points:       0,
        attempts:     0,
        flippedCards: [],
        isLockBoard:  false,
        matchedPairs: 0
    };

    // Referencias al DOM — ya conectadas ✅
    const grid              = document.getElementById('gameGrid');
    const pointsEl          = document.getElementById('points');
    const attemptsEl        = document.getElementById('attempts');
    const restartBtn        = document.getElementById('restartBtn');
    const muteBtn           = document.getElementById('muteBtn');
    const winOverlay        = document.getElementById('winOverlay');
    const finalPointsEl     = document.getElementById('finalPoints');
    const finalAttemptsEl   = document.getElementById('finalAttempts');
    const finalAccuracyEl   = document.getElementById('finalAccuracy');
    const winRestartBtn     = document.getElementById('winRestartBtn');
    const confettiContainer = document.getElementById('confettiContainer');

    // Audio — ya configurado ✅
    const bgMusic       = new Audio('SFX/1-08. Minecraft.mp3');
    bgMusic.loop        = true;
    bgMusic.volume      = 0.25;

    const correctSound   = new Audio('SFX/correcto.mp3');
    correctSound.volume  = 0.4;

    const incorrectSound  = new Audio('SFX/incorrecto.mp3');
    incorrectSound.volume = 0.4;

    const villagerSound   = new Audio('SFX/aldeano.mp3');
    villagerSound.volume  = 0.55;

    const clickSound   = new Audio('SFX/Bow_shoot.ogg');
    clickSound.volume  = 0.5;

    let isMuted       = false;
    let musicStarted  = false;

    // ─── Lógica de audio — ya implementada ✅ ────────────────

    const startBgMusic = () => {
        if (musicStarted) return;
        bgMusic.play()
            .then(() => {
                musicStarted = true;
                document.removeEventListener('click',   startBgMusicOnInteraction);
                document.removeEventListener('keydown', startBgMusicOnInteraction);
                updateMuteButtonUI();
            })
            .catch(err => console.log("Música en espera de interacción:", err));
    };

    const startBgMusicOnInteraction = () => {
        if (!isMuted) startBgMusic();
    };

    const toggleMusic = () => {
        isMuted        = !isMuted;
        bgMusic.muted  = isMuted;
        updateMuteButtonUI();
        if (!musicStarted && !isMuted) startBgMusic();
    };

    const updateMuteButtonUI = () => {
        if (isMuted) {
            muteBtn.textContent  = '🔇 Música: OFF';
            muteBtn.style.opacity = '0.7';
        } else {
            muteBtn.textContent  = '🔊 Música: ON';
            muteBtn.style.opacity = '1';
        }
    };


    // ─── Render del tablero — ya implementada ✅ ─────────────

    const initWorld = () => {
        grid.innerHTML = '';
        const shuffledPool = utils.shuffleCards(minecraftItems);

        shuffledPool.forEach((item, idx) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.id    = item.id;
            card.dataset.index = idx;

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${item.image}" alt="${item.concept}" class="card-img">
                    </div>
                    <div class="card-back"></div>
                </div>
            `;

            card.addEventListener('click', () => handleCardFlip(card, item));
            grid.appendChild(card);
        });
    };


    // ────────────────────────────────────────────────────────
    //  🎫 TICKET 2 — handleCardFlip: Destructuring de Objeto
    //
    //  Esta función se llama cada vez que el jugador hace clic
    //  en una carta. Necesita leer dos propiedades de gameState:
    //  · flippedCards  → para saber cuántas cartas están volteadas
    //  · isLockBoard   → para bloquear clicks durante animaciones
    //
    //  En lugar de acceder a gameState.flippedCards y
    //  gameState.isLockBoard por separado, extráelas en UNA
    //  sola línea usando destructuring de objeto.
    // ────────────────────────────────────────────────────────

    const handleCardFlip = (cardElement, itemData) => {

        // TODO — Extrae flippedCards e isLockBoard de gameState
        // en una sola línea usando destructuring de objeto.
        // Pista: const { propiedad1, propiedad2 } = objeto;
        /* TODO */
        const { flippedCards, isLockBoard } = gameState;
        // Las validaciones ya usan las variables que acabas de extraer ✅
        if (isLockBoard) return;
        if (cardElement.classList.contains('flipped') || cardElement.classList.contains('matched')) return;

        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log("Error audio:", e));

        cardElement.classList.add('flipped');
        gameState.flippedCards.push({ element: cardElement, data: itemData });

        if (gameState.flippedCards.length === 2) {
            gameState.attempts++;
            updateUI(gameState.points, gameState.attempts);
            verifyMatch();
        }
    };


    // ────────────────────────────────────────────────────────
    //  🎫 TICKET 3 — verifyMatch: Destructuring de Array
    //
    //  Cuando hay 2 cartas volteadas, esta función verifica
    //  si forman una pareja. gameState.flippedCards es un array
    //  de exactamente 2 elementos en este punto.
    //
    //  En lugar de acceder a gameState.flippedCards[0] y [1],
    //  extrae ambos en UNA sola línea usando destructuring de array.
    // ────────────────────────────────────────────────────────

    const verifyMatch = () => {

        // TODO — Extrae card1 y card2 de gameState.flippedCards
        // en una sola línea usando destructuring de array.
        // Pista: const [elemento1, elemento2] = unArray;
        /* TODO */
        const [card1,card2] = gameState.flippedCards;
        // card1 y card2 son objetos con la forma: { element, data }
        // La comparación ya está lista — solo necesita las variables ✅
        const success = card1.data.id === card2.data.id;

        success ? processMatch(card1, card2) : resetFlippedCards(card1, card2);
    };


    // ─── Lógica de parejas y turnos — ya implementada ✅ ─────

    const processMatch = (c1, c2) => {
        c1.element.classList.add('matched');
        c2.element.classList.add('matched');

        gameState.points      += 10;
        gameState.matchedPairs = (gameState.matchedPairs || 0) + 1;

        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.log("Error audio:", e));

        utils.logGameAction('MATCH_SUCCESS');
        clearTurn();

        if (gameState.matchedPairs === minecraftItems.length) {
            setTimeout(() => showWinScreen(), 600);
        }
    };

    const resetFlippedCards = (c1, c2) => {
        gameState.isLockBoard = true;

        c1.element.classList.add('error');
        c2.element.classList.add('error');

        incorrectSound.currentTime = 0;
        incorrectSound.play().catch(e => console.log("Error audio:", e));

        setTimeout(() => {
            c1.element.classList.remove('flipped', 'error');
            c2.element.classList.remove('flipped', 'error');
            clearTurn();
        }, 900);
    };

    const clearTurn = () => {
        gameState.flippedCards = [];
        gameState.isLockBoard  = false;
        updateUI(gameState.points, gameState.attempts);
    };

    // ✅ Ya implementada — actualiza los contadores en pantalla
    const updateUI = (...scores) => {
        const [currentPoints, currentAttempts] = scores;
        pointsEl.textContent   = currentPoints;
        attemptsEl.textContent = currentAttempts;
    };

    const resetWorld = () => {
        winOverlay.hidden           = true;
        confettiContainer.innerHTML = '';

        gameState = { points: 0, attempts: 0, flippedCards: [], isLockBoard: false, matchedPairs: 0 };
        updateUI(0, 0);
        initWorld();
        utils.logGameAction('WORLD_RESET');

        villagerSound.currentTime = 0;
        villagerSound.play().catch(e => console.log("Error audio:", e));
    };


    // ────────────────────────────────────────────────────────
    //  🔥 BONUS — showWinScreen: Destructuring combinado
    //
    //  Esta función muestra el modal de victoria con las
    //  estadísticas finales. Necesita leer points y attempts
    //  de gameState para mostrarlos en pantalla.
    //
    //  Reemplaza el acceso manual gameState.points / gameState.attempts
    //  por una sola línea de destructuring de objeto.
    //  El resto de la función ya está lista.
    // ────────────────────────────────────────────────────────

    const showWinScreen = () => {

        // TODO (BONUS) — Extrae points y attempts de gameState
        // usando destructuring de objeto en una sola línea.
        /* TODO */
        const { points, attempts } = gameState;

        const totalPairs = minecraftItems.length;
        const accuracy   = attempts > 0
            ? Math.round((totalPairs / attempts) * 100)
            : 100;

        finalPointsEl.textContent   = points;
        finalAttemptsEl.textContent = attempts;
        finalAccuracyEl.textContent = `${Math.min(accuracy, 100)}%`;

        winOverlay.hidden = false;
        spawnConfetti();
        utils.logGameAction('GAME_WIN');
    };


    // ─── Confeti — ya implementado ✅ ─────────────────────────

    const spawnConfetti = () => {
        confettiContainer.innerHTML = '';
        const colors = [
            '#ffaa00', '#55ff55', '#ff5555', '#5555ff',
            '#ff55ff', '#55ffff', '#ffffff', '#ffff55'
        ];

        for (let i = 0; i < 60; i++) {
            const piece    = document.createElement('div');
            piece.classList.add('confetti-piece');

            const color    = colors[Math.floor(Math.random() * colors.length)];
            const left     = Math.random() * 100;
            const size     = 6 + Math.random() * 8;
            const delay    = Math.random() * 1.8;
            const dur      = 2.2 + Math.random() * 2;
            const isCircle = Math.random() > 0.5;

            piece.style.cssText = `
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: ${isCircle ? '50%' : '0'};
                animation-delay: ${delay}s;
                animation-duration: ${dur}s;
            `;

            confettiContainer.appendChild(piece);
        }
    };

    // ─── Event Listeners y arranque ✅ ────────────────────────

    restartBtn.addEventListener('click',   resetWorld);
    muteBtn.addEventListener('click',      toggleMusic);
    winRestartBtn.addEventListener('click', resetWorld);

    initWorld();

    document.addEventListener('click',   startBgMusicOnInteraction);
    document.addEventListener('keydown', startBgMusicOnInteraction);

})();