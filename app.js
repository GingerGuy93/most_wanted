'use strict';
let sortedPeople = [];

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

function getDesendents () {
    let id = sortedPeople[0].id;
    let filteredPeople = people.filter(function (person) {
        if(person.parents[0] === id || person.parents[1] === id){
            return true;
        }
        return false;
    });
    updateTable(filteredPeople);
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