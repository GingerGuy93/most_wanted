'use strict';
let sortedPeople = [];
let images = [];

function clearTable() { 
    document.getElementById('table-body').innerHTML= "";
}
function clearSearch() { 
    sortedPeople = []
    document.getElementById('table-body').innerHTML= "";
}

function getGender(){
    let selectedGender = document.forms['genderButton']['gender'].value;
    searchByTrait('gender', selectedGender);
}

function updateTable(array) { 
    if(array.length > 0){
        getPeople(array); 
        sortedPeople = array  
    }
    
}

function getTrait (keyvalue, selection) {
    let key = keyvalue
    let value = selection;
    searchByTrait(key, value);
}

function getHeight (minHeight, maxHeight) {
    let minCompare = minHeight;
    let maxCompare = maxHeight;
    searchByHeight(minCompare, maxCompare);
}

function searchByTrait(keyvalue, value) { 
    clearTable();
    let filteredPeople = [];
    if(sortedPeople.length === 0) {
        filteredPeople = people.filter(function (person) {
            if(person[keyvalue] === value){
                return true;
            }
            return false;
        });  
    } else {
    filteredPeople = sortedPeople.filter(function (person) {
        if(person[keyvalue] === value){
            return true;
        }
        return false;
        });
    }
    
    updateTable(filteredPeople);
}



function searchByHeight(min, max){
    clearTable()
    let filteredPeople = [];
    if(sortedPeople.length === 0){
    filteredPeople = people.filter(function (person) {
        if(person.height >= min && person.height <= max){
            return true;
        }
        return false;
    });
    } else { 
        filteredPeople = sortedPeople.filter(function (person) {
            if(person.height >= min && person.height <= max){
                return true;
            }
            return false;
            });
    }
    updateTable(filteredPeople);
}


function searchByName(){
    clearTable();
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['nameForm']['fname'].value;
    let lastNameInput = document.forms['nameForm']['lname'].value;

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    let filteredPeople = []
    if(sortedPeople.length === 0) {
        filteredPeople = people.filter(function (person) {
            if(person.firstName === firstNameInput && person.lastName === lastNameInput){
                return true;
            }
            return false;
        });  
    } else {
    filteredPeople = sortedPeople.filter(function (person) {
        if(person.firstName === firstNameInput && person.lastName === lastNameInput){
            return true;
        }
        return false;
        });
    }

    updateTable(filteredPeople);
}

function getDesendents (num) {
    let id = sortedPeople[0].id;
    let endNum = people.length;
    let filteredPeople = []
    if (num < endNum) {
        if(people[num].parents[0] === id || people[num].parents[1] === id){
            filteredPeople.push(people[num])
        }
        getDesendents(num + 1)
    }
    if (filteredPeople.length > 0){
    updateTable(filteredPeople);
    }
}




function getFamily () {
    clearTable()
    let id = sortedPeople[0].id;
    let lName = sortedPeople[0].lastName
    console.log(lName);
    let filteredPeople = people.filter(function (person) {
        if(person.lastName === lName){
            if(person.parents[0] === id || person.parents[1] === id){
                person.relation = 'child';
            }
            else if (person.id === sortedPeople[0].currentSpouse ){
                person.relation = 'spouse';
            }
            else if (person.parents.length == 0 && person.id !== sortedPeople[0].currentSpouse){
                person.relation = 'parent';
            } else {
                person.relation = 'in-law';
            }
            
            return true;
        }
        
        return false;
    });
    updateTable(filteredPeople);
}


function getGallery(array) {
    let num = 1; 
    for(let x = 0; x < people.length; x++) {     
        console.log(num);
        people[x].image = `images/${num}.jpeg`
        num += 1
    }
	let table = document.getElementById('gallery-body');
    
	for(let i = 0; i < array.length; i++) { 
        let row = document.createElement('tr');
		let characteristics =  ["firstName", "lastName", "occupation", "image"];
        
		for (let j = 0; j < characteristics.length; j++){
            let cell = document.createElement('td');
			cell.setAttribute('id', 'pics');
			let attribute = characteristics[j]
            if (attribute == "image") {
                let pic = document.createElement('img')
                pic.setAttribute('src', `${array[i][attribute]}`)
                row.appendChild(cell);
                cell.appendChild(pic);
            }else {
                cell.innerHTML = array[i][attribute];
			    row.appendChild(cell);
            }
            table.appendChild(row);
		}
	}
}

function changeUserPic(array) {
    let picturePrompt = prompt("Enter HTML for new user picture");
    
	let image = document.getElementById('gallery-body');
    
	for(let i = 0; i < array.length; i++) { 
        let row = document.createElement('tr');
		let characteristics =  ["firstName", "lastName", "occupation", "image"];
        
        
		for (let j = 0; j < characteristics.length; j++){
            let cell = document.createElement('td');
			cell.setAttribute('id', 'pics');
			let attribute = characteristics[j]
            if (attribute == "image") {
                let pic = document.createElement('img')
                pic.setAttribute('src', `${picturePrompt}`)
                row.appendChild(cell);
                cell.appendChild(pic);
            }else {
                cell.innerHTML = array[i][attribute];
			    row.appendChild(cell);
            }
            image.appendChild(row);
		}
	}
}


function changeSpouse () {
    clearTable();
    for (let i = 0; i < people.length; i++) {
    let fName = people[i].firstName;
    let lName = people[i].lastName;
    let spouse = people[i].currentSpouse;
    console.log(spouse);
    let filteredPeople = people.filter(function (person) {
        if(spouse === person.id){
            people[i].currentSpouse = person.firstName + " " + person.lastName;
            return true;
        
        }
    return false;
    
    });
    
}
updateTable(people);
}
  
function spouse(){
    getPeople(people);
    changeSpouse();
    changeParent();
}

function deletePerson(index) { 
    console.log(index, index + 1 );
    people.splice(index, index + 1)
    console.log(people);
    clearTable();
    updateTable(people);
}

function changeParent () {
    clearTable();
    for (let i = 0; i < people.length; i++) {
    let fName = people[i].firstName;
    let lName = people[i].lastName;
    let parent1 = people[i].parents[0];
    let parent2 = people[i].parents[1];
    console.log(spouse);
    let filteredPeople = people.filter(function (person) {
        if(parent1 === person.id){
            people[i].parents[0] = person.firstName + " " + person.lastName;
        }
        else if (parent2 === person.id) {
            people[i].parents[1] = person.firstName + " " + person.lastName;
            return true;
        }
    return false;
    });
}
updateTable(people);
}

function editPerson(index) { 
    let newId = prompt("Enter new ID:")
    let newFname = prompt("Enter new first name:")
    let newLname = prompt("Enter new last name:")
    let newGender = prompt("Enter new gender:")
    let newDOB = prompt("Enter new date of birth:")
    let newheight = prompt("Enter new height in inches:")
    let newWeight = prompt("Enter new weigt:")
    let newEyeColor = prompt("Enter new eye color:")
    let newOccupation = prompt("Enter new occupation:")
    let newparents = prompt("Enter new parents separated by comma:").split(',')
    let newcurrentSpouse = prompt("Enter new spouse:")

    people[index].id = newId;
    people[index].firstName = newFname;
    people[index].lastName = newLname;
    people[index].gender = newGender;
    people[index].dob = newDOB;
    people[index].height = newheight;
    people[index].weight = newWeight;
    people[index].eyeColor = newEyeColor;
    people[index].occupation = newOccupation;
    people[index].parents = newparents;
    people[index].currentSpouse = newcurrentSpouse;
    console.log(people[index])
    clearTable();
    updateTable(people);
    
}