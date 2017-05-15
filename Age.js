function getAge(people) {
  var birthday = new date(people.object[4]);
  var today = new date();
  var age = today.getFullYear() - birthday.getFullYear();
  return age;
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
