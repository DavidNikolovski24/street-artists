import { itemTypes } from "../Data/data.js";
import { getLocalStorageItems } from "../global.js";
let items = getLocalStorageItems();

const vFilterPage = document.querySelector("#vFilterPage"),
  vListingPageMain = document.querySelector("#vListingPageMain"),
  filterListingBtn = document.querySelector("#filterListingBtn"),
  closeFilter = document.querySelector("#closeFilter"),
  vFilterPageCheckDiv = document.querySelector("#vFilterPageCheckDiv"),
  cardContainer = document.querySelector(".cardContainer"),
  vFilterArtistDropdown = document.querySelector("#vFilterArtistDropdown"),
  vFilterTypeDropdown = document.querySelector("#vFilterTypeDropdown");

const cardMaker = (parent, { image, title, description, price, artist }) => {
  parent.innerHTML += `<div class="customCard">
  <div class="customCardImg"><img src=${image}></div>
  <div class="customcardArtist">
      <h3>${artist}</h3>
      <span>$${price}</span>
  </div>
  <div class="customcardText">
      <h6>${title}</h6>
      <p>${description}</p>
  </div>
</div>`;
};

export const initVListingPage = () => {
  const publishedItems = items.filter((item) => item.isPublished);

  vFilterArtistDropdown.innerHTML = "";
  vFilterArtistDropdown.innerHTML = '<option  value="">Select</option>';
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((user) => {
        vFilterArtistDropdown.innerHTML += `<option value="${user.name}">${user.name}</option>`;
      });
    });

  const filterFnc = () => {
    const title = document.querySelector("#vFilterTitleInput"),
      artist = document.querySelector("#vFilterArtistDropdown"),
      minPrice = document.querySelector("#filterMinPrice"),
      maxPrice = document.querySelector("#filterMaxPrice"),
      type = document.querySelector("#vFilterTypeDropdown"),
      titleVal = document.querySelector("#vFilterTitleInput").value,
      artistVal = document.querySelector("#vFilterArtistDropdown").value,
      minPriceVal = +document.querySelector("#filterMinPrice").value,
      maxPriceVal = +document.querySelector("#filterMaxPrice").value,
      typeVal = document.querySelector("#vFilterTypeDropdown").value;
    const filtered = publishedItems.filter(
      (item) =>
        (titleVal
          ? item.title.toLowerCase().includes(titleVal.toLowerCase())
          : true) &&
        (artistVal ? item.artist === artistVal : true) &&
        (minPriceVal ? +item.price >= minPriceVal : true) &&
        (maxPriceVal ? +item.price <= maxPriceVal : true) &&
        (typeVal ? item.type === typeVal : true)
    );
    console.log(filtered);

    cardContainer.innerHTML = "";
    filtered.forEach((el) => {
      cardMaker(cardContainer, el);
    });
    title.value = "";
    artist.value = "";
    minPrice.value = "";
    maxPrice.value = "";
    type.value = "";
  };
  filterFnc();

  filterListingBtn.addEventListener("click", () => {
    vFilterTypeDropdown.innerHTML = "";
    vFilterTypeDropdown.innerHTML = '<option  value="">Select</option>';

    itemTypes.forEach((el) => {
      vFilterTypeDropdown.innerHTML += `<option value="${el}">${el}</option>`;
    });
    vFilterPage.style.display = "flex";
    vListingPageMain.style.display = "none";
  });
  closeFilter.addEventListener("click", () => {
    vFilterPage.style.display = "none";
    vListingPageMain.style.display = "flex";
  });

  vFilterPageCheckDiv.addEventListener("click", () => {
    filterFnc();
    vFilterPage.style.display = "none";
    vListingPageMain.style.display = "flex";
  });
};
