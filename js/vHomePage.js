import { getLocalStorageItems } from "../global.js";
let items = getLocalStorageItems();

const firstRowMoveable = document.querySelector("#firstRowMoveable"),
  secondRowMoveable = document.querySelector("#secondRowMoveable");

const createCardForMovingBanner = (el, parent) => {
  parent.innerHTML += `<div style='padding:20px 10px'><img style='width:500px' src='${el.image}'></div>`;
};
const cardClickFunctionality = (divArr, redirect) => {
  divArr.forEach((el) => {
    el.addEventListener("click", () => {
      location.hash = redirect;
    });
  });
};
export const initVHomePage = () => {
  let counter = 0;
  let arrLengthHalf = items.length / 2;
  items.forEach((el) => {
    if (counter <= arrLengthHalf) {
      createCardForMovingBanner(el, firstRowMoveable);
    } else {
      createCardForMovingBanner(el, secondRowMoveable);
    }
    counter++;
  });
  const firstRowDivs = firstRowMoveable.querySelectorAll("div"),
    secondRowDivs = secondRowMoveable.querySelectorAll("div");
  cardClickFunctionality(firstRowDivs, "#vListingPage");
  cardClickFunctionality(secondRowDivs, "#vListingPage");
};
