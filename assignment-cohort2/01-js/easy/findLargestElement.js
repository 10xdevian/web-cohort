/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

const input = [3, 7, 2, 9, 1];

function findLargestElement(numbers) {
    let max = numbers[0]; // Assume first element is the largest
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i]; // Update max if a larger number is found
        }
    }
    return max;
}

console.log(findLargestElement(input)); // Output: 9
module.exports = findLargestElement;