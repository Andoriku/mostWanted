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
    var filteredPeople = executeSearch(people);
    var person = narrowItDown(filteredPeople);

    function narrowItDown(filteredPeople,listOfNames) {
      var allNames = allNames(filteredPeople);
      function allNames(filteredPeople) {
        for (var i = 0; i < filteredPeople.length; i++) {
          var listOfNames = (filteredPeople[i].firstName + " " + filteredPeople[i].lastName + "\n" + listOfNames);
        }
        listOfNames= listOfNames.slice(listOfNames.lenght,(listOfNames.length-10));
        return listOfNames;
      }
      var pickTheOne = prompt("Here is everyone who matched your search: " + "\n" + allNames + "\n" + "Pick the Person you are looking for by their first name.", "First Name Here")
      for (var i = 0; i < filteredPeople.length;)
      if (pickTheOne == filteredPeople[i].firstName) {
        var person = filteredPeople[i];
        return person;
      }
      else {
        i++;
      }
    }
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
    displayPerson(person);
    break;
    case "family":
    // TODO: get person's family
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

//-------------------------------------------search Name function----------------------------------------------------//

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

//------------------------------------------Search Trait Function---------------------------------------------------//

function executeSearch(people) {

function searchByTrait(people){                    //gets the search peramiters from user.
  var searchValue = promptFor("enter their age, height, weight, occupation, and eye color. Each entry should be followed by a ',' with no spaces. If you dont know one of them, just type a '0'.",chars);
  var searchByTrait = searchValue.split(",");
  return searchByTrait;
}
function executeSearchHeight(people,searchCrit) { //height filter; returns list.
  var listOfPeople = people;
    if (searchCrit[1] == 0) {
      return listOfPeople;
    }
    else {
  var newList = listOfPeople.filter(function(person){ return person.height == searchCrit[1]});
    return newList;
  }
}
function executeSearchWeight(newList,searchCrit) { //weight filter; returns updated list.
  var listOfPeople = newList;
  if (searchCrit[2] == 0) {
    return listOfPeople;
  }
  else {
  var newList = listOfPeople.filter(function(person){ return person.weight == searchCrit[2]});
    return newList;
  }
}
function executeSearchOccupation(newList,searchCrit) { //occupation filter; returns updated list.
  var listOfPeople = newList;
  if (searchCrit[3] == 0) {
    return listOfPeople;
  }
  else {
  var newList = listOfPeople.filter(function(person){ return person.occupation == searchCrit[3]});
    return newList;
  }
}
function executeSearchEyeColor(newList,searchCrit) { //eye color filter; returns updated list.
  var listOfPeople = newList;
  if (searchCrit[4] == 0) {
    return listOfPeople;
  }
  else {
  var newList = listOfPeople.filter(function(person){ return person.eyeColor == searchCrit[4]});
    return newList;
  }
}
var searchCrit = searchByTrait(people);
var heightSearch = executeSearchHeight(people,searchCrit);
var weightSearch = executeSearchWeight(heightSearch,searchCrit);
var occupationSearch = executeSearchOccupation(weightSearch,searchCrit);
var filteredPeople = executeSearchEyeColor(occupationSearch,searchCrit);

return filteredPeople;
}
//---------------------------------------displaying the array--------------------------------------------------------//

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
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
