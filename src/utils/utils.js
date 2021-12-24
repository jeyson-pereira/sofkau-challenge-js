const prompt = require("prompt-sync")();
const json = require("./json");

const js = new json();

// * print rules
const rules = () => {
  console.log(`
Este Challenge consiste en un juego de trivia el cual cuenta con 
preguntas de diferentes categorias y un total de 5 rondas,
iras ganando un premio acumulado al ir respondiendo correctamente,
de ser así elegirás si continuar o retirarte tras cada pregunta.
En caso de responder erróneamente perderás todo.
`);
  prompt("Presiona ENTER para continuar...");
};

// * delay function
const sleep = (milliseconds) => {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

// * get random categorie for a new round
const randomCategorie = (exclude, arrLength) => {
  let randnr;
  // ? Validate if this categorie is succeded
  do {
    randnr = Math.floor(Math.random() * arrLength);
  } while (exclude.includes(randnr));

  return randnr;
};

// * set player question answer
const setPlayerAnswer = (validOptions) => {
  let playerAnswer = prompt("¿Qué opción eliges?: ").toUpperCase();

  // ? Verify if is valid option or ask a valid option again
  while (!verifyOption(validOptions, playerAnswer)) {
    playerAnswer = prompt("¡Elige una opción válida!: ").toUpperCase();
  }

  return validOptions.indexOf(playerAnswer);
};

// * verify option selected by player
const verifyOption = (validOptions, playerAnswer) => {
  return validOptions.includes(playerAnswer);
};

// * update player score if answer is correct
const updatePlayerScore = (prize, player, round) => {
  console.clear();
  console.log(`Felicidades has ganado: $${prize}`);
  player.updateScore(player.score + prize);
  if (round === 4) {
    console.log(
      `Bien hecho ${player.name}, completaste la trivia 
y ganaste un total de $${player.score}`
    );
    sleep(3000);
  } else if (round !== 0) {
    console.log(`Total acumulado ganado: $${player.score}`);
  }
};

// * ask if wants to withdraw game with prize
const isWithdraw = (score) => {
  const continueOptions = ["N", "S"];
  let userContinue = prompt(
    "¿Deseas continuar con la próxima pregunta?(S/N): "
  ).toUpperCase();

  // ? Verify if is valid option or ask a valid option again
  while (!verifyOption(continueOptions, userContinue)) {
    userContinue = prompt(
      "Indica si quieres continuar con (S o N): "
    ).toUpperCase();
  }
  if (userContinue === "N") {
    console.log(`Haz ganado un total de: $${score}`);
    return true;
  }
  return false;
};

// * save data player on file history scores
const saveData = (currentPlayer) => {
  if (currentPlayer.score === 0) {
    return;
  }
  const data = JSON.parse(JSON.stringify(currentPlayer)); // parse data to json

  // ? read json file and push new data from player
  let playersScores = js.jsonReader();
  playersScores.scores.push(data);

  js.jsonSaver(playersScores);
  console.log("Guardando tu puntaje...");
  sleep(1500);
};

const scoresHistory = () => {
  let data = js.jsonReader().scores;

  if (data.length === 0) {
    console.log("No hay puntajes guardados!");
    sleep(1500);
    return;
  }

  // * print scores sort descending order players score
  console.table(data.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)));
  prompt("Presiona ENTER para continuar...");
};

module.exports = {
  randomCategorie,
  rules,
  sleep,
  setPlayerAnswer,
  updatePlayerScore,
  isWithdraw,
  saveData,
  scoresHistory,
};
