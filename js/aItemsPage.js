import { itemTypes } from "../Data/data.js";
import { getLocalStorageItems, editLocalStorageItems } from "../global.js";

let items = getLocalStorageItems();

class ArtistNewItem {
  constructor(
    title,
    type,
    isPublished,
    price,
    image,
    description,
    dateSold,
    priceSold
  ) {
    this.id = new Date().valueOf();
    this.artist = sessionStorage.getItem("artist");
    this.dateCreated = new Date().toLocaleDateString();
    this.isAuctioning = false;
    this.title = title;
    this.type = type;
    this.isPublished = isPublished;
    this.price = +price;
    this.image = image;
    this.description = description;
    this.dateSold = dateSold;
    this.priceSold = priceSold;
  }

  setDateSold(dateSold) {
    this.dateSold = dateSold;
  }
  setPriceSold(priceSold) {
    this.priceSold = +priceSold;
  }
}

// addnewInputs
const addNewItemForm = document.querySelector("#addNewItemForm"),
  addNewItemTitle = document.querySelector("#addNewItemTitle"),
  addNewItemDesc = document.querySelector("#addNewItemDesc"),
  addNewItemType = document.querySelector("#addNewItemType"),
  addNewItemImageUrl = document.querySelector("#addNewItemImageUrl"),
  addNewItemPrice = document.querySelector("#addNewItemPrice"),
  addNewCameraDivOuter = document.querySelector("#addNewCameraDivOuter"),
  addNewItemCloseBtn = document.querySelector("#addNewItemCloseBtn"),
  captureImageBtn = document.querySelector("#captureImageBtn"),
  liveStream = document.querySelector("#liveStream"),
  liveCaptureCanvas = document.querySelector("#liveCaptureCanvas"),
  addNewCameraBinBtn = document.querySelector("#addNewCameraBinBtn"),
  addNewCheckbox = document.querySelector("#addNewCheckbox");
let capturedImageImg = document.querySelector("#capturedImage"),
  addNewItemBtn = document.querySelector("#addNewItemBtn"),
  allErrorFields = document.querySelectorAll(".error");

