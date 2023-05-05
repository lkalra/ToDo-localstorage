//checking if we're using local storage or not
const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//eventlistner on enter button
document.querySelector("#enter").addEventListener("click", () => {
    const item = document.querySelector("#item")
    createItem(item)
})

document.querySelector("#item").addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        const item = document.querySelector("#item")
        createItem(item)
    }
})

//getting only month year and date 
function displayDate(){
    let date = new Date()
    date = date.toString().split(" ")
    date = date[1] + " " + date[2] + " " + date[3] 
    document.querySelector("#date").innerHTML = date 
}

//displaying items on screen 
function displayItems(){
    let items = ""
    for(let i = 0; i < itemsArray.length; i++){
        items += `<div class="item">
                    <div class="input-controller">
                    <textarea disabled>${itemsArray[i]}</textarea>
                    <div class="edit-controller">
                        <i class="fa-solid fa-check deleteBtn"></i>
                        <i class="fa-solid fa-pen-to-square editBtn"></i>
                    </div>
                    </div>
                    <div class="update-controller">
                    <button class="saveBtn">Save</button>
                    <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    document.querySelector(".to-do-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}

//activating delete button
function activateDeleteListeners(){
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => { deleteItem(i) })
    })
}

//activated edit button
function activateEditListeners(){
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => { 
        updateController[i].style.display = "block"
        inputs[i].disabled = false })
    })
}


//activate save button
function activateSaveListeners(){
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
        updateItem(inputs[i].value, i)
        })
    })
}

//activates cancel button
function activateCancelListeners(){
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cB, i) => {
        cB.addEventListener("click", () => {
        updateController[i].style.display = "none"
        inputs[i].disabled = true
        //clicking on cancel will hide both buttons
        inputs[i].style.border = "none"
        })
    })
}

//storing items in array and saving in local storage
function createItem(item){
    itemsArray.push(item.value)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

//deleting item and updating local storage
function deleteItem(i){
    itemsArray.splice(i,1)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}


//updates and saves item & update local storage
function updateItem(text, i){
    itemsArray[i] = text
    localStorage.setItem('items', JSON.stringify(itemsArray))
    location.reload()
}

window.onload = function() {
    displayDate()
    displayItems()
};