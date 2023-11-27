import { getLocalStorageItems, editLocalStorageItems } from "../global.js";
let items = getLocalStorageItems();

const backBtn = document.querySelector(".lni-home "),
  auctionLiveContainerDiv = document.querySelector("#auctionLiveContainerDiv"),
  auctionNoLiveCardDiv = document.querySelector("#auctionNoLiveCardDiv"),
  auctionCard = document.querySelector("#auctionCard"),
  auctionLivePrice = document.querySelector("#auctionLivePrice"),
  auctionBidButton = document.querySelector("#auctionBidButton"),
  auctionHistoryUl = document.querySelector("#auctionHistoryUl"),
  auctionBidDiv = document.querySelector("#auctionBidDiv");

let auctionInput = document.querySelector("#auctionInput"),
  timerTag = document.querySelector("#timer");
let livePrice = localStorage.getItem("AuctPrice");
const auctCardMaker = (parent, el) => {
  parent.innerHTML = `<div id="auctionCardDiv">
  <div>
    <img
      src=${el?.image}
    />
  </div>
  <div id="auctionCardInfoDiv">
    <div>
      <h1>${el?.artist}</h1>
      <p>${el?.dateCreated}</p>
    </div>
    <h3>${el?.title}</h3>
    <p>
    ${el?.description}
    </p>
  </div>
</div>

</div>`;
};
const timerConverter = (sec) => {
  const seconds = sec;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;

  return timeString;
};
let timeConverted = localStorage?.getItem("auctTimer");

export const initAuctionPage = () => {
  // backBtn
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
  // /backBtn
  let auctionItem = items.find((el) => el.isAuctioning === true);
  if (auctionItem === undefined) {
    auctionLiveContainerDiv.style.display = "none";
    auctionNoLiveCardDiv.style.display = "block";
  } else {
    auctionLiveContainerDiv.style.display = "block";
    auctionNoLiveCardDiv.style.display = "none";
    // live price
    auctionLivePrice.innerText = `${livePrice}$`;
    auctionInput.min = livePrice;
    auctionInput.value = livePrice;
    // /live price

    // timer
    let auctTimerInterval = setInterval(() => {
      if (timeConverted <= 1) {
        auctionItem.isAuctioning = false;
        auctionItem.dateSold = new Date().toLocaleDateString();
        auctionItem.priceSold = +livePrice;
        editLocalStorageItems(items);
        location.reload();
        auctionHistoryUl.innerHTML = "";
        clearInterval(auctTimerInterval);
      }
      timeConverted -= 1;
      localStorage.setItem("auctTimer", timeConverted);
      timerTag.innerText = timerConverter(timeConverted) + "s";
    }, 1000);
    // /timer

    auctCardMaker(auctionCard, auctionItem);
  }
  auctionBidButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (+auctionInput.value <= +livePrice || +auctionInput.value === "") {
      return;
    }
    // input
    livePrice = auctionInput.value;
    timeConverted += 10;
    localStorage.setItem("AuctPrice", livePrice);
    auctionHistoryUl.innerHTML += `<li>Me: ${livePrice}$</li>`;
    const formData = new FormData();
    formData.set("amount", auctionInput.value);
    fetch("https://projects.brainster.tech/bidding/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.bidAmount !== null) {
          localStorage.setItem("AuctPrice", data.bidAmount);
          auctionLivePrice.textContent = data.bidAmount + "$";
          auctionHistoryUl.innerHTML += `<li>Guest${new Date().valueOf()}: ${
            data.bidAmount
          }$</li>`;
          livePrice = data.bidAmount;
          auctionInput.min = livePrice;
        }
        if (data.isBidding === false) {
          auctionBidButton.setAttribute("disabled", true);
          auctionBidButton.style.opacity = "0.5";
          auctionInput.placeholder = "Your Bid is the Highest...";
        }
        console.log(data);
        console.log(data.bidAmount);
      });
    auctionLivePrice.innerText = `${livePrice}$`;
    auctionInput.min = livePrice;
    auctionInput.value = "";
    // /input
  });
  if (sessionStorage.getItem("artist")) {
    auctionBidDiv.style.display = "none";
  }
};
