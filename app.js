'use strict';
let sortedPeople = [];

function clearTable() { 
    document.getElementById('table-body').innerHTML= "";
}

function getColor (selectedcolor) {
    let color = selectedcolor;
    searchByColor(color)
}

function getProfession (selectedPro) {
    let profession = selectedPro;
    searchByProfession(profession)
}

function searchByProfession(profession) { 
    clearTable()
    let filteredPeople = sortedPeople.filter(function (person) {
        if(person.occupation === profession){
            return true;
        }
        return false;
    });
    
    // Rather than console logging, you need to append the filteredPeople to a table.
    if(filteredPeople.length > 0){
        getPeople(filteredPeople); 
        sortedPeople = filteredPeople  
    }else{
        console.log('Sorry, looks like there is no one with that name.');
    }
}
function getHeight (selectedHeight) {
    let height = selectedHeight
    searchByHeight(height)
}

function searchByHeight(height){
    clearTable()
    let filteredPeople = people.filter(function (person) {
        if(person.height === height){
            return true;
        }
        return false;
    }
    )};


function searchByColor(color){
    clearTable()
    let filteredPeople = people.filter(function (person) {
        if(person.eyeColor === color){
            return true;
        }
        return false;
    });
    
    // Rather than console logging, you need to append the filteredPeople to a table.
    if(filteredPeople.length > 0){
        getPeople(filteredPeople);
        sortedPeople = filteredPeople;
        console.log(sortedPeople);   
    }else{
        console.log('Sorry, looks like there is no one with that name.');
    }
}


function searchByName(){
    clearTable()
    // Grabbing the values from our nameForm form and inputs.
    let firstNameInput = document.forms['nameForm']['fname'].value;
    let lastNameInput = document.forms['nameForm']['lname'].value;

    // "people" is coming from the data.js file. We have access to it within this JavaScript file.
    let filteredPeople = people.filter(function (person) {
        if(person.firstName === firstNameInput && person.lastName === lastNameInput){
            return true;
        }
        return false;
    });
    
    // Rather than console logging, you need to append the filteredPeople to a table.
    if(filteredPeople.length > 0){
        getPeople(filteredPeople);
    }else{
        console.log('Sorry, looks like there is no one with that name.');
    }
}
