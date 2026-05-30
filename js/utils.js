// ============================================================
//  Minecraft Memory — utils.js
//  M5L1 · ES6+ Edition | LevelUp Code Bootcamp
// ============================================================
//  INSTRUCCIONES:
//  → Solo debes editar los bloques marcados con TODO.
//  → No borres nada de lo que ya existe.
//  → data.js, index.html y style.css ya están listos.
// ============================================================


const utils = {

    // ────────────────────────────────────────────────────────
    //  🎫 TICKET 1 — shuffleCards
    //
    //  Esta función recibe el array original de cartas y debe:
    //  1. Crear un nuevo array con DOS copias del original
    //     (necesitamos duplicado para tener parejas en el tablero)
    //  2. Ordenar ese array de forma aleatoria
    //  3. Retornar el resultado
    //
    //  Usa Spread Operator para el paso 1
    //  Usa una Arrow Function dentro del .sort() para el paso 2
    // ────────────────────────────────────────────────────────

    // ✅ La firma y el return ya están — completa lo que falta adentro
    shuffleCards: (cardsArray) => {

        // TODO — Paso 1: crea "pool" como un array que contenga
        // dos copias de cardsArray usando spread operator
        // Pista: [...cardsArray, ...cardsArray]
        const pool = [...cardsArray, ...cardsArray];

        // TODO — Paso 2: ordena pool de forma aleatoria
        // .sort() necesita una función que compara dos elementos (a, b)
        // Si la función retorna un número negativo, a va primero
        // Truco: Math.random() - 0.5 da positivo o negativo al azar
        // Escríbela como arrow function: () => Math.random() - 0.5
        return pool.sort(() => Math.random() - 0.5);
    },


    // ────────────────────────────────────────────────────────
    //  ✅ Ya implementada — úsala como referencia de arrow function
    //  con cuerpo de múltiples líneas (llaves + return implícito en console)
    // ────────────────────────────────────────────────────────

    logGameAction: (actionType, ...details) => {
    console.log(
        `%c[MC-ENGINE] ${actionType}${details.length ? ' | ' + details.join(' | ') : ''}`,
        'color: #55ff55; font-weight: bold;'
    );
}

};