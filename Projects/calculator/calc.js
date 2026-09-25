var numbers = [];
var minimum;
var maximum;

function RangeSetter() {
  var minimumValue = (document.forms["myForm"]["minimum"].value);
  var maximumValue = (document.forms["myForm"]["maximum"].value);

  if (minimumValue === "" || maximumValue === "") {
    alert("Please enter a minimum and maximum.");
    return false;
  }

  alert(minimum);
  alert(maximum);

  minimum = (minimumValue);
  maximum = Number(maximumValue);

alert(minimum);
alert(Number(minimum));
alert(maximum);
alert(Number(maximum));

  if (minimum > maximum) {
    alert("Please enter a valid minimum and maximum.");
    return false;
  }

  numbers = [];
  updateList();
  return true;
}

function validateANDadd() {
  var newNumberValue = document.forms["myForm"]["newNumber"].value;
  var newNumber = Number(newNumberValue);

alert(minimum);
alert(maximum);


  if (minimum == "" || maximum == "") {
    alert("Please set a range first.");
    return false;
  }
    if (newNumber >= minimum && newNumber <= maximum) {
      numbers.push(newNumber);
      updateList();
      return true;
    } else {
      alert("Please enter a number within the specified range.");
      return false;
    }
  }

function updateList() {
  var table = document.getElementById("myList");
  table.innerHTML = "";

  for (var nums of numbers) {
    var row = table.insertRow();
    row.insertCell().textContent = nums;
  }

  updateStatistics();
}

function updateStatistics() {
  var sum = 0;
  for (var nums of numbers) {
    sum += parseFloat(nums);
  }
  var average = numbers.length > 0 ? sum / numbers.length : 0;
  document.getElementById("statistics").innerHTML = "mean: " + average;

  var median = 0;
    if (numbers.length > 0) {
        var sortedNumbers = [...numbers].sort((a, b) => a - b);
        var middleIndex = Math.floor(sortedNumbers.length / 2);
        if (sortedNumbers.length % 2 === 0) {
            median = (sortedNumbers[middleIndex - 1] + sortedNumbers[middleIndex]) / 2;
        } else {
            median = sortedNumbers[middleIndex];
        }
    }
    document.getElementById("statistics").innerHTML += "<br>median: " + median;

    var mode = 0;
    if (numbers.length > 0) {
        var amountNum = {};
        var highestNum = 0;
        for (var nums of numbers) {
            amountNum[nums] = (amountNum[nums] || 0) + 1;
            if (amountNum[nums] > highestNum) {
                highestNum = amountNum[nums];
                mode = nums;
            }
        }
        document.getElementById("statistics").innerHTML += "<br>mode: " + mode;
    }

}

function clearList() {
  numbers = [];
  updateList();
}
