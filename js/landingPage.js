import { setCurrentArtist } from "../global.js";

export const initLandingPage = () => {
  const joinVisitor = document.querySelector(".joinVisitor");

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      const artistsSelect = document.querySelector("#landingPageDropdown");

      artistsSelect.innerHTML = "";
      artistsSelect.innerHTML = '<option value="">Choose</option>';

      data.forEach((user) => {
        artistsSelect.innerHTML += `<option value="${user.name}">${user.name}</option>`;
      });

      artistsSelect.addEventListener("change", (e) => {
        setCurrentArtist(e.currentTarget.value);
        location.hash = "#aHomePage";
      });
    });

  joinVisitor.addEventListener("click", () => {
    location.hash = "vHomePage";
  });
  //   /////////////
};
