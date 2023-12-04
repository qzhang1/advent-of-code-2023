import { ConfigurableReader, readByLine } from "../utils/reader";

async function calculate() {
  //   const sample = [
  //     "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  //     "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  //     "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  //     "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  //     "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
  //   ];
  const total = await partTwo({
    fromFilePath: "./inputs/day-2-input",
    fromText: null, //sample.join("\n"),
  });
  return total;
}

async function partOne(conf: ConfigurableReader) {
  const bagInventory = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let sum = 0;
  for await (let line of readByLine(conf)) {
    const startingGameIdx = line.indexOf(":");
    const gameId = parseInt(line.slice(line.indexOf(" ") + 1, startingGameIdx));
    const games = line.substring(startingGameIdx + 1).split(";");
    let isPossible = true;
    for (let game of games) {
      const cubes = game.split(",");
      for (let cube of cubes) {
        let [num, color] = cube.trim().split(" ");
        isPossible = isPossible && bagInventory[color] >= num;
      }
    }

    if (isPossible) {
      sum += gameId;
    }
  }
  return sum;
}

async function partTwo(conf: ConfigurableReader) {
  let sum = 0;
  for await (let line of readByLine(conf)) {
    const startingGameIdx = line.indexOf(":");
    const games = line
      .substring(startingGameIdx + 1)
      .trim()
      .split(";");
    const colors = {
      red: 0,
      green: 0,
      blue: 0,
    };
    for (let game of games) {
      const cubes = game.split(",");
      for (let cube of cubes) {
        let [num, color] = cube.trim().split(" ");
        const value = parseInt(num);
        if (value > colors[color]) {
          colors[color] = value;
        }
      }
    }
    const power = Object.keys(colors).reduce((acc, curr) => {
      return acc * colors[curr];
    }, 1);

    sum += power;
  }

  return sum;
}

calculate().then((result) => console.log(result));
