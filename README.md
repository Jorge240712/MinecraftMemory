# 🎮 Minecraft Memory — Ejercicio en Clase
### Misión 18 · ES6+ | LevelUp Code Bootcamp

---

## 📌 Contexto

El estudio de desarrollo **PixelCraft Studios** está construyendo un juego de memoria temático de Minecraft.
El motor del juego ya está casi completo, pero el Tech Lead dejó **3 funciones críticas sin terminar** — justo las que usan la sintaxis ES6+ que aprendieron hoy.

Sin esas funciones: las cartas no se mezclan, el tablero no detecta parejas y la pantalla de victoria no muestra los datos correctos.

**Tu misión: completar los tickets pendientes.**

---

## 📁 Estructura del proyecto

```
PAIRGAME/
├── index.html         ✅ No tocar
├── style.css          ✅ No tocar
├── images/            ✅ No tocar
├── SFX/               ✅ No tocar
└── js/
    ├── data.js        ✅ No tocar — contiene las cartas del juego
    ├── utils.js       🎯 TU TRABAJO — Ticket 1
    └── game.js        🎯 TU TRABAJO — Tickets 2 y 3 (+ Bonus)
```

---

## 🎫 Tickets

### Ticket 1 — `utils.js` · Spread Operator + Arrow Function

**Función:** `shuffleCards`

El tablero necesita duplicar el mazo de cartas (para tener parejas) y mezclarlo aleatoriamente antes de renderizarlo.

**Lo que debes completar:**

```js
// Paso 1 — duplicar el array con spread operator
const pool = /* TODO */;

// Paso 2 — mezclar con .sort() y una arrow function
return pool.sort(/* TODO */);
```

**Pistas:**
- Spread en arrays: `[...array1, ...array2]` crea un nuevo array con todos los elementos de ambos
- Arrow function de una línea para `.sort()`: `() => Math.random() - 0.5`
  - `Math.random()` devuelve un número entre 0 y 1
  - Restarle 0.5 hace que el resultado sea positivo o negativo al azar → orden aleatorio

---

### Ticket 2 — `game.js` · Destructuring de Objeto

**Función:** `handleCardFlip`

Cada vez que el jugador hace clic en una carta, la función necesita leer `flippedCards` e `isLockBoard` de `gameState`. Actualmente están sin extraer.

**Lo que debes completar:**

```js
// TODO — una sola línea de destructuring de objeto
/* TODO */

// Las validaciones ya están escritas y usan esas variables ✅
if (isLockBoard) return;
```

**Pistas:**
- Sintaxis: `const { propiedad1, propiedad2 } = objeto;`
- Las propiedades que necesitas se llaman exactamente igual que en `gameState`

---

### Ticket 3 — `game.js` · Destructuring de Array

**Función:** `verifyMatch`

Cuando hay 2 cartas volteadas, `gameState.flippedCards` es un array de exactamente 2 elementos. Hay que extraerlos para compararlos.

**Lo que debes completar:**

```js
// TODO — una sola línea de destructuring de array
/* TODO */

// La comparación ya usa card1 y card2 ✅
const success = card1.data.id === card2.data.id;
```

**Pistas:**
- Sintaxis: `const [elemento1, elemento2] = unArray;`
- El array del que extraes es `gameState.flippedCards`

---

### 🔥 Bonus — `game.js` · Destructuring de Objeto en `showWinScreen`

**Función:** `showWinScreen`

La pantalla de victoria usa `points` y `attempts`. Actualmente hay accesos manuales que puedes reemplazar por una sola línea de destructuring.

```js
// TODO (BONUS) — extrae points y attempts de gameState
/* TODO */
```

El resto de la función ya está lista y usa esas variables directamente.

---

## ✅ ¿Cómo sé que todo funciona?

1. Al cargar la página, el tablero aparece con las cartas mezcladas en orden distinto cada vez → **Ticket 1 ✅**
2. Al hacer clic en dos cartas iguales, aparecen con borde verde y quedan fijas → **Ticket 2 ✅**
3. Al hacer clic en dos cartas diferentes, se sacuden en rojo y se voltean solas → **Ticket 3 ✅**
4. Al encontrar todas las parejas, el modal de victoria muestra los puntos y los intentos correctos → **Bonus ✅**

---

## 🚫 Reglas del ejercicio

- Solo editar `utils.js` y `game.js`
- No usar `array[0]` ni `array[1]` donde se pide destructuring
- No usar `objeto.propiedad` donde se pide destructuring
- No modificar las funciones ya marcadas como ✅