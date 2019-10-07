package main

import ("fmt")

func mergeSort(items []int) []int {
  if len(items) <= 1 {
    return items
  } else {
    mid := int(len(items) / 2)
    return merge(mergeSort(items[0:mid]), mergeSort(items[mid:]))
  }
}

func merge(left, right []int) (result []int) {
  result = make([]int, len(left)+len(right))
  i := 0
  for len(left) > 0 && len(right) > 0 {
    if left[0] < right[0] {
      result[i] = left[0]
      left = left[1:]
    } else {
      result[i] = right[0]
      right = right[1:]
    }
    i++
  }
  for j := 0; j < len(left); j++ {
    result[i] = left[j]
    i++
  }
  for j := 0; j < len(right); j++ {
    result[i] = right[j]
    i++
  }
  return
}

func main() {
  slice := []int{9, 4, 8, 2, 7, 1, 6, 4, 0, 5, 9, 3, 8, 2, 6, 3, 5, 8, 2, 7, 3, 9, 4, 0, 5}
  fmt.Println("unsorted: ", slice)
  fmt.Println("sorted:   ", mergeSort(slice))
}

/*
go run merge_sort.go 
unsorted:  [9 4 8 2 7 1 6 4 0 5 9 3 8 2 6 3 5 8 2 7 3 9 4 0 5]
sorted:    [0 0 1 2 2 2 3 3 3 4 4 4 5 5 5 6 6 7 7 8 8 8 9 9 9]
*/
