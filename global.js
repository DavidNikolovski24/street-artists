// selected Artist
export const setCurrentArtist = (artist) => {
  sessionStorage.setItem("artist", artist);
};

export const getCurrentArtist = () => {
  return sessionStorage.getItem("artist");
};
// /selected Artist

// localstorage Items
export const editLocalStorageItems = (items) => {
  localStorage.removeItem("items");
  localStorage.setItem("items", JSON.stringify(items));
};
export const getLocalStorageItems = () => {
  return JSON.parse(localStorage.getItem("items"));
};

// /localstorage Items

// headerHandler
const auctionMenu = document.querySelector(".fa-gavel"),
  hamburgerMenu = document.querySelector(".fa-bars"),
  homeMenu = document.querySelector(".fa-house"),
  imgLogoAtag = document.querySelector("#logoPicture"),
  headerContainer = document.querySelector("#headerContainer"),
  h1Header = document.querySelector("#artistHeader");
export const visitorHeader = () => {
  if (location.hash[1] === "v") {
    imgLogoAtag.href = "";
    imgLogoAtag.href += "#vHomePage";
    sessionStorage.removeItem("artist");
  }

  hamburgerMenu.style.display = "none";
  homeMenu.style.display = "none";
  auctionMenu.style.display = "block";
  h1Header.innerText = "Street ARTists";
};
export const artistHeader = () => {
  if (location.hash[1] === "a") {
    imgLogoAtag.href = "";
    imgLogoAtag.href += "#aHomePage";
  }
  h1Header.innerText = getCurrentArtist();
  auctionMenu.style.display = "none";
  homeMenu.style.display = "none";
  hamburgerMenu.style.display = "block";
};
export const auctionHeader = () => {
  auctionMenu.style.display = "none";
  homeMenu.style.display = "block";
  hamburgerMenu.style.display = "none";
};
hamburgerMenu.addEventListener("click", () => {
  headerContainer.classList.toggle("dnone");
});
export const closeHamMenu = () => {
  headerContainer.classList.remove("dnone");
};
// /headerHandler
