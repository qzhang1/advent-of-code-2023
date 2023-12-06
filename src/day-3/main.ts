import { ConfigurableReader, readByLine } from "../utils/reader";

async function calculate() {
  const sample = [
    "467..114..",
    "...*......",
    "..35..633.",
    "......#...",
    "617*......",
    ".....+.58.",
    "..592.....",
    "......755.",
    "...$.*....",
    ".664.598..",
  ];
  const schematicMatrix = [];
  for await (let line of readByLine({
    fromFilePath: "./inputs/day-3-input",
    fromText: null,
  })) {
    const vector = [];
    for (let i = 0; i < line.length; i++) {
      vector.push(line[i]);
    }
    schematicMatrix.push(vector);
  }
  const sum = partTwo(schematicMatrix);
  return sum;
}

function isSymbol(c: string): boolean {
  return c !== "." && c !== "\r" && c !== "\n" && isNaN(parseInt(c));
}

function isNum(c: string): boolean {
  return c !== "." && !isNaN(parseInt(c));
}

function parseSides(startIdx: number, endIdx: number, row: string[]): number {
  let num = [];
  // going right
  if (startIdx < endIdx) {
    while (startIdx < endIdx) {
      if (!isNum(row[startIdx])) {
        break;
      }
      num.push(row[startIdx]);
      startIdx++;
    }
  } else {
    while (startIdx >= endIdx) {
      if (!isNum(row[startIdx])) {
        break;
      }
      num.push(row[startIdx]);
      startIdx--;
    }
    num = num.reverse();
  }

  return num.length > 0 ? parseInt(num.join("")) : 0;
}

function parseTopBottom(
  idx: number,
  row: string[],
  values: number[] = null
): number {
  let sum = 0;
  let isLeft = true;
  let isRight = true;
  let isCenter = false;
  // check right above/below
  if (isNum(row[idx])) {
    let num = [row[idx]];
    isCenter = true;

    // extends from left
    if (idx > 0 && isNum(row[idx - 1])) {
      isLeft = false;
      let myIdx = idx;
      // collect left
      while (myIdx > 0 && isNum(row[myIdx - 1])) {
        myIdx -= 1;
        num.push(row[myIdx]);
      }
      num = num.reverse();
    }

    // extends to right
    if (idx < row.length - 1 && isNum(row[idx + 1])) {
      isRight = false;
      let myIdx = idx;
      while (myIdx < row.length - 1 && isNum(row[myIdx + 1])) {
        myIdx += 1;
        num.push(row[myIdx]);
      }
    }

    if (values) {
      values.push(parseInt(num.join("")));
    } else {
      sum += parseInt(num.join(""));
    }
  }

  // check top left
  if (isLeft && !isCenter && idx > 0 && isNum(row[idx - 1])) {
    let num = [];
    let myIdx = idx;
    // collect left
    while (myIdx > 0 && isNum(row[myIdx - 1])) {
      myIdx -= 1;
      num.push(row[myIdx]);
    }
    num = num.reverse();
    if (values) {
      values.push(parseInt(num.join("")));
    } else {
      sum += parseInt(num.join(""));
    }
  }

  // check top right
  if (isRight && !isCenter && idx < row.length - 1 && isNum(row[idx + 1])) {
    let num = [];
    let myIdx = idx;
    while (myIdx < row.length - 1 && isNum(row[myIdx + 1])) {
      myIdx += 1;
      num.push(row[myIdx]);
    }
    if (values) {
      values.push(parseInt(num.join("")));
    } else {
      sum += parseInt(num.join(""));
    }
  }
  return sum;
}

function partOne(schematicMatrix: string[][]): number {
  let sum = 0;

  for (let i = 0; i < schematicMatrix.length; i++) {
    const row = schematicMatrix[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (isSymbol(char)) {
        // gather surrounding for numbers to add
        // left
        if (j > 0 && isNum(row[j - 1])) {
          sum += parseSides(j - 1, 0, row);
        }
        // right
        if (j < row.length - 1 && isNum(row[j + 1])) {
          sum += parseSides(j + 1, row.length, row);
        }
        // top
        if (i > 0) {
          sum += parseTopBottom(j, schematicMatrix[i - 1]);
        }
        if (i < schematicMatrix.length - 1) {
          sum += parseTopBottom(j, schematicMatrix[i + 1]);
        }
      }
    }
  }

  return sum;
}

function partTwo(schematicMatrix: string[][]): number {
  let result = 0;
  for (let i = 0; i < schematicMatrix.length; i++) {
    const row = schematicMatrix[i];
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      if (char === "*") {
        let values = [];
        // gather surrounding for numbers to add
        // left
        if (j > 0 && isNum(row[j - 1])) {
          values.push(parseSides(j - 1, 0, row));
        }
        // right
        if (j < row.length - 1 && isNum(row[j + 1])) {
          values.push(parseSides(j + 1, row.length, row));
        }
        // top
        if (i > 0) {
          parseTopBottom(j, schematicMatrix[i - 1], values);
        }
        if (i < schematicMatrix.length - 1) {
          parseTopBottom(j, schematicMatrix[i + 1], values);
        }

        values = values.filter((v) => v > 0);
        if (values.length == 2) {
          result += values[0] * values[1];
        }
      }
    }
  }

  // last answer 70728187 was too low
  return result;
}

calculate().then((result) => console.log(result));
