var numbers = [1, 2, 3, 123, 12, 33, 2, 6, 7, 66, 34, 23, 67];
var biggerNumber = 0;

for (let index = 0; index < numbers.length; index++) {

    if (numbers[index] > biggerNumber) {
        biggerNumber = numbers[index];
    }
}

document.write(biggerNumber);