const itemMaker = (parent, el) => {
  el.dateCreated = el.dateCreated.substring(0, 10);

  parent.innerHTML += `<div id="item-${el.id}" class="artistItemCard">
  <div class="artistItemCardImg">
      <img src=${el.image}>
  </div>
  <div class="artistItemCardTitleDiv">
      <div>
          <h4>${el.title}</h4>
          <p>${el.dateCreated}</p>
      </div>
      <div>
          <span class="artistItemCardPrice">$${el.price}</span>
      </div>
  </div>
  <div class="artistItemCardDesc">
      <p>${el.description}</p>
  </div>
  <div class="artistItemCardBtnDiv">
      <button  class="artistItemCardAuctBtn">Send to Auction</button>
      <button class="artistItemCardUnpublishBtn"></button>
      <button type="button" class="artistItemCardRemoveBtn" data-toggle="modal" data-target="#aItem${el.id}">
      Remove
  </button>
  <div class="modal fade" id="aItem${el.id}" tabindex="-1" role="dialog" aria-labelledby="aItem${el.id}" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-head text-center">
              <p>Are you sure to remove this item ?</p>
              </div>
              <div class="modal-body d-flex justify-content-between">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button"data-dismiss="modal" class="btn btn-danger aModalDeleteItemBtn">Remove</button>
                 
              </div>
              
          </div>
      </div>
  </div>
      
      <button class="artistItemCardEditBtn">Edit</button>
  </div>
</div>`;
};
const inputValidation = (
  input,
  message = "Please fill out the field above"
) => {
  input.value = input.value.trim();
  if (input.value === "") {
    input.nextElementSibling.innerText = message;
    return false;
  } else {
    return true;
  }
};
export const initAItemsPage = () => {
  const addNewInnerDiv = document.querySelector("#addNewInnerDiv"),
    allItemsContainer = document.querySelector("#allItemsContainer"),
    addNewItemContainer = document.querySelector("#addNewItemContainer"),
    addNewItemCameraDiv = document.querySelector("#addNewItemCameraDiv"),
    addNewItemDiv = document.querySelector("#addNewItemDiv"),
    artist = sessionStorage.getItem("artist");

  addNewInnerDiv.addEventListener("click", () => {
    addNewItemBtn.innerText = "Add new item";
    addNewItemContainer.style.display = "none";
    allItemsContainer.style.display = "none";
    addNewItemDiv.style.display = "block";
  });
  // populate Items

  addNewItemType.innerHTML = "";
  addNewItemType.innerHTML = '<option  value="">Select</option>';

  itemTypes.forEach((el) => {
    addNewItemType.innerHTML += `<option value="${el}">${el}</option>`;
  });
  let findedEl;
  const populateItemsInContainer = () => {
    let allArtistItems = items.filter((el) => el.artist === artist);
    allArtistItems.forEach((el, index) => {
      itemMaker(allItemsContainer, el);
      const artistItemCardPublishBtnAll = document.querySelectorAll(
          ".artistItemCardUnpublishBtn"
        ),
        artistItemCardAuctBtnAll = document.querySelectorAll(
          ".artistItemCardAuctBtnAll"
        );

      if (el.isPublished) {
        artistItemCardPublishBtnAll[index].innerText = "Unpublish";
      } else {
        artistItemCardPublishBtnAll[index].innerText = "Publish";
        artistItemCardPublishBtnAll[index].style.backgroundColor = "white";
        artistItemCardPublishBtnAll[index].style.color = "black";
      }
    });
    const artistItemCardAuctBtnAll = document.querySelectorAll(
        ".artistItemCardAuctBtn"
      ),
      artistItemCardPublishBtnAll = document.querySelectorAll(
        ".artistItemCardUnpublishBtn"
      ),
      artistItemCardEditBtn = document.querySelectorAll(
        ".artistItemCardEditBtn"
      ),
      artistItemCardRemoveBtn = document.querySelectorAll(
        ".artistItemCardRemoveBtn"
      );
    let auctiongItem = items.find((el) => el.isAuctioning === true);

    if (auctiongItem?.isAuctioning === true) {
      const artistItemCardAuctBtnAll = document.querySelectorAll(
        ".artistItemCardAuctBtn"
      );
      artistItemCardAuctBtnAll.forEach((el) => {
        el.setAttribute("disabled", true);
        el.style.opacity = "0.5";
      });
    }
    artistItemCardAuctBtnAll.forEach((el) => {
      el.addEventListener("click", (e) => {
        const artistItemCardAuctBtnAll = document.querySelectorAll(
          ".artistItemCardAuctBtn"
        );

        const takenClickedItemId = e.target.closest(`[id]`).id,
          splitedId = +takenClickedItemId.split("-")[1],
          findedEl = allArtistItems.find((el) => splitedId === el.id);
        findedEl.isAuctioning = true;
        editLocalStorageItems(items);
        localStorage.setItem("AuctPrice", Math.ceil(findedEl.price / 2));
        localStorage.setItem("auctTimer", 120);
        artistItemCardAuctBtnAll.forEach((el) => {
          el.setAttribute("disabled", true);
          el.style.opacity = "0.5";
        });
        location.hash = "#auction";
        location.reload();
      });
    });
    artistItemCardPublishBtnAll.forEach((el, index) => {
      el.addEventListener("click", (e) => {
        let buttonTextUn = e.target.innerText === "Unpublish";
        const takenClickedItemId = e.target.closest(`[id]`).id,
          splitedId = +takenClickedItemId.split("-")[1];
        const findedEl = allArtistItems.find((el) => splitedId === el.id);

        if (buttonTextUn) {
          findedEl.isPublished = false;
          e.target.innerText = "Publish";
          artistItemCardPublishBtnAll[index].style.backgroundColor = "white";
          artistItemCardPublishBtnAll[index].style.color = "black";
        } else {
          findedEl.isPublished = true;
          e.target.innerText = "Unpublish";
          artistItemCardPublishBtnAll[index].style.backgroundColor = "#1bac6f";
          artistItemCardPublishBtnAll[index].style.color = "white";
        }
        editLocalStorageItems(items);
      });
    });
    const aModalDeleteItemBtn = document.querySelectorAll(
      ".aModalDeleteItemBtn"
    );
    // remove item
    let clickedDeleteId;
    artistItemCardRemoveBtn.forEach((el) => {
      el.addEventListener("click", (e) => {
        clickedDeleteId = e.target.closest(`[id]`).id;
      });
    });
    let artistItemCard = document.querySelectorAll(".artistItemCard");
    aModalDeleteItemBtn.forEach((el) => {
      el.addEventListener("click", () => {
        let splitedId = +clickedDeleteId.split("-")[1];
        let findedEl = items.find((el) => splitedId === el.id);
        let index = items.indexOf(findedEl);
        items.splice(index, 1);
        editLocalStorageItems(items);
        let findedItemDom = Array.from(artistItemCard).find(
          (el) => el.id === clickedDeleteId
        );
        findedItemDom.remove();
      });
    });
    // /remove item
    // editBtn
    artistItemCardEditBtn.forEach((el) => {
      el.addEventListener("click", (e) => {
        let clickedParentId = e.target.closest(`[id]`).id,
          numberIdTaken = +clickedParentId.split("-")[1];
        addNewItemContainer.style.display = "none";
        allItemsContainer.style.display = "none";
        addNewItemDiv.style.display = "block";
        findedEl = allArtistItems.find((el) => el.id === numberIdTaken);
        addNewItemTitle.value = findedEl.title;
        addNewItemDesc.value = findedEl.description;
        addNewItemType.value = findedEl.type;
        addNewItemImageUrl.value = findedEl.image;
        addNewItemPrice.value = findedEl.price;
        addNewItemBtn.innerText = "Edit Item";
      });
    });
  };

  //  /editBtn
  // /populate Items

  populateItemsInContainer();
  // add new item inner in div btn
  addNewItemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    allErrorFields.forEach((el) => {
      el.innerText = "";
    });
    if (
      !inputValidation(addNewItemType) ||
      !inputValidation(addNewItemPrice) ||
      !inputValidation(addNewItemTitle)
    ) {
      return;
    }
    const hasImageUrl = addNewItemImageUrl.value !== "";
    const hasLiveImage = capturedImageImg.src.length > 50;

    if (!hasImageUrl && !hasLiveImage) {
      addNewItemImageUrl.nextElementSibling.innerText =
        "Please enter a URL or take a picture";
      return;
    }
    if (e.target.innerText == "Edit Item") {
      findedEl.title = addNewItemTitle.value;
      findedEl.description = addNewItemDesc.value;
      findedEl.type = addNewItemType.value;
      findedEl.image = addNewItemImageUrl.value || capturedImageImg.src;
      findedEl.price = addNewItemPrice.value;
      findedEl.isPublished = addNewCheckbox.checked;
    } else {
      let newItemCurrentlyCreated = new ArtistNewItem(
        addNewItemTitle.value,
        addNewItemType.value,
        addNewCheckbox.checked,
        addNewItemPrice.value,
        addNewItemImageUrl.value || capturedImageImg.src,
        addNewItemDesc.value
      );
      items.push(newItemCurrentlyCreated);
      editLocalStorageItems(items);
      addNewItemForm.reset();
      capturedImageImg.src = "";
      addNewCameraBinBtn.style.display = "none";
    }
    editLocalStorageItems(items);
    allItemsContainer.innerHTML = "";
    populateItemsInContainer();
    addNewItemDiv.style.display = "none";
    addNewItemContainer.style.display = "block";
    allItemsContainer.style.display = "block";
    capturedImageImg.src = "";
  });

  addNewItemCloseBtn.addEventListener("click", () => {
    addNewItemContainer.style.display = "block";
    allItemsContainer.style.display = "block";
    addNewItemDiv.style.display = "none";
    addNewItemForm.reset();
    capturedImageImg.src = "";
    addNewCameraBinBtn.style.display = "none";
  });
  // /add New Item Fnc
  // cameraDiv
  addNewCameraDivOuter.addEventListener("click", (e) => {
    if (e.target.id === "addNewCameraBinBtn") {
      e.preventDefault();
      capturedImageImg.src = "";
      addNewCameraBinBtn.style.display = "none";
      return;
    }
    addNewItemDiv.style.display = "none";
    addNewItemCameraDiv.style.display = "block";
    navigator.mediaDevices
      .getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
        },
      })
      .then((stream) => {
        liveStream.srcObject = stream;
      });
  });
  liveStream.addEventListener("canplay", function () {
    liveCaptureCanvas.width = liveStream.videoWidth;
    liveCaptureCanvas.height = liveStream.videoHeight;
  });
  captureImageBtn.addEventListener("click", function () {
    const ctx = liveCaptureCanvas.getContext("2d");
    ctx.drawImage(liveStream, 0, 0);
    const imageDataUrl = liveCaptureCanvas.toDataURL("image/png");
    capturedImageImg.src = imageDataUrl;
    addNewItemCameraDiv.style.display = "none";
    addNewItemDiv.style.display = "block";
    stopStream();
    if (capturedImageImg.src != "") {
      addNewCameraBinBtn.style.display = "block";
    }
  });
};
function stopStream() {
  const stream = liveStream.srcObject;
  const allTracks = stream.getTracks();
  allTracks.forEach((track) => {
    track.stop();
  });
}
// /cameraDiv
