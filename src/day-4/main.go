package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"strings"
)

func main() {
	fh, err := os.Open("../../inputs/day-4-input")
	if err != nil {
		log.Fatal(err)
	}
	reader := bufio.NewScanner(fh)
	partOneAnswer := partOne(reader)
	fmt.Printf("Answer for part 1 is: %d\n", partOneAnswer)
	fh.Seek(0, io.SeekStart)
	reader = bufio.NewScanner(fh)
	partTwoAnswer := partTwo(reader)
	fmt.Printf("Answer for part 2 is: %d", partTwoAnswer)
}

func toSet(l []string) map[string]struct{} {
	m := make(map[string]struct{}, len(l))
	for _, item := range l {
		m[item] = struct{}{}
	}
	return m
}

func calculatePoints(winningNumbers map[string]struct{}, myNum []string) int {
	var (
		points    = 0
		lastPoint = 0
	)
	for _, numStr := range myNum {
		if _, ok := winningNumbers[numStr]; ok {
			if points < 2 {
				lastPoint = 1
			} else {
				lastPoint = lastPoint * 2
			}
			points += lastPoint
		}
	}
	return points
}

func filter[T comparable](s []T, f func(t T) bool) []T {
	result := []T{}
	for _, item := range s {
		if f(item) {
			result = append(result, item)
		}
	}
	return result
}

func removeSpaces(s string) bool { return len(s) > 0 }

func partOne(reader *bufio.Scanner) int {
	points := 0
	for reader.Scan() {
		line := reader.Text()
		parts := strings.Split(line, ":")
		parts = strings.Split(parts[1], "|")
		winningNumbers := toSet(filter(strings.Split(strings.TrimSpace(parts[0]), " "), removeSpaces))
		myNumbers := filter(strings.Split(strings.TrimSpace(parts[1]), " "), removeSpaces)
		points += calculatePoints(winningNumbers, myNumbers)
	}
	return points
}

func updateStats(cardMatches map[int]int, lineNum, numMatch int) {
	for i := lineNum + 1; i <= lineNum+numMatch; i++ {
		cardMatches[i]++
	}
}

func partTwo(reader *bufio.Scanner) int {
	cardMatches := make(map[int]int, 209)
	lineNum := 1
	for reader.Scan() {
		line := reader.Text()
		parts := strings.Split(line, ":")
		parts = strings.Split(parts[1], "|")
		winningNumbers := toSet(filter(strings.Split(strings.TrimSpace(parts[0]), " "), removeSpaces))
		myNumbers := filter(strings.Split(strings.TrimSpace(parts[1]), " "), removeSpaces)

		matches := 0
		for _, num := range myNumbers {
			if _, ok := winningNumbers[num]; ok {
				matches++
			}
		}

		cardMatches[lineNum]++
		for i := 0; i < cardMatches[lineNum]; i++ {
			updateStats(cardMatches, lineNum, matches)
		}
		lineNum += 1
	}

	total := 0
	for _, v := range cardMatches {
		total += v
	}
	return total
}
