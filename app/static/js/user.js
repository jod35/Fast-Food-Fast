const detailButtons = document.querySelectorAll(".btn-4");
const orderRecords = document.querySelectorAll(".order-record");
const orderRecordIDs = document.querySelectorAll(".order-id");
const orderUpdateModal = document.querySelector(".order-update-modal");
const orderUpdateform = document.querySelector("#update-form");


function closeModal(id){
    let el= document.getElementById(id);

    el.style.display="none";
}

for(let i =0 ; i < orderRecords.length; i++){
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