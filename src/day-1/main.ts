import { createReadStream, existsSync } from "node:fs";
import Trie from "../utils/trie";

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

async function calculate(filePath: string, includeWords: boolean) {
  if (filePath && filePath.length && existsSync(filePath)) {
    let calculatedValue = 0;
    for await (const line of readByLine(filePath)) {
      let firstNum = "";
      let secondNum = "";
      let word = "";
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (!isNaN(parseInt(char, 10))) {
          if (word.length) {
            word = "";
          }
          if (!firstNum) {
            firstNum = char;
          }
          secondNum = char;
        } else if (includeWords) {
          word += char;
          // min num is 3 digits long so don't check until at least 3 chars
          if (word.length >= 3 && numberTrie.hasWord(word)) {
            const num = wordMap[word];
            // check if it matches any key in wordMap if any match ends in e or n then we need to check if
            // there's an intersection of two numbers e.g. sevenine => 7, 9
            // if there's an intersection then we need to pop the queue up to the intersected point
            if (
              word[word.length - 1] === "e" ||
              word[word.length - 1] === "n" ||
              word[word.length - 1] === "o"
            ) {
              word = word[word.length - 1];
            } else {
              word = "";
            }

            if (!firstNum) {
              firstNum = num;
            }
            secondNum = num;
          }

          if (!numberTrie.startsWith(word)) {
            word = word.slice(1);
          }
        }
      }

      word = "";
      calculatedValue += parseInt(firstNum + secondNum);
    }
    return calculatedValue;
  }

  throw new Error("invalid filePath provided");
}

const wordMap = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as Record<string, string>;
const numberTrie = new Trie();
Object.keys(wordMap).forEach((num) => numberTrie.insert(num));

calculate(process.argv[2], true).then((result) => console.log(result));
