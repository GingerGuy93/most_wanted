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
    let gender = document.forms['genderButton']['gender'].value;
    clearSearch();
    searchByGender(gender);
}

function updateTable(array) { 
    if(array.length > 0){
        getPeople(array); 
        sortedPeople = array  
    }else{
       alert('Sorry, looks like there is no one with that description.');
    }
}

function getColor (selectedcolor) {
    let color = selectedcolor;
    searchByColor(color);
}

function getProfession (selectedPro) {
    let profession = selectedPro;
    searchByProfession(profession);
}

function getHeight (selectedHeight) {
    let height = selectedHeighargumarrentst;
    searchByHeight(height);
}


function searchByProfession(profession) { 
    clearTable();
    let filteredPeople = [];
    if(sortedPeople.length === 0) {
        filteredPeople = people.filter(function (person) {
            if(person.occupation === profession){
                return true;
            }
            return false;
        });  
    } else {
    filteredPeople = sortedPeople.filter(function (person) {
        if(person.occupation === profession){
            return true;
        }
        return false;
        });
    }
    
    updateTable(filteredPeople);
}

function searchByGender(gender) { 
    clearTable();
    let filteredPeople = [];
    if(sortedPeople.length === 0) {
        filteredPeople = people.filter(function (person) {
            if(person.gender === gender){
                return true;
            }
            return false;
        });  
    } else {
        filteredPeople = sortedPeople.filter(function (person) {
        if(person.gender === gender){
            return true;
        }
        return false;
        });
    }
    
    updateTable(filteredPeople)
}


function getHeight (minHeight, maxHeight) {
    let minCompare = minHeight;
    let maxCompare = maxHeight;
    searchByHeight(minCompare, maxCompare);
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

function searchByColor(color){
    clearTable();
    let filteredPeople = [];
    if(sortedPeople.length === 0) {
        filteredPeople = people.filter(function (person) {
            if(person.eyeColor === color){
                return true;
            }
            return false;
        });  
    } else {
    filteredPeople = sortedPeople.filter(function (person) {
        if(person.eyeColor === color){
            return true;
        }
        return false;
        });
    }
    updateTable(filteredPeople)
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
