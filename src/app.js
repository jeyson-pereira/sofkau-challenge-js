const prompt = require("prompt-sync")();
const { rules, sleep, scoresHistory } = require("./utils/utils");
const game = require("./game");

let opc;
const newGame = new game();

do {
  console.clear();
  console.log(`
-- CHALLENGE PREGUNTAS Y RESPUESTAS --
1. Comenzar nuevo juego
2. Ver Reglas
3. Ver Puntajes
4. Salir`);
  opc = prompt("Seleccione la opción deseada: ");
  console.clear();
  switch (opc) {
    case "1":
      newGame.play();
      break;
    case "2":
      rules();
      break;
    case "3":
      // TODO: Implement return table scores
      scoresHistory();
    case "4":
      break;
    default:
      console.log("Seleccione una opción valida...");
  }
} while (opc !== "4");
