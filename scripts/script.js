//////////////////////////////////////////ASSIGNMENT CODE//////////////////////////////////////////////

var generateBtn = document.querySelector("#generate"); //find the generate button

/*the data array can be modified flexibly. Simply add a name for a character set followed by two
numbers. The first number is the Unicode character # to begin adding to that charset. the second number
is one less than the total number of characters you would like to include in that set.*/
var data = ["lower case letters", 97, 25, "upper case letters", 65, 25, "numbers", 48, 9, "special characters", 33, 13, "special characters", 58, 5, "special characters", 91, 5];
var charSets = [];
var fullCharSet = [];
var minCharOn = false;
var password = "";
var passLength;
//Generate character sets based on data variable
for (let i = 0; i < (data.length / 3); i++) {
  const index = i * 3;
  charSets[i] = {
    name: data[index],
    startUC: data[index + 1],
    range: data[index + 2],
    array: [],
    on: false,
    popArray: function () {
      for (let j = 0; j <= this.range; j++) {
        this.array[j] = String.fromCharCode(this.startUC + j);
      }
    }
  }
  charSets[i].popArray();
  console.log(charSets[i].array);
}
//console.log(charSets);

/////////////////////////////////////////////FUNCTIONS////////////////////////////////////////////////////

/* combine any number of character sets into one character set. useful for combining charsets whose
unicode numbers are nonsequential */
function combineArrays() { //this function takes the charSets index number of arrays you wish to combine
  for (let m = 1; m < arguments.length; m++) {
    //the first argument is the array into which other arrays are concat-ed
    charSets[arguments[0]].array = charSets[arguments[0]].array.concat(charSets[arguments[m]].array);
    delete charSets[arguments[m]]; //delete the charSet objects containing arrays that were added the first
  }
}

//The callback function that is used to turn various character sets on and off
enableAndCombineArrs = function (element) {
  element.on = false;
  element.on = confirm("Would you like to enable and require a minimum of one " + element.name + "?");
  if (element.on) {
    fullCharSet = fullCharSet.concat(element.array);
    minCharOn = true;
  }
}

//Allows the user to select which character Sets to use
function askUser() {
  //reset values
  password = "";
  fullCharSet.splice(0, fullCharSet.length);
  //console.log(fullCharSet);
  minCharOn = false;
  do {
    charSets.forEach(enableAndCombineArrs);
    if (!minCharOn) alert("Please select at least one character type."); //if they have not selected at least one type, continue looping
  } while (!minCharOn)
  //console.log(fullCharSet);
  //ask the user for a password length
  do {
    passLength = prompt("How many characters long should the password be? Available range is 8 to 128.");
    passLength = parseInt(passLength);
    /*NaN is the only value that is not equal to itself. If the first letter of the users' input is not a number,
    parseInt returns Nan, and passLength !== passLengtwill evaluate to true. This statement also evaluates
    whether the number is in the available range of 8 to 128.*/
    if (passLength !== passLength || passLength < 8 || passLength > 128) alert("Please enter a valid integer value within the range.");
  } while (passLength !== passLength || passLength < 8 || passLength > 128) //check for NaN and range again
}

//for each charSet, if it is on, add one of those characters randomly to the password.
addToPass = function (element) {
  if (element.on) {
    password += element.array[Math.floor(Math.random() * element.array.length)]
  }
}

/*declare a variable to determine the starting length of the password, then add characters randomly from the
full character set*/
function completePass() {
  var startLength = password.length;
  for (n = 0; n < (passLength - startLength); n++) {
    const randNum = Math.floor(Math.random() * fullCharSet.length);
    password += fullCharSet[randNum];
  }
}

//Finally, randomize the order of the characters selected so that the required characters are not always in the same order.
function reOrderPass() {
  var passElems = password.split('');
  var usedElems = [];
  var currentElem;
  password = "";
  for (o = 0; o < passElems.length; o++) {
    do {
      currentElem = Math.floor(Math.random() * passElems.length);
    } while (usedElems.includes(currentElem))
    password += passElems[currentElem];
    usedElems[o] = currentElem;
  }
}

/*asks the user for their input, adds required characters to password, fills out the rest of the password
with random characters from the fullCharSet, then randomly reorders these characters*/
function generatePassword() {
  askUser();
  charSets.forEach(addToPass);
  completePass();
  reOrderPass();
  //console.log(password);
}
// Write password to the #password input
function writePassword() {
  generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
////////////////////////////////////////CALLING FUNCTIONS ON CLICK/////////////////////////////////////
//Make the special character sets into one
console.log(fullCharSet);
combineArrays(3, 4, 5);
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
