import {test, expect} from "@jest/globals";

import {
    isEven, add, divide, palindrome, countVowels, findMax, removeDuplicates
} from "../src/functions";

// Step 3: isEven function tests
test("isEven num even", () => {
  expect(isEven(10)).toBe(true);
});

test("isEven num odd", () => {
  expect(isEven(11)).toBe(false);
});

// Step 4: add function tests
test("palindrome is palindrome", () => {
  expect(palindrome("tacocat")).toBe(true);
});

test("palindrome is not palindrome", () => {
  expect(palindrome("cat")).toBe(false);
});


// Step 5: countVowels function tests
test("countVowels has vowels", () => {
  expect(countVowels("hello world")).toBe(3);
});

test("countVowels has no vowels", () => {
  expect(countVowels("myths")).toBe(0);
});

// // test
// test("countVowels has vowels", () => {
//   expect(countVowels("hello world")).toBe(300);
// });
