package main

import (
	"fmt"
	"math"
)

func main() {
	p1 := partOne()
	fmt.Printf("Answer for part one is: %d", p1)
	p2 := partTwo()
	fmt.Printf("Answer for part two is: %d", p2)
}

func partOne() int {
	inputs := map[int]int{
		49: 356,
		87: 1378,
		78: 1502,
		95: 1882,
	}
	possibilities := [4]int{}
	idx := 0
	for time, distance := range inputs {
		for rate := 1; rate < time; rate++ {
			// equivalent to x(t - x) = y => -x^2 + tx - y = 0
			// to find the two points of interests
			distanceCovered := rate * (time - rate)
			if distanceCovered > distance {
				possibilities[idx]++
			}
		}
		idx++
	}
	fmt.Println(possibilities)
	return possibilities[0] * possibilities[1] * possibilities[2] * possibilities[3]
}

func partTwo() int {
	a := -1
	b := 49877895
	c := -356137815021882

	discriminant := (b * b) - (4 * a * c)
	leftBound := (-b - int(math.Sqrt(float64(discriminant)+0.5))) / (2 * a)
	rightBound := (-b + int(math.Sqrt(float64(discriminant)+0.5))) / (2 * a)
	fmt.Printf("\nleft: %d\nright: %d\n", leftBound, rightBound)
	return leftBound - rightBound
}
