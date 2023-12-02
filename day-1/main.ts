import { createReadStream, existsSync } from "node:fs";

async function* readByLine(filePath: string): AsyncGenerator<string> {
  const readStream = createReadStream(filePath, "utf-8");
  let content = "";
  for await (const chunk of readStream) {
    content += chunk;
    let linebreakIdx;
    while ((linebreakIdx = content.indexOf("\n")) >= 0) {
      yield content.substring(0, linebreakIdx);
      content = content.substring(linebreakIdx + 1);
    }
  }

  // last line of file
  if (content.length) {
    yield content;
  }
}

async function calculate(filePath: string) {
  if (filePath && filePath.length && existsSync(filePath)) {
    let calculatedValue = 0;
    for await (const line of readByLine(filePath)) {
      let firstNum = "";
      let secondNum = "";
      for (let char of line) {
        if (!isNaN(parseInt(char, 10))) {
          if (!firstNum) {
            firstNum = char;
          }

          secondNum = char;
        }
      }

      calculatedValue += parseInt(firstNum + secondNum);
    }
    return calculatedValue;
  }

  throw new Error("invalid filePath provided");
}

const wordMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

calculate(process.argv[2]).then((result) => console.log(result));
