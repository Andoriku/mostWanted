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
    app(people);
    break;
  }
}
function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendents'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPersonInfo(person, people);
    return mainMenu(person, people);
    break;
    case "family":
    displayPersonFamily(person, people);
    return mainMenu(person, people);
    break;
    case "descendents":
    displayDescendents(person, people);
    return mainMenu(person, people);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return;
    default:
    return mainMenu(person, people);
  }
}

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
  var searchValue = promptFor("enter their age, height, weight, occupation, and eye color. Each entry should be followed by a ',' with no spaces. If you dont know one of them, just type a 'n/a' or '0'.",chars);
  var searchByTrait = searchValue.split(",");
  return searchByTrait;
}

function executeSearchAge(people,searchCrit) {
  var listOfPeople = people;
    if (searchCrit[0] == "0") {
      return listOfPeople;
    }
    else if (searchCrit[0] == "n/a") {
      return listOfPeople;
    }
    else {
    var ageFilterList = listOfPeople.filter(function(findAge,i,people){
                    var birthday = new Date(people[i].dob);
                    var today = new Date();
                    var difference = today - birthday;
                    var age = (Math.floor(difference/31557600000));
                    if (age == searchCrit[0]) {
                      return people[i];
                    }
                    else {
                      i++;
                    }
                  });
    return ageFilterList;
}
}

function executeSearchHeight(ageFilterList,searchCrit) {
  var listOfPeople = ageFilterList;
    if (searchCrit[1] == "0") {
      return listOfPeople;
    }
    else if (searchCrit[1] == "n/a") {
      return listOfPeople;
    }
    else {
  var heightFilterList = listOfPeople.filter(function(person){ return person.height == searchCrit[1]});
    return heightFilterList;
  }
}

function executeSearchWeight(heightFilterList,searchCrit) {
  var listOfPeople = heightFilterList;
  if (searchCrit[2] == "0") {
    return listOfPeople;
  }
  else if (searchCrit[2] == "n/a") {
    return listOfPeople;
  }
  else {
  var weightFilterList = listOfPeople.filter(function(person){ return person.weight == searchCrit[2]});
    return weightFilterList;
  }
}

function executeSearchOccupation(weightFilterList,searchCrit) {
  var listOfPeople = weightFilterList;
  if (searchCrit[3] == "0") {
    return listOfPeople;
  }
  else if (searchCrit[3] == "n/a") {
    return listOfPeople;
  }
  else {
  var occupationFilterList = listOfPeople.filter(function(person){ return person.occupation == searchCrit[3]});
    return occupationFilterList;
  }
}

function executeSearchEyeColor(occupationFilterList,searchCrit) {
  var listOfPeople = occupationFilterList;
  if (searchCrit[4] == "0") {
    return listOfPeople;
  }
  else if (searchCrit[4] == "n/a") {
    return listOfPeople;
  }
  else {
  var eyeColorFilterList = listOfPeople.filter(function(person){ return person.eyeColor == searchCrit[4]});
    return eyeColorFilterList;
  }
}

var searchCrit = searchByTrait(people);
var ageSearch = executeSearchAge(people,searchCrit);
var heightSearch = executeSearchHeight(ageSearch,searchCrit);
var weightSearch = executeSearchWeight(heightSearch,searchCrit);
var occupationSearch = executeSearchOccupation(weightSearch,searchCrit);
var filteredPeople = executeSearchEyeColor(occupationSearch,searchCrit);

return filteredPeople;

}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPersonInfo(person, people){
  var personInfo = person.firstName + " " + person.lastName + "\'s information" + "\n" + "\n" + "ID: " + person.id + "\n" ;
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Height: " + person.height  + "\"" + "\n";
  personInfo += "Weight: " + person.weight + " Lbs" + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";

  alert(personInfo);
}

function displayPersonFamily(person, people) {
  var personFamily = person.firstName + "\'s Family Members are:" + "\n";

  var spouseIdName = getSpouse(person, people);
  var noSpouse = "This person is not married." + "\n";
    if (spouseIdName === undefined || 0 || null) {
        personFamily += noSpouse;
      } else {
         personFamily += person.firstName + "\'s " + "spouse is " + spouseIdName + "\n";
      }

  var childName = getChildName(person, people);
  var noChild = "This person does not have children." + "\n";
    if (childName.length === 0){
        personFamily += noChild;
      } else {
        personFamily += person.firstName + "\'s " + "child(ren) are " + childName + "\n";

      }

  var siblingNameArray = getSiblings(person, people);
  var noSiblings = "This person does not have any siblings." + "\n";
    if (siblingNameArray === undefined || 0 || null){
        personFamily += noSiblings;
      }
        else if (siblingNameArray.length === 0){
            personFamily += noSiblings;
        }
          else {
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
  var childName = [];
  for (var i = 0; i < people.length; i++){
    if (person.id === people[i].parents[0]){
      var childNameArray = (people[i].firstName + " " + people[i].lastName);
        childName.push(" " + people[i].firstName + " " + people[i].lastName);
     }
       else if (person.id === people[i].parents[1]) {
          var childNameArray = (people[i].firstName + " " + people[i].lastName);
           childName.push(" " + people[i].firstName + " " + people[i].lastName);
      }
  }
  return childName;
}

function getSiblings (person, people) {
  var siblingNameArray = [];
  for (var i = 0; i < people.length; i++){
    if (person.parents.length ===  0) {
        siblingNameArray = undefined;
        return siblingNameArray;
    }
     else if ((person.parents[0] || person.parents[1]) === (people[i].parents[0] || people[i].parents[1])){
          if(person.id !== people[i].id) {
            siblingNameArray.push(" " + people[i].firstName + " " + people[i].lastName);

         }
      }
    } return siblingNameArray;
  }

function displayDescendents(person, people){
  function findDescendents(person, people) {
    var filteredDescendents = people.filter(function(getdescendents, i, people) {
        if (person.id === people[i].parents[0]) {
          return (people[i].firstName + " " + people[i].lastName);
          } else if (person.id === people[i].parents[1]){
              return (people[i].firstName + " " + people[i].lastName);
          } else {
            i++;
          }
      });
            var descendents = []
             for(var i = 0; i < filteredDescendents.length; i++) {
              var descendentNames = " " + filteredDescendents[i].firstName + " " + filteredDescendents[i].lastName;
              descendents.push(descendentNames);
                  }
               return descendents;
    }
      var NoDescendents = "This person does not have any descendents."
      var descendents = findDescendents(person, people);
        if (descendents.length === 0) {
            alert(NoDescendents);
        } else {
      alert("These are " + person.firstName + "\'s descendents: " + "\n" + descendents);
    }
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
function chars(input){
  return true;
}
