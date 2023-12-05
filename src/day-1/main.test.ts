import { calculate } from "./main";

describe("Day 1 - Trebuchet tests", () => {
  test("it should be able to calculate value using numbers only", async () => {
    const sample = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"];
    const calibrationValue = await calculate(
      {
        fromFilePath: null,
        fromText: sample.join("\n"),
      },
      false
    );
    expect(calibrationValue).toBe(142);
  });

  test("it should be able to calculate value using numbers and letters", async () => {
    const sample = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ];
    const calibrationValue = await calculate(
      {
        fromFilePath: null,
        fromText: sample.join("\n"),
      },
      true
    );
    expect(calibrationValue).toBe(281);
  });
});
