// import data
import { menuArray as menuData } from "./data.js";

// Order
const currentOrder = [];

// references to existing DOM elements
const main = document.querySelector("main");
const emptyContent = document.getElementById("empty-content")

// DOM elements
// Main div
const menuContainer = document.createElement("div");
menuContainer.id = "menu";

// appending elements
main.append(menuContainer);

// take data and render them
if (menuData.length !== 0) {
    emptyContent.style.display = "none";
    renderMenu(menuData);
} else {
    console.log("no data");
}

// render menu from an array of objects
function renderMenu(menuData) {
    const currentMenu = menuData.map( menuItem => {
        const {name, ingredients, id, price, emoji} = menuItem
        return `
            <div class="menu-item">
                <div class="menu-item-container">
                    <div class="menu-item-image">
                        ${emoji}
                    </div>
                    <div class="menu-item-info">
                        <div class="menu-item-name">${name}</div>
                        <div class="menu-item-ingredients">${ingredients.join(", ")}</div>
                        <div class="menu-item-price">$${price}</div>
                    </div>
                </div>
                <button class="menu-item-btn" data-id="${id}">+</button>
            </div>
            <hr />
        `;
    }).join("");
    
    menuContainer.innerHTML = currentMenu;
}

// event listener for add button
document.addEventListener("click", (e) => {
    // check if the click target has an item id
    if(e.target.dataset.id) {

        // WRITE a seperate function for handling selection

        console.log(e.target.dataset.id)
        // saving the item object into a variable based on the id of the target
        const itemToAddObj = menuData.filter((item) => {
            console.log(item.id)
            return item.id === parseInt(e.target.dataset.id)
        })
        console.log(itemToAddObj);

        // WRITE a seperate function for converting + adding item to order

        // convert object to order item
        const {name, id, price} = itemToAddObj[0]
        const orderItem = {
            id,
            name,
            price
        }
        console.log(orderItem)
        // add object to order
        currentOrder.push(orderItem);
        console.log(`Current order: ${JSON.stringify(currentOrder)}`)

        // WRITE A SEPERATE RENDER FUNCTION


        // CONTINUE HERE; NEED TO CREATE A NEW CONTAINER DIV FOR 'YOUR ORDER' + MANAGING THE DATA CHANGES TO ADD AND REMOVE ORDER ITEMS
        // Render
        const orderMenu = currentOrder.map( orderItem => { 
            console.log("-----ORDER----")
            const {name, id, price} = orderItem
            return `
                <div class="menu-item">
                    <div class="order-names">
                        <div class="order-item-name">${name}</div>
                        <div class="order-item-remove" data-id="${id}">remove</div>
                    </div>
                    <div class="order-item-price">$${price}</div>
                </div>
            `;
        });
        menuContainer.innerHTML += orderMenu;
    }
})