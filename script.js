import {
  visitorHeader,
  artistHeader,
  closeHamMenu,
  auctionHeader,
} from "./global.js";
import { initLandingPage } from "./js/landingPage.js";
import { initVHomePage } from "./js/vHomePage.js";
import { initVListingPage } from "./js/vListingPage.js";
import { initAHomePage } from "./js/aHomePage.js";
import { initAItemsPage } from "./js/aItemsPage.js";
import { initAuctionPage } from "./js/auction.js";

const logInHeader = document.querySelector("#logInHeader");
// routing
const handleRoute = () => {
  const currentLocation = location.hash === "" ? "#landingPage" : location.hash;

  const allPages = document.querySelectorAll(".page");
  allPages.forEach((page) => {
    page.style.display = "none";
  });
  document.querySelector(currentLocation).style.display = "flex";
  closeHamMenu();

  switch (currentLocation) {
    case "#vHomePage":
      visitorHeader();
      initVHomePage();
      break;

    case "#vListingPage":
      visitorHeader();
      initVListingPage();
      break;
    case "#aHomePage":
      artistHeader();
      initAHomePage();

      break;
    case "#aItemsPage":
      artistHeader();
      initAItemsPage();
      break;
    case "#auction":
      auctionHeader();
      initAuctionPage();
      break;

    default:
      initLandingPage();
      break;
  }

  if (currentLocation === "#landingPage") {
    logInHeader.style.display = "none";
  } else {
    logInHeader.style.display = "flex";
  }
};
window.addEventListener("load", handleRoute);
window.addEventListener("hashchange", handleRoute);
