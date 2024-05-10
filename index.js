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
                        <div class="menu-item-ingredients">${ingredients}</div>
                        <div class="menu-item-price">$${price}</div>
                    </div>
                </div>
                <button class="menu-item-btn">+</button>
            </div>
            <hr />
        `;
    }).join("");
    
    menuContainer.innerHTML = currentMenu;
}