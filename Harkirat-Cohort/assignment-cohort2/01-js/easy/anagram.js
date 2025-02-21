/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/
function isAnagram(str1, str2) {
  // Convert both strings to lowercase and remove non-alphanumeric characters
  str1 = str1.toLowerCase().replace(/[^a-z0-9]/g, '');
  str2 = str2.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // If lengths don't match, they can't be anagrams
  if (str1.length !== str2.length) return false;
  
  // Sort the characters of both strings and compare them
  return str1.split('').sort().join('') === str2.split('').sort().join('');
}

// Example usage
// console.log(isAnagram("spar", "rasp")); // true
// console.log(isAnagram("hello", "world")); // false

module.exports = isAnagram;
