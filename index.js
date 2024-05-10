// import data
import { menuArray as menuData } from "./data.js";

// references to existing DOM elements
const main = document.querySelector("main");

// DOM elements
// Main div
const menuContainer = document.createElement("div");
menuContainer.id = "menu";

// appending elements
main.append(menuContainer);

// take data and render them
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
console.log(currentMenu);