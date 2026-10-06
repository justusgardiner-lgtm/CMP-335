// check if a word is a palindrome using different algorithms
function wordCheck() {
    // get the word from the input field and the selected algorithm and case sensitivity
    let wordInput = document.getElementById("wordInput").value;
    let Algorithm = document.getElementById("algorithm").value;
    let caseSensitive = document.getElementById("caseSensitive").checked;
    if (wordInput === "") {
        // if the input field is empty, alert the user and return false
        alert("Please enter a word.");
        return false;
    }
    // checks and see if the case sensitivity checkbox is checked, if so, it will use the original word, otherwise it will convert the word to lowercase
    let checkedWord;
    if (caseSensitive) {
        checkedWord = wordInput;
    } else {
        checkedWord = wordInput.toLowerCase();
    }
// checks which algorithm is selected and calls the appropriate function
     if (Algorithm === "1") {
        return paliCheck(checkedWord);
    } else if (Algorithm === "2") {
        return paliCheck2(checkedWord);
    } 
     else if (Algorithm === "3") {
        return paliCheck3(checkedWord);
    }

}
// checks if the word is a palindrome using a two-pointer approach
function paliCheck(checkedWord) {
    let leftIndex = 0;
    let rightIndex = checkedWord.length - 1;
    // loop through the word and compare the characters at the left and right indices, moving towards the center
    while (leftIndex < rightIndex) {
        // if the characters at the left and right indices are not equal, the word is not a palindrome
        if (checkedWord[leftIndex] !== checkedWord[rightIndex]) {
            document.getElementById("result").innerHTML = "The word is not a palindrome.";
            return false;
        }
        // if the characters are equal, move the indices towards the center
        leftIndex++;
        rightIndex--;
    }
    document.getElementById("result").innerHTML = "The word is a palindrome.";
    return true;
}
// checks if the word is a palindrome by reversing the string and comparing it to the original
function paliCheck2(checkedWord) {
    let reversedWord = checkedWord.split("").reverse().join("");
    // compare the reversed string to the original string and return true if they are equal, false otherwise
    if (checkedWord === reversedWord) {
        document.getElementById("result").innerHTML = "The word is a palindrome.";
        return true;
    } else {
        document.getElementById("result").innerHTML = "The word is not a palindrome.";
        return false;
    }
}
// checks if the word is a palindrome using a stack data structure
function paliCheck3(checkedWord) {
    let stack = [];

    // Push all characters onto the stack
    for (let i = 0; i < checkedWord.length; i++) {
        stack.push(checkedWord[i]);
    }

    // Pop characters off the stack to compare with original string
    for (let i = 0; i < checkedWord.length; i++) {
        // If the characters don't match, it's not a palindrome
        if (checkedWord[i] !== stack.pop()) {
            document.getElementById("result").innerHTML = "The word is not a palindrome.";
            return false;
        }
    }

    document.getElementById("result").innerHTML = "The word is a palindrome.";
    return true;
}