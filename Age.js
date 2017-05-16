var age =people.map(function(person) {
  for (var i = 0; i<people.length; i++) {
    var birthday = new date(people[i].object[4]);
    var today = new date();
  var age = today.getFullYear() - birthday.getFullYear();
  return age;
}
}
var pickTheOne = prompt("Here is everyone who matched your search: " + "\n" + filteredPeople + "\n" + "Pick one by their first name.", "First Name Here")
}

function varifyTrait(people,newList) {
  var i=0;
  do {
  var newListId = newList[i].id;
    for (var l = 0; l < people.length; i++) {
      if (newListId === people[l].id) {
        var person = people[l];
        }
      }
      i++;
    }
    while (i < newList.lenght);
return person;
}



function executeSearchAge(people, searchCrit,age) {
  var search = searchCrit[0];
  var listOfPeople = people;
  var age = age();

    if (search == "n/a" || "0") {
      return listOfPeople;
    }
    else {
  var newList = listOfPeople.filter(function(age){ return age == searchCrit[0]});
    return newList;
  }
}


function ageList(people) {
  var listOfAges = new Array();
for (var i =0; i < people.length; i++) {
  var birthday = new Date(people[i].dob);
  var today = new Date();
  var diffrence = today - birthday;
  var age = (Math.floor(diffrence/31557600000));
  listOfAges[i] = age;
  }
return listOfAges;
}
