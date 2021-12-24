const fs = require("fs");
const filePath = "src/data/scores.json";

class Json {
  jsonReader() {
    if (!fs.existsSync(filePath)) {
      const structure = { scores: [] };
      this.jsonSaver(structure);
    }

    return JSON.parse(fs.readFileSync(filePath));
  }

  jsonSaver(data) {
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
}

module.exports = Json;
