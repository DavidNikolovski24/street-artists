import { getCurrentArtist, getLocalStorageItems } from "../global.js";
let items = getLocalStorageItems();

const soldItemPTag = document.querySelector("#soldItemPTag"),
  totalIncomePTag = document.querySelector("#totalIncomePTag"),
  chartButtonsDiv = document.querySelector("#chartButtonsDiv"),
  statsArtistLive = document.querySelector("#statsArtistLive"),
  LiveAuctPTag = document.querySelector("#LiveAuctPTag"),
  allBtns = chartButtonsDiv.querySelectorAll("button"),
  days7Btn = chartButtonsDiv.querySelector("#days7Btn"),
  days14Btn = chartButtonsDiv.querySelector("#days14Btn"),
  days30Btn = chartButtonsDiv.querySelector("#days30Btn"),
  year1Btn = chartButtonsDiv.querySelector("#year1Btn");

const generateLabelsDays = (daysEntered) => {
  let arr = [];
  for (let i = 0; i < daysEntered; i++) {
    const start = new Date();
    const date = start.getDate();
    const getDay = start.setDate(date - i);
    const formatedDay = formatDate(getDay);
    arr.push(formatedDay);
  }
  return arr;
};
const generateLabelsPast12Months = () => {
  let arr = [];
  for (let i = 0; i < 12; i++) {
    const start = new Date();
    start.setMonth(start.getMonth() - i);
    const month = start.getMonth() + 1;
    const year = start.getFullYear();
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedYear = year.toString();
    arr.push(`${formattedMonth}/${formattedYear}`);
  }
  return arr;
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-gb");
}
export const initAHomePage = () => {
  const artist = getCurrentArtist();
  const filterArtistItems = items.filter((el) => el.artist === artist);
  const filterArtistPubItems = filterArtistItems.filter((el) => el.isPublished);
  const filterArtistSoldItems = filterArtistPubItems.filter(
    (el) => el.dateSold
  );
  const findAuctItem = filterArtistItems.find((el) => el.isAuctioning);
  if (findAuctItem?.isAuctioning) {
    statsArtistLive.style.display = "block";
    LiveAuctPTag.innerText = `${localStorage.getItem("AuctPrice")}$`;
    //temporarrttttrttrtrrttttttttttttttttttttttttt
  }
  statsArtistLive.addEventListener("click", () => {
    location.hash = "#auction";
  });
  let totalIncome = filterArtistSoldItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.priceSold,
    0
  );
  soldItemPTag.innerText = `${filterArtistSoldItems.length}/${filterArtistPubItems.length}`;
  totalIncomePTag.innerText = `${totalIncome}$`;
  const ctx = document.getElementById("chartDiv");
  const chart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: [
        {
          label: "Amount",
          borderColor: "#a16a5e",
          backgroundColor: "#a16a5e",
          hoverBackgroundColor: "#d44c2e",
        },
      ],
    },
    options: {
      indexAxis: "y",
    },
  });

  const modifyChart = (enterPastDays) => {
    const labels = generateLabelsDays(enterPastDays);
    const dateSum = labels.map((label) => {
      let sum = 0;
      filterArtistSoldItems.forEach((item) => {
        if (label === formatDate(item.dateSold)) {
          sum += item.priceSold;
        }
      });
      return sum;
    });
    chart.data.labels = labels;
    chart.data.datasets[0].data = dateSum;
    chart.update();
  };
  modifyChart(7);
  days7Btn.addEventListener("click", () => {
    modifyChart(7);
  });
  days14Btn.addEventListener("click", () => {
    modifyChart(14);
  });
  days30Btn.addEventListener("click", () => {
    modifyChart(30);
  });
  year1Btn.addEventListener("click", () => {
    const labels = generateLabelsPast12Months();
    const dateSum = labels.map((label) => {
      let sum = 0;
      filterArtistSoldItems.forEach((item) => {
        let formatedDateSold = formatDate(item.dateSold);
        formatedDateSold = formatedDateSold.substring(3);
        if (label === formatedDateSold) {
          sum += item.priceSold;
        }
      });
      return sum;
    });
    chart.data.labels = labels;
    chart.data.datasets[0].data = dateSum;
    chart.update();
  });
  allBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      allBtns.forEach((btn) => {
        btn.classList.remove("activeBtn");
      });
      e.target.classList.add("activeBtn");
    });
  });
};
