// import data
import { menuArray as menuData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Order array
const currentOrder = [];

// Order total
const totalPrice = 0;

// references to existing DOM elements
const main = document.querySelector("main");
const emptyContent = document.getElementById("empty-content")

// DOM elements
// Menu div container
const menuContainer = document.createElement("div");
menuContainer.id = "menu";
const orderContainer = document.createElement("div");
orderContainer.id = "order";
const orderHeader = document.createElement("h2");
orderHeader.id = "orderHeader";
orderHeader.textContent = "Your order";
const orderItems = document.createElement("div");
orderItems.id = "orderItems";
const priceDivider = document.createElement("hr");
priceDivider.id = "priceDivider";
const orderTotal = document.createElement("div");
orderTotal.id = "orderTotal"
orderTotal.innerHTML = `
    <div class="order-label">Total price:</div>
    <div class="order-price">$${totalPrice}</div>
`;

// appending elements
main.append(menuContainer);

// Check if there is data. If so, render
if (menuData.length !== 0) {
    emptyContent.style.display = "none";
    initialRender(menuData);
} else {
    console.log("no data");
}

// render menu from an array of objects
function initialRender(menuData) {
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

// render order menu
function renderOrder(orderArr) {
    const orderMenu = orderArr.map( orderItem => { 
        const {name, id, price} = orderItem
        return `
            <div class="order-item">
                <div class="order-names">
                    <div class="order-item-name">${name}</div>
                    <div class="order-item-remove" data-id="${id}">remove</div>
                </div>
                <div class="order-item-price">$${price}</div>
            </div>
        `;
    }).join("");
    orderItems.innerHTML = orderMenu;
}

function handleClick (e) {
    // Check if selected item is menu or order
    if(e.target.closest(".menu-item")) {
        // MENU ITEM
        // Order div container
        const orderExists = document.getElementById("order")
        if(!orderExists) {
            console.log("APPENDING ORDER CONTAINER")
            main.append(orderContainer)
            orderContainer.append(orderHeader, orderItems, priceDivider, orderTotal);
        }        
        // Adding to order
        // saving the item object into a variable based on the id of the target
        const itemToAddObj = menuData.filter((item) => {
            return item.id === parseInt(e.target.dataset.id)
        })
        console.log(`Adding to the order: ${itemToAddObj[0].name}`);

        // convert object to order item
        const {name, id, price} = itemToAddObj[0]
        const orderItem = {
            id: uuidv4(),
            name,
            price
        }
        // console.log(`Order item object: ${JSON.stringify(orderItem)}`)
        // add object to order Array
        currentOrder.push(orderItem);
        console.log(`Current order array: ${JSON.stringify(currentOrder)}`)
        renderOrder(currentOrder);
    } else {
        // ORDER ITEM
        console.log("Order item")
        // Finding the ID of the selected order item
        const itemToRemoveObj = currentOrder.filter((item) => {
            return item.id === e.target.dataset.id
        })
        console.log(`Removing from the order: ${itemToRemoveObj[0].name}`);
        // Finding the index of the orderItem to be removed in the array
        const indexToRemove = currentOrder.findIndex(obj => obj.id === itemToRemoveObj[0].id);
        // If the index exists, remove from array
        if(indexToRemove !== -1) {
            currentOrder.splice(indexToRemove, 1);
            console.log(`Current order array: ${JSON.stringify(currentOrder)}`)
            // If order is empty after last removal, remove the order entirely
            if(currentOrder.length === 0) {
                console.log("remove order container")
                orderContainer.remove();
            } else {
                console.log("rerender")
                renderOrder(currentOrder);
            }
        }
    }
    
    // Removing from order
}

// Click event listener
document.addEventListener("click", (e) => {
    // check if the click target has an item id
    if(e.target.dataset.id) {
        handleClick(e);
    }
})