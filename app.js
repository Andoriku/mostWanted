/*
Build all of your functions for displaying and gathering information below (GUI).
*/
//----------------------------------------initial prompt-------------------------------------------------------------//

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    var person = searchByName(people);
    mainMenu(person, people);
    break;
    case 'no':
    var person = executeSearch(people);
    mainMenu(person, people);
    break;
    default:
    app(people); // restart app
    break;
  }
}

//---------------------------------------prompt after person found---------------------------------------------------//

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPersonInfo(person);
    break;
    case "family":
    displayPersonFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

//---------------------------------------search function-------------------------------------------------------------//

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  for (var i = 0; i < people.length; i++) {
    if ((firstName + lastName) === (people[i].firstName + people[i].lastName)) {
      var person = people[i];
      return person;
    }
  }
}
function executeSearch(people) {

function searchByTrait(people){
  var searchValue = promptFor("enter their age, height, weight, occupation, and eye color. Each entry should be followed by a ',' with no spaces. If you dont know one of them, just type a '0'.",chars);
  var searchByTrait = searchValue.split(",");
  return searchByTrait;
}
function executeSearchHeight(people,searchCrit) {
  var listOfPeople = people;
    if (searchCrit[1] == 0) {
      return listOfPeople;
    }
    else {
  var newList = listOfPeople.filter(function(person){ return person.height == searchCrit[1]});
    return newList;
  }
}
function executeSearchWeight(newList,searchCrit) {
  var listOfPeople = newList;
  if (searchCrit[2] == 0) {
    return listOfPeople;
  }
  else {
  var newList = listOfPeople.filter(function(person){ return person.weight == searchCrit[2]});
    return newList;
  }
}
function executeSearchOccupation(newList,searchCrit) {
  var listOfPeople = newList;
  if (searchCrit[3] == 0) {
    return listOfPeople;
  }
  else {
  var newList = listOfPeople.filter(function(person){ return person.occupation == searchCrit[3]});
    return newList;
  }
}
function executeSearchEyeColor(newList,searchCrit) {
  var listOfPeople = newList;
  if (searchCrit[1] == 0) {
    return listOfPeople;
  }
  else {
  var newList = listOfPeople.filter(function(person){ return person.eyeColor == searchCrit[4]});
    return newList;
  }
}
var searchCrit = searchByTrait(people);
var round1 = executeSearchHeight(people,searchCrit);
var round2 = executeSearchWeight(round1,searchCrit);
var round3 = executeSearchOccupation(round2,searchCrit);
var newList = executeSearchEyeColor(round3,searchCrit);
return newList;
}
//---------------------------------------displaying the array--------------------------------------------------------//

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPersonInfo(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "PERSON INFORMATION" + "\n" + "ID: " + person.id + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height  + "\"" + "\n";
  personInfo += "Weight: " + person.weight + " Lbs" + "\n"; 
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

function displayPersonFamily(person, people) {
  var personFamily =  "PERSON FAMILY" + "\n";

  var spouseIdName = getSpouse(person, people);
  var noSpouse = "This person is not married." + "\n";
    if (spouseIdName === undefined) {
        personFamily += noSpouse;
      } else {
         personFamily += person.firstName + "\'s " + "spouse is " + spouseIdName + "\n";
      }

  var childName = getChildName(person, people);
  var noChild = "This person does not have children." + "\n";
    if (childName === undefined){
        personFamily += noChild;
      } else {
        personFamily += person.firstName + "\'s " + "child is " + childName + "\n";
      }

  var siblingNameArray = getSiblings(person, people);
  var noSiblings = "This person does not have any siblings." + "\n";
    if (siblingNameArray === undefined){
        personFamily += noSiblings;
      } else {
        personFamily += person.firstName + "\'s " + "sibling(s) are" + siblingNameArray.toString() + "." + "\n";
      }

  alert(personFamily);
}

function getSpouse(person, people) {
  for (var i = 0; i < people.length; i++){
     if ((person.currentSpouse) === (people[i].id)) {
        var spouseIdName = (people[i].firstName + " " + people[i].lastName);
    } 
  }
  return spouseIdName;
}

function getChildName (person, people) {
  for (var i = 0; i < people.length; i++){
    if ((person.id) === (people[i].parents[0] || people[i].parents[1])) {
      var childName = (people[i].firstName + " " + people[i].lastName);
    }
  }
  return childName;
}

function getSiblings (person, people) {
  var siblingNameArray = []
  for (var i = 0; i < people.length; i++){
      if ((person.parents[0] || person.parents[1]) === (people[i].parents[0] || people[i].parents[1])){ 
          if(person.id !== people[i].id) {
            siblingNameArray.push(" " + people[i].firstName + " " + people[i].lastName);
              
         }
      } 
    } return siblingNameArray;
  } 

//---------------------------------------prompt functions------------------------------------------------------------//

// function that prompts and validates user input (can be used as a prompt for any new input inquiries)
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function any input into promptFor() from user is valid input
function chars(input){
  return true; // default validation only
}


//-----------------------------------Get Info Functions-----------------------------------------------------------------//


