package main

import (
	"bufio"
	"log"
	"os"
	"strings"
	"testing"
)

func BenchmarkPartOneTest(b *testing.B) {
	fh, err := os.Open("../../inputs/day-4-input")
	if err != nil {
		log.Fatal(err)
	}

	buffer := make([]byte, 5<<6)
	fh.Read(buffer)
	fh.Close()
	reader := bufio.NewScanner(strings.NewReader(string(buffer)))
	for n := 0; n < b.N; n++ {
		partOne(reader)
	}
}

func BenchmarkPartTwoTest(b *testing.B) {
	fh, err := os.Open("../../inputs/day-4-input")
	if err != nil {
		log.Fatal(err)
	}

	buffer := make([]byte, 5<<6)
	fh.Read(buffer)
	fh.Close()
	reader := bufio.NewScanner(strings.NewReader(string(buffer)))
	for n := 0; n < b.N; n++ {
		partTwo(reader)
	}
}

func TestPartOne(t *testing.T) {
	fh, err := os.Open("../../inputs/day-4-input")
	if err != nil {
		log.Fatal(err)
	}
	reader := bufio.NewScanner(fh)
	partOneAnswer := partOne(reader)
	want := 21158
	if partOneAnswer != want {
		t.Errorf("want %d, got %d", want, partOneAnswer)
	}
}

func TestPartTwo(t *testing.T) {
	fh, err := os.Open("../../inputs/day-4-input")
	if err != nil {
		log.Fatal(err)
	}
	reader := bufio.NewScanner(fh)
	partTwoAnswer := partTwo(reader)
	want := 6050769
	if partTwoAnswer != want {
		t.Errorf("want %d, got %d", want, partTwoAnswer)
	}
}
