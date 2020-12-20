const orderButton = document.querySelector('#order-btn');
const orderModal = document.querySelector('.order-modal');
const orderUpdateModal = document.querySelector('.order-update-modal');
const orderUpdateform = document.querySelector('#update-form');
const createform = document.querySelector('#create-form');
const orderCreateURL = '/api/orders';
const notificationModal = document.querySelector('.noti-modal');
const notificationMessage = document.querySelector('.noti-text');
const table = document.querySelector('tbody');
const orderRecords = document.querySelectorAll('.order-record');
const OrderDeleteButtons = document.querySelectorAll('.btn-1');
const OrderUpdateButtons = document.querySelectorAll('.btn-2');
const orderRecordIDs = document.querySelectorAll('.order-id');
const orderRecordOrder = document.querySelectorAll('.order-order');
const orderRecordLocation = document.querySelectorAll('.order-location');
const orderRecordPrice = document.querySelectorAll('.order-price');



//display order form
orderButton.addEventListener('click', function () {
    orderModal.style.display = "block";
})


function closeModal(id) {

    var el = document.getElementById(id);

    el.style.display = "none";
}

//create a new order logic
createform.addEventListener('submit', (e) => {
    form_data = new FormData(createform);
    let newOrderObj = {
        location: form_data.get('location'),
        price: form_data.get('price'),
        comment: form_data.get('comment'),
        order: form_data.get('order')
    }

    fetch(orderCreateURL,
        {
            method: "POST",
            body: JSON.stringify(newOrderObj),
            headers: {
                'content-type': 'application/json'
            }
        }

    )
        .then(response => response.json())

        .then((data) => {
            console.log(data);
            orderModal.style.display = "none";
            notificationModal.style.display = "block";
            notificationMessage.innerText = data.message;


            let row = document.createElement('tr');

            row.classList.add('order-record');



            let html = `
            <td class="order-id">${data.order.id}</td>
            <td class="order-order">${data.order.order}</td>
            <td class="order-location">${data.order.location}</td>
            <td class="order-price">${data.order.price}</td>
            <td><a href="#" class="btn-1">Delete</a></td>
            <td><a href="#" class="btn-2">Edit</a></td>
            `

            row.innerHTML = html;
            table.insertBefore(row, table.childNodes[0]);

            setTimeout(location.reload(), 4000);


        })


    createform.reset();

    e.preventDefault();


})


//editing and deleting an order 
for (let i = 0; i < orderRecords.length; i++) {
    OrderDeleteButtons[i].addEventListener('click', () => {
        let orderID = orderRecordIDs[i].innerText

        let DELETE_URL = `/api/order/${orderID}`

        fetch(
            DELETE_URL,
            {
                method: "DELETE",
            }
        ).then(response => response.json())
            .then((data) => {
                console.log(data.message);
                notificationModal.style.display = "block";
                notificationMessage.innerText = data.message;
                orderRecords[i].style.display = "none";
            })
    })


    OrderUpdateButtons[i].addEventListener('click', () => {
        let orderID = orderRecordIDs[i].innerText;

        let RESOURCE_URL = `/api/order/${orderID}`;


        //fetch the resource using the URL

        fetch(
            RESOURCE_URL,
            {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            }
        )
            .then(response => response.json())
            .then((data) => {
                let location = document.querySelector("#location");


                orderUpdateModal.style.display = "block";

                //set the fields like this
                document.querySelector('#update-order').value = data.order.order;
                document.querySelector('#update-location').value = data.order.location;
                document.querySelector('#update-price').value = data.order.price;
                document.querySelector('#update-comment').value = data.order.comment;

                console.log(data);


                //update order logic

                orderUpdateform.addEventListener('submit', (e) => {

                    let form_data = new FormData(orderUpdateform);

                    let updatedOrder = {
                        order: form_data.get('order'),
                        price: form_data.get('price'),
                        comment: form_data.get('comment'),
                        location: form_data.get('location')
                    }


                    //send form data 

                    fetch(
                        RESOURCE_URL,
                        {
                            method: "PATCH",
                            body: JSON.stringify(updatedOrder),
                            headers: {
                                'content-type': 'application/json'
                            }
                        }
                    )
                        .then(res => res.json())
                        .then((data) => {
                            orderUpdateModal.style.display = "none";
                            notificationModal.style.display = "block";
                            notificationMessage.innerText = data.message;

                            orderRecordOrder[i].innerText=data.order.order;
                            orderRecordLocation[i].innerText=data.order.location;
                            orderRecordPrice[i].innerText=data.order.price;
                            

                          
                        }

                        )



                    e.preventDefault();
                })

            })
    })
}



