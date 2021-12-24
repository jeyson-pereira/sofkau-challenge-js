const prompt = require("prompt-sync")();
const player = require("./models/player");

const questionsDb = require("./data/questions.json");

const {
  isWithdraw,
  randomCategorie,
  saveData,
  setPlayerAnswer,
  sleep,
  updatePlayerScore,
} = require("./utils/utils");

const categories = questionsDb.data.categories;
const questions = questionsDb.data.questions;

class Game {
  play() {
    //  * Ask player name and create player
    const userName = prompt("Cuál es tu nombre? ");
    const currentPlayer = new player(userName);

    // * States of categories selected and prize
    let succeded = [];
    let prize;

    // * valid options
    const validOptions = ["A", "B", "C", "D"];

    console.clear();

    for (let round = 0; round < 5; round++) {
      // * Select a random category
      let selectedCategorie = randomCategorie(succeded, categories.length);
      succeded.push(selectedCategorie); // add category to succeded
      let selectedQuestion = questions[selectedCategorie][round]; // select a question of category with difficulty level based in round

      console.log(
        `Ronda ${round + 1} - Categoria: ${
          categories[selectedCategorie]
        }  -   Acumulado: $${currentPlayer.score}`
      );

      // * Print question and answer choises
      console.log(selectedQuestion.question);
      selectedQuestion.choices.forEach((choice, index) => {
        console.log(`${validOptions[index]}. ${choice}`);
      });

      // * Get User Question Answer
      let playerAnswer = setPlayerAnswer(validOptions);

      // * Check if chosen answer is correct
      if (selectedQuestion.answer === playerAnswer) {
        prize = 1000 * (round + 1);
        updatePlayerScore(prize, currentPlayer, round);

        // ? Player withdraw game with prize
        if (round !== 4) {
          if (isWithdraw(currentPlayer.score)) {
            break;
          }
        }
      } else {
        console.clear();
        currentPlayer.updateScore(0);
        console.log(`Lo siento, tu respuesta es incorrecta!
No has ganado ningún premio, el juego ha terminado!`);
        sleep(1500);
        break;
      }
      console.clear();
      sleep(1500);
    }
    saveData(currentPlayer);
    sleep(1500);
    console.clear();
  }
}

module.exports = Game;
