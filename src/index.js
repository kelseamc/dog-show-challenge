document.addEventListener('DOMContentLoaded', () => {

/************  Dom Elements ************/
const dogTable = document.querySelector("#table-body")
const dogForm = document.querySelector("#dog-form")

/************  Render Functions ************/
function renderDog(dogObj){
    const dogRow = document.createElement("tr")
    dogRow.innerHTML = `
        <td>${dogObj.name}</td> 
        <td>${dogObj.breed}</td>
        <td>${dogObj.sex}</td> 
        <td><button id="${dogObj.id}">Edit</button></td>
    `
    dogTable.append(dogRow)

    dogRow.addEventListener("click", event => {
        if (event.target.tagName === "BUTTON"){
            fillForm(dogObj)
        }      
    })
}


/************  Event Handlers ************/
function fillForm(dogObj){
    dogForm.name.id = dogObj.id
    dogForm.name.value = dogObj.name
    dogForm.breed.value = dogObj.breed
    dogForm.sex.value = dogObj.sex 
}


dogForm.addEventListener("submit", event =>{
    event.preventDefault()
    const dogEdit = {
        name: event.target.name.value,
        breed: event.target.breed.value,
        sex: event.target.sex.value
    }
    const dogId = event.target.name.id
    updateDog(dogId, dogEdit)
   
})

/************  Fetch Functions ************/

function getDogs(){
    dogTable.innerHTML = ""
    fetch('http://localhost:3000/dogs')
    .then(response => response.json())
    .then(dogArray => {
        dogArray.forEach(dog => {
            renderDog(dog)
        })
    })
}


function updateDog(id, dogObj){
    fetch (`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dogObj),
      
    })
    .then(response => response.json())
    .then(updatedDogFromServer =>{
        getDogs()
    })
}

/************  Initialize ************/
getDogs()


})