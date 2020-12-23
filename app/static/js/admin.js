const detailButtons = document.querySelectorAll(".btn-4");
const completionButtons = document.querySelectorAll(".btn-3");
const notificationModal = document.querySelector(".noti-modal");
const notificationMessage = document.querySelector(".noti-text");
const orderRecords = document.querySelectorAll(".order-record");
const orderRecordIDs = document.querySelectorAll(".order-id");
const orderUpdateModal = document.querySelector(".order-update-modal");
const orderUpdateform = document.querySelector("#update-form");

function closeModal(id) {
  var el = document.getElementById(id);

  el.style.display = "none";
}

for (let i = 0; i < orderRecords.length; i++) {
  completionButtons[i].addEventListener("click", () => {
    let RESOURCE_URL = `/api/order/complete/${orderRecordIDs[i].innerText}`;

    fetch(RESOURCE_URL, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        notificationModal.style.display = "block";
        notificationMessage.innerText = data.message;

        orderRecords[i].style.display = "none";
      });
  });

  detailButtons[i].addEventListener("click", () => {
    let RESOURCE_URL = `/api/order/${orderRecordIDs[i].innerText}`;

    

    fetch(RESOURCE_URL, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },

    })
    .then(res=>res.json())
    .then((data)=>{
        orderUpdateModal.style.display="block";
        document.querySelector("#update-order").innerText = data.order.order;
        document.querySelector("#update-location").innerText = data.order.location;
        document.querySelector("#update-price").innerText = data.order.price;
        document.querySelector("#update-comment").innerText = data.order.comment;
       
    })
  });
}
