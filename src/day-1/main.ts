import { ConfigurableReader, readByLine } from "../utils/reader";
import Trie from "../utils/trie";

export async function calculate(
  conf: ConfigurableReader,
  includeWords: boolean
) {
  let calculatedValue = 0;
  for await (const line of readByLine(conf)) {
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

        if (!numberTrie.hasPrefix(word)) {
          word = word.slice(1);
        }
      }
    }

    word = "";
    calculatedValue += parseInt(firstNum + secondNum);
  }
  return calculatedValue;
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

function run() {
  calculate(
    {
      fromFilePath: "./input/day-1-input",
      fromText: null,
    },
    true
  ).then((result) => console.log(result));
}
