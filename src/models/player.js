class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  playerData() {
    const user = {
      name: this.name,
      score: this.score,
    };

    return user;
  }

  updateScore(newScore) {
    this.score = newScore;
  }
}

module.exports = Player;